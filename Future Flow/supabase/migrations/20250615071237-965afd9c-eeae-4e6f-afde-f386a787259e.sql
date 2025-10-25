
-- Create table for storing learning resources
CREATE TABLE public.learning_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('reading', 'video', 'interactive', 'audio', 'visual')),
  source TEXT NOT NULL, -- github, mdn, youtube, etc
  description TEXT,
  quality_score INTEGER DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 5),
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_time_minutes INTEGER DEFAULT 0,
  tags TEXT[], -- array of tags
  metadata JSONB DEFAULT '{}', -- store additional data like github stars, last updated, etc
  is_official BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user resource preferences and progress
CREATE TABLE public.user_resource_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  resource_id UUID REFERENCES public.learning_resources(id) NOT NULL,
  roadmap_id UUID REFERENCES public.roadmaps(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'bookmarked', 'skipped')),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, resource_id)
);

-- Create table for tracking user learning format preferences
CREATE TABLE public.user_learning_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  preferred_formats TEXT[] DEFAULT ARRAY['reading', 'video', 'interactive'], -- ordered by preference
  learning_style TEXT DEFAULT 'mixed' CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic', 'mixed')),
  difficulty_preference TEXT DEFAULT 'progressive' CHECK (difficulty_preference IN ('easy', 'progressive', 'challenging')),
  time_preference TEXT DEFAULT 'medium' CHECK (time_preference IN ('short', 'medium', 'long')),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Add RLS policies for learning_resources (public read, admin write for now)
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view learning resources" 
  ON public.learning_resources 
  FOR SELECT 
  USING (true);

-- Add RLS policies for user_resource_progress
ALTER TABLE public.user_resource_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own resource progress" 
  ON public.user_resource_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own resource progress" 
  ON public.user_resource_progress 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Add RLS policies for user_learning_preferences
ALTER TABLE public.user_learning_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own learning preferences" 
  ON public.user_learning_preferences 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own learning preferences" 
  ON public.user_learning_preferences 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_learning_resources_task_id ON public.learning_resources(task_id);
CREATE INDEX idx_learning_resources_skill_name ON public.learning_resources(skill_name);
CREATE INDEX idx_learning_resources_type ON public.learning_resources(resource_type);
CREATE INDEX idx_user_resource_progress_user_roadmap ON public.user_resource_progress(user_id, roadmap_id);
CREATE INDEX idx_user_resource_progress_status ON public.user_resource_progress(status);
