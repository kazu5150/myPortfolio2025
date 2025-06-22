'use client'

import { useState, useEffect, useMemo } from 'react'
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Trophy, TrendingUp, Target, ArrowRight, Flame, BarChart3, PieChart } from "lucide-react"
import Link from "next/link"
import { getLearningStats, getLearningRecords } from "@/lib/database"
import { LearningRecord } from "@/lib/supabase"

interface LearningDay {
  date: string
  hours: number
  level: 0 | 1 | 2 | 3 | 4
}

export function LearningVisualizationSection() {
  const [stats, setStats] = useState({
    totalHours: 0,
    recordCount: 0,
    projectCount: 0,
    skillCount: 0
  })
  const [recentLearning, setRecentLearning] = useState<LearningRecord[]>([])
  const [allLearningRecords, setAllLearningRecords] = useState<LearningRecord[]>([])
  const [learningData, setLearningData] = useState<LearningDay[]>([])
  const [loading, setLoading] = useState(true)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [weeklyData, setWeeklyData] = useState<{hours: number, week: string}[]>([])
  const [techData, setTechData] = useState<{tech: string, hours: number, count: number}[]>([])
  const [dailyTrend, setDailyTrend] = useState<{date: string, hours: number}[]>([])
  const [thisWeekHours, setThisWeekHours] = useState(0)
  const [thisWeekDays, setThisWeekDays] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('データ取得開始...')
        const [statsData, learningRecords] = await Promise.all([
          getLearningStats('11111111-1111-1111-1111-111111111111'),
          getLearningRecords('11111111-1111-1111-1111-111111111111')
        ])
        
        console.log('取得したstatsData:', statsData)
        console.log('取得したlearningRecords:', learningRecords)
        console.log('learningRecords.length:', learningRecords.length)
        
        if (learningRecords.length === 0) {
          console.warn('⚠️ 学習記録が見つかりません。データベースに記録がないか、ユーザーIDが間違っている可能性があります。')
        }
        
        setStats(statsData)
        setAllLearningRecords(learningRecords)
        setRecentLearning(learningRecords.slice(0, 3))
        
        // 学習ヒートマップデータを生成
        const heatmapData = generateLearningHeatmap(learningRecords)
        setLearningData(heatmapData)
        
        // ストリーク計算
        const streak = calculateCurrentStreak(heatmapData)
        setCurrentStreak(streak)
        
        // 週別データ生成
        const weeklyStats = generateWeeklyData(learningRecords)
        console.log('Weekly data:', weeklyStats)
        setWeeklyData(weeklyStats)
        
        // 技術別データ生成
        const techStats = generateTechData(learningRecords)
        console.log('Tech data:', techStats)
        setTechData(techStats)
        
        // 日別トレンドデータ生成
        const dailyStats = generateDailyTrend(learningRecords)
        console.log('Daily trend data:', dailyStats)
        setDailyTrend(dailyStats)
        
        // 今週の学習時間と日数を計算
        const calculateWeekStats = () => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const dayOfWeek = today.getDay()
          const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
          const weekStart = new Date(today)
          weekStart.setDate(today.getDate() - daysFromMonday)
          weekStart.setHours(0, 0, 0, 0)
          
          const weekStartStr = weekStart.toISOString().split('T')[0]
          const todayStr = today.toISOString().split('T')[0]
          
          const thisWeekRecords = learningRecords.filter(record => {
            const recordDate = record.date.split('T')[0]
            return recordDate >= weekStartStr && recordDate <= todayStr
          })
          
          const weekHours = thisWeekRecords.reduce((sum, record) => sum + (record.duration / 60), 0)
          const weekDays = new Set(thisWeekRecords.map(record => record.date.split('T')[0])).size
          
          setThisWeekHours(weekHours)
          setThisWeekDays(weekDays)
        }
        
        calculateWeekStats()
        
        console.log('All learning records:', learningRecords)
        
      } catch (error) {
        console.error('データの取得に失敗:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const generateLearningHeatmap = (records: LearningRecord[]): LearningDay[] => {
    // Use a fixed date for consistency between server and client
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 60) // 過去60日間を表示
    const data: LearningDay[] = []
    
    console.log('Generating heatmap for records:', records)
    console.log('Start date:', startDate, 'Today:', today)
    console.log('Records dates:', records.map(r => r.date))
    
    // Generate date strings deterministically
    const currentDate = new Date(startDate)
    while (currentDate <= today) {
      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      
      const dayRecords = records.filter(record => {
        const recordDate = record.date.split('T')[0] // 時間部分を除去
        console.log('Comparing:', recordDate, 'with', dateStr)
        return recordDate === dateStr
      })
      const totalMinutes = dayRecords.reduce((sum, record) => sum + record.duration, 0)
      const hours = totalMinutes / 60
      
      let level: 0 | 1 | 2 | 3 | 4 = 0
      if (hours > 0) level = 1
      if (hours >= 1) level = 2
      if (hours >= 2) level = 3
      if (hours >= 3) level = 4
      
      console.log(`Date: ${dateStr}, Hours: ${hours}, Level: ${level}, Records: ${dayRecords.length}`)
      
      data.push({
        date: dateStr,
        hours,
        level
      })
      
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    console.log('Generated heatmap data:', data)
    return data
  }

  const calculateCurrentStreak = (data: LearningDay[]) => {
    if (data.length === 0) return 0
    
    let streak = 0
    // Start from the end (most recent date) and work backwards
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].level > 0) {
        streak++
      } else {
        // If we find a day with no learning, check if it's the current streak
        // Only break if we've already started counting
        if (streak > 0) break
      }
    }
    
    return streak
  }

  const generateWeeklyData = (records: LearningRecord[]) => {
    const weeklyMap = new Map<string, number>()
    
    console.log('Records for weekly data:', records.map(r => ({ date: r.date, duration: r.duration })))
    
    records.forEach(record => {
      const date = new Date(record.date + 'T00:00:00') // タイムゾーンの問題を避ける
      console.log(`Processing record date: ${record.date}, parsed date: ${date.toISOString()}, day of week: ${date.getDay()}`)
      
      // 月曜日ベースの週計算 (修正版)
      const dayOfWeek = date.getDay() // 0=日曜日, 1=月曜日, ..., 6=土曜日
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // 日曜日の場合は6日前が月曜日
      
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - daysFromMonday)
      
      const weekLabel = `${weekStart.getMonth() + 1}/${weekStart.getDate()}`
      
      const hours = record.duration / 60
      console.log(`Record date: ${record.date}, Day of week: ${dayOfWeek}, Days from Monday: ${daysFromMonday}`)
      console.log(`Week start: ${weekStart.toDateString()}, Week label: ${weekLabel}, Hours: ${hours}`)
      
      weeklyMap.set(weekLabel, (weeklyMap.get(weekLabel) || 0) + hours)
    })
    
    console.log('Weekly map:', Array.from(weeklyMap.entries()))
    
    return Array.from(weeklyMap.entries())
      .map(([week, hours]) => ({
        week,
        hours: Math.round(hours * 10) / 10
      }))
      .sort((a, b) => {
        // 日付順でソート
        const [aMonth, aDay] = a.week.split('/').map(Number)
        const [bMonth, bDay] = b.week.split('/').map(Number)
        return (aMonth * 100 + aDay) - (bMonth * 100 + bDay)
      })
      .slice(-8) // 直近8週間
  }

  const generateTechData = (records: LearningRecord[]) => {
    const techMap = new Map<string, {hours: number, count: number}>()
    
    records.forEach(record => {
      const hours = record.duration / 60
      record.technologies.forEach(tech => {
        const current = techMap.get(tech) || {hours: 0, count: 0}
        techMap.set(tech, {
          hours: current.hours + hours,
          count: current.count + 1
        })
      })
    })
    
    return Array.from(techMap.entries())
      .map(([tech, {hours, count}]) => ({
        tech,
        hours: Math.round(hours * 10) / 10,
        count
      }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 6) // 上位6技術
  }

  const generateDailyTrend = (records: LearningRecord[]) => {
    const dailyMap = new Map<string, number>()
    
    records.forEach(record => {
      const dateKey = record.date.split('T')[0] // 日付部分のみ
      const hours = record.duration / 60
      dailyMap.set(dateKey, (dailyMap.get(dateKey) || 0) + hours)
    })
    
    return Array.from(dailyMap.entries())
      .map(([date, hours]) => ({
        date,
        hours: Math.round(hours * 10) / 10
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14) // 直近14日間
  }

  const getIntensityColor = (level: 0 | 1 | 2 | 3 | 4) => {
    const colors = {
      0: 'bg-white/5',
      1: 'bg-[#00D9FF]/20',
      2: 'bg-[#00D9FF]/40',
      3: 'bg-[#00D9FF]/70',
      4: 'bg-[#00D9FF]'
    }
    return colors[level]
  }

  const getAdvancedIntensityColor = (level: 0 | 1 | 2 | 3 | 4) => {
    const colors = {
      0: 'bg-white/5 border border-white/10',
      1: 'bg-gradient-to-br from-[#0d4429]/80 to-[#006d32]/60 border border-[#0d4429]/60 shadow-[0_0_8px_rgba(13,68,41,0.4)]',
      2: 'bg-gradient-to-br from-[#006d32]/90 to-[#26a641]/70 border border-[#006d32]/70 shadow-[0_0_12px_rgba(0,109,50,0.5)]',
      3: 'bg-gradient-to-br from-[#26a641] to-[#39d353]/80 border border-[#26a641]/80 shadow-[0_0_16px_rgba(38,166,65,0.6)]',
      4: 'bg-gradient-to-br from-[#39d353] to-[#2ea043] border border-[#39d353] shadow-[0_0_20px_rgba(57,211,83,0.8)]'
    }
    return colors[level]
  }

  const formatDate = useMemo(() => (dateString: string) => {
    // Use a deterministic date format to avoid hydration issues
    try {
      // Ensure consistent date parsing
      const cleanDateString = dateString.split('T')[0]
      const [year, month, day] = cleanDateString.split('-').map(Number)
      const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      return `${monthNames[month - 1]}${day}日`
    } catch (error) {
      console.error('Error formatting date:', dateString, error)
      return dateString
    }
  }, [])



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
            className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold px-6"
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
          <GlassCard className="p-4 text-center hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {loading ? '...' : `${Math.round(stats.totalHours)}h`}
            </div>
            <div className="text-xs text-white/60">総学習時間</div>
          </GlassCard>

          <GlassCard className="p-4 text-center hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="w-8 h-8 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {loading ? '...' : `${currentStreak}日`}
            </div>
            <div className="text-xs text-white/60">継続学習</div>
          </GlassCard>

          <GlassCard className="p-4 text-center hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="w-8 h-8 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {loading ? '...' : `${Math.round(thisWeekHours * 10) / 10}h`}
            </div>
            <div className="text-xs text-white/60">今週の学習</div>
          </GlassCard>

          <GlassCard className="p-4 text-center hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="w-8 h-8 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {loading ? '...' : stats.recordCount}
            </div>
            <div className="text-xs text-white/60">学習記録数</div>
          </GlassCard>
        </div>

        {/* Simple CSS-based Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Progress Chart */}
          <GlassCard className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#0EA5E9]/5" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-[#00D9FF]" />
                週別学習時間
              </h3>
              <div className="h-48">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-white/60">
                    データを読み込み中...
                  </div>
                ) : weeklyData.length > 0 ? (
                  <div className="h-full flex items-end justify-center space-x-4">
                    {weeklyData.map((week, index) => {
                      const maxHours = Math.max(...weeklyData.map(w => w.hours))
                      const height = maxHours > 0 ? (week.hours / maxHours) * 100 : 0
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div className="text-xs text-white/60 mb-2">{week.hours}h</div>
                          <div 
                            className="w-12 bg-gradient-to-t from-[#00D9FF] to-[#0EA5E9] rounded-t-lg transition-all duration-300 hover:scale-105"
                            style={{ height: `${Math.max(height, 5)}%` }}
                          />
                          <div className="text-xs text-white/60 mt-2">{week.week}</div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60">
                    学習データがありません
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Technology Distribution */}
          <GlassCard className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-[#A855F7]/5" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-[#7C3AED]" />
                技術別学習時間
              </h3>
              <div className="h-48">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-white/60">
                    データを読み込み中...
                  </div>
                ) : techData.length > 0 ? (
                  <div className="space-y-3">
                    {techData.slice(0, 4).map((tech, index) => {
                      const maxHours = Math.max(...techData.map(t => t.hours))
                      const width = maxHours > 0 ? (tech.hours / maxHours) * 100 : 0
                      const colors = ['from-[#00D9FF] to-[#0EA5E9]', 'from-[#7C3AED] to-[#A855F7]', 'from-[#10B981] to-[#059669]', 'from-[#F59E0B] to-[#D97706]']
                      return (
                        <div key={tech.tech} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">{tech.tech}</span>
                            <span className="text-white/60">{tech.hours}h</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-full transition-all duration-300`}
                              style={{ width: `${Math.max(width, 5)}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60">
                    学習データがありません
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Daily Trend */}
          <GlassCard className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 to-[#059669]/5" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-[#10B981]" />
                最近の学習
              </h3>
              <div className="h-48">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-white/60">
                    データを読み込み中...
                  </div>
                ) : dailyTrend.length > 0 ? (
                  <div className="h-full flex items-end justify-center space-x-2">
                    {dailyTrend.slice(-7).map((day, index) => {
                      const maxHours = Math.max(...dailyTrend.map(d => d.hours))
                      const height = maxHours > 0 ? (day.hours / maxHours) * 100 : 0
                      return (
                        <div key={day.date} className="flex flex-col items-center">
                          <div className="text-xs text-white/60 mb-1">{day.hours}h</div>
                          <div 
                            className="w-6 bg-gradient-to-t from-[#10B981] to-[#34D399] rounded-t transition-all duration-300 hover:scale-110"
                            style={{ height: `${Math.max(height, 5)}%` }}
                          />
                          <div className="text-xs text-white/60 mt-1 transform rotate-45 origin-bottom-left">
                            {formatDate(day.date)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60">
                    学習データがありません
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Advanced Learning Visualization */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Interactive Learning Heatmap */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 relative overflow-hidden">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 via-transparent to-[#7C3AED]/5 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold font-display flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] rounded-lg flex items-center justify-center mr-3">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    学習アクティビティマップ
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-white/60">
                    <span>低</span>
                    <div className="flex space-x-1">
                      {[0, 1, 2, 3, 4].map(level => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-full ${getAdvancedIntensityColor(level as 0 | 1 | 2 | 3 | 4)} shadow-lg`}
                        />
                      ))}
                    </div>
                    <span>高</span>
                  </div>
                </div>
                
                {loading ? (
                  <div className="text-center text-white/60 py-12">
                    <div className="animate-pulse space-y-2">
                      {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="flex space-x-2 justify-center">
                          {Array.from({ length: 12 }, (_, j) => (
                            <div key={j} className="w-4 h-4 bg-white/10 rounded-lg" />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Enhanced month labels */}
                    <div className="flex justify-between text-sm text-white/70 font-medium">
                      {(() => {
                        const months = []
                        const totalWeeks = Math.ceil(learningData.length / 7)
                        for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex += 4) {
                          const dataIndex = weekIndex * 7
                          const day = learningData[dataIndex]
                          if (day) {
                            const [year, monthStr, dayStr] = day.date.split('-')
                            const month = parseInt(monthStr, 10)
                            if (month >= 6) {
                              months.push(
                                <span key={weekIndex} className="flex items-center">
                                  <div className="w-2 h-2 bg-[#00D9FF] rounded-full mr-2" />
                                  {(() => {
                                    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                                    return monthNames[month - 1]
                                  })()}
                                </span>
                              )
                            }
                          }
                        }
                        return months
                      })()}
                    </div>
                    
                    {/* Enhanced heatmap with animations */}
                    <div className="p-4 bg-gradient-to-br from-black/30 via-[#26a641]/5 to-black/30 rounded-xl border border-white/20 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                      {/* Background animated gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#26a641]/10 via-transparent to-[#39d353]/10 animate-pulse opacity-50" />
                      <div className="relative z-10">
                      {(() => {
                        const totalDays = learningData.length
                        const totalWeeks = Math.ceil(totalDays / 7)
                        
                        return (
                          <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${Math.min(totalWeeks, 12)}, 1fr)` }}>
                            {Array.from({ length: Math.min(totalWeeks, 12) }, (_, weekIndex) => (
                              <div key={weekIndex} className="flex flex-col gap-2">
                                {Array.from({ length: 7 }, (_, dayIndex) => {
                                  const dataIndex = weekIndex * 7 + dayIndex
                                  const day = learningData[dataIndex]
                                  if (!day) return <div key={dayIndex} className="w-4 h-4" />
                                  
                                  return (
                                    <div
                                      key={dayIndex}
                                      className={`
                                        w-4 h-4 rounded-lg cursor-pointer transform transition-all duration-500 
                                        hover:scale-150 hover:rotate-12 hover:shadow-2xl hover:z-20 relative
                                        ${getAdvancedIntensityColor(day.level)} 
                                        ${day.level > 0 ? 'animate-pulse hover:animate-bounce' : 'hover:bg-white/20'}
                                        before:absolute before:inset-0 before:rounded-lg before:transition-all before:duration-300
                                        ${day.level > 0 ? 'before:animate-pulse before:bg-gradient-to-r before:from-[#00D9FF]/20 before:to-[#7C3AED]/20' : ''}
                                      `}
                                      style={{
                                        animationDelay: `${(weekIndex * 7 + dayIndex) * 50}ms`,
                                        animationDuration: day.level > 0 ? `${2 + day.level * 0.5}s` : '2s',
                                        filter: day.level > 0 ? `brightness(${1 + day.level * 0.2}) saturate(${1 + day.level * 0.3})` : 'brightness(0.8)'
                                      }}
                                      title={`${formatDate(day.date)}: ${day.hours.toFixed(1)}時間`}
                                    />
                                  )
                                })}
                              </div>
                            ))}
                          </div>
                        )
                      })()}
                      </div>
                    </div>
                    
                    {/* Date labels */}
                    <div className="flex justify-between text-xs text-white/60 font-medium mt-4">
                      {(() => {
                        const dates = []
                        const totalWeeks = Math.ceil(learningData.length / 7)
                        for (let weekIndex = 0; weekIndex < Math.min(totalWeeks, 12); weekIndex += 2) {
                          const dataIndex = weekIndex * 7
                          const day = learningData[dataIndex]
                          if (day) {
                            dates.push(
                              <span key={weekIndex} className="text-center">
                                {formatDate(day.date)}
                              </span>
                            )
                          }
                        }
                        return dates
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Learning Insights Panel */}
          <div className="space-y-6">
            {/* Streak Tracker */}
            <GlassCard className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 to-[#00D9FF]/10" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-orange-400" />
                  学習ストリーク
                </h3>
                <div className="text-center">
                  <div className="relative">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2">
                      {currentStreak}
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full blur-xl animate-pulse" />
                  </div>
                  <div className="text-sm text-white/60 mb-4">連続学習日数</div>
                  <div className="flex justify-center space-x-1">
                    {Array.from({ length: Math.min(currentStreak, 7) }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-8 bg-gradient-to-t from-orange-400 to-orange-300 rounded-full animate-bounce animation-delay-${i}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Weekly Progress */}
            <GlassCard className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 to-[#00D9FF]/10" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#10B981]" />
                  今週の進捗
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">学習時間</span>
                    <span className="font-bold text-[#00D9FF] text-lg">
                      {Math.round(thisWeekHours * 10) / 10}h
                    </span>
                  </div>
                  
                  {/* Animated progress bar */}
                  <div className="relative">
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00D9FF] to-[#10B981] rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ width: `${Math.min((thisWeekHours / 10) * 100, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    <div className="text-xs text-white/60 text-center mt-2">
                      目標: 10時間/週
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">学習日数</span>
                    <span className="font-bold text-[#10B981]">
                      {thisWeekDays}/7日
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Recent Learning Activities */}
        {recentLearning.length > 0 && (
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4 font-display flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#00D9FF]" />
              最近の学習記録
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {recentLearning.map((record) => (
                <div key={record.id} className="border-l-2 border-[#00D9FF]/30 pl-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-sm font-bold bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] bg-clip-text text-transparent mb-2">
                        {record.title}
                      </div>
                      <div className="text-xs text-[#00D9FF] font-medium">
                        {Math.floor(record.duration / 60)}h {record.duration % 60}m
                      </div>
                    </div>
                    <div className="text-xs text-white/60">
                      {formatDate(record.date)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {record.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-white/10 text-white/70 border-white/20">
                        {tech}
                      </Badge>
                    ))}
                    {record.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-white/10 text-white/70 border-white/20">
                        +{record.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  {record.image_url && (
                    <div className="mt-2">
                      <img
                        src={record.image_url}
                        alt={record.title}
                        className="w-16 h-16 object-cover rounded border border-white/20"
                      />
                    </div>
                  )}
                  {record.description && (
                    <p className="text-xs text-white/70 line-clamp-2">
                      {record.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </section>
  )
}