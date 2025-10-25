
-- Create a table to store generated roadmaps
CREATE TABLE public.roadmaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  skill_name TEXT NOT NULL,
  current_level TEXT NOT NULL,
  time_commitment TEXT NOT NULL,
  learning_style TEXT,
  end_goal TEXT,
  generated_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own roadmaps
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own roadmaps
CREATE POLICY "Users can view their own roadmaps" 
  ON public.roadmaps 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own roadmaps
CREATE POLICY "Users can create their own roadmaps" 
  ON public.roadmaps 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own roadmaps
CREATE POLICY "Users can update their own roadmaps" 
  ON public.roadmaps 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own roadmaps
CREATE POLICY "Users can delete their own roadmaps" 
  ON public.roadmaps 
  FOR DELETE 
  USING (auth.uid() = user_id);
