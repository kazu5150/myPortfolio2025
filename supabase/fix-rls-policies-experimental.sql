-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Public experimental projects are viewable by everyone" ON experimental_projects;
DROP POLICY IF EXISTS "Users can create their own experimental projects" ON experimental_projects;
DROP POLICY IF EXISTS "Users can update their own experimental projects" ON experimental_projects;
DROP POLICY IF EXISTS "Users can delete their own experimental projects" ON experimental_projects;

-- 一時的に全てのユーザーに対してすべての操作を許可（開発用）
-- 本番環境では適切な認証システムを実装してください

-- 誰でも公開プロジェクトを閲覧可能
CREATE POLICY "Anyone can view public experimental projects" ON experimental_projects
  FOR SELECT USING (is_public = true);

-- 誰でも自分のユーザーIDでプロジェクトを作成可能（開発用）
CREATE POLICY "Anyone can create experimental projects" ON experimental_projects
  FOR INSERT WITH CHECK (true);

-- 誰でも自分のユーザーIDのプロジェクトを更新可能（開発用）
CREATE POLICY "Anyone can update experimental projects" ON experimental_projects
  FOR UPDATE USING (true);

-- 誰でも自分のユーザーIDのプロジェクトを削除可能（開発用）
CREATE POLICY "Anyone can delete experimental projects" ON experimental_projects
  FOR DELETE USING (true);

-- または、RLSを一時的に無効化する場合（開発環境のみ推奨）
-- ALTER TABLE experimental_projects DISABLE ROW LEVEL SECURITY;