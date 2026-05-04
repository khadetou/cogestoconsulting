import gsap from "gsap"
import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

import type { AnimationPreset } from "@/builder/types"
import { cn } from "@/lib/utils"

const animationPresets: Record<Exclude<AnimationPreset, "none">, gsap.TweenVars> = {
  "fade-in": {
    autoAlpha: 0,
    duration: 0.65,
    ease: "power2.out",
  },
  "fade-up": {
    autoAlpha: 0,
    duration: 0.72,
    ease: "power3.out",
    y: 18,
  },
  "scale-soft": {
    autoAlpha: 0,
    duration: 0.72,
    ease: "power3.out",
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
      gsap.set(element, { clearProps: "all" })
      return
    }

    const { duration, ease, ...fromVars } = animationPresets[preset]
    const tween = gsap.fromTo(
      element,
      fromVars,
      {
        autoAlpha: 1,
        clearProps: "opacity,visibility,transform",
        duration,
        ease,
        scale: "scale" in fromVars ? 1 : undefined,
        y: "y" in fromVars ? 0 : undefined,
      },
    )

    return () => {
      tween.kill()
      gsap.set(element, { clearProps: "opacity,visibility,transform" })
    }
  }, [disabled, preset])

  return (
    <div ref={ref} className={cn("builder-block", className)}>
      {children}
    </div>
  )
}
