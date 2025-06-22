-- ダミーユーザー用のINSERT/UPDATE/DELETE ポリシーを追加

-- 既存のポリシーを削除してから新しいポリシーを作成
DROP POLICY IF EXISTS "Allow sample data insert for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow sample data update for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow sample data delete for blog_posts" ON blog_posts;

DROP POLICY IF EXISTS "Allow sample data insert for projects" ON projects;
DROP POLICY IF EXISTS "Allow sample data update for projects" ON projects;
DROP POLICY IF EXISTS "Allow sample data delete for projects" ON projects;

DROP POLICY IF EXISTS "Allow sample data insert for learning_records" ON learning_records;
DROP POLICY IF EXISTS "Allow sample data update for learning_records" ON learning_records;
DROP POLICY IF EXISTS "Allow sample data delete for learning_records" ON learning_records;

DROP POLICY IF EXISTS "Allow sample data insert for skills" ON skills;
DROP POLICY IF EXISTS "Allow sample data update for skills" ON skills;
DROP POLICY IF EXISTS "Allow sample data delete for skills" ON skills;

-- ブログ記事のサンプルデータ用ポリシー
CREATE POLICY "Allow sample data insert for blog_posts" ON blog_posts
  FOR INSERT WITH CHECK (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data update for blog_posts" ON blog_posts
  FOR UPDATE USING (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data delete for blog_posts" ON blog_posts
  FOR DELETE USING (user_id = '11111111-1111-1111-1111-111111111111');

-- プロジェクトのサンプルデータ用ポリシー
CREATE POLICY "Allow sample data insert for projects" ON projects
  FOR INSERT WITH CHECK (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data update for projects" ON projects
  FOR UPDATE USING (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data delete for projects" ON projects
  FOR DELETE USING (user_id = '11111111-1111-1111-1111-111111111111');

-- 学習記録のサンプルデータ用ポリシー
CREATE POLICY "Allow sample data insert for learning_records" ON learning_records
  FOR INSERT WITH CHECK (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data update for learning_records" ON learning_records
  FOR UPDATE USING (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data delete for learning_records" ON learning_records
  FOR DELETE USING (user_id = '11111111-1111-1111-1111-111111111111');

-- スキルのサンプルデータ用ポリシー
CREATE POLICY "Allow sample data insert for skills" ON skills
  FOR INSERT WITH CHECK (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data update for skills" ON skills
  FOR UPDATE USING (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data delete for skills" ON skills
  FOR DELETE USING (user_id = '11111111-1111-1111-1111-111111111111');