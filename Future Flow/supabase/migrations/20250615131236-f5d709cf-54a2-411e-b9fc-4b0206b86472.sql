
-- Add RLS policy to allow Pro users to view all public roadmaps
CREATE POLICY "Pro users can view all public roadmaps" 
  ON public.roadmaps 
  FOR SELECT 
  USING (
    is_public = true OR 
    auth.uid() = user_id
  );

-- Update the existing policy to be more specific
DROP POLICY IF EXISTS "Users can view their own roadmaps" ON public.roadmaps;

-- Create a more comprehensive policy that handles both private and public access
CREATE POLICY "Users can view accessible roadmaps" 
  ON public.roadmaps 
  FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    (is_public = true)
  );
