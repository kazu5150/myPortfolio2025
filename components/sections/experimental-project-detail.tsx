'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { ExperimentalProject } from '@/lib/supabase'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Github, 
  ExternalLink, 
  Target, 
  AlertCircle,
  BookOpen,
  Code2,
  Zap,
  CheckCircle2,
  Circle,
  Share2,
  Edit,
  Trash2
} from 'lucide-react'
import Link from 'next/link'
import { GradientText } from '@/components/ui/gradient-text'
import { deleteExperimentalProject } from '@/lib/database'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ExperimentalProjectDetailProps {
  project: ExperimentalProject
}

// ステータスの設定
const statusConfig = {
  planning: { label: '計画中', color: 'bg-white/10 text-white/70 border-white/20', icon: Circle },
  developing: { label: '開発中', color: 'bg-white/10 text-white/70 border-white/20', icon: Code2 },
  testing: { label: 'テスト中', color: 'bg-white/10 text-white/70 border-white/20', icon: AlertCircle },
  completed: { label: '完成', color: 'bg-white/20 text-white/80 border-white/30', icon: CheckCircle2 },
  paused: { label: '一時停止', color: 'bg-white/5 text-white/50 border-white/10', icon: Circle }
}

// カテゴリの設定
const categoryConfig = {
  web: { label: 'Web開発', color: 'from-blue-500 to-blue-600' },
  mobile: { label: 'モバイル開発', color: 'from-blue-600 to-blue-700' },
  ai: { label: 'AI/機械学習', color: 'from-blue-700 to-blue-800' },
  game: { label: 'ゲーム開発', color: 'from-blue-800 to-blue-900' },
  tool: { label: 'ツール開発', color: 'from-blue-400 to-blue-500' },
  other: { label: 'その他', color: 'from-blue-600 to-blue-700' }
}

