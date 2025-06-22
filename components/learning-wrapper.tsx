'use client'

import dynamic from 'next/dynamic'

const LearningVisualizationSection = dynamic(
  () => import("@/components/sections/learning-visualization-section").then(mod => ({ default: mod.LearningVisualizationSection })),
  { 
    ssr: false,
    loading: () => (
      <section id="learning" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-white/60 text-lg">Learning data loading...</div>
          </div>
        </div>
      </section>
    )
  }
)

export function LearningWrapper() {
  return <LearningVisualizationSection />
}