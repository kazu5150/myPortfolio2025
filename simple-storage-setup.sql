-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to learning-records" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete from learning-records" ON storage.objects;

-- Create simple policies for learning-records bucket
CREATE POLICY "Allow all operations on learning-records bucket" ON storage.objects
FOR ALL USING (bucket_id = 'learning-records');

-- Alternative: If the above doesn't work, disable RLS for testing
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;