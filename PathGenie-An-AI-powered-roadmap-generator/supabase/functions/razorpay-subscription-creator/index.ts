
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

async function createSubscription(planId: string, customerEmail: string) {
  const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
  
  const subscriptionData = {
    plan_id: planId,
    customer_notify: 1,
    total_count: 12, // 12 months
    addons: [],
    notes: {
      email: customerEmail,
      service: 'SkillMap.AI Pro'
    }
  };

  const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create Razorpay subscription: ${error}`);
  }

  return await response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { planId } = await req.json();
    if (!planId) {
      throw new Error('Plan ID is required');
    }

    // Create subscription
    const subscription = await createSubscription(planId, user.email || '');

    // Store subscription info in database
    await supabase
      .from('subscribers')
      .upsert({
        user_id: user.id,
        email: user.email || '',
        razorpay_subscription_id: subscription.id,
        razorpay_plan_id: planId,
        subscription_tier: 'free', // Will be updated to 'pro' after successful payment
        subscribed: false, // Will be updated after successful payment
      });

    return new Response(JSON.stringify({
      subscriptionId: subscription.id,
      amount: 100, // ₹1 in paise
      currency: 'INR',
      razorpayKeyId: RAZORPAY_KEY_ID,
      shortUrl: subscription.short_url
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
