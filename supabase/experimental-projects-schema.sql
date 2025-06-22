-- 実験的プロジェクトテーブル
CREATE TABLE experimental_projects (
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

-- 更新時にupdated_atを自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_experimental_projects_updated_at 
  BEFORE UPDATE ON experimental_projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLSポリシー
ALTER TABLE experimental_projects ENABLE ROW LEVEL SECURITY;

-- 公開プロジェクトは誰でも閲覧可能
CREATE POLICY "Public experimental projects are viewable by everyone" ON experimental_projects
  FOR SELECT USING (is_public = true);

-- ユーザーは自分のプロジェクトを作成・更新・削除可能
CREATE POLICY "Users can create their own experimental projects" ON experimental_projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own experimental projects" ON experimental_projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own experimental projects" ON experimental_projects
  FOR DELETE USING (auth.uid() = user_id);

-- インデックス
CREATE INDEX idx_experimental_projects_user_id ON experimental_projects(user_id);
CREATE INDEX idx_experimental_projects_status ON experimental_projects(status);
CREATE INDEX idx_experimental_projects_category ON experimental_projects(category);
CREATE INDEX idx_experimental_projects_is_public ON experimental_projects(is_public);
CREATE INDEX idx_experimental_projects_last_updated ON experimental_projects(last_updated DESC);

-- サンプルデータ（開発用）
INSERT INTO experimental_projects (
  user_id,
  title,
  description,
  short_description,
  status,
  category,
  technologies,
  start_date,
  github_url,
  demo_url,
  learning_goals,
  challenges,
  progress
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  'AI チャットボット with RAG',
  'Retrieval-Augmented Generation (RAG) を使用したAIチャットボットの実験。独自のドキュメントを学習させて、専門的な質問に答えられるようにする。',
  'RAGを使用したAIチャットボット実験',
  'developing',
  'ai',
  ARRAY['Python', 'LangChain', 'OpenAI API', 'Pinecone', 'FastAPI'],
  '2025-06-15',
  'https://github.com/example/ai-chatbot',
  NULL,
  ARRAY['RAGの仕組みを理解', 'ベクトルDBの活用', 'プロンプトエンジニアリング'],
  ARRAY['トークン数の最適化', 'レスポンス速度の改善'],
  65
),
(
  '11111111-1111-1111-1111-111111111111',
  'リアルタイム協同編集エディタ',
  'WebSocketを使用したリアルタイム協同編集機能を持つコードエディタ。複数人で同時に編集できる。',
  'WebSocketベースの協同編集エディタ',
  'testing',
  'web',
  ARRAY['React', 'Socket.io', 'Monaco Editor', 'Node.js', 'Redis'],
  '2025-06-01',
  'https://github.com/example/collab-editor',
  'https://demo.example.com',
  ARRAY['WebSocketの実装', 'CRDT理論の理解', 'スケーラブルな設計'],
  ARRAY['同期の遅延問題', 'コンフリクト解決'],
  80
),
(
  '11111111-1111-1111-1111-111111111111',
  'モバイル習慣トラッカー',
  'React Nativeで作る習慣追跡アプリ。通知機能とデータ可視化を実装。',
  'React Native習慣追跡アプリ',
  'developing',
  'mobile',
  ARRAY['React Native', 'Expo', 'TypeScript', 'SQLite'],
  '2025-06-10',
  NULL,
  NULL,
  ARRAY['React Nativeの基礎', 'ローカルストレージ', 'プッシュ通知'],
  ARRAY['クロスプラットフォーム対応', 'パフォーマンス最適化'],
  45
),
(
  '11111111-1111-1111-1111-111111111111',
  'ブロックチェーン投票システム',
  'Ethereumスマートコントラクトを使用した透明性の高い投票システムのプロトタイプ。',
  'スマートコントラクト投票システム',
  'planning',
  'web',
  ARRAY['Solidity', 'Web3.js', 'Hardhat', 'React', 'MetaMask'],
  '2025-06-18',
  'https://github.com/example/blockchain-voting',
  NULL,
  ARRAY['スマートコントラクト開発', 'Web3統合', 'ガス最適化'],
  ARRAY['セキュリティ監査', 'ユーザビリティ'],
  15
);