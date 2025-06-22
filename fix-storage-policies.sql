-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;

-- Create new policies that allow anonymous uploads (for development)
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'learning-records');

CREATE POLICY "Anyone can upload to learning-records" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'learning-records');

CREATE POLICY "Anyone can delete from learning-records" ON storage.objects FOR DELETE 
USING (bucket_id = 'learning-records');