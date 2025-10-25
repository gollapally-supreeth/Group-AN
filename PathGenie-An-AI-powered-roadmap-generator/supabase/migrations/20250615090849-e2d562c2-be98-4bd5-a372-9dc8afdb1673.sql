
-- Add roadmap_id column to learning_resources table
ALTER TABLE public.learning_resources 
ADD COLUMN roadmap_id UUID REFERENCES public.roadmaps(id);

-- Create index for better performance
CREATE INDEX idx_learning_resources_roadmap_id ON public.learning_resources(roadmap_id);
