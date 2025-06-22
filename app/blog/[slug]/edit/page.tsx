'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ArrowLeft, Save, Eye, Trash2, Plus, X } from "lucide-react"
import Link from "next/link"
import { getBlogPostBySlug, updateBlogPost, deleteBlogPost } from "@/lib/database"
import { BlogPost } from "@/lib/supabase"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface BlogEditPageProps {
  params: {
    slug: string
  }
}

export default function BlogEditPage({ params }: BlogEditPageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [newTag, setNewTag] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    tags: [] as string[],
    published: false
  })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getBlogPostBySlug(params.slug)
        if (!fetchedPost) {
          notFound()
        }
        setPost(fetchedPost)
        setFormData({
          title: fetchedPost.title,
          slug: fetchedPost.slug,
          content: fetchedPost.content,
          excerpt: fetchedPost.excerpt || '',
          tags: fetchedPost.tags || [],
          published: fetchedPost.published
        })
      } catch (error) {
        console.error('ブログ記事の取得に失敗:', error)
        setError('ブログ記事の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!post) return

      const updates = {
        ...formData,
        published_at: formData.published ? new Date().toISOString() : null
      }

      await updateBlogPost(post.id, updates)
      router.push(`/blog/${formData.slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ブログ記事の更新に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!post) return
    
    const confirmed = window.confirm('この記事を削除してもよろしいですか？この操作は取り消せません。')
    if (!confirmed) return

    setDeleting(true)
    setError(null)

    try {
      await deleteBlogPost(post.id)
      router.push('/blog')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ブログ記事の削除に失敗しました')
    } finally {
      setDeleting(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white">読み込み中...</div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white/20 hover:bg-white/10" asChild>
                <Link href={`/blog/${post.slug}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  記事に戻る
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">
                <GradientText>記事を編集</GradientText>
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="border-white/20 hover:bg-white/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'エディタ' : 'プレビュー'}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleting ? '削除中...' : '削除'}
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Editor */}
            <div className={showPreview ? 'hidden lg:block' : ''}>
              <GlassCard>
                <CardHeader>
                  <CardTitle className="text-xl">
                    <GradientText>記事編集</GradientText>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        タイトル
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value
                          setFormData({
                            ...formData,
                            title,
                            slug: generateSlug(title)
                          })
                        }}
                        placeholder="記事のタイトルを入力..."
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                        required
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        URL スラッグ
                      </label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="url-slug"
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                        required
                      />
                      <p className="text-xs text-white/60 mt-1">
                        URL: /blog/{formData.slug}
                      </p>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        概要（任意）
                      </label>
                      <Textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="記事の概要を入力..."
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF] min-h-[80px]"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        タグ
                      </label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="新しいタグ"
                          className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag} variant="outline" className="border-white/20">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-sm">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        本文（Markdown）
                      </label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Markdownで記事を作成..."
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF] font-mono text-sm min-h-[400px]"
                        required
                      />
                    </div>

                    {/* Published Switch */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                      <label className="text-sm font-medium text-white">
                        公開する
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={saving}
                      className="w-full bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? '保存中...' : '記事を更新'}
                    </Button>
                  </form>
                </CardContent>
              </GlassCard>
            </div>

            {/* Preview */}
            <div className={!showPreview ? 'hidden lg:block' : ''}>
              <GlassCard>
                <CardHeader>
                  <CardTitle className="text-xl">
                    <GradientText>プレビュー</GradientText>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-white">{formData.title || 'タイトル'}</h1>
                    {formData.excerpt && (
                      <p className="text-white/70">{formData.excerpt}</p>
                    )}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-[#00D9FF]" {...props}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      >
                        {formData.content || '*ここにプレビューが表示されます*'}
                      </ReactMarkdown>
                    </div>
                  </div>
                </CardContent>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}