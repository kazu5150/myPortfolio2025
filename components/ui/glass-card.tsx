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
        "bg-white/[0.02] border border-white/10 rounded-lg",
        "hover:bg-white/[0.03] transition-colors duration-200",
        glow && "shadow-lg shadow-blue-500/5",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  )
}
