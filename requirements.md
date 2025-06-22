# ポートフォリオサイト要件定義書

## 1. プロジェクト概要

### 1.1 目的
- AI・プログラミング学習の記録と可視化
- 技術スキルと実績のアピール
- 副業から本業への転換を支援するプラットフォーム
- 潜在的なクライアント・雇用主との接点創出

### 1.2 ターゲットユーザー
- **プライマリ**: 潜在的なクライアント、採用担当者
- **セカンダリ**: 同業者、技術コミュニティメンバー
- **管理者**: サイト運営者（あなた）

## 2. 機能要件

### 2.1 パブリックページ（一般公開）

#### 2.1.1 トップページ
- **ヒーローセクション**
  - 自己紹介（名前、肩書き、キャッチコピー）
  - プロフィール写真
  - SNS・連絡先へのリンク
- **技術スタック概要**
  - 習得済み技術の可視化（プログレスバー/レーダーチャート）
  - 学習中技術のタイムライン
- **最新情報**
  - 直近の学習記録（3-5件）
  - 最新作品（2-3件）

#### 2.1.2 プロフィールページ
- **自己紹介**
  - 経歴、学習の動機
  - 現在の目標・将来の展望
- **スキルセット**
  - プログラミング言語（習熟度付き）
  - フレームワーク・ライブラリ
  - ツール・環境
  - AI関連技術
- **学習統計**
  - 総学習時間
  - 学習日数（連続記録など）
  - 完了プロジェクト数

#### 2.1.3 学習記録ページ
- **学習ログ一覧**
  - 日付、学習内容、使用技術、学習時間
  - カテゴリ別フィルタリング
  - 検索機能
- **学習統計ダッシュボード**
  - 月別学習時間グラフ
  - 技術別学習時間分布
  - 学習の継続性可視化
- **マイルストーン**
  - 重要な達成項目のタイムライン

#### 2.1.4 作品紹介ページ
- **ポートフォリオギャラリー**
  - 作品サムネイル一覧
  - カテゴリ別表示（Web、AI、モバイルなど）
- **個別作品詳細**
  - スクリーンショット・デモ動画
  - 技術スタック
  - 制作期間・目的
  - ライブデモリンク・GitHubリンク
  - 制作過程での学び

#### 2.1.5 ブログページ
- **技術記事**
  - 学習過程での気づき
  - 技術Tips・チュートリアル
  - プロジェクト振り返り
- **記事管理機能**
  - タグ付け、カテゴリ分類
  - 検索・フィルタリング

#### 2.1.6 お問い合わせページ
- **連絡フォーム**
  - 名前、メールアドレス、件名、本文
  - プロジェクト依頼用の詳細フォーム
- **連絡先情報**
  - メールアドレス、SNSリンク
  - 対応可能な業務範囲

### 2.2 管理者ページ（認証必須）

#### 2.2.1 認証システム
- ログイン機能（メール・パスワード）
- セッション管理
- セキュリティ対策（ブルートフォース攻撃対策）

#### 2.2.2 学習記録管理
- **記録追加・編集**
  - 日付、学習内容、カテゴリ、学習時間
  - タグ付け機能
  - 画像・リンク添付
- **一括操作**
  - CSV import/export
  - 複数記録の一括編集・削除

#### 2.2.3 作品管理
- **作品情報編集**
  - 基本情報、技術スタック、リンク
  - 画像アップロード・管理
  - 公開・非公開設定
- **SEO対策**
  - メタデータ編集
  - URL slug設定

#### 2.2.4 ブログ管理
- **記事作成・編集**
  - Markdownエディタ
  - 下書き・公開管理
  - 予約投稿機能
- **メディア管理**
  - 画像アップロード・整理
  - ファイル管理

#### 2.2.5 サイト統計・お問い合わせ管理
- **アクセス解析**
  - ページビュー、ユニークユーザー
  - 人気コンテンツ
- **お問い合わせ管理**
  - 受信メッセージ一覧
  - 返信状況管理
  - 案件依頼の進捗トラッキング

### 2.2.7 データの価値と活用
- **学習の可視化**: 努力の量と質を数値化、成長曲線をグラフ表示
- **プロフェッショナルアピール**: 実務レベル作品展示、継続学習の証明
- **ビジネス機会創出**: お問い合わせからの案件獲得、技術マッチング
- **自己分析・改善**: 学習効率分析、弱点特定、目標設定と進捗管理

