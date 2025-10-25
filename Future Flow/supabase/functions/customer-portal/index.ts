
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
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

// Authenticate user
const authenticateUser = async (authHeader: string | null, supabaseClient: any) => {
  if (!authHeader) throw new Error("No authorization header provided");
  
  const token = authHeader.replace("Bearer ", "");
  const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
  
  if (userError) throw new Error(`Authentication error: ${userError.message}`);
  
  const user = userData.user;
  if (!user?.email) throw new Error("User not authenticated or email not available");
  
  logStep("User authenticated", { userId: user.id, email: user.email });
  return user;
};

// Find Stripe customer
const findStripeCustomer = async (stripe: Stripe, email: string) => {
  const customers = await stripe.customers.list({ email, limit: 1 });
  
  if (customers.data.length === 0) {
    throw new Error("No Stripe customer found for this user");
  }
  
  const customer = customers.data[0];
  logStep("Found Stripe customer", { customerId: customer.id });
  return customer;
};

// Create billing portal session
const createPortalSession = async (stripe: Stripe, customerId: string, returnUrl: string) => {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  
  logStep("Customer portal session created", { 
    sessionId: portalSession.id, 
    url: portalSession.url 
  });
  
  return portalSession;
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

    // Create portal session
    const origin = req.headers.get("origin") || "https://your-domain.com";
    const returnUrl = `${origin}/pricing`;
    const portalSession = await createPortalSession(stripe, customer.id, returnUrl);

    return new Response(
      JSON.stringify({ url: portalSession.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in customer-portal", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
