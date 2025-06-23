import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  gradient?: "blue-purple" | "blue-green" | "purple-pink"
}

export function GradientText({ children, className, gradient = "blue-purple", ...props }: GradientTextProps) {
  return (
    <span
      className={cn("text-white modern-heading", className)}
      {...props}
    >
      {children}
    </span>
  )
}
