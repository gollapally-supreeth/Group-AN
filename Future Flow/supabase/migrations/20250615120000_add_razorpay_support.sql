
-- Add Razorpay-specific columns to subscribers table
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS razorpay_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_plan_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_customer_id TEXT;

-- Update existing Stripe columns to be nullable since we're switching to Razorpay
ALTER TABLE public.subscribers 
ALTER COLUMN stripe_customer_id DROP NOT NULL;

-- Create index for faster Razorpay subscription lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_razorpay_subscription_id 
ON public.subscribers(razorpay_subscription_id);

-- Add comments for clarity
COMMENT ON COLUMN public.subscribers.razorpay_subscription_id IS 'Razorpay subscription ID';
COMMENT ON COLUMN public.subscribers.razorpay_plan_id IS 'Razorpay plan ID';
COMMENT ON COLUMN public.subscribers.razorpay_customer_id IS 'Razorpay customer ID';
