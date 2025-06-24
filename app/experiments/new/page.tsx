'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, X, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { createExperimentalProject } from "@/lib/database"
import { GradientText } from "@/components/ui/gradient-text"
import { Footer } from "@/components/layout/footer"

const userId = '11111111-1111-1111-1111-111111111111' // 仮のユーザーID

export default function NewExperimentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    status: 'planning' as const,
    category: 'web' as const,
    technologies: [''],
    start_date: new Date().toISOString().split('T')[0],
    github_url: '',
    demo_url: '',
    learning_goals: [''],
    challenges: [''],
    progress: 0,
    is_public: true
  })

  const handleArrayFieldChange = (field: 'technologies' | 'learning_goals' | 'challenges', index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const addArrayField = (field: 'technologies' | 'learning_goals' | 'challenges') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] })
  }

  const removeArrayField = (field: 'technologies' | 'learning_goals' | 'challenges', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index)
    setFormData({ ...formData, [field]: newArray.length > 0 ? newArray : [''] })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.short_description) {
      alert('タイトルと短い説明は必須です')
      return
    }

    try {
      setLoading(true)
      
      const projectData = {
        user_id: userId,
        title: formData.title,
        description: formData.description,
        short_description: formData.short_description,
        status: formData.status,
        category: formData.category,
        technologies: formData.technologies.filter(t => t.trim() !== ''),
        start_date: formData.start_date,
        github_url: formData.github_url || null,
        demo_url: formData.demo_url || null,
        learning_goals: formData.learning_goals.filter(g => g.trim() !== ''),
        challenges: formData.challenges.filter(c => c.trim() !== ''),
        progress: formData.progress,
        is_public: formData.is_public
      }

      const newProject = await createExperimentalProject(projectData)
      
      if (newProject) {
        router.push(`/experiments/${newProject.id}`)
      }
    } catch (error: any) {
      console.error('Failed to create project:', error)
      alert(`プロジェクトの作成に失敗しました: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-8 md:px-12">
          <Link href="/experiments">
            <Button variant="ghost" className="mb-6 text-white/70 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              プロジェクト一覧に戻る
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            <GradientText>新規実験プロジェクト作成</GradientText>
          </h1>

          <form onSubmit={handleSubmit}>
            <GlassCard className="p-8 space-y-6">
              {/* 基本情報 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">基本情報</h2>
                
                <div>
                  <Label htmlFor="title">プロジェクト名 *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="例：AI チャットボット開発"
                    required
                    className="bg-white/5"
                  />
                </div>

                <div>
                  <Label htmlFor="short_description">短い説明 *</Label>
                  <Input
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                    placeholder="一行でプロジェクトを説明"
                    required
                    className="bg-white/5"
                  />
                </div>

                <div>
                  <Label htmlFor="description">詳細説明</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="プロジェクトの詳細な説明を記入"
                    rows={6}
                    className="bg-white/5"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">ステータス</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value: any) => setFormData({...formData, status: value})}
                    >
                      <SelectTrigger className="bg-white/5">
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
                      <SelectTrigger className="bg-white/5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web開発</SelectItem>
                        <SelectItem value="mobile">モバイル開発</SelectItem>
                        <SelectItem value="ai">AI/機械学習</SelectItem>
                        <SelectItem value="game">ゲーム開発</SelectItem>
                        <SelectItem value="tool">ツール開発</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="start_date">開始日</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    className="bg-white/5"
                  />
                </div>

                <div>
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
              </div>

              {/* 技術スタック */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">技術スタック</h2>
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tech}
                      onChange={(e) => handleArrayFieldChange('technologies', index, e.target.value)}
                      placeholder="例：React, TypeScript"
                      className="bg-white/5"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayField('technologies', index)}
                      disabled={formData.technologies.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayField('technologies')}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  技術を追加
                </Button>
              </div>

              {/* 学習目標 */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">学習目標</h2>
                {formData.learning_goals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={goal}
                      onChange={(e) => handleArrayFieldChange('learning_goals', index, e.target.value)}
                      placeholder="例：新技術の習得"
                      className="bg-white/5"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayField('learning_goals', index)}
                      disabled={formData.learning_goals.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayField('learning_goals')}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  目標を追加
                </Button>
              </div>

              {/* 課題・チャレンジ */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">課題・チャレンジ</h2>
                {formData.challenges.map((challenge, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={challenge}
                      onChange={(e) => handleArrayFieldChange('challenges', index, e.target.value)}
                      placeholder="例：パフォーマンス最適化"
                      className="bg-white/5"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayField('challenges', index)}
                      disabled={formData.challenges.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayField('challenges')}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  課題を追加
                </Button>
              </div>

              {/* リンク */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">外部リンク</h2>
                
                <div>
                  <Label htmlFor="github_url">GitHubリンク</Label>
                  <Input
                    id="github_url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                    placeholder="https://github.com/..."
                    className="bg-white/5"
                  />
                </div>

                <div>
                  <Label htmlFor="demo_url">デモリンク</Label>
                  <Input
                    id="demo_url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({...formData, demo_url: e.target.value})}
                    placeholder="https://..."
                    className="bg-white/5"
                  />
                </div>
              </div>

              {/* 公開設定 */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <Label htmlFor="is_public" className="text-base font-medium">
                    プロジェクトを公開
                  </Label>
                  <p className="text-sm text-white/60">
                    公開するとポートフォリオサイトに表示されます
                  </p>
                </div>
                <Switch
                  id="is_public"
                  checked={formData.is_public}
                  onCheckedChange={(checked) => setFormData({...formData, is_public: checked})}
                />
              </div>

              {/* アクションボタン */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold hover:bg-blue-600"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? '作成中...' : 'プロジェクトを作成'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  <X className="w-4 h-4 mr-2" />
                  キャンセル
                </Button>
              </div>
            </GlassCard>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}