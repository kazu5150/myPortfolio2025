'use client'

import { useState, useEffect } from 'react'
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Calendar, Clock, Plus, X, BookOpen, Target, Trash2, Edit3, Image, Upload } from "lucide-react"
import { getLearningRecords, createLearningRecord, updateLearningRecord, deleteLearningRecord } from "@/lib/database"
import { LearningRecord, supabase } from "@/lib/supabase"
import { LearningStats } from "@/components/learning/learning-stats"

export default function LearningPage() {
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingRecord, setEditingRecord] = useState<LearningRecord | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    technologies: [] as string[],
    description: '',
    image_url: ''
  })

  const [newTechnology, setNewTechnology] = useState('')
  const [uploading, setUploading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [mounted, setMounted] = useState(false)

  const fetchLearningRecords = async () => {
    try {
      const records = await getLearningRecords('11111111-1111-1111-1111-111111111111')
      setLearningRecords(records)
    } catch (error) {
      console.error('学習記録の取得に失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchLearningRecords()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingRecord) {
        // 編集モード
        const updates = {
          title: formData.title,
          date: formData.date,
          duration: parseInt(formData.duration),
          technologies: formData.technologies,
          description: formData.description,
          image_url: formData.image_url
        }
        await updateLearningRecord(editingRecord.id, updates)
      } else {
        // 新規作成モード
        const learningRecord = {
          user_id: '11111111-1111-1111-1111-111111111111',
          title: formData.title,
          date: formData.date,
          duration: parseInt(formData.duration),
          technologies: formData.technologies,
          description: formData.description,
          image_url: formData.image_url
        }
        await createLearningRecord(learningRecord)
      }

      await fetchLearningRecords()
      
      // フォームをリセット
      setEditingRecord(null)
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        duration: '',
        technologies: [],
        description: '',
        image_url: ''
      })
      setImageFile(null)
      setShowForm(false)
    } catch (error) {
      console.error(`学習記録の${editingRecord ? '更新' : '作成'}に失敗:`, error)
      alert(`学習記録の${editingRecord ? '更新' : '作成'}に失敗しました。`)
    } finally {
      setSaving(false)
    }
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()]
      })
      setNewTechnology('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(tech => tech !== techToRemove)
    })
  }

  const handleEdit = (record: LearningRecord) => {
    setEditingRecord(record)
    setFormData({
      title: record.title,
      date: record.date,
      duration: record.duration.toString(),
      technologies: record.technologies,
      description: record.description || '',
      image_url: record.image_url || ''
    })
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setEditingRecord(null)
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      duration: '',
      technologies: [],
      description: '',
      image_url: ''
    })
    setImageFile(null)
    setShowForm(false)
  }

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `learning-images/${fileName}`

    console.log('Uploading file:', fileName, 'to path:', filePath)

    const { data, error } = await supabase.storage
      .from('learning-records')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error(`Upload failed: ${error.message}`)
    }

    console.log('Upload successful:', data)

    const { data: { publicUrl } } = supabase.storage
      .from('learning-records')
      .getPublicUrl(filePath)

    console.log('Public URL:', publicUrl)
    return publicUrl
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ファイルサイズチェック (5MB制限)
    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズは5MB以下にしてください。')
      return
    }

    // ファイル形式チェック
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください。')
      return
    }

    setImageFile(file)
    setUploading(true)

    try {
      const imageUrl = await uploadImage(file)
      setFormData({ ...formData, image_url: imageUrl })
    } catch (error: any) {
      console.error('画像のアップロードに失敗:', error)
      console.error('エラー詳細:', error.message)
      alert(`画像のアップロードに失敗しました。\nエラー: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('この学習記録を削除してもよろしいですか？')) return

    try {
      await deleteLearningRecord(id)
      await fetchLearningRecords()
    } catch (error) {
      console.error('学習記録の削除に失敗:', error)
      alert('学習記録の削除に失敗しました。')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return mins > 0 ? `${hours}時間${mins}分` : `${hours}時間`
    }
    return `${mins}分`
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
              <GradientText>Learning Records</GradientText>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
              日々の学習を記録して、成長の軌跡を可視化しよう
            </p>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              新しい学習記録
            </Button>
          </div>

          {/* Statistics */}
          <LearningStats />

          {/* Quick Add Form */}
          {showForm && (
            <GlassCard className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">
                  <GradientText>
                    {editingRecord ? '学習記録を編集' : '学習記録を追加'}
                  </GradientText>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      学習タイトル
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="例: Next.js基礎学習、API開発実践"
                      className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        学習日
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                        required
                      />
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        学習時間（分）
                      </label>
                      <Input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="例: 120"
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      学習した技術・分野
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        placeholder="例: React, TypeScript"
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      />
                      <Button type="button" onClick={addTechnology} variant="outline" className="border-white/20">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="ml-2 hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      <Image className="w-4 h-4 inline mr-2" />
                      画像（任意）
                    </label>
                    
                    <div className="space-y-3">
                      {/* File Upload */}
                      {mounted && (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={uploading}
                          />
                          <label
                            htmlFor="image-upload"
                            className={`
                              inline-flex items-center px-4 py-2 rounded-lg border border-white/20 
                              bg-white/5 hover:bg-white/10 transition-colors cursor-pointer
                              ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {uploading ? 'アップロード中...' : '画像をアップロード'}
                          </label>
                          <p className="text-xs text-white/60 mt-1">
                            JPG, PNG, GIF (最大5MB)
                          </p>
                        </div>
                      )}

                      {/* URL Input */}
                      <div className="relative">
                        <div className="text-xs text-white/60 mb-1">または画像URLを入力:</div>
                        <Input
                          type="url"
                          value={formData.image_url}
                          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                          disabled={uploading}
                        />
                      </div>

                      {/* Image Preview */}
                      {formData.image_url && (
                        <div className="mt-3">
                          <div className="text-xs text-white/60 mb-2">プレビュー:</div>
                          <div className="relative inline-block">
                            <img
                              src={formData.image_url}
                              alt="プレビュー"
                              className="w-32 h-32 object-cover rounded-lg border border-white/20"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, image_url: '' })}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      学習内容・メモ
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="今日学んだこと、つまづいた点、次の目標など..."
                      className="bg-white/5 border-white/20 focus:border-[#00D9FF] min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold"
                    >
                      {saving ? '保存中...' : editingRecord ? '更新する' : '記録を保存'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="border-white/20 hover:bg-white/10"
                    >
                      キャンセル
                    </Button>
                  </div>
                </form>
              </CardContent>
            </GlassCard>
          )}

          {/* Learning Records List */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">学習記録を読み込み中...</p>
              </div>
            ) : learningRecords.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg mb-4">まだ学習記録がありません</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold"
                >
                  最初の記録を作成
                </Button>
              </div>
            ) : (
              learningRecords.map((record) => (
                <GlassCard key={record.id} className="hover:bg-white/5 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] bg-clip-text text-transparent mb-3">
                          {record.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center text-white/60">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(record.date)}
                          </div>
                          <div className="flex items-center text-[#00D9FF]">
                            <Clock className="w-4 h-4 mr-2" />
                            {formatDuration(record.duration)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(record)}
                          className="border-[#00D9FF]/20 hover:bg-[#00D9FF]/10 text-[#00D9FF]"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(record.id)}
                          className="border-red-500/20 hover:bg-red-500/10 text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {record.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs bg-white/10 text-white/80 border-white/20">
                            <Target className="w-3 h-3 mr-1" />
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Image */}
                      {record.image_url && (
                        <div className="mt-4">
                          <img
                            src={record.image_url}
                            alt={record.title}
                            className="w-full max-w-md h-48 object-cover rounded-lg border border-white/20 hover:border-[#00D9FF]/50 transition-colors cursor-pointer"
                            onClick={() => window.open(record.image_url, '_blank')}
                          />
                        </div>
                      )}
                      
                      {/* Description */}
                      {record.description && (
                        <p className="text-white/80 leading-relaxed">
                          {record.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </GlassCard>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}