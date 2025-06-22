-- 外部キー制約を一時的に削除（開発用）
ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_user_id_fkey;
ALTER TABLE learning_records DROP CONSTRAINT IF EXISTS learning_records_user_id_fkey;
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_user_id_fkey;
ALTER TABLE skills DROP CONSTRAINT IF EXISTS skills_user_id_fkey;