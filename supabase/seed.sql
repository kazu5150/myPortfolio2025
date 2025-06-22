-- サンプルデータの挿入（開発環境用）
-- 注意: 実際のプロダクションでは、適切なuser_idを使用してください

-- 一時的にRLSを無効化してサンプルデータを挿入
ALTER TABLE skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE learning_records DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- サンプルスキルデータ（user_idなしで挿入し、後で一意のIDを生成）
INSERT INTO skills (id, name, level, category, user_id) VALUES
  (gen_random_uuid(), 'JavaScript/TypeScript', 85, 'Frontend', gen_random_uuid()),
  (gen_random_uuid(), 'React/Next.js', 80, 'Frontend', gen_random_uuid()),
  (gen_random_uuid(), 'Python', 75, 'Backend', gen_random_uuid()),
  (gen_random_uuid(), 'AI/ML', 70, 'AI', gen_random_uuid()),
  (gen_random_uuid(), 'Node.js', 75, 'Backend', gen_random_uuid()),
  (gen_random_uuid(), 'PostgreSQL', 70, 'Database', gen_random_uuid()),
  (gen_random_uuid(), 'Tailwind CSS', 85, 'Frontend', gen_random_uuid()),
  (gen_random_uuid(), 'Supabase', 75, 'Backend', gen_random_uuid());

-- サンプル学習記録データ
INSERT INTO learning_records (id, title, description, category, duration, technologies, date, user_id) VALUES
  (
    gen_random_uuid(),
    'Next.js 14 App Router学習',
    'Next.js 14の新機能App Routerについて学習し、実際のプロジェクトに適用する方法を習得',
    'Frontend',
    180,
    ARRAY['Next.js', 'React', 'TypeScript'],
    '2024-01-15',
    gen_random_uuid()
  ),
  (
    gen_random_uuid(),
    'Supabase Authentication実装',
    'Supabaseの認証機能を使用してユーザー登録・ログイン機能を実装',
    'Backend',
    120,
    ARRAY['Supabase', 'PostgreSQL', 'Auth'],
    '2024-01-14',
    gen_random_uuid()
  ),
  (
    gen_random_uuid(),
    'AI Prompt Engineering基礎',
    'ChatGPTとClaudeを使用したプロンプトエンジニアリングの基礎を学習',
    'AI',
    90,
    ARRAY['ChatGPT', 'Claude', 'Prompt Design'],
    '2024-01-13',
    gen_random_uuid()
  ),
  (
    gen_random_uuid(),
    'Framer Motion アニメーション',
    'React向けアニメーションライブラリFramer Motionの使用方法を学習',
    'Frontend',
    150,
    ARRAY['Framer Motion', 'React', 'Animation'],
    '2024-01-12',
    gen_random_uuid()
  );

-- サンプルプロジェクトデータ
INSERT INTO projects (id, title, description, technologies, live_url, github_url, featured, published_at, user_id) VALUES
  (
    gen_random_uuid(),
    'AI学習記録ダッシュボード',
    '日々の学習を可視化し、進捗を追跡するWebアプリケーション。Chart.js を使用したグラフ表示と、学習データの分析機能を実装。',
    ARRAY['Next.js', 'TypeScript', 'Chart.js', 'Supabase', 'Tailwind CSS'],
    'https://learning-dashboard.vercel.app',
    'https://github.com/username/learning-dashboard',
    true,
    NOW(),
    gen_random_uuid()
  ),
  (
    gen_random_uuid(),
    'AIチャットボット',
    'OpenAI API を活用したインテリジェントなチャットボット。コンテキストを理解し、自然な対話を実現。',
    ARRAY['React', 'Node.js', 'OpenAI API', 'Socket.io', 'MongoDB'],
    'https://ai-chatbot-demo.vercel.app',
    'https://github.com/username/ai-chatbot',
    true,
    NOW(),
    gen_random_uuid()
  ),
  (
    gen_random_uuid(),
    'ポートフォリオサイト',
    '現在ご覧いただいているサイト。ダークテーマとグラスモーフィズムを採用したモダンなデザイン。',
    ARRAY['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
    'https://portfolio.vercel.app',
    'https://github.com/username/portfolio',
    false,
    NOW(),
    gen_random_uuid()
  );

-- サンプルブログ記事データ
INSERT INTO blog_posts (id, title, content, excerpt, slug, tags, published, published_at, user_id) VALUES
  (
    gen_random_uuid(),
    'Next.js 14 App Routerで学ぶモダンWeb開発',
    '# Next.js 14 App Routerの魅力\n\nNext.js 14の新機能App Routerについて詳しく解説します...',
    'Next.js 14の新機能App Routerを使用して、モダンなWebアプリケーションを構築する方法を詳しく解説します。',
    'nextjs-14-app-router',
    ARRAY['Next.js', 'React', 'Web Development'],
    true,
    NOW(),
    gen_random_uuid()
  ),
  (
    gen_random_uuid(),
    'AIを活用した効率的なプログラミング学習法',
    '# AIツールを使った学習法\n\nChatGPTやClaude等のAIツールを効果的に活用する方法...',
    'ChatGPTやClaude等のAIツールを使って、プログラミング学習を効率化する具体的な方法とコツを紹介します。',
    'ai-programming-learning',
    ARRAY['AI', 'Learning', 'Programming'],
    true,
    NOW(),
    gen_random_uuid()
  ),
  (
    gen_random_uuid(),
    'Supabaseで構築するリアルタイムアプリケーション',
    '# Supabaseリアルタイム機能\n\nSupabaseのリアルタイム機能について詳しく解説...',
    'Supabaseのリアルタイム機能を使用して、チャットアプリやコラボレーションツールを構築する方法を解説します。',
    'supabase-realtime-app',
    ARRAY['Supabase', 'Real-time', 'Database'],
    true,
    NOW(),
    gen_random_uuid()
  );

-- RLSを再度有効化
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- サンプルお問い合わせデータ
INSERT INTO contact_messages (name, email, subject, message, status) VALUES
  (
    '山田太郎',
    'yamada@example.com',
    'Webアプリケーション開発のご相談',
    'ECサイトの開発についてご相談があります。予算は100万円程度を想定しており、3ヶ月程度での完成を希望しています。',
    'unread'
  ),
  (
    '佐藤花子',
    'sato@example.com',
    'AI機能の実装について',
    '既存のWebサイトにAIチャットボット機能を追加したいと考えています。実装可能でしょうか？',
    'read'
  ),
  (
    '田中一郎',
    'tanaka@example.com',
    'プロトタイプ開発のお見積り',
    '新しいサービスのプロトタイプ開発をお願いしたいと思います。詳細についてお打ち合わせできればと思います。',
    'replied'
  );