#### 管理するデータの詳細

**学習記録 (learning_records)**
- 日々の学習活動を記録（学習内容、時間、使用技術）
- 例：「React Hooksの学習 - 3時間 - [React, TypeScript]」
- 活用：学習時間可視化、技術別分析、継続性トラッキング

**プロジェクト・作品 (projects)**  
- 作成したアプリケーションの詳細情報
- 例：「AITodoアプリ - [Next.js, OpenAI API] - GitHubリンク」
- 活用：ポートフォリオ展示、技術力証明、案件獲得

**技術スキル (skills)**
- 習得技術とレベル（1-100）の管理
- 例：「JavaScript: 85/100, React: 75/100」  
- 活用：スキルレーダーチャート、習熟度進捗、学習優先度決定

**ブログ記事 (blog_posts)**
- 技術記事・学習振り返りの管理
- 例：「Next.js App Router学習メモ - [Next.js, React]」
- 活用：知識アウトプット、SEO対策、専門性アピール

**お問い合わせ (contact_messages)**
- サイト訪問者からの連絡・案件依頼
- 例：「Webアプリ開発依頼 - 未返信状態」
- 活用：ビジネス機会管理、顧客対応履歴

## 3. 面白い追加機能

### 3.1 学習ゲーミフィケーション
- **アチーブメントシステム**
  - 学習継続日数、プロジェクト完成数などでバッジ獲得
  - 技術習熟度に応じたレベルアップ
- **学習ストリーク**
  - 連続学習日数の可視化
  - GitHubスタイルのコントリビューショングラフ

### 3.2 AI活用機能
- **学習内容自動分析**
  - 学習記録からスキル成長の自動分析
  - 学習効率の可視化・改善提案
- **チャットボット**
  - 訪問者の質問に自動回答
  - 作品やスキルに関する情報提供

### 3.3 インタラクティブ要素
- **スキルレーダーチャート**
  - ホバーで詳細表示
  - アニメーション付きの技術習熟度表示
- **学習タイムライン**
  - スクロール連動アニメーション
  - 重要なマイルストーンのハイライト

### 3.4 ソーシャル機能
- **学習記録共有**
  - Twitter/LinkedIn自動投稿
  - 学習内容のソーシャルカード生成
- **コメント機能**
  - 作品・記事へのフィードバック受付

## 4. 技術要件

### 4.1 技術スタック（Next.js + shadcn/UI）

#### 4.1.1 フロントエンド
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **UIライブラリ**: shadcn/ui
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **フォーム**: React Hook Form + Zod
- **状態管理**: Zustand (必要に応じて)

#### 4.1.2 バックエンド・データベース（Supabase推奨）
- **データベース**: Supabase (PostgreSQL)
- **API**: Supabase Client + Next.js API Routes
- **認証**: Supabase Auth
- **ファイルストレージ**: Supabase Storage
- **リアルタイム**: Supabase Realtime（学習記録同期）
- **ORM**: Supabase Client (または軽量Prisma Client)
- **バリデーション**: Zod

#### 4.1.3 Supabase活用メリット
- **開発速度**: 既存経験でスムーズな開発
- **統合機能**: 認証・ストレージ・リアルタイムが一体化
- **管理機能**: GUIでのデータベース管理
- **セキュリティ**: Row Level Security内蔵
- **スケーラビリティ**: 自動スケーリング対応

#### 4.1.3 ファイル・メディア管理
- **画像最適化**: Next.js Image Optimization
- **ファイルアップロード**: Uploadthing または Cloudinary
- **アイコン**: Lucide React (shadcn/ui標準)

#### 4.1.4 開発・デプロイ
- **ホスティング**: Vercel
- **データベース**: Vercel Postgres または Supabase
- **CI/CD**: Vercel自動デプロイ
- **パッケージ管理**: pnpm

#### 4.1.5 分析・監視
- **アクセス解析**: Vercel Analytics
- **エラー監視**: Sentry
- **SEO**: next-seo

### 4.2 パフォーマンス要件
- **ページ読み込み速度**: 3秒以内
- **Core Web Vitals**: 全て Good 範囲
- **SEO対応**: 全ページでSEO最適化

### 4.3 セキュリティ要件
- HTTPS必須
- CSRFトークン
- SQLインジェクション対策
- XSS対策
- レート制限

## 5. UI/UX・デザイン要件

### 5.1 デザインコンセプト
- **テーマ**: ダーク・洗練・モダン・プロフェッショナル
- **雰囲気**: 高級感のあるミニマルデザイン
- **ターゲット印象**: 技術力の高いプロフェッショナル

### 5.2 カラーパレット（ダークテーマ）

#### 5.2.1 メインカラー
- **背景**: 
  - Primary: `#0A0A0A` (ディープブラック)
  - Secondary: `#1A1A1A` (チャコールグレー)
  - Tertiary: `#2A2A2A` (ダークグレー)
- **アクセント**:
  - Primary: `#00D9FF` (サイバーブルー)
  - Secondary: `#7C3AED` (バイオレット)
  - Success: `#10B981` (エメラルドグリーン)
- **テキスト**:
  - Primary: `#FFFFFF` (ピュアホワイト)
  - Secondary: `#A1A1AA` (ライトグレー)
  - Muted: `#71717A` (ミュートグレー)

#### 5.2.2 グラデーション
- **ヒーローセクション**: `linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)`
- **カードホバー**: `linear-gradient(135deg, #00D9FF20 0%, #7C3AED20 100%)`
- **ボタン**: `linear-gradient(90deg, #00D9FF 0%, #0EA5E9 100%)`

### 5.3 タイポグラフィ
- **ヘッドライン**: Inter (モダン・可読性)
- **ボディテキスト**: Inter (統一感)
- **コード**: JetBrains Mono (プログラミングフォント)
- **アクセント**: Space Grotesk (洗練されたヘッドライン用)

### 5.4 視覚的要素

#### 5.4.1 エフェクト
- **グラスモーフィズム**: 半透明のカード背景
- **ネオモーフィズム**: 微細な影とハイライト
- **微細なアニメーション**: ホバー時の滑らかな変化
- **パーティクル効果**: ヒーローセクションの背景

#### 5.4.2 レイアウト
- **大胆な余白**: ミニマルで洗練された印象
- **非対称グリッド**: モダンなレイアウト
- **カード設計**: 浮遊感のあるシャドウ
- **境界線**: 微細なグロー効果

### 5.5 コンポーネントスタイル例

#### 5.5.1 Tailwind CSS設定
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#2A2A2A',
          100: '#1A1A1A', 
          900: '#0A0A0A'
        },
        accent: {
          blue: '#00D9FF',
          purple: '#7C3AED',
          green: '#10B981'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'display': ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 217, 255, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 16px 64px rgba(0, 217, 255, 0.15)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)'
      }
    }
  }
}
```

#### 5.5.2 shadcn/ui カスタマイズ
```css
/* globals.css */
.dark {
  --background: 10 10 10;
  --foreground: 255 255 255;
  --card: 26 26 26;
  --card-foreground: 255 255 255;
  --primary: 0 217 255;
  --primary-foreground: 10 10 10;
  --secondary: 42 42 42;
  --accent: 124 58 237;
  --border: 42 42 42;
  --ring: 0 217 255;
}

/* カスタムコンポーネントスタイル */
.glass-card {
  @apply bg-white/5 backdrop-blur-lg border border-white/10;
}

.neon-glow {
  @apply shadow-[0_0_20px_rgba(0,217,255,0.3)];
}

