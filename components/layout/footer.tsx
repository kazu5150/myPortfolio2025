import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-100/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] rounded-lg"></div>
              <GradientText className="text-xl font-bold font-display">AI Portfolio</GradientText>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              AIとプログラミングの力で、学習を可視化し、成長を加速させる開発者のポートフォリオサイト
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:contact@example.com"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="#about" className="block text-white/70 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#learning" className="block text-white/70 hover:text-white transition-colors">
                Learning
              </Link>
              <Link href="#portfolio" className="block text-white/70 hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link href="/blog" className="block text-white/70 hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <div className="space-y-2">
              <div className="text-white/70">Web Development</div>
              <div className="text-white/70">AI Integration</div>
              <div className="text-white/70">Data Visualization</div>
              <div className="text-white/70">Consulting</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">© 2024 AI Portfolio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
