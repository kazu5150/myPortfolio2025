-- Create storage bucket for learning record images
INSERT INTO storage.buckets (id, name, public)
VALUES ('learning-records', 'learning-records', true);

-- Set up RLS policy for the bucket (allow public access for reading)
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'learning-records');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'learning-records' AND auth.role() = 'authenticated');

-- Allow users to delete their own images
CREATE POLICY "Users can delete own images" ON storage.objects FOR DELETE 
USING (bucket_id = 'learning-records' AND auth.role() = 'authenticated');