.gradient-text {
  @apply bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent;
}
```

### 5.6 インタラクション・アニメーション

#### 5.6.1 Framer Motion設定
- **ページ遷移**: スムーズなフェードイン/アウト
- **スクロールアニメーション**: 要素の段階的な表示
- **ホバーエフェクト**: 微細な拡大・グロー効果
- **ローディング**: エレガントなスケルトン

#### 5.6.2 マイクロインタラクション
- **ボタンホバー**: グラデーション変化 + 軽微な拡大
- **カードホバー**: シャドウ増加 + 軽微な浮上
- **入力フィールド**: フォーカス時のグロー効果
- **ナビゲーション**: アクティブ状態のアンダーライン

### 5.7 レスポンシブデザイン
- **モバイル**: シンプルで操作しやすい
- **タブレット**: カード配置の最適化
- **デスクトップ**: 大胆なレイアウトとエフェクト
- **ダークモード**: デフォルトでダークテーマ

### 5.8 アクセシビリティ（ダークテーマ対応）
- **コントラスト比**: WCAG 2.1 AA準拠（4.5:1以上）
- **色覚対応**: カラー以外の情報伝達手段併用
- **キーボードナビゲーション**: フォーカス時のグロー表示
- **スクリーンリーダー**: 適切なARIAラベル設定
- **動画・アニメーション**: motion-reduce対応

### 5.9 パフォーマンス最適化（ダークテーマ）
- **CSS最適化**: 不要なライトテーマスタイル除去
- **画像最適化**: ダークテーマ用画像の最適化
- **フォント読み込み**: 表示フォントの優先読み込み
- **アニメーション**: GPU使用の3D変換活用

### 6.1 バックアップ
- データベース日次バックアップ
- 設定ファイル・メディアファイルバックアップ

### 6.2 監視・ログ
- エラーログ監視
- パフォーマンス監視
- セキュリティログ

### 6.3 更新・メンテナンス
- 定期的なセキュリティアップデート
- 機能追加・改善の継続的な実施

## 9. Next.js + shadcn/UI 実装詳細

### 9.1 プロジェクト構成
```
portfolio/
├── app/                    # App Router
│   ├── (auth)/            # 認証関連ページ
│   ├── (dashboard)/       # 管理者ページ
│   ├── blog/              # ブログページ
│   ├── portfolio/         # 作品詳細ページ
│   ├── api/               # API Routes
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/
│   ├── ui/                # shadcn/ui コンポーネント
│   ├── layout/            # レイアウトコンポーネント
│   ├── portfolio/         # ポートフォリオ関連
│   ├── learning/          # 学習記録関連
│   └── dashboard/         # 管理画面関連
├── lib/
│   ├── auth.ts            # NextAuth設定
│   ├── db.ts              # Prisma設定
│   ├── utils.ts           # ユーティリティ関数
│   └── validations/       # Zodスキーマ
├── prisma/
│   ├── schema.prisma      # データベーススキーマ
│   └── migrations/        # マイグレーション
└── public/
    ├── images/            # 静的画像
    └── icons/             # アイコンファイル
```

### 9.2 shadcn/ui活用コンポーネント

#### 9.2.1 学習記録関連
- **Calendar**: 学習日のカレンダー表示
- **Chart**: 学習統計のグラフ表示
- **Progress**: スキル習熟度表示
- **Badge**: 技術タグ、カテゴリ表示
- **DataTable**: 学習記録一覧

#### 9.2.2 管理画面
- **Form**: 各種入力フォーム
- **Dialog**: モーダル操作
- **Tabs**: 管理画面ナビゲーション
- **Command**: 検索・コマンドパレット
- **DropdownMenu**: アクションメニュー

#### 9.2.3 ポートフォリオ表示
- **Card**: 作品カード
- **Carousel**: 作品画像スライダー
- **Sheet**: サイドメニュー
- **Accordion**: FAQ、技術詳細
- **Timeline**: 学習・プロジェクト履歴

### 9.3 カスタムコンポーネント例

#### 9.3.1 学習統計ダッシュボード
```typescript
// components/learning/LearningStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface LearningStatsProps {
  totalHours: number
  streak: number
  completedProjects: number
  skills: { name: string; level: number }[]
}

