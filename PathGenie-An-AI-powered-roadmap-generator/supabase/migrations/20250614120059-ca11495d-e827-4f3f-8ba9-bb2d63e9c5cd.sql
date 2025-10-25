
-- Add the missing timeline column to the roadmaps table
ALTER TABLE public.roadmaps 
ADD COLUMN timeline text;
