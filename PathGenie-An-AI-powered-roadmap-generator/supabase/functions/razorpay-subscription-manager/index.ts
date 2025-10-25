
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

async function checkSubscriptionStatus(razorpaySubscriptionId: string) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured');
  }

  const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
  
  const response = await fetch(`https://api.razorpay.com/v1/subscriptions/${razorpaySubscriptionId}`, {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Razorpay API error: ${response.status}`);
  }

  return await response.json();
}

async function updateSubscriptionRecord(supabase: any, userId: string, subscriptionData: any) {
  const isActive = subscriptionData.status === 'active';
  const currentPeriodEnd = subscriptionData.current_end ? new Date(subscriptionData.current_end * 1000) : null;

  const { error } = await supabase
    .from('subscribers')
    .upsert({
      user_id: userId,
      subscribed: isActive,
      subscription_tier: isActive ? 'pro' : 'free',
      subscription_end: currentPeriodEnd?.toISOString(),
      razorpay_subscription_id: subscriptionData.id,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(`Database update failed: ${error.message}`);
  }

  return {
    subscribed: isActive,
    subscription_tier: isActive ? 'pro' : 'free',
    subscription_end: currentPeriodEnd?.toISOString(),
  };
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

    // Get user's subscription from database
    const { data: subscriber } = await supabase
      .from('subscribers')
      .select('razorpay_subscription_id')
      .eq('user_id', user.id)
      .single();

    if (!subscriber || !subscriber.razorpay_subscription_id) {
      return new Response(JSON.stringify({
        subscribed: false,
        subscription_tier: 'free'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check subscription status with Razorpay
    const razorpaySubscription = await checkSubscriptionStatus(subscriber.razorpay_subscription_id);
    
    // Update database with latest status
    const updatedSubscription = await updateSubscriptionRecord(supabase, user.id, razorpaySubscription);

    return new Response(JSON.stringify(updatedSubscription), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in subscription manager:', error);
    return new Response(JSON.stringify({
      error: error.message,
      subscribed: false,
      subscription_tier: 'free'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
