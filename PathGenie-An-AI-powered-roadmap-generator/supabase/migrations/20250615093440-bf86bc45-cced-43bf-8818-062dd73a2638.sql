
-- Create API usage tracking table
CREATE TABLE public.api_usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  api_type TEXT NOT NULL, -- 'gemini', 'youtube'
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, api_type, date)
);

-- Create subscribers table for subscription management
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create roadmap cache table to reduce API calls
CREATE TABLE public.roadmap_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_name TEXT NOT NULL,
  level TEXT NOT NULL,
  time_commitment TEXT NOT NULL,
  cache_key TEXT UNIQUE NOT NULL,
  cached_data JSONB NOT NULL,
  access_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create YouTube video cache
CREATE TABLE public.youtube_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_query TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  video_data JSONB NOT NULL,
  access_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(search_query, skill_name)
);

-- Enable RLS
ALTER TABLE public.api_usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies for api_usage_tracking
CREATE POLICY "Users can view their own API usage" ON public.api_usage_tracking
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Insert API usage" ON public.api_usage_tracking
FOR INSERT WITH CHECK (true);

CREATE POLICY "Update API usage" ON public.api_usage_tracking
FOR UPDATE USING (true);

-- RLS Policies for subscribers
CREATE POLICY "Users can view their own subscription" ON public.subscribers
FOR SELECT USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Update subscription" ON public.subscribers
FOR UPDATE USING (true);

CREATE POLICY "Insert subscription" ON public.subscribers
FOR INSERT WITH CHECK (true);

-- RLS Policies for caches (read-only for users, managed by edge functions)
CREATE POLICY "Anyone can read roadmap cache" ON public.roadmap_cache
FOR SELECT USING (true);

CREATE POLICY "Edge functions can manage roadmap cache" ON public.roadmap_cache
FOR ALL USING (true);

CREATE POLICY "Anyone can read YouTube cache" ON public.youtube_cache
FOR SELECT USING (true);

CREATE POLICY "Edge functions can manage YouTube cache" ON public.youtube_cache
FOR ALL USING (true);
