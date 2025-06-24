import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { LearningClientSection } from "@/components/sections/learning-client-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <LearningClientSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </>
  )
}
