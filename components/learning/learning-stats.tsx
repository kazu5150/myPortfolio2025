'use client'

import { useState, useEffect } from 'react'
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Clock, Calendar, Target, TrendingUp } from "lucide-react"
import { getLearningStats } from "@/lib/database"

interface LearningStatsData {
  totalHours: number
  recordCount: number
  projectCount: number
  skillCount: number
}

export function LearningStats() {
  const [stats, setStats] = useState<LearningStatsData>({
    totalHours: 0,
    recordCount: 0,
    projectCount: 0,
    skillCount: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getLearningStats('11111111-1111-1111-1111-111111111111')
        setStats(data)
      } catch (error) {
        console.error('統計データの取得に失敗:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statItems = [
    {
      icon: Clock,
      label: "総学習時間",
      value: loading ? "..." : `${stats.totalHours}時間`,
      color: "text-[#00D9FF]"
    },
    {
      icon: Calendar,
      label: "学習記録数",
      value: loading ? "..." : `${stats.recordCount}回`,
      color: "text-[#7C3AED]"
    },
    {
      icon: Target,
      label: "習得技術数",
      value: loading ? "..." : `${stats.skillCount}個`,
      color: "text-[#10B981]"
    },
    {
      icon: TrendingUp,
      label: "完了プロジェクト",
      value: loading ? "..." : `${stats.projectCount}個`,
      color: "text-[#F59E0B]"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => (
        <GlassCard key={item.label} className="text-center hover:bg-white/5 transition-all duration-300">
          <CardContent className="p-6">
            <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
            <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
            <p className="text-sm text-white/60">{item.label}</p>
          </CardContent>
        </GlassCard>
      ))}
    </div>
  )
}