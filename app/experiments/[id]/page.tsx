import { notFound } from 'next/navigation'
import { getExperimentalProjectById } from '@/lib/database'
import { ExperimentalProjectDetail } from '@/components/sections/experimental-project-detail'
import { Footer } from '@/components/layout/footer'

export default async function ExperimentProjectPage({ params }: { params: { id: string } }) {
  const project = await getExperimentalProjectById(params.id)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <main className="pt-20">
        <ExperimentalProjectDetail project={project} />
      </main>
      <Footer />
    </div>
  )
}