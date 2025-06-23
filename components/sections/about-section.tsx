import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"

const skills = [
  "JavaScript",
  "Next.js", 
  "Python",
  "Docker",
  "Git/GitHub",
  "GAS",
  "GCP",
  "AWS",
  "Supabase",
  "Vercel",
  "Google Workspace",
  "PostgreSQL",
  "各種API連携"
]


export function AboutSection() {
  return (
    <section id="about" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl modern-heading font-display mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light tracking-wide">
            <span className="gradient-text-secondary">AI</span>とプログラミングの力で、学習を可視化し、成長を加速させる開発者
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Profile */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-light mb-4 font-display gradient-text-primary">Profile</h3>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                現在、副業として <span className="gradient-text font-medium">Web 開発</span>に取り組みながら、本業への転換を目指している開発者です。
                <span className="gradient-text-secondary font-medium">AI技術</span>の急速な発展に魅力を感じ、ChatGPT や Claude などのツールを積極的に学習に活用しています。
              </p>
              <p>
                特に、<span className="gradient-text font-medium">学習プロセスの可視化</span>と効率化に興味があり、自身の成長を数値化・グラフ化することで、
                より効果的な学習方法を模索しています。
              </p>
              <p>
                技術的な挑戦だけでなく、<span className="gradient-text-secondary font-medium">ビジネス価値の創出</span>も重視し、
                実用的なアプリケーション開発を通じて実践的なスキルを身につけています。
              </p>
            </div>
          </GlassCard>

          {/* Skills */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-light mb-4 font-display gradient-text-primary">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="text-sm py-1 px-3 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-blue-400/20 text-white/90 hover:from-blue-500/20 hover:via-cyan-500/20 hover:to-teal-500/20 transition-all duration-300"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
