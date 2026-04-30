import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow?: string
  title: React.ReactNode
  copy?: string
  align?: "left" | "center"
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-pretty font-heading text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{copy}</p> : null}
    </div>
  )
}
