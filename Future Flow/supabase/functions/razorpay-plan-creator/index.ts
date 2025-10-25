
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID');
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');

async function createOrGetPlan() {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured');
  }

  const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
  
  const planData = {
    period: 'monthly',
    interval: 1,
    item: {
      name: 'SkillMap.AI Pro Subscription',
      amount: 7900, // ₹79 in paise
      currency: 'INR',
      description: 'Unlimited AI-powered learning roadmaps for just ₹79/month'
    }
  };

  const response = await fetch('https://api.razorpay.com/v1/plans', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(planData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create Razorpay plan: ${error}`);
  }

  return await response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const plan = await createOrGetPlan();

    return new Response(JSON.stringify({
      planId: plan.id,
      amount: plan.item.amount,
      currency: plan.item.currency,
      name: plan.item.name
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating plan:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
