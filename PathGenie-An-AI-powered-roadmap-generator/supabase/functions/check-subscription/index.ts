
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

// Validate environment variables
const validateEnvironment = () => {
  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
  if (!supabaseUrl) throw new Error("SUPABASE_URL is not set");
  if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  
  return { stripeKey, supabaseUrl, serviceRoleKey };
};

// Authenticate user and extract user data
const authenticateUser = async (authHeader: string | null, supabaseClient: any) => {
  if (!authHeader) throw new Error("No authorization header provided");
  
  const token = authHeader.replace("Bearer ", "");
  logStep("Authenticating user with token");
  
  const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
  if (userError) throw new Error(`Authentication error: ${userError.message}`);
  
  const user = userData.user;
  if (!user?.email) throw new Error("User not authenticated or email not available");
  
  logStep("User authenticated", { userId: user.id, email: user.email });
  return user;
};

// Find Stripe customer by email
const findStripeCustomer = async (stripe: Stripe, email: string) => {
  const customers = await stripe.customers.list({ email, limit: 1 });
  
  if (customers.data.length === 0) {
    logStep("No customer found in Stripe");
    return null;
  }
  
  const customer = customers.data[0];
  logStep("Found Stripe customer", { customerId: customer.id });
  return customer;
};

// Get active subscription for customer
const getActiveSubscription = async (stripe: Stripe, customerId: string) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    limit: 1,
  });
  
  if (subscriptions.data.length === 0) {
    logStep("No active subscription found");
    return null;
  }
  
  const subscription = subscriptions.data[0];
  logStep("Active subscription found", { 
    subscriptionId: subscription.id, 
    endDate: new Date(subscription.current_period_end * 1000).toISOString() 
  });
  
  return subscription;
};

// Determine subscription tier from price
const determineSubscriptionTier = async (stripe: Stripe, subscription: Stripe.Subscription) => {
  const priceId = subscription.items.data[0].price.id;
  const price = await stripe.prices.retrieve(priceId);
  const amount = price.unit_amount || 0;
  
  let tier;
  if (amount <= 999) {
    tier = "basic";
  } else if (amount <= 1999) {
    tier = "pro";
  } else {
    tier = "enterprise";
  }
  
  logStep("Determined subscription tier", { priceId, amount, tier });
  return tier;
};

// Update subscriber record in database
const updateSubscriberRecord = async (
  supabaseClient: any,
  user: any,
  customer: Stripe.Customer | null,
  subscription: Stripe.Subscription | null,
  subscriptionTier: string | null
) => {
  const subscriptionEnd = subscription 
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null;
    
  const subscriberData = {
    email: user.email,
    user_id: user.id,
    stripe_customer_id: customer?.id || null,
    subscribed: !!subscription,
    subscription_tier: subscriptionTier,
    subscription_end: subscriptionEnd,
    updated_at: new Date().toISOString(),
  };
  
  await supabaseClient
    .from("subscribers")
    .upsert(subscriberData, { onConflict: 'email' });
    
  logStep("Updated database with subscription info", { 
    subscribed: !!subscription, 
    subscriptionTier 
  });
  
  return {
    subscribed: !!subscription,
    subscription_tier: subscriptionTier,
    subscription_end: subscriptionEnd
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    // Validate environment
    const { stripeKey, supabaseUrl, serviceRoleKey } = validateEnvironment();
    logStep("Environment validated");

    // Initialize clients
    const supabaseClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false }
    });
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Authenticate user
    const user = await authenticateUser(req.headers.get("Authorization"), supabaseClient);

    // Find Stripe customer
    const customer = await findStripeCustomer(stripe, user.email);
    
    if (!customer) {
      // No customer found, update as unsubscribed
      const result = await updateSubscriberRecord(supabaseClient, user, null, null, null);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Get active subscription
    const subscription = await getActiveSubscription(stripe, customer.id);
    
    let subscriptionTier = null;
    if (subscription) {
      subscriptionTier = await determineSubscriptionTier(stripe, subscription);
    }

    // Update database and return result
    const result = await updateSubscriberRecord(
      supabaseClient, 
      user, 
      customer, 
      subscription, 
      subscriptionTier
    );
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
