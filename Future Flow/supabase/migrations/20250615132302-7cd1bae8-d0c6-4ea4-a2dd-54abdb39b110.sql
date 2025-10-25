
-- Update all existing roadmaps to be public
UPDATE public.roadmaps SET is_public = true WHERE is_public = false OR is_public IS NULL;

-- Change the default value for new roadmaps to be public
ALTER TABLE public.roadmaps ALTER COLUMN is_public SET DEFAULT true;
