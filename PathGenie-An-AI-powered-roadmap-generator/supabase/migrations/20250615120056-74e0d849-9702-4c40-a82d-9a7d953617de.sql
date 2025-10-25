
-- Update the subscriber record to Pro status for immediate access
UPDATE public.subscribers 
SET 
  subscribed = true,
  subscription_tier = 'pro',
  subscription_end = (NOW() + INTERVAL '1 month'),
  updated_at = NOW()
WHERE email = (
  SELECT email 
  FROM auth.users 
  WHERE id = auth.uid()
);

-- If no record exists, insert a new Pro subscription record
INSERT INTO public.subscribers (
  user_id,
  email, 
  subscribed, 
  subscription_tier, 
  subscription_end,
  updated_at
)
SELECT 
  auth.uid(),
  email,
  true,
  'pro',
  (NOW() + INTERVAL '1 month'),
  NOW()
FROM auth.users 
WHERE id = auth.uid()
AND NOT EXISTS (
  SELECT 1 FROM public.subscribers 
  WHERE email = auth.users.email
);
