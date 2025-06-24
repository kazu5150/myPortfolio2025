import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Footer } from "@/components/layout/footer"
import { Calendar, Clock, ArrowLeft, Tag, Edit } from "lucide-react"
import Link from "next/link"
import { getBlogPostBySlug } from "@/lib/database"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface BlogDetailPageProps {
  params: {
    slug: string
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  let post
  
  try {
    post = await getBlogPostBySlug(params.slug)
  } catch (error) {
    console.error('ブログ記事の取得に失敗:', error)
    notFound()
  }

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
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
        <div className="max-w-4xl mx-auto px-8 md:px-12">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" className="border-white/20 hover:bg-white/10" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                ブログ一覧に戻る
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <GlassCard className="mb-8">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.created_at)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {calculateReadTime(post.content)}分で読める
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!post.published && (
                    <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                      下書き
                    </Badge>
                  )}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10" asChild>
                      <Link href={`/blog/${post.slug}/edit`}>
                        <Edit className="w-4 h-4 mr-1" />
                        編集
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
                <GradientText>{post.title}</GradientText>
              </h1>
              
              {post.excerpt && (
                <p className="text-lg text-white/70 mb-6">{post.excerpt}</p>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>

          {/* Article Content */}
          <GlassCard>
            <div className="p-8">
              <div className="prose prose-invert prose-lg max-w-none">
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
                        <code 
                          className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-[#00D9FF]" 
                          {...props}
                        >
                          {children}
                        </code>
                      )
                    },
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-white/80 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="text-white/80 mb-4 space-y-2 list-disc list-inside">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="text-white/80 mb-4 space-y-2 list-decimal list-inside">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-white/80">
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-[#00D9FF] pl-4 py-2 my-4 bg-white/5 rounded-r">
                        <div className="text-white/80 italic">
                          {children}
                        </div>
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a 
                        href={href} 
                        className="text-[#00D9FF] hover:text-[#0EA5E9] underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </GlassCard>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-blue-500 text-white font-semibold px-8 hover:bg-blue-600"
              asChild
            >
              <Link href="/blog">他の記事を読む</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}