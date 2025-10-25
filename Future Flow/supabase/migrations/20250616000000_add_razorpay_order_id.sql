-- Add Razorpay payment tracking columns to subscribers table
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
ADD COLUMN IF NOT EXISTS order_paid BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS invoice_paid BOOLEAN DEFAULT false;

-- Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_razorpay_order_id 
ON public.subscribers(razorpay_order_id);

CREATE INDEX IF NOT EXISTS idx_subscribers_razorpay_payment_id 
ON public.subscribers(razorpay_payment_id);

-- Add comments for clarity
COMMENT ON COLUMN public.subscribers.razorpay_order_id IS 'Razorpay order ID for checkout tracking';
COMMENT ON COLUMN public.subscribers.razorpay_payment_id IS 'Razorpay payment ID for payment tracking';
COMMENT ON COLUMN public.subscribers.order_paid IS 'Flag indicating if the Razorpay order has been paid';
COMMENT ON COLUMN public.subscribers.invoice_paid IS 'Flag indicating if the Razorpay invoice has been paid';
