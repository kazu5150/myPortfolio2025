-- Add image column to learning_records table
ALTER TABLE learning_records 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add images array column for multiple images (optional - for future use)
-- ALTER TABLE learning_records 
-- ADD COLUMN IF NOT EXISTS images TEXT[];