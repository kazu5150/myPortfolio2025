-- ===============================================
-- Development Environment Setup
-- ===============================================
-- Note: This file contains development-only policies
-- DO NOT use in production without proper authentication

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Public experimental projects are viewable by everyone" ON experimental_projects;
DROP POLICY IF EXISTS "Users can create their own experimental projects" ON experimental_projects;
DROP POLICY IF EXISTS "Users can update their own experimental projects" ON experimental_projects;
DROP POLICY IF EXISTS "Users can delete their own experimental projects" ON experimental_projects;

-- 開発用のRLSポリシー（認証なしでテスト可能）
CREATE POLICY "Anyone can view public experimental projects" ON experimental_projects
  FOR SELECT USING (is_public = true);

CREATE POLICY "Anyone can create experimental projects" ON experimental_projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update experimental projects" ON experimental_projects
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete experimental projects" ON experimental_projects
  FOR DELETE USING (true);

-- 学習記録も開発用に緩いポリシーを設定
DROP POLICY IF EXISTS "Users can view own learning records" ON learning_records;
DROP POLICY IF EXISTS "Users can create own learning records" ON learning_records;
DROP POLICY IF EXISTS "Users can update own learning records" ON learning_records;
DROP POLICY IF EXISTS "Users can delete own learning records" ON learning_records;

CREATE POLICY "Anyone can manage learning records (dev)" ON learning_records
  FOR ALL USING (true);

-- 注意: 本番環境では以下のコマンドでRLSを再設定してください
-- ALTER TABLE experimental_projects DISABLE ROW LEVEL SECURITY;
-- または適切な認証ベースのポリシーに変更