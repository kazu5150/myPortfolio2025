import { ExperimentalProjectsSection } from "@/components/sections/experimental-projects-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl modern-heading-thin font-display mb-6">
              <span className="gradient-text">Experimental Projects</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              学習中の実験的なプロジェクトやプロトタイプを公開しています。
              新しい技術の探求と創造的なアイデアの実現に挑戦中。
            </p>
          </div>
          <ExperimentalProjectsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}