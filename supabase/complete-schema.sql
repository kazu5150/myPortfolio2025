-- ===============================================
-- AI Portfolio Database Schema
-- ===============================================

-- 学習記録テーブル
CREATE TABLE IF NOT EXISTS learning_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  duration INTEGER NOT NULL, -- 分単位
  technologies TEXT[] DEFAULT '{}',
  date DATE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- プロジェクトテーブル
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  technologies TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 実験的プロジェクトテーブル
CREATE TABLE IF NOT EXISTS experimental_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  status VARCHAR(20) NOT NULL CHECK (status IN ('planning', 'developing', 'testing', 'completed', 'paused')),
  category VARCHAR(20) NOT NULL CHECK (category IN ('web', 'mobile', 'ai', 'game', 'tool', 'other')),
  technologies TEXT[] DEFAULT '{}',
  start_date DATE NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  learning_goals TEXT[] DEFAULT '{}',
  challenges TEXT[] DEFAULT '{}',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- スキルテーブル
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER CHECK (level >= 1 AND level <= 100),
  category TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ブログ記事テーブル
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- お問い合わせテーブル
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================================
-- トリガー関数とトリガー
-- ===============================================

-- 更新時にupdated_atを自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 各テーブルにupdated_atトリガーを設定
CREATE TRIGGER update_learning_records_updated_at 
  BEFORE UPDATE ON learning_records 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experimental_projects_updated_at 
  BEFORE UPDATE ON experimental_projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at 
  BEFORE UPDATE ON skills 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ===============================================
-- インデックス
-- ===============================================

-- 学習記録テーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_learning_records_user_id ON learning_records(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_records_date ON learning_records(date DESC);

-- プロジェクトテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON projects(published_at DESC);

-- 実験的プロジェクトテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_experimental_projects_user_id ON experimental_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_experimental_projects_status ON experimental_projects(status);
CREATE INDEX IF NOT EXISTS idx_experimental_projects_category ON experimental_projects(category);
CREATE INDEX IF NOT EXISTS idx_experimental_projects_is_public ON experimental_projects(is_public);
CREATE INDEX IF NOT EXISTS idx_experimental_projects_last_updated ON experimental_projects(last_updated DESC);

-- スキルテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- ブログ記事テーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_blog_posts_user_id ON blog_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- お問い合わせテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- ===============================================
-- Row Level Security (RLS) ポリシー
-- ===============================================

-- 全テーブルでRLSを有効化
ALTER TABLE learning_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experimental_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 学習記録のポリシー
CREATE POLICY "Users can view own learning records" ON learning_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own learning records" ON learning_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own learning records" ON learning_records
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own learning records" ON learning_records
  FOR DELETE USING (auth.uid() = user_id);

-- プロジェクトのポリシー
CREATE POLICY "Published projects are viewable by everyone" ON projects
  FOR SELECT USING (published_at IS NOT NULL);
CREATE POLICY "Users can manage own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- 実験的プロジェクトのポリシー
CREATE POLICY "Public experimental projects are viewable by everyone" ON experimental_projects
  FOR SELECT USING (is_public = true);
CREATE POLICY "Users can create their own experimental projects" ON experimental_projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own experimental projects" ON experimental_projects
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own experimental projects" ON experimental_projects
  FOR DELETE USING (auth.uid() = user_id);

-- スキルのポリシー
CREATE POLICY "Users can view own skills" ON skills
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own skills" ON skills
  FOR ALL USING (auth.uid() = user_id);

-- ブログ記事のポリシー
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true);
CREATE POLICY "Users can manage own blog posts" ON blog_posts
  FOR ALL USING (auth.uid() = user_id);

-- お問い合わせのポリシー
CREATE POLICY "Anyone can create contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all contact messages" ON contact_messages
  FOR SELECT USING (true); -- 本番環境では管理者チェックを追加