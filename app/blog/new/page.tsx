'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientText } from '@/components/ui/gradient-text'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { createBlogPost } from '@/lib/database'
import { Save, Eye, Plus, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

export default function NewBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // フォームデータ
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    tags: [] as string[],
    published: false
  })
  
  // タグ入力用
  const [tagInput, setTagInput] = useState('')
  
  // タイトルからslugを自動生成
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Supabase接続確認
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      // ダミーuser_idを使用（実際の認証実装時に変更）
      const blogPostData = {
        ...formData,
        user_id: '11111111-1111-1111-1111-111111111111',
        published_at: formData.published ? new Date().toISOString() : null
      }

      console.log('送信データ:', blogPostData)
      const result = await createBlogPost(blogPostData)
      console.log('ブログ記事作成成功:', result)
      
      // 成功時はブログ一覧ページにリダイレクト
      router.push('/blog')
    } catch (err) {
      console.error('詳細エラー:', err)
      console.error('エラータイプ:', typeof err)
      console.error('エラーキー:', Object.keys(err as any))
      setError(err instanceof Error ? err.message : 'ブログ記事の作成に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
              <GradientText>新規ブログ記事作成</GradientText>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              技術記事や学習の振り返りを投稿しましょう
            </p>
          </div>

          {/* エラー表示 */}
          {error && (
            <GlassCard className="p-6 mb-8 border-red-500/20">
              <h3 className="text-xl font-bold text-red-400 mb-2">エラー</h3>
              <p className="text-red-300">{error}</p>
            </GlassCard>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 左側：入力フォーム */}
              <div className="space-y-6">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">基本情報</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">タイトル *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="記事のタイトルを入力"
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF] mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-friendly-slug"
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF] mt-2"
                        required
                      />
                      <p className="text-xs text-white/60 mt-1">
                        記事のURLになります（例: my-blog-post）
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="excerpt">要約</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="記事の簡単な要約（150文字程度）"
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF] mt-2"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>タグ</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="タグを入力"
                          className="bg-white/5 border-white/20 focus:border-[#00D9FF]"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <X 
                              className="w-3 h-3 cursor-pointer" 
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                      />
                      <Label htmlFor="published">公開する</Label>
                    </div>
                  </div>
                </GlassCard>

                {/* アクションボタン */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white font-semibold flex-1 hover:bg-blue-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? '保存中...' : '保存'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/blog')}
                    className="border-white/20"
                  >
                    キャンセル
                  </Button>
                </div>
              </div>

              {/* 右側：コンテンツエディタとプレビュー */}
              <div>
                <GlassCard className="p-6 h-full">
                  <Tabs defaultValue="edit" className="h-full flex flex-col">
                    <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-4">
                      <TabsTrigger value="edit">編集</TabsTrigger>
                      <TabsTrigger value="preview">
                        <Eye className="w-4 h-4 mr-2" />
                        プレビュー
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="edit" className="flex-1">
                      <Label htmlFor="content">記事内容 (Markdown) *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="# タイトル

記事の内容をMarkdown形式で入力してください...

## 見出し

- リスト項目
- リスト項目

```javascript
console.log('Hello, World!');
```"
                        className="bg-white/5 border-white/20 focus:border-[#00D9FF] mt-2 min-h-96 font-mono text-sm"
                        required
                      />
                    </TabsContent>
                    
                    <TabsContent value="preview" className="flex-1">
                      <div className="bg-white/5 border border-white/20 rounded-lg p-4 min-h-96 overflow-auto">
                        {formData.content ? (
                          <div className="prose prose-invert max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ node, inline, className, children, ...props }) {
                                  const match = /language-(\w+)/.exec(className || '')
                                  return !inline && match ? (
                                    <SyntaxHighlighter
                                      style={tomorrow}
                                      language={match[1]}
                                      PreTag="div"
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  )
                                }
                              }}
                            >
                              {formData.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-white/50 italic">プレビューを表示するには左側で記事を入力してください</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </GlassCard>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}