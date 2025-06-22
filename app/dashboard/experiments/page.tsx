'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { getExperimentalProjects, createExperimentalProject, updateExperimentalProject, deleteExperimentalProject } from "@/lib/database"
import { ExperimentalProject } from "@/lib/supabase"

const userId = '11111111-1111-1111-1111-111111111111' // 仮のユーザーID

export default function ExperimentsDashboardPage() {
  const [projects, setProjects] = useState<ExperimentalProject[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<ExperimentalProject | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    status: 'planning' as const,
    category: 'web' as const,
    technologies: '',
    start_date: new Date().toISOString().split('T')[0],
    github_url: '',
    demo_url: '',
    learning_goals: '',
    challenges: '',
    progress: 0,
    is_public: true
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getExperimentalProjects(userId, false)
      if (data) {
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: ExperimentalProject) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description || '',
      short_description: project.short_description || '',
      status: project.status,
      category: project.category,
      technologies: project.technologies.join(', '),
      start_date: project.start_date,
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      learning_goals: project.learning_goals.join(', '),
      challenges: project.challenges.join(', '),
      progress: project.progress,
      is_public: project.is_public
    })
  }

  const handleSave = async () => {
    try {
      const projectData = {
        user_id: userId,
        title: formData.title,
        description: formData.description,
        short_description: formData.short_description,
        status: formData.status,
        category: formData.category,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        start_date: formData.start_date,
        github_url: formData.github_url || null,
        demo_url: formData.demo_url || null,
        learning_goals: formData.learning_goals.split(',').map(g => g.trim()).filter(Boolean),
        challenges: formData.challenges.split(',').map(c => c.trim()).filter(Boolean),
        progress: formData.progress,
        is_public: formData.is_public
      }

      if (editingProject) {
        await updateExperimentalProject(editingProject.id, projectData)
      } else {
        await createExperimentalProject(projectData)
      }

      await fetchProjects()
      resetForm()
    } catch (error) {
      console.error('Failed to save project:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('このプロジェクトを削除しますか？')) {
      try {
        await deleteExperimentalProject(id)
        await fetchProjects()
      } catch (error) {
        console.error('Failed to delete project:', error)
      }
    }
  }

  const resetForm = () => {
    setEditingProject(null)
    setIsCreating(false)
    setFormData({
      title: '',
      description: '',
      short_description: '',
      status: 'planning',
      category: 'web',
      technologies: '',
      start_date: new Date().toISOString().split('T')[0],
      github_url: '',
      demo_url: '',
      learning_goals: '',
      challenges: '',
      progress: 0,
      is_public: true
    })
  }

  if (loading) {
    return <div className="text-white/60">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">実験的プロジェクト管理</h1>
        {!isCreating && !editingProject && (
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black"
          >
            <Plus className="w-4 h-4 mr-2" />
            新規プロジェクト
          </Button>
        )}
      </div>

      {(isCreating || editingProject) && (
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingProject ? 'プロジェクト編集' : '新規プロジェクト作成'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="プロジェクト名"
              />
            </div>

            <div>
              <Label htmlFor="short_description">短い説明</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                placeholder="一行で説明"
              />
            </div>

            <div>
              <Label htmlFor="status">ステータス</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: any) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">計画中</SelectItem>
                  <SelectItem value="developing">開発中</SelectItem>
                  <SelectItem value="testing">テスト中</SelectItem>
                  <SelectItem value="completed">完成</SelectItem>
                  <SelectItem value="paused">一時停止</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">カテゴリ</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value: any) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="game">Game</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">詳細説明</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="プロジェクトの詳細説明"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="technologies">技術スタック（カンマ区切り）</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div>
              <Label htmlFor="start_date">開始日</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="github_url">GitHubリンク</Label>
              <Input
                id="github_url"
                value={formData.github_url}
                onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <Label htmlFor="demo_url">デモリンク</Label>
              <Input
                id="demo_url"
                value={formData.demo_url}
                onChange={(e) => setFormData({...formData, demo_url: e.target.value})}
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="learning_goals">学習目標（カンマ区切り）</Label>
              <Input
                id="learning_goals"
                value={formData.learning_goals}
                onChange={(e) => setFormData({...formData, learning_goals: e.target.value})}
                placeholder="新技術の習得, アーキテクチャの理解"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="challenges">課題・チャレンジ（カンマ区切り）</Label>
              <Input
                id="challenges"
                value={formData.challenges}
                onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                placeholder="パフォーマンス最適化, スケーラビリティ"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="progress">進捗 ({formData.progress}%)</Label>
              <Slider
                id="progress"
                value={[formData.progress]}
                onValueChange={(value) => setFormData({...formData, progress: value[0]})}
                max={100}
                step={5}
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_public}
                  onChange={(e) => setFormData({...formData, is_public: e.target.checked})}
                  className="rounded"
                />
                <span>公開する</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
            <Button onClick={resetForm} variant="outline">
              <X className="w-4 h-4 mr-2" />
              キャンセル
            </Button>
          </div>
        </GlassCard>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <GlassCard key={project.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <p className="text-white/70 text-sm">{project.short_description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{project.status}</Badge>
                  <Badge variant="secondary">{project.category}</Badge>
                  <Badge variant="secondary">{project.progress}%</Badge>
                  {project.is_public && <Badge variant="secondary">公開</Badge>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleEdit(project)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-red-400 hover:text-red-300"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}