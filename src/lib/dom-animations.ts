type NativeRevealOptions = {
  duration?: number
  scale?: number
  stagger?: number
  y?: number
}

const revealEasing = "cubic-bezier(0.22, 1, 0.36, 1)"

export function animateNativeReveal(
  scope: HTMLElement,
  selector: string,
  {
    duration = 700,
    scale = 1,
    stagger = 0,
    y = 18,
  }: NativeRevealOptions = {},
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => undefined

  const animations = Array.from(scope.querySelectorAll<HTMLElement>(selector)).map((element, index) =>
    element.animate(
      [
        {
          opacity: 0,
          transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) scale(1)",
        },
      ],
      {
        delay: index * stagger,
        duration,
        easing: revealEasing,
        fill: "backwards",
      },
    ),
  )

  return () => {
    animations.forEach((animation) => animation.cancel())
  }
}

export function animateNativeElementReveal(
  element: HTMLElement,
  {
    duration = 700,
    scale = 1,
    y = 18,
  }: Omit<NativeRevealOptions, "stagger"> = {},
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => undefined

  const animation = element.animate(
    [
      {
        opacity: 0,
        transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
      },
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
      },
    ],
    {
      duration,
      easing: revealEasing,
      fill: "backwards",
    },
  )

  return () => animation.cancel()
}
