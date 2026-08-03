import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

import type { AnimationPreset } from "@/builder/types"
import { animateNativeElementReveal } from "@/lib/dom-animations"
import { cn } from "@/lib/utils"

const animationPresets: Record<Exclude<AnimationPreset, "none">, { duration: number; scale?: number; y?: number }> = {
  "fade-in": {
    duration: 650,
    y: 0,
  },
  "fade-up": {
    duration: 720,
    y: 18,
  },
  "scale-soft": {
    duration: 720,
    scale: 0.985,
    y: 10,
  },
}

export function AnimatedBlock({
  children,
  className,
  disabled = false,
  preset = "none",
}: {
  children: ReactNode
  className?: string
  disabled?: boolean
  preset?: AnimationPreset
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    if (disabled || preset === "none") {
      element.style.removeProperty("opacity")
      element.style.removeProperty("transform")
      return
    }

    return animateNativeElementReveal(element, animationPresets[preset])
  }, [disabled, preset])

  return (
    <div ref={ref} className={cn("builder-block", className)}>
      {children}
    </div>
  )
}
