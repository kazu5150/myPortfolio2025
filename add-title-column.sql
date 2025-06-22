-- Add title column to learning_records table
ALTER TABLE learning_records 
ADD COLUMN IF NOT EXISTS title VARCHAR(255);

-- Update existing records with default titles
UPDATE learning_records 
SET title = CASE 
  WHEN technologies @> ARRAY['Next.js'] THEN 'Next.js学習'
  WHEN technologies @> ARRAY['Tailwind CSS'] THEN 'Tailwind CSS学習'
  WHEN technologies @> ARRAY['API'] THEN 'API開発学習'
  WHEN technologies @> ARRAY['React'] THEN 'React学習'
  ELSE 'プログラミング学習'
END
WHERE title IS NULL;

-- Make title column NOT NULL after updating existing records
ALTER TABLE learning_records 
ALTER COLUMN title SET NOT NULL;