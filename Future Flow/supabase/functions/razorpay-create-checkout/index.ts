
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID');
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Get user from auth token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid authentication token');
    }

    const { userEmail, userName, amount = 7900, currency = 'INR' } = await req.json();

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay credentials not configured');
    }

    // Generate a shorter receipt ID that fits within 40 characters
    const timestamp = Date.now().toString().slice(-8); // Last 8 digits
    const userIdShort = user.id.slice(0, 8); // First 8 chars of user ID
    const receipt = `rcpt_${userIdShort}_${timestamp}`; // Max 40 chars

    console.log('Generated receipt:', receipt, 'Length:', receipt.length);

    // Create Razorpay order
    const orderData = {
      amount: amount, // Amount in paise
      currency: currency,
      receipt: receipt,
      notes: {
        user_id: user.id,
        user_email: userEmail,
        subscription_type: 'pro',
        plan: 'monthly'
      }
    };

    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
    
    console.log('Creating Razorpay order with data:', JSON.stringify(orderData));
    
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!razorpayResponse.ok) {
      const errorData = await razorpayResponse.text();
      console.error('Razorpay API error:', errorData);
      throw new Error('Failed to create Razorpay order');
    }

    const order = await razorpayResponse.json();
    console.log('Razorpay order created successfully:', order.id);    // First check if a subscriber record already exists for this user
    const { data: existingSubscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    let storeError = null;
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is not found error
      console.error('Error checking for existing subscriber:', fetchError);
      throw new Error('Failed to prepare subscription');
    }
    
    if (existingSubscriber) {
      // Update existing subscriber
      const { error } = await supabase
        .from('subscribers')
        .update({
          email: userEmail,
          subscribed: false, // Will be updated to true when payment is captured
          subscription_tier: 'free', // Will be updated to 'pro' when payment is captured
          razorpay_order_id: order.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSubscriber.id);
        
      storeError = error;
    } else {
      // Insert new subscriber
      const { error } = await supabase
        .from('subscribers')
        .insert({
          user_id: user.id,
          email: userEmail,
          subscribed: false, 
          subscription_tier: 'free',
          razorpay_order_id: order.id,
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        });
        
      storeError = error;
    }

    if (storeError) {
      console.error('Error storing subscriber:', storeError);
      throw new Error('Failed to prepare subscription');
    }

    console.log('Subscriber info updated for user:', user.id);

    return new Response(JSON.stringify({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      razorpayKeyId: RAZORPAY_KEY_ID,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Create checkout error:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
