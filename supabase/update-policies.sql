-- パブリック表示用のポリシーを更新

-- スキルは誰でも閲覧可能にする
DROP POLICY IF EXISTS "Anyone can view skills" ON skills;
CREATE POLICY "Anyone can view skills" ON skills
  FOR SELECT USING (true);

-- プロジェクトは公開済みのものを誰でも閲覧可能にする
DROP POLICY IF EXISTS "Anyone can view published projects" ON projects;
CREATE POLICY "Anyone can view published projects" ON projects
  FOR SELECT USING (published_at IS NOT NULL);

-- ブログ記事は公開済みのものを誰でも閲覧可能にする
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

-- お問い合わせは制限なし（パブリック投稿）
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- サンプルデータ用のダミーユーザーID向けポリシー
CREATE POLICY "Allow sample data access for skills" ON skills
  FOR ALL USING (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data access for learning_records" ON learning_records
  FOR ALL USING (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data access for projects" ON projects
  FOR ALL USING (user_id = '11111111-1111-1111-1111-111111111111');

CREATE POLICY "Allow sample data access for blog_posts" ON blog_posts
  FOR ALL USING (user_id = '11111111-1111-1111-1111-111111111111');