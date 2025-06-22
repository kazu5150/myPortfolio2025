'use client'

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Calendar, Clock, Trophy, TrendingUp, BookOpen, Code2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getLearningStats, getLearningRecords } from "@/lib/database"
import { LearningRecord } from "@/lib/supabase"


const achievements = [
  { title: "連続学習45日達成", icon: Trophy, color: "from-yellow-400 to-orange-500" },
  { title: "総学習時間1000時間突破", icon: Clock, color: "from-blue-400 to-purple-500" },
  { title: "プロジェクト20個完成", icon: Code2, color: "from-green-400 to-blue-500" },
  { title: "新技術12個習得", icon: BookOpen, color: "from-purple-400 to-pink-500" },
]

export function LearningStatsSection() {
  const [stats, setStats] = useState({
    totalHours: 0,
    recordCount: 0,
    projectCount: 0,
    skillCount: 0
  })
  const [recentLearning, setRecentLearning] = useState<LearningRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, learningData] = await Promise.all([
          getLearningStats('11111111-1111-1111-1111-111111111111'),
          getLearningRecords('11111111-1111-1111-1111-111111111111')
        ])
        setStats(statsData)
        setRecentLearning(learningData.slice(0, 4)) // 最新4件
      } catch (error) {
        console.error('データの取得に失敗:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    return `${mins}m`
  }

  return (
    <section id="learning" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            <GradientText>Learning Journey</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
            日々の学習を可視化し、継続的な成長を追跡
          </p>
          <Button
            className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold px-6"
            asChild
          >
            <Link href="/learning">
              学習記録を管理
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold font-display mb-1">
              {loading ? '...' : `${stats.totalHours}h`}
            </div>
            <div className="text-xs text-white/60">総学習時間</div>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold font-display mb-1">
              {loading ? '...' : stats.recordCount}
            </div>
            <div className="text-xs text-white/60">学習記録数</div>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold font-display mb-1">
              {loading ? '...' : stats.projectCount}
            </div>
            <div className="text-xs text-white/60">完了プロジェクト</div>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold font-display mb-1">
              {loading ? '...' : stats.skillCount}
            </div>
            <div className="text-xs text-white/60">習得技術数</div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Learning */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4 font-display flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-[#00D9FF]" />
              最近の学習記録
            </h3>
            <div className="space-y-6">
              {loading ? (
                <div className="text-center text-white/60 py-8">
                  読み込み中...
                </div>
              ) : recentLearning.length === 0 ? (
                <div className="text-center text-white/60 py-8">
                  学習記録がありません
                </div>
              ) : (
                recentLearning.map((item, index) => (
                  <div key={item.id} className="border-l-2 border-[#00D9FF]/30 pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-[#00D9FF] rounded-full"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{item.description || '学習記録'}</h4>
                    </div>
                    <div className="flex items-center text-sm text-white/60 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDuration(item.duration)}<span className="mx-2">•</span>
                      {formatDate(item.date)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs border-white/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          {/* Achievements */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4 font-display flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-[#00D9FF]" />
              アチーブメント
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center mr-4`}
                  >
                    <achievement.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{achievement.title}</span>
                </div>
              ))}
            </div>

            {/* Learning Streak Visualization */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">学習継続状況</h4>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 49 }, (_, i) => {
                  // 決定的なパターンを使用してハイドレーションエラーを防ぐ
                  const intensity = (i * 7 + 3) % 10 // 0-9の値
                  const className = intensity > 6 ? "bg-[#00D9FF]" : 
                                   intensity > 3 ? "bg-[#00D9FF]/50" : 
                                   "bg-white/10"
                  return (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${className}`}
                      title={`Day ${i + 1}`}
                    />
                  )
                })}
              </div>
              <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>7週間前</span>
                <span>今日</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
