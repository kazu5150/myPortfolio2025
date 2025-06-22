"use client"

import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-[#00D9FF]/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D9FF]/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="text-center z-10 max-w-6xl mx-auto px-8 md:px-12">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight">
            <GradientText className="block mb-2">AI & Development</GradientText>
            <span className="text-white">Portfolio</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            副業から本業へ。日々の学習と成長をテクノロジーで可視化し、
            <br className="hidden md:block" />
            未来のキャリアを築いていく開発者のポートフォリオ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="default"
              className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold px-6 py-3 hover:shadow-glow transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="#portfolio">View My Work</Link>
            </Button>
            <Button
              variant="outline"
              size="default"
              className="px-6 py-3 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              asChild
            >
              <Link href="#learning">Learning Journey</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <Link
              href="https://github.com"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-glow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-glow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="mailto:contact@example.com"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-glow"
            >
              <Mail className="w-6 h-6" />
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
