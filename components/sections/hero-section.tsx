"use client"

import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">

      <div className="text-center z-10 max-w-6xl mx-auto px-8 md:px-12">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-display mb-8 modern-heading-thin">
            <span className="gradient-text">Matsuzawa,</span>
            <span className="text-white/90"> the AI</span>
            <br />
            <span className="text-white/90 modern-heading">software engineer</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            副業から本業へ転身する開発者の成長記録。
            <br className="hidden md:block" />
            AIとテクノロジーで未来を築く。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white font-light px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25"
              asChild
            >
              <Link href="#portfolio">Start exploring</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <Link
              href="https://github.com"
              className="p-3 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.05] hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-white/10 hover:border-blue-400/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6 text-white/70 hover:text-white transition-colors" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="p-3 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.05] hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-white/10 hover:border-blue-400/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 text-white/70 hover:text-white transition-colors" />
            </Link>
            <Link
              href="mailto:contact@example.com"
              className="p-3 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.05] hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-white/10 hover:border-blue-400/30"
            >
              <Mail className="w-6 h-6 text-white/70 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/50" />
        </div>
      </div>
    </section>
  )
}
