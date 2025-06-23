import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Trophy, TrendingUp, Target, ArrowRight, Flame, BarChart3 } from "lucide-react"
import Link from "next/link"

export function LearningStaticSection() {
  return (
    <section id="learning" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl modern-heading-thin font-display mb-6">
            <span className="gradient-text">Learning Journey</span>
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
          <GlassCard className="p-4 text-center hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">245h</div>
            <div className="text-xs text-white/60">総学習時間</div>
          </GlassCard>

          <GlassCard className="p-4 text-center hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">15日</div>
            <div className="text-xs text-white/60">継続学習</div>
          </GlassCard>

          <GlassCard className="p-4 text-center hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">32.5h</div>
            <div className="text-xs text-white/60">今週の学習</div>
          </GlassCard>

          <GlassCard className="p-4 text-center hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-1">47</div>
            <div className="text-xs text-white/60">学習記録数</div>
          </GlassCard>
        </div>

        {/* Simple CSS-based Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Progress Chart */}
          <GlassCard className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-[#00D9FF]" />
                週別学習時間
              </h3>
              <div className="h-48 flex items-end justify-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-white/60 mb-2">4.5h</div>
                  <div className="w-12 bg-blue-500 rounded-t-lg" style={{ height: '45%' }} />
                  <div className="text-xs text-white/60 mt-2">6/3</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-white/60 mb-2">6.2h</div>
                  <div className="w-12 bg-blue-500 rounded-t-lg" style={{ height: '62%' }} />
                  <div className="text-xs text-white/60 mt-2">6/10</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-white/60 mb-2">8.0h</div>
                  <div className="w-12 bg-blue-500 rounded-t-lg" style={{ height: '80%' }} />
                  <div className="text-xs text-white/60 mt-2">6/17</div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Technology Distribution */}
          <GlassCard className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-700/5" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-[#7C3AED]" />
                技術別学習時間
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">React Native</span>
                    <span className="text-white/60">42h</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">TypeScript</span>
                    <span className="text-white/60">35h</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Next.js</span>
                    <span className="text-white/60">28h</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="h-full bg-blue-700 rounded-full" style={{ width: '56%' }} />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Daily Trend */}
          <GlassCard className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/5 to-blue-800/5" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-[#10B981]" />
                最近の学習
              </h3>
              <div className="h-48 flex items-end justify-center space-x-2">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-white/60 mb-1">5h</div>
                  <div className="w-6 bg-blue-500 rounded-t" style={{ height: '62%' }} />
                  <div className="text-xs text-white/60 mt-1">6/21</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-white/60 mb-1">4h</div>
                  <div className="w-6 bg-blue-500 rounded-t" style={{ height: '50%' }} />
                  <div className="text-xs text-white/60 mt-1">6/22</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}