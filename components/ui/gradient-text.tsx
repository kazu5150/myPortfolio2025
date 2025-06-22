import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  gradient?: "blue-purple" | "blue-green" | "purple-pink"
}

export function GradientText({ children, className, gradient = "blue-purple", ...props }: GradientTextProps) {
  const gradients = {
    "blue-purple": "from-[#00D9FF] to-[#7C3AED]",
    "blue-green": "from-[#00D9FF] to-[#10B981]",
    "purple-pink": "from-[#7C3AED] to-[#EC4899]",
  }

  return (
    <span
      className={cn("bg-gradient-to-r bg-clip-text text-transparent font-bold", gradients[gradient], className)}
      {...props}
    >
      {children}
    </span>
  )
}
