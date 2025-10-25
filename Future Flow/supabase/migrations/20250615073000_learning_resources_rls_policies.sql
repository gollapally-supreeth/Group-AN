
-- Enable RLS on learning_resources table (if not already enabled)
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to learning resources
CREATE POLICY "Allow public read access to learning resources" ON public.learning_resources
    FOR SELECT USING (true);

-- Policy to allow service role to insert learning resources (for edge functions)
CREATE POLICY "Allow service role to insert learning resources" ON public.learning_resources
    FOR INSERT WITH CHECK (true);

-- Policy to allow service role to update learning resources
CREATE POLICY "Allow service role to update learning resources" ON public.learning_resources
    FOR UPDATE USING (true);

-- Policy to allow service role to delete learning resources
CREATE POLICY "Allow service role to delete learning resources" ON public.learning_resources
    FOR DELETE USING (true);