export function LearningStats({ 
  totalHours, 
  streak, 
  completedProjects, 
  skills 
}: LearningStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">総学習時間</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHours}h</div>
        </CardContent>
      </Card>
      {/* 他の統計カード */}
    </div>
  )
}
```

#### 9.3.2 作品カード
```typescript
// components/portfolio/ProjectCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  liveUrl, 
  githubUrl 
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          {liveUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

### 9.3 Supabase統合実装例

#### 9.3.1 Supabase設定
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 型定義
export interface LearningRecord {
  id: string
  title: string
  description?: string
  category: string
  duration: number
  technologies: string[]
  date: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  live_url?: string
  github_url?: string
  featured: boolean
  published_at?: string
  user_id: string
  created_at: string
  updated_at: string
}
```

#### 9.3.2 認証フック
```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 現在のセッション取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

#### 9.3.3 学習記録管理
```typescript
// lib/learning-records.ts
import { supabase } from './supabase'
import type { LearningRecord } from './supabase'

export async function getLearningRecords(userId: string) {
  const { data, error } = await supabase
    .from('learning_records')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) throw error
  return data as LearningRecord[]
}

export async function createLearningRecord(record: Omit<LearningRecord, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('learning_records')
    .insert([record])
    .select()
    .single()

  if (error) throw error
  return data as LearningRecord
}

export async function updateLearningRecord(id: string, updates: Partial<LearningRecord>) {
  const { data, error } = await supabase
    .from('learning_records')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as LearningRecord
}
```

#### 9.3.4 リアルタイム学習統計
```typescript
// components/learning/RealtimeLearningStats.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LearningStats } from './LearningStats'
import { useAuth } from '@/hooks/useAuth'

export function RealtimeLearningStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalHours: 0,
    streak: 0,
    completedProjects: 0,
    skills: []
  })

  useEffect(() => {
    if (!user) return

    // 初期データ取得
    fetchStats()

    // リアルタイム更新を監視
    const subscription = supabase
      .channel('learning_records_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'learning_records',
          filter: `user_id=eq.${user.id}`
        }, 
        () => {
          fetchStats() // データ変更時に再取得
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  async function fetchStats() {
    if (!user) return

    // 統計データを計算
    const { data: records } = await supabase
      .from('learning_records')
      .select('duration, date, technologies')
      .eq('user_id', user.id)

    // 総学習時間計算
    const totalHours = records?.reduce((sum, record) => sum + record.duration, 0) / 60 || 0

    // 連続学習日数計算（簡易版）
    const streak = calculateStreak(records || [])

    setStats({
      totalHours: Math.round(totalHours),
      streak,
      completedProjects: 0, // 別途計算
      skills: [] // 別途計算
    })
  }

  return <LearningStats {...stats} />
}
```

### 9.4 Supabaseのデータベーススキーマ

```sql
-- 学習記録テーブル
CREATE TABLE learning_records (
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
CREATE TABLE projects (
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

-- スキルテーブル
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER CHECK (level >= 1 AND level <= 100),
  category TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ブログ記事テーブル
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- お問い合わせテーブル  
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ブログ記事のRLS設定
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- ブログ記事は公開済みは誰でも閲覧可、管理は本人のみ
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (published = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage own blog posts" ON blog_posts
  FOR ALL USING (auth.uid() = user_id);

-- お問い合わせは管理者のみアクセス可能（実装時にuser_id条件を調整）
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage contact messages" ON contact_messages
  FOR ALL USING (true); -- 実装時に適切な管理者権限チェックに変更
```

-- Row Level Security (RLS) 設定
ALTER TABLE learning_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- ポリシー設定（ユーザーは自分のデータのみアクセス可能）
CREATE POLICY "Users can view own learning records" ON learning_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning records" ON learning_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning records" ON learning_records
  FOR UPDATE USING (auth.uid() = user_id);

-- プロジェクトは一般公開（SELECT）、管理は本人のみ
CREATE POLICY "Anyone can view published projects" ON projects
  FOR SELECT USING (published_at IS NOT NULL OR auth.uid() = user_id);

CREATE POLICY "Users can manage own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- スキルのRLS設定  
CREATE POLICY "Anyone can view skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own skills" ON skills
  FOR ALL USING (auth.uid() = user_id);

#### Step 1: Supabase プロジェクト設定
```bash
# Supabaseクライアントインストール
npm install @supabase/supabase-js

# 環境変数設定
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### Step 2: 認証設定
- Supabase Authでログイン機能実装
- Row Level Securityでデータ保護

#### 9.3.5 ダークテーマカスタムコンポーネント例

```typescript
// components/ui/GlassCard.tsx
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glow?: boolean
}

