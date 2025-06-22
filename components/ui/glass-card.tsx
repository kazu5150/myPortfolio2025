import type React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glow?: boolean
}

export function GlassCard({ children, className, glow = false, ...props }: GlassCardProps) {
  return (
    <Card
      className={cn(
        "bg-white/5 backdrop-blur-lg border border-white/10",
        "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
        glow && "hover:shadow-glow",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  )
}
