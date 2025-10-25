
-- Add missing columns to existing subscribers table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'subscribers' AND column_name = 'subscription_tier') THEN
        ALTER TABLE public.subscribers ADD COLUMN subscription_tier TEXT DEFAULT 'free';
    END IF;
END $$;

-- Add sharing columns to roadmaps table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'roadmaps' AND column_name = 'is_public') THEN
        ALTER TABLE public.roadmaps ADD COLUMN is_public BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'roadmaps' AND column_name = 'shared_at') THEN
        ALTER TABLE public.roadmaps ADD COLUMN shared_at TIMESTAMPTZ;
    END IF;
END $$;

-- Create RLS policies for roadmaps if they don't exist
DO $$ 
BEGIN
    -- Enable RLS on roadmaps
    ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policies if they exist to avoid conflicts
    DROP POLICY IF EXISTS "select_own_roadmaps" ON public.roadmaps;
    DROP POLICY IF EXISTS "select_public_roadmaps" ON public.roadmaps;
    DROP POLICY IF EXISTS "insert_own_roadmaps" ON public.roadmaps;
    DROP POLICY IF EXISTS "update_own_roadmaps" ON public.roadmaps;
    DROP POLICY IF EXISTS "delete_own_roadmaps" ON public.roadmaps;
    
    -- Create new policies
    CREATE POLICY "select_own_roadmaps" ON public.roadmaps
      FOR SELECT
      USING (user_id = auth.uid());

    -- Pro users can view public roadmaps from other users
    CREATE POLICY "select_public_roadmaps" ON public.roadmaps
      FOR SELECT
      USING (
        is_public = true AND 
        EXISTS (
          SELECT 1 FROM public.subscribers 
          WHERE user_id = auth.uid() 
          AND subscribed = true 
          AND subscription_tier = 'pro'
        )
      );

    -- Users can insert their own roadmaps
    CREATE POLICY "insert_own_roadmaps" ON public.roadmaps
      FOR INSERT
      WITH CHECK (user_id = auth.uid());

    -- Users can update their own roadmaps
    CREATE POLICY "update_own_roadmaps" ON public.roadmaps
      FOR UPDATE
      USING (user_id = auth.uid());

    -- Users can delete their own roadmaps
    CREATE POLICY "delete_own_roadmaps" ON public.roadmaps
      FOR DELETE
      USING (user_id = auth.uid());
      
EXCEPTION WHEN OTHERS THEN
    -- Ignore errors if policies already exist
    NULL;
END $$;
