
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHash, createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-razorpay-signature',
};

const RAZORPAY_WEBHOOK_SECRET = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === expectedSignature;
}

async function handlePaymentEvent(supabase: any, event: any) {
  const payment = event.payload.payment.entity;
  const paymentId = payment.id;
  const amount = payment.amount; // Amount in paise
  const currency = payment.currency;
  const status = payment.status;
  
  console.log('Processing payment event:', event.event, 'for payment:', paymentId);

  // Find order ID from payment data
  const orderId = payment.order_id;
  
  // Get notes which might contain user_id
  const notes = payment.notes || {};
  const userId = notes.user_id;
    // Check if this is our Pro subscription payment (₹79 = 7900 paise)
  if (amount === 7900 && currency === 'INR') {
    let subscribed = false;
    let subscriptionTier = 'free';
    let subscriptionEnd: Date | null = null;

    switch (event.event) {
      case 'payment.authorized':
      case 'payment.captured':
        subscribed = true;
        subscriptionTier = 'pro';
        // Set subscription to end after 1 month
        subscriptionEnd = new Date();
        subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
        break;
      
      case 'payment.failed':
        subscribed = false;
        subscriptionTier = 'free';
        // We don't set subscription_end for failed payments
        break;
    }    // First try to find by order_id
    let query = supabase.from('subscribers').select('*');
    
    if (orderId) {
      // If we have an order_id, use it to find the subscriber
      query = query.eq('razorpay_order_id', orderId);
    } else if (userId) {
      // If we have a user_id in notes, use it
      query = query.eq('user_id', userId);
    } else {
      // Fall back to email or contact from payment
      const userEmail = payment.email || payment.contact;
      if (!userEmail) {
        console.error('No identifiable information found in payment data');
        return;
      }
      query = query.eq('email', userEmail);
    }
    
    const { data: subscriber, error: queryError } = await query.single();
    
    if (queryError && queryError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error('Error finding subscriber:', queryError);
      return;
    }
    
    // If found subscriber, update it, otherwise log error
    if (subscriber) {
      const { error } = await supabase
        .from('subscribers')
        .update({
          subscribed,
          subscription_tier: subscriptionTier,
          subscription_end: subscriptionEnd?.toISOString(),
          razorpay_payment_id: paymentId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriber.id);
        
      if (error) {
        console.error('Error updating subscription:', error);
        throw error;
      }

      console.log(`Payment ${paymentId} processed: Subscription ${subscribed ? 'activated' : 'failed'} for user ${subscriber.user_id}`);
    } else {
      console.error('Could not find subscriber record for payment:', paymentId);
    }    // Code removed as it's now included in the updated block
  }
}

async function handleOrderEvent(supabase: any, event: any) {
  const order = event.payload.order.entity;
  const orderId = order.id;
  const amount = order.amount;
  const status = order.status;
  const notes = order.notes || {};
  const userId = notes.user_id;
  
  console.log('Processing order event:', event.event, 'for order:', orderId);

  // Handle order.paid event for Pro subscription
  if (event.event === 'order.paid' && amount === 7900) {
    // Find the subscriber by order_id or user_id
    let query = supabase.from('subscribers').select('*');
    
    if (orderId) {
      query = query.eq('razorpay_order_id', orderId);
    } else if (userId) {
      query = query.eq('user_id', userId);
    } else {
      console.error('No identifiable information found in order data');
      return;
    }
    
    const { data: subscriber, error: queryError } = await query.single();
    
    if (queryError && queryError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error('Error finding subscriber:', queryError);
      return;
    }

    if (subscriber) {
      // Update status to indicate the order was paid
      // BUT don't activate subscription yet (that happens in payment.captured)
      const { error } = await supabase
        .from('subscribers')
        .update({
          order_paid: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriber.id);
        
      if (error) {
        console.error('Error updating order status:', error);
      } else {
        console.log(`Order ${orderId} marked as paid for user ${subscriber.user_id}`);
      }
    } else {
      console.error('Could not find subscriber record for order:', orderId);
    }
  }
}

async function handleInvoiceEvent(supabase: any, event: any) {
  const invoice = event.payload.invoice.entity;
  const invoiceId = invoice.id;
  const orderId = invoice.order_id;
  const paymentId = invoice.payment_id;
  
  console.log('Processing invoice event:', event.event, 'for invoice:', invoiceId);

  // For invoice.paid event, we can update the subscription status
  if (event.event === 'invoice.paid' && orderId) {
    console.log(`Invoice ${invoiceId} paid for order ${orderId}`);
    
    // Find subscriber by order ID
    const { data: subscriber, error: queryError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('razorpay_order_id', orderId)
      .single();
    
    if (queryError) {
      console.error('Error finding subscriber by order ID:', queryError);
      return;
    }
    
    if (subscriber) {
      // Mark invoice as paid
      const { error } = await supabase
        .from('subscribers')
        .update({
          invoice_paid: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriber.id);
        
      if (error) {
        console.error('Error updating invoice status:', error);
      } else {
        console.log(`Invoice ${invoiceId} marked as paid for user ${subscriber.user_id}`);
      }
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RAZORPAY_WEBHOOK_SECRET) {
      throw new Error('Webhook secret not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const signature = req.headers.get('x-razorpay-signature');
    if (!signature) {
      throw new Error('No signature provided');
    }

    const payload = await req.text();
    
    // Verify webhook signature
    if (!verifyWebhookSignature(payload, signature, RAZORPAY_WEBHOOK_SECRET)) {
      throw new Error('Invalid signature');
    }    const event = JSON.parse(payload);
    console.log('Received Razorpay webhook:', event.event);

    try {
      // Handle payment events
      if (event.event.startsWith('payment.')) {
        await handlePaymentEvent(supabase, event);
      }

      // Handle order events
      if (event.event.startsWith('order.')) {
        await handleOrderEvent(supabase, event);
      }
      
      // Handle invoice events
      if (event.event.startsWith('invoice.')) {
        await handleInvoiceEvent(supabase, event);
      }
      
      // Log all other events for monitoring
      console.log(`Received event ${event.event}, data:`, JSON.stringify(event.payload).slice(0, 200) + '...');
    } catch (err) {
      console.error(`Error processing ${event.event} event:`, err);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
