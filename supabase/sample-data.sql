-- ===============================================
-- Sample Data for Development
-- ===============================================

-- 実験的プロジェクトのサンプルデータ
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

-- 学習記録のサンプルデータ
INSERT INTO learning_records (
  user_id,
  title,
  description,
  category,
  duration,
  technologies,
  date
) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Next.js App Router学習',
  'App Routerの基本的な使い方とファイルベースルーティングについて学習',
  'web-development',
  120,
  ARRAY['Next.js', 'React', 'TypeScript'],
  '2025-06-20'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Supabase RLS設定',
  'Row Level Securityポリシーの設定と管理について学習',
  'database',
  90,
  ARRAY['Supabase', 'PostgreSQL', 'SQL'],
  '2025-06-19'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Tailwind CSS実践',
  'レスポンシブデザインとコンポーネント設計の実践',
  'ui-design',
  150,
  ARRAY['Tailwind CSS', 'CSS', 'Design'],
  '2025-06-18'
);