export function ExperimentalProjectDetail({ project }: ExperimentalProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'resources'>('overview')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const StatusIcon = statusConfig[project.status].icon
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.short_description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('URLをコピーしました！')
    }
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true)
      await deleteExperimentalProject(project.id)
      
      // プロジェクト一覧ページにリダイレクト
      router.push('/experiments')
    } catch (error) {
      console.error('Failed to delete project:', error)
      // エラーハンドリング
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 py-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <Link href="/experiments">
          <Button variant="ghost" className="mb-4 text-white/70 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            実験的プロジェクト一覧に戻る
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>{project.title}</GradientText>
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm border ${statusConfig[project.status].color}`}>
                <StatusIcon className="w-4 h-4 mr-1.5" />
                {statusConfig[project.status].label}
              </div>
              <Badge className={`bg-gradient-to-r ${categoryConfig[project.category].color} text-white/90 border-0`}>
                {categoryConfig[project.category].label}
              </Badge>
              <div className="flex items-center text-sm text-white/60">
                <Calendar className="w-4 h-4 mr-1" />
                開始: {new Date(project.start_date).toLocaleDateString('ja-JP')}
              </div>
              <div className="flex items-center text-sm text-white/60">
                <Clock className="w-4 h-4 mr-1" />
                更新: {new Date(project.last_updated).toLocaleDateString('ja-JP')}
              </div>
            </div>

            <p className="text-lg text-white/80">{project.short_description}</p>
          </div>

          <div className="flex gap-2">
            {project.github_url && (
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 hover:bg-white/10"
                asChild
              >
                <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
            )}
            {project.demo_url && (
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 hover:bg-white/10"
                asChild
              >
                <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  デモ
                </Link>
              </Button>
            )}
            <Button
              variant="outline"
              className="bg-white/5 border-white/20 hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 進捗バー */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/70">プロジェクト進捗</span>
            <span className="text-sm font-bold text-white">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-3" />
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="flex gap-4 mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === 'overview' 
              ? 'text-white' 
              : 'text-white/60 hover:text-white/80'
          }`}
        >
          概要
          {activeTab === 'overview' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === 'progress' 
              ? 'text-white' 
              : 'text-white/60 hover:text-white/80'
          }`}
        >
          進捗と学習
          {activeTab === 'progress' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === 'resources' 
              ? 'text-white' 
              : 'text-white/60 hover:text-white/80'
          }`}
        >
          リソース
          {activeTab === 'resources' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20" />
          )}
        </button>
      </div>

      {/* タブコンテンツ */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* プロジェクト説明 */}
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-white/70" />
                  プロジェクト概要
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 whitespace-pre-wrap">{project.description}</p>
                </div>
              </GlassCard>

              {/* 技術スタック */}
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-white/70" />
                  使用技術
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-white/10 text-white/90 border-white/20 text-sm py-1.5 px-3"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              {/* 学習目標 */}
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-white/70" />
                  学習目標
                </h2>
                <ul className="space-y-3">
                  {project.learning_goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-white/60 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{goal}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* 課題・チャレンジ */}
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-white/70" />
                  課題・チャレンジ
                </h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <Zap className="w-5 h-5 text-white/60 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* 進捗詳細 */}
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4">進捗詳細</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white/70">全体の完成度</span>
                    <span className="text-2xl font-bold text-white">{project.progress}%</span>
                  </div>
                  
                  {/* ここに追加の進捗情報を表示可能 */}
                  <div className="text-sm text-white/60">
                    <p>開始日から {Math.floor((new Date().getTime() - new Date(project.start_date).getTime()) / (1000 * 60 * 60 * 24))} 日経過</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              {/* 外部リンク */}
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4">プロジェクトリンク</h2>
                <div className="space-y-3">
                  {project.github_url && (
                    <Link 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-5 h-5 mr-3 text-white/70" />
                      <div className="flex-1">
                        <div className="font-medium">GitHub リポジトリ</div>
                        <div className="text-sm text-white/60">{project.github_url}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/50" />
                    </Link>
                  )}
                  
                  {project.demo_url && (
                    <Link 
                      href={project.demo_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-3 text-white/70" />
                      <div className="flex-1">
                        <div className="font-medium">デモサイト</div>
                        <div className="text-sm text-white/60">{project.demo_url}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/50" />
                    </Link>
                  )}

                  {!project.github_url && !project.demo_url && (
                    <p className="text-white/60 text-center py-8">
                      外部リンクはまだ設定されていません
                    </p>
                  )}
                </div>
              </GlassCard>

              {/* 関連ドキュメント（将来的に追加可能） */}
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4">関連ドキュメント</h2>
                <p className="text-white/60 text-center py-8">
                  ドキュメントは準備中です
                </p>
              </GlassCard>
            </div>
          )}
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* プロジェクト情報 */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">プロジェクト情報</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">カテゴリ</span>
                <span className="text-white">{categoryConfig[project.category].label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">ステータス</span>
                <span className="text-white">{statusConfig[project.status].label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">開始日</span>
                <span className="text-white">{new Date(project.start_date).toLocaleDateString('ja-JP')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">最終更新</span>
                <span className="text-white">{new Date(project.last_updated).toLocaleDateString('ja-JP')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">公開設定</span>
                <span className="text-white">{project.is_public ? '公開' : '非公開'}</span>
              </div>
            </div>
          </GlassCard>

          {/* クイックアクション */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">アクション</h3>
            <div className="space-y-2">
              <Button 
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                シェア
              </Button>
              <Button 
                className="w-full"
                variant="outline"
                asChild
              >
                <Link href={`/dashboard/experiments`}>
                  <Edit className="w-4 h-4 mr-2" />
                  編集（管理者）
                </Link>
              </Button>
              <Button 
                className="w-full bg-white/5 border-white/20 hover:bg-white/10 text-white/60"
                variant="outline"
                onClick={handleDeleteClick}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                削除
              </Button>
            </div>
          </GlassCard>

          {/* 統計情報 */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">統計</h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{project.technologies.length}</div>
                <div className="text-sm text-white/60">使用技術</div>
              </div>
              <Separator className="bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{project.learning_goals.length}</div>
                <div className="text-sm text-white/60">学習目標</div>
              </div>
              <Separator className="bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{project.challenges.length}</div>
                <div className="text-sm text-white/60">課題</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 削除確認ダイアログ */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-dark-800 border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">プロジェクトを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              「{project.title}」を削除します。この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              disabled={isDeleting}
            >
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? '削除中...' : '削除'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}