export function GlassCard({ children, className, glow = false, ...props }: GlassCardProps) {
  return (
    <Card
      className={cn(
        "bg-white/5 backdrop-blur-lg border border-white/10",
        "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
        glow && "hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
}

// components/ui/NeonButton.tsx  
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NeonButtonProps extends ButtonProps {
  neon?: boolean
}

export function NeonButton({ children, className, neon = false, ...props }: NeonButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        neon && [
          "bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9]",
          "hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]",
          "hover:scale-105",
          "text-black font-semibold"
        ],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

// components/ui/GradientText.tsx
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  gradient?: 'blue-purple' | 'blue-green' | 'purple-pink'
}

export function GradientText({ 
  children, 
  className, 
  gradient = 'blue-purple',
  ...props 
}: GradientTextProps) {
  const gradients = {
    'blue-purple': 'from-[#00D9FF] to-[#7C3AED]',
    'blue-green': 'from-[#00D9FF] to-[#10B981]', 
    'purple-pink': 'from-[#7C3AED] to-[#EC4899]'
  }

  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[gradient],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
```

#### 9.3.6 ダークテーマレイアウト例

```typescript
// components/layout/Header.tsx
import { GlassCard } from "@/components/ui/GlassCard"
import { NeonButton } from "@/components/ui/NeonButton"
import { GradientText } from "@/components/ui/GradientText"

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50">
      <GlassCard className="m-4 px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] rounded-full" />
            <GradientText className="text-xl font-bold font-display">
              YourName
            </GradientText>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-white/70 hover:text-white transition-colors">
              About
            </a>
            <a href="#portfolio" className="text-white/70 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#learning" className="text-white/70 hover:text-white transition-colors">
              Learning
            </a>
            <NeonButton neon size="sm">
              Contact
            </NeonButton>
          </div>
        </nav>
      </GlassCard>
    </header>
  )
}

// components/sections/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 背景パターン */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-[#00D9FF]/10 via-transparent to-transparent" />
      
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold font-display mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText className="block">AI & Development</GradientText>
          <span className="text-white">Portfolio</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          副業から本業へ。日々の学習と成長をテクノロジーで可視化し、
          未来のキャリアを築いていく開発者のポートフォリオ
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <NeonButton neon size="lg" className="px-8">
            View My Work
          </NeonButton>
          <Button variant="outline" size="lg" className="px-8 border-white/20 text-white hover:bg-white/10">
            Learning Journey
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
```

### 9.6 パフォーマンス最適化

#### 9.6.1 Next.js最適化
- **App Router**: 最新のルーティングシステム活用
- **Server Components**: サーバーサイドレンダリング
- **Image Optimization**: next/image使用
- **Dynamic Imports**: コード分割

#### 9.6.2 shadcn/ui最適化
- **Tree Shaking**: 必要なコンポーネントのみインポート
- **CSS-in-JS回避**: Tailwind CSSでスタイリング
- **Bundle Size**: 軽量なアイコンライブラリ使用

## 7. 開発スケジュール（Next.js + shadcn/UI）

### フェーズ1（1週間）: プロジェクト基盤構築
- Next.js 14 + TypeScript + shadcn/ui セットアップ
- Prisma + PostgreSQL 設定
- NextAuth.js v5 認証システム
- 基本レイアウト（ヘッダー、フッター、ナビゲーション）

### フェーズ2（2週間）: コア機能開発
- 学習記録CRUD（shadcn/ui Form, DataTable使用）
- 作品管理機能（Card, Dialog, Sheet使用）
- パブリックページ（統計ダッシュボード、ポートフォリオ表示）
- Prismaスキーマ完成・マイグレーション

### フェーズ3（1-2週間）: UI/UX改善・追加機能
- レスポンシブデザイン完成
- アニメーション（Framer Motion）追加
- 学習統計可視化（Chart, Progress使用）
- 検索・フィルタリング機能（Command使用）

### フェーズ4（1週間）: 最適化・デプロイ
- パフォーマンス最適化
- SEO対策（next-seo）
- Vercelデプロイ・本番環境設定
- テスト・デバッグ

## 8. 成功指標

### 8.1 技術的指標
- サイトパフォーマンススコア90+
- 稼働率99%以上
- セキュリティインシデント0件

### 8.2 ビジネス指標
- 月間ユニークユーザー数
- お問い合わせ・仕事依頼数
- SNSエンゲージメント率

このサイトが、あなたの学習の可視化と、プロフェッショナルとしての信頼性向上に貢献し、副業から本業への転換を支援することを目指します。