'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientText } from '@/components/ui/gradient-text'
import { getSkills, getProjects, getBlogPosts } from '@/lib/database'
import type { Skill, Project, BlogPost } from '@/lib/supabase'

export default function TestDatabasePage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tested, setTested] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setError(null)
    setTested(true)
    try {
      const [skillsData, projectsData, blogPostsData] = await Promise.all([
        getSkills(),
        getProjects(),
        getBlogPosts()
      ])
      
      setSkills(skillsData)
      setProjects(projectsData)
      setBlogPosts(blogPostsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'データベース接続エラー')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 py-20">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            <GradientText>Database Test</GradientText>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Supabaseデータベース接続のテスト
          </p>
          
          <Button 
            onClick={testConnection} 
            disabled={loading}
            className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold px-8"
          >
            {loading ? '接続中...' : 'データベース接続テスト'}
          </Button>
        </div>

        {error && (
          <GlassCard className="p-6 mb-8 border-red-500/20">
            <h3 className="text-xl font-bold text-red-400 mb-2">エラー</h3>
            <p className="text-red-300">{error}</p>
            <div className="mt-4 text-sm text-white/60">
              <p>• .env.localファイルが設定されているか確認してください</p>
              <p>• SupabaseのURL、API Keyが正しいか確認してください</p>
              <p>• schema.sqlとseed.sqlが実行されているか確認してください</p>
            </div>
          </GlassCard>
        )}

        {tested && !error && !loading && (skills.length > 0 || projects.length > 0 || blogPosts.length > 0) && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Skills */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-4">スキル ({skills.length}件)</h2>
              <div className="space-y-2">
                {skills.slice(0, 5).map(skill => (
                  <div key={skill.id} className="flex justify-between">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm text-[#00D9FF]">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Projects */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-4">プロジェクト ({projects.length}件)</h2>
              <div className="space-y-2">
                {projects.slice(0, 3).map(project => (
                  <div key={project.id}>
                    <p className="text-sm font-medium">{project.title}</p>
                    <p className="text-xs text-white/60 mb-2">{project.description.slice(0, 50)}...</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Blog Posts */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-4">ブログ記事 ({blogPosts.length}件)</h2>
              <div className="space-y-2">
                {blogPosts.slice(0, 3).map(post => (
                  <div key={post.id}>
                    <p className="text-sm font-medium">{post.title}</p>
                    <p className="text-xs text-white/60 mb-2">{post.excerpt?.slice(0, 50)}...</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {!tested && !error && !loading && (
          <GlassCard className="p-6 text-center">
            <p className="text-white/70">「データベース接続テスト」ボタンをクリックしてください</p>
          </GlassCard>
        )}
      </div>
    </div>
  )
}