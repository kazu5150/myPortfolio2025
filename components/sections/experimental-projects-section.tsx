'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Play, Calendar, Clock, Zap, Code2, Beaker, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { getExperimentalProjects, deleteExperimentalProject } from "@/lib/database"
import { ExperimentalProject } from "@/lib/supabase"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// ステータスの日本語表示とカラー
const statusConfig = {
  planning: { label: '計画中', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
  developing: { label: '開発中', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  testing: { label: 'テスト中', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  completed: { label: '完成', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  paused: { label: '一時停止', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' }
}

// カテゴリのアイコンとカラー
const categoryConfig = {
  web: { icon: Code2, color: 'from-blue-500 to-cyan-500' },
  mobile: { icon: Zap, color: 'from-purple-500 to-pink-500' },
  ai: { icon: Beaker, color: 'from-green-500 to-emerald-500' },
  game: { icon: Play, color: 'from-orange-500 to-red-500' },
  tool: { icon: Code2, color: 'from-gray-500 to-gray-600' },
  other: { icon: Beaker, color: 'from-indigo-500 to-purple-500' }
}

export function ExperimentalProjectsSection() {
  const [projects, setProjects] = useState<ExperimentalProject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<ExperimentalProject | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const data = await getExperimentalProjects()
        if (data) {
          setProjects(data)
        }
      } catch (error) {
        console.error('Failed to fetch experimental projects:', error)
        // エラー時はデフォルトのプロジェクトを表示
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleDeleteClick = (project: ExperimentalProject) => {
    setProjectToDelete(project)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return

    try {
      setIsDeleting(true)
      await deleteExperimentalProject(projectToDelete.id)
      
      // プロジェクトリストから削除
      setProjects(projects.filter(p => p.id !== projectToDelete.id))
      
      setDeleteDialogOpen(false)
      setProjectToDelete(null)
    } catch (error) {
      console.error('Failed to delete project:', error)
      // エラーハンドリング（必要に応じてトースト通知を追加）
    } finally {
      setIsDeleting(false)
    }
  }

  // フィルタリング
  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus
    return categoryMatch && statusMatch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60">プロジェクトを読み込み中...</div>
      </div>
    )
  }

  return (
    <div>
      {/* ヘッダーアクション */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">プロジェクト一覧</h2>
        <Button
          className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold"
          asChild
        >
          <Link href="/experiments/new">
            <Plus className="w-4 h-4 mr-2" />
            新規プロジェクト
          </Link>
        </Button>
      </div>

      {/* フィルター */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">カテゴリ:</span>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-white/20' : 'bg-transparent'}
            >
              すべて
            </Button>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className={selectedCategory === key ? 'bg-white/20' : 'bg-transparent'}
              >
                {key.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">ステータス:</span>
          <div className="flex gap-2">
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('all')}
              className={selectedStatus === 'all' ? 'bg-white/20' : 'bg-transparent'}
            >
              すべて
            </Button>
            {Object.entries(statusConfig).map(([key, config]) => (
              <Button
                key={key}
                variant={selectedStatus === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(key)}
                className={selectedStatus === key ? 'bg-white/20' : 'bg-transparent'}
              >
                {config.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* プロジェクト一覧 */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const CategoryIcon = categoryConfig[project.category].icon
          const statusStyle = statusConfig[project.status]
          
          return (
            <GlassCard key={project.id} className="p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${categoryConfig[project.category].color} rounded-lg flex items-center justify-center`}>
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${statusStyle.color} mt-1`}>
                      {statusStyle.label}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-4">{project.short_description || project.description}</p>

              {/* 進捗バー */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-white/60">進捗</span>
                  <span className="text-xs text-white/60">{project.progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`h-full bg-gradient-to-r ${categoryConfig[project.category].color} rounded-full transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* 技術スタック */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs bg-white/10 text-white/70 border-white/20">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="secondary" className="text-xs bg-white/10 text-white/70 border-white/20">
                    +{project.technologies.length - 4}
                  </Badge>
                )}
              </div>

              {/* 日付情報 */}
              <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>開始: {new Date(project.start_date).toLocaleDateString('ja-JP')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>更新: {new Date(project.last_updated).toLocaleDateString('ja-JP')}</span>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-2">
                {project.github_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/5 border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" />
                      コード
                    </Link>
                  </Button>
                )}
                {project.demo_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/5 border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      デモ
                    </Link>
                  </Button>
                )}
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black"
                  asChild
                >
                  <Link href={`/experiments/${project.id}`}>
                    詳細を見る
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400"
                  onClick={() => handleDeleteClick(project)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">該当するプロジェクトがありません</p>
        </div>
      )}

      {/* 削除確認ダイアログ */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-dark-800 border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">プロジェクトを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              「{projectToDelete?.title}」を削除します。この操作は取り消せません。
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
              className="bg-red-600 hover:bg-red-700 text-white"
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