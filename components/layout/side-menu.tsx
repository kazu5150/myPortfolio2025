"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import {
  Home,
  GraduationCap,
  Beaker,
  BookOpen,
  Mail,
  LayoutDashboard,
  Menu,
  X,
  ChevronLeft,
  Code2,
  BrainCircuit,
  Sparkles
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  description?: string
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: <Home className="h-5 w-5" />,
    description: 'Welcome page'
  },
  {
    title: 'Learning Journey',
    href: '/learning',
    icon: <GraduationCap className="h-5 w-5" />,
    description: 'Study progress & analytics'
  },
  {
    title: 'Experiments',
    href: '/experiments',
    icon: <Beaker className="h-5 w-5" />,
    description: 'Projects & prototypes'
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Technical articles'
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    description: 'Admin panel'
  }
]

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // Close menu on route change (mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Menu */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full transition-all duration-300",
          "md:sticky md:top-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <GlassCard className="h-full rounded-none border-r border-white/10 p-4">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Code2 className="h-8 w-8 text-blue-400" />
                    <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-xl font-light tracking-wider text-transparent">
                    AI Portfolio
                  </span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <ChevronLeft className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed && "rotate-180"
                )} />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                      "hover:bg-white/[0.05]",
                      isActive && "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-cyan-400",
                      !isActive && "text-white/70 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "transition-all duration-200",
                      isActive && "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]"
                    )}>
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        {item.description && (
                          <div className="text-xs text-white/50">{item.description}</div>
                        )}
                      </div>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            {!isCollapsed && (
              <div className="mt-auto border-t border-white/10 pt-4">
                <Link
                  href="/#contact"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/70 transition-all duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact</span>
                </Link>
                <div className="mt-4 px-3 text-xs text-white/30">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-3 w-3" />
                    <span>Powered by AI</span>
                  </div>
                  <div className="mt-1">© 2024 Kazu Dev</div>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </aside>
    </>
  )
}