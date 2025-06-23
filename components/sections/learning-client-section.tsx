'use client'

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Trophy, TrendingUp, Target, ArrowRight, Flame, BarChart3 } from "lucide-react"
import Link from "next/link"
import { getLearningStats, getLearningRecords } from "@/lib/database"
import { LearningRecord } from "@/lib/supabase"

export function LearningClientSection() {
  const [stats, setStats] = useState({
    totalHours: 0,
    recordCount: 0,
    projectCount: 0,
    skillCount: 0
  })
  const [weeklyData, setWeeklyData] = useState<{hours: number, week: string}[]>([])
  const [techData, setTechData] = useState<{tech: string, hours: number, count: number}[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchData = async () => {
      try {
        const [statsData, learningRecords] = await Promise.all([
          getLearningStats('11111111-1111-1111-1111-111111111111'),
          getLearningRecords('11111111-1111-1111-1111-111111111111')
        ])
        
        setStats(statsData)
        
        // 週別データ生成
        const weeklyMap = new Map<string, number>()
        learningRecords.forEach(record => {
          const date = new Date(record.date + 'T00:00:00')
          const dayOfWeek = date.getDay()
          const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
          const weekStart = new Date(date)
          weekStart.setDate(date.getDate() - daysFromMonday)
          const weekLabel = `${weekStart.getMonth() + 1}/${weekStart.getDate()}`
          weeklyMap.set(weekLabel, (weeklyMap.get(weekLabel) || 0) + record.duration / 60)
        })
        
        const weeklyDataArray = Array.from(weeklyMap.entries())
          .map(([week, hours]) => ({ week, hours: Math.round(hours * 10) / 10 }))
          .sort((a, b) => {
            const [aMonth, aDay] = a.week.split('/').map(Number)
            const [bMonth, bDay] = b.week.split('/').map(Number)
            return (aMonth * 100 + aDay) - (bMonth * 100 + bDay)
          })
          .slice(-4)
        
        setWeeklyData(weeklyDataArray)
        
        // 技術別データ生成
        const techMap = new Map<string, {hours: number, count: number}>()
        learningRecords.forEach(record => {
          const hours = record.duration / 60
          record.technologies.forEach(tech => {
            const current = techMap.get(tech) || {hours: 0, count: 0}
            techMap.set(tech, {
              hours: current.hours + hours,
              count: current.count + 1
            })
          })
        })
        
        setTechData(
          Array.from(techMap.entries())
            .map(([tech, {hours, count}]) => ({
              tech,
              hours: Math.round(hours * 10) / 10,
              count
            }))
            .sort((a, b) => b.hours - a.hours)
            .slice(0, 3)
        )
        
      } catch (error) {
        console.error('データの取得に失敗:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [mounted])

  if (!mounted) {
    return (
      <section id="learning" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Learning Journey</h2>
            <p className="text-white/70">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="learning" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            <GradientText>Learning Journey</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
            継続的な学習の軌跡を可視化
          </p>
          <Button
            className="bg-blue-500 text-white font-semibold px-6 hover:bg-blue-600"
            asChild
          >
            <Link href="/learning">
              学習記録を追加
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {loading ? '...' : `${Math.round(stats.totalHours)}h`}
            </div>
            <div className="text-xs text-white/60">総学習時間</div>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {loading ? '...' : stats.recordCount}
            </div>
            <div className="text-xs text-white/60">学習記録数</div>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {loading ? '...' : stats.projectCount}
            </div>
            <div className="text-xs text-white/60">プロジェクト</div>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {loading ? '...' : stats.skillCount}
            </div>
            <div className="text-xs text-white/60">スキル数</div>
          </GlassCard>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Progress */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-[#00D9FF]" />
              週別学習時間
            </h3>
            <div className="h-48">
              {loading ? (
                <div className="flex items-center justify-center h-full text-white/60">
                  データを読み込み中...
                </div>
              ) : weeklyData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-white/60">
                  データがありません
                </div>
              ) : (
                <div className="h-full flex items-end justify-around px-4">
                  {weeklyData.map((week, index) => {
                    const maxHours = Math.max(...weeklyData.map(w => w.hours), 1)
                    const heightPercent = (week.hours / maxHours) * 80
                    return (
                      <div key={`week-${index}`} className="flex flex-col items-center flex-1 mx-1">
                        <div className="text-xs text-white/60 mb-2">{week.hours}h</div>
                        <div className="w-full max-w-[48px] relative h-32">
                          <div 
                            className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-300"
                            style={{ height: `${Math.max(heightPercent, 10)}%` }}
                          />
                        </div>
                        <div className="text-xs text-white/60 mt-2">{week.week}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </GlassCard>

          {/* Technology Distribution */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#7C3AED]" />
              技術別学習時間
            </h3>
            <div className="space-y-3">
              {loading || techData.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-white/60">
                  データを読み込み中...
                </div>
              ) : (
                techData.map((tech, index) => {
                  const maxHours = Math.max(...techData.map(t => t.hours))
                  const width = maxHours > 0 ? (tech.hours / maxHours) * 100 : 0
                  const colors = ['bg-blue-500', 'bg-blue-600', 'bg-blue-700']
                  return (
                    <div key={tech.tech} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">{tech.tech}</span>
                        <span className="text-white/60">{tech.hours}h</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-300`}
                          style={{ width: `${Math.max(width, 5)}%` }}
                        />
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}