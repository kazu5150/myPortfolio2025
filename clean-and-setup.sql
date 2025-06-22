-- ステップ1: 全テーブルを削除
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS learning_records CASCADE;

-- ステップ2: テーブルを再作成（外部キー制約なし）
CREATE TABLE learning_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  duration INTEGER NOT NULL, -- 分単位
  technologies TEXT[] NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tech_stack TEXT[] NOT NULL,
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  level INTEGER CHECK (level >= 1 AND level <= 5) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ステップ3: トリガー関数を作成
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ステップ4: トリガーを設定
CREATE TRIGGER update_learning_records_updated_at BEFORE UPDATE ON learning_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ステップ5: インデックスを作成
CREATE INDEX idx_learning_records_user_id ON learning_records(user_id);
CREATE INDEX idx_learning_records_date ON learning_records(date);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_skills_user_id ON skills(user_id);
CREATE INDEX idx_blog_posts_user_id ON blog_posts(user_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- ステップ6: サンプルデータを挿入
INSERT INTO learning_records (user_id, date, duration, technologies, description) VALUES
('11111111-1111-1111-1111-111111111111', '2024-01-15', 180, ARRAY['React', 'TypeScript'], 'React hooksの学習とTypeScriptの型定義'),
('11111111-1111-1111-1111-111111111111', '2024-01-16', 240, ARRAY['Next.js', 'API'], 'Next.jsのAPI routesとSSRの実装'),
('11111111-1111-1111-1111-111111111111', '2024-01-17', 150, ARRAY['Tailwind CSS'], 'レスポンシブデザインの練習');

INSERT INTO projects (user_id, title, description, tech_stack, github_url, demo_url, featured, published_at) VALUES
('11111111-1111-1111-1111-111111111111', 'AIポートフォリオサイト', '機械学習とWeb開発のスキルを組み合わせたポートフォリオサイト', ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'], 'https://github.com/user/ai-portfolio', 'https://ai-portfolio.vercel.app', true, NOW()),
('11111111-1111-1111-1111-111111111111', 'タスク管理アプリ', 'React Hooksを使用したモダンなタスク管理アプリケーション', ARRAY['React', 'Node.js', 'PostgreSQL'], 'https://github.com/user/task-app', 'https://task-app.netlify.app', true, NOW()),
('11111111-1111-1111-1111-111111111111', 'データ可視化ダッシュボード', 'D3.jsを使用したインタラクティブなデータ可視化', ARRAY['D3.js', 'JavaScript', 'Python'], 'https://github.com/user/data-viz', NULL, false, NULL);

INSERT INTO skills (user_id, name, category, level, description) VALUES
('11111111-1111-1111-1111-111111111111', 'JavaScript', 'Programming Language', 4, 'ES6+の機能を含む現代的なJavaScript開発'),
('11111111-1111-1111-1111-111111111111', 'TypeScript', 'Programming Language', 4, '型安全なJavaScript開発'),
('11111111-1111-1111-1111-111111111111', 'React', 'Frontend Framework', 4, 'Hooks、Context APIを使用したモダンなReact開発'),
('11111111-1111-1111-1111-111111111111', 'Next.js', 'Frontend Framework', 3, 'SSR、SSG、API routesの実装経験'),
('11111111-1111-1111-1111-111111111111', 'Node.js', 'Backend Technology', 3, 'Express.jsを使用したREST API開発'),
('11111111-1111-1111-1111-111111111111', 'PostgreSQL', 'Database', 3, 'リレーショナルデータベースの設計と最適化'),
('11111111-1111-1111-1111-111111111111', 'Python', 'Programming Language', 4, 'データ分析、機械学習ライブラリの使用'),
('11111111-1111-1111-1111-111111111111', 'Git', 'Development Tool', 4, 'バージョン管理とチーム開発のワークフロー');

INSERT INTO blog_posts (user_id, title, slug, content, excerpt, tags, published, published_at) VALUES
('11111111-1111-1111-1111-111111111111', 'React Hooksの基礎から応用まで', 'react-hooks-guide', '# React Hooksの基礎から応用まで

React Hooksは関数コンポーネントでstate管理や副作用を扱うための仕組みです...', 'React Hooksの基本的な使い方から応用パターンまでを解説します。', ARRAY['React', 'JavaScript', 'Frontend'], true, NOW()),
('11111111-1111-1111-1111-111111111111', 'TypeScriptで始める型安全な開発', 'typescript-safe-development', '# TypeScriptで始める型安全な開発

TypeScriptを使用することで、JavaScriptプロジェクトに型安全性をもたらすことができます...', 'TypeScriptの基本から実践的な型定義の書き方まで。', ARRAY['TypeScript', 'JavaScript'], true, NOW()),
('11111111-1111-1111-1111-111111111111', 'Next.jsでのSSRとSSGの使い分け', 'nextjs-ssr-ssg-comparison', '# Next.jsでのSSRとSSGの使い分け

Next.jsではSSR（Server-Side Rendering）とSSG（Static Site Generation）を使い分けることで...', 'Next.jsのレンダリング手法の違いと適切な選択方法について解説。', ARRAY['Next.js', 'SSR', 'SSG'], false, NULL);

INSERT INTO contact_messages (name, email, subject, message, status) VALUES
('田中太郎', 'tanaka@example.com', 'お仕事のご相談', 'Webアプリケーション開発のお仕事をお願いしたいと思います。', 'unread'),
('佐藤花子', 'sato@example.com', '技術相談', 'React Nativeでのアプリ開発についてご相談したいことがあります。', 'read');