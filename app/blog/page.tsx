'use client'

import { useState, useEffect } from 'react'
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Footer } from "@/components/layout/footer"
import { Calendar, Clock, Search, Tag, Plus } from "lucide-react"
import Link from "next/link"
import { getBlogPosts } from "@/lib/database"
import { BlogPost } from "@/lib/supabase"
import { BlogActions } from "@/components/blog/blog-actions"

function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  
  const fetchBlogPosts = async () => {
    try {
      const posts = await getBlogPosts(true) // 未公開も含む
      setBlogPosts(posts)
    } catch (error) {
      console.error('ブログ記事の取得に失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const categories = ["All", "Web Development", "AI", "Database", "Design"]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }
  return (
    <div className="min-h-screen bg-dark-900">
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
              <GradientText>Tech Blog</GradientText>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
              学習過程での気づき、技術Tips、プロジェクトの振り返りを記録
            </p>
            <Button
              className="bg-blue-500 text-white font-semibold px-6 hover:bg-blue-600"
              asChild
            >
              <Link href="/blog/new">
                <Plus className="w-4 h-4 mr-2" />
                新規記事作成
              </Link>
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input placeholder="記事を検索..." className="pl-10 bg-white/5 border-white/20 focus:border-[#00D9FF]" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm" className="border-white/20 hover:bg-white/10">
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-white/60 text-lg">記事を読み込み中...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-white/60 text-lg">まだブログ記事がありません</p>
                <Button
                  className="mt-4 bg-blue-500 text-white font-semibold hover:bg-blue-600"
                  asChild
                >
                  <Link href="/blog/new">最初の記事を作成</Link>
                </Button>
              </div>
            ) : (
              blogPosts.map((post) => (
                <GlassCard key={post.id} className="overflow-hidden group hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.created_at)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {calculateReadTime(post.content)}分
                      </div>
                    </div>
                    <CardTitle className="text-xl font-display group-hover:text-[#00D9FF] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-white/70 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10" asChild>
                        <Link href={`/blog/${post.slug}`}>続きを読む</Link>
                      </Button>
                      <div className="flex items-center space-x-2">
                        {!post.published && (
                          <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                            下書き
                          </Badge>
                        )}
                        <BlogActions post={post} onUpdate={fetchBlogPosts} />
                      </div>
                    </div>
                  </CardContent>
                </GlassCard>
              ))
            )}
          </div>

          {/* Load More */}
          {blogPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button size="lg" className="bg-blue-500 text-white font-semibold px-8 hover:bg-blue-600">
                もっと読む
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BlogPage
