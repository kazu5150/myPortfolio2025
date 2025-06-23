import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { ExternalLink, Github, Calendar } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "AI学習記録ダッシュボード",
    description:
      "日々の学習を可視化し、進捗を追跡するWebアプリケーション。Chart.js を使用したグラフ表示と、学習データの分析機能を実装。",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Next.js", "TypeScript", "Chart.js", "Supabase", "Tailwind CSS"],
    liveUrl: "https://learning-dashboard.vercel.app",
    githubUrl: "https://github.com/username/learning-dashboard",
    featured: true,
    date: "2024-01-10",
  },
  {
    title: "AIチャットボット",
    description: "OpenAI API を活用したインテリジェントなチャットボット。コンテキストを理解し、自然な対話を実現。",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Node.js", "OpenAI API", "Socket.io", "MongoDB"],
    liveUrl: "https://ai-chatbot-demo.vercel.app",
    githubUrl: "https://github.com/username/ai-chatbot",
    featured: true,
    date: "2023-12-15",
  },
  {
    title: "ポートフォリオサイト",
    description: "現在ご覧いただいているサイト。ダークテーマとグラスモーフィズムを採用したモダンなデザイン。",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    liveUrl: "https://portfolio.vercel.app",
    githubUrl: "https://github.com/username/portfolio",
    featured: false,
    date: "2024-01-20",
  },
  {
    title: "タスク管理アプリ",
    description: "ドラッグ&ドロップ機能付きのタスク管理アプリ。リアルタイム同期とチーム協業機能を実装。",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "TypeScript", "Supabase", "React DnD", "Zustand"],
    liveUrl: "https://task-manager-app.vercel.app",
    githubUrl: "https://github.com/username/task-manager",
    featured: false,
    date: "2023-11-30",
  },
  {
    title: "Eコマースサイト",
    description: "モダンなEコマースプラットフォーム。決済機能、在庫管理、管理者ダッシュボードを含む。",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "NextAuth.js"],
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/username/ecommerce",
    featured: false,
    date: "2023-10-20",
  },
  {
    title: "データ可視化ツール",
    description: "CSV データをアップロードして、インタラクティブなグラフとチャートを生成するツール。",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "D3.js", "Python", "FastAPI", "Pandas"],
    liveUrl: "https://data-viz-tool.vercel.app",
    githubUrl: "https://github.com/username/data-viz",
    featured: false,
    date: "2023-09-15",
  },
]

export function PortfolioSection() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl modern-heading-thin font-display mb-6">
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light tracking-wide">学習した技術を活用して制作した<span className="gradient-text-secondary font-light">プロジェクト</span>の紹介</p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl modern-heading-thin mb-8 font-display gradient-text-primary">Featured Projects</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <GlassCard key={index} className="overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl modern-heading font-display gradient-text">{project.title}</CardTitle>
                    <div className="flex items-center text-sm text-white/60">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                  </div>
                  <CardDescription className="text-white/60">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-blue-400/20 text-white/90 hover:from-blue-500/20 hover:via-cyan-500/20 hover:to-teal-500/20 transition-all duration-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 text-white/90" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 text-white/90" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl modern-heading-thin mb-8 font-display gradient-text-primary">Other Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <GlassCard key={index} className="overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg modern-heading font-display gradient-text">{project.title}</CardTitle>
                    <div className="flex items-center text-xs text-white/60">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.date}
                    </div>
                  </div>
                  <CardDescription className="text-sm text-white/60 line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-blue-400/20 text-white/90 hover:from-blue-500/20 hover:via-cyan-500/20 hover:to-teal-500/20 transition-all duration-300">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 text-white/90">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 text-white/90 flex-1" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 text-white/90 flex-1" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white font-light px-8 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
