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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            <GradientText>About Me</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            AIとプログラミングの力で、学習を可視化し、成長を加速させる開発者
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Profile */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4 font-display">Profile</h3>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                現在、副業として Web 開発に取り組みながら、本業への転換を目指している開発者です。
                AI技術の急速な発展に魅力を感じ、ChatGPT や Claude などのツールを積極的に学習に活用しています。
              </p>
              <p>
                特に、学習プロセスの可視化と効率化に興味があり、自身の成長を数値化・グラフ化することで、
                より効果的な学習方法を模索しています。
              </p>
              <p>
                技術的な挑戦だけでなく、ビジネス価値の創出も重視し、
                実用的なアプリケーション開発を通じて実践的なスキルを身につけています。
              </p>
            </div>
          </GlassCard>

          {/* Skills */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4 font-display">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="text-sm py-1 px-3 bg-white/5 border-white/20 hover:bg-white/10 transition-colors"
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
