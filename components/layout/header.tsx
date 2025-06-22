"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Code2 } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"

const navigation = [
  { name: "About", href: "#about" },
  { name: "Learning", href: "#learning" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Experiments", href: "/experiments" },
  { name: "Blog", href: "/blog" },
  { name: "Records", href: "/learning" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
      <div className="container mx-auto px-4">
        <GlassCard className={`px-6 py-4 transition-all duration-300 ${isScrolled ? "bg-white/10" : "bg-white/5"}`}>
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <GradientText className="text-xl font-bold font-display">AI Portfolio</GradientText>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/70 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Button
                className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold hover:shadow-glow transition-all duration-300"
                asChild
              >
                <Link href="#contact">Contact</Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark-100 border-white/10">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white/70 hover:text-white transition-colors text-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold w-full"
                    asChild
                  >
                    <Link href="#contact">Contact</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </GlassCard>
      </div>
    </header>
  )
}
