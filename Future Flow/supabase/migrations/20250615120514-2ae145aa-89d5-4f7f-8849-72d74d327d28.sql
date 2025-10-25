
-- Add missing Razorpay columns to subscribers table
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS razorpay_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_plan_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_customer_id TEXT;

-- Create index for faster Razorpay subscription lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_razorpay_subscription_id 
ON public.subscribers(razorpay_subscription_id);

-- Update your subscription to Pro again and ensure it stays
UPDATE public.subscribers 
SET 
  subscribed = true,
  subscription_tier = 'pro',
  subscription_end = (NOW() + INTERVAL '1 year'),
  updated_at = NOW()
WHERE user_id = (
  SELECT id 
  FROM auth.users 
  WHERE email = (
    SELECT email 
    FROM public.subscribers 
    WHERE user_id IS NOT NULL 
    LIMIT 1
  )
);
