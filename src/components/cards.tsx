import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function ExpertiseCard({
  featured = false,
  image,
  imagePosition = "center center",
  tag = "Fonctionnelle",
  title,
  summary,
}: {
  featured?: boolean
  image: string
  imagePosition?: string
  tag?: string
  title: string
  summary: string
}) {
  return (
    <article
      className={cn(
        "group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[28px] border p-5 md:min-h-[470px] md:p-6",
        featured
          ? "border-[#978360] bg-[#0c1422] text-white shadow-[0_38px_80px_rgba(5,8,18,0.24)]"
          : "border-slate-200/80 bg-white text-slate-950 shadow-[0_20px_55px_rgba(15,23,42,0.06)]",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={cn(
            "inline-flex rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
            featured ? "border-white/12 bg-white/6 text-white/72" : "border-slate-200 bg-slate-50 text-slate-500",
          )}
        >
          {tag}
        </span>
        <span
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-full border transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            featured ? "border-white/12 bg-white/8 text-white" : "border-slate-200 bg-white text-slate-500",
          )}
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <h3 className="mt-6 max-w-[12ch] font-heading text-[1.7rem] leading-[1.12] tracking-[-0.05em]">
        {title}
      </h3>
      <p className={cn("mt-3 max-w-[28ch] text-[0.97rem] leading-6", featured ? "text-white/68" : "text-slate-500")}>
        {summary}
      </p>

      <div className="mt-auto pt-8">
        <div className={cn("relative h-[170px] overflow-hidden rounded-[22px] border bg-[linear-gradient(180deg,#dde7ee_0%,#cfdbe4_100%)] md:h-[190px]", featured ? "border-white/12" : "border-slate-200/80")}>
          <img
            src={image}
            alt={title}
            style={{ objectPosition: imagePosition }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] [filter:saturate(0.94)_contrast(1.08)_brightness(1.05)]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.24),transparent_24%)]" />
          <div
            className={cn(
              "absolute inset-0",
              featured
                ? "bg-[linear-gradient(180deg,rgba(151,131,96,0.08),rgba(5,8,18,0.34))]"
                : "bg-[linear-gradient(180deg,rgba(10,20,32,0.02),rgba(10,20,32,0.18))]",
            )}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/26 to-transparent" />
        </div>
      </div>
    </article>
  )
}

export function EventCard({
  date,
  image,
  title,
  summary,
}: {
  date: string
  image: string
  title: string
  summary: string
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-[220px] overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] [filter:saturate(0.9)_contrast(1.08)_brightness(1.05)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.2),transparent_26%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <p className="absolute left-4 top-4 rounded-full border border-white/18 bg-white/14 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {date}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-[1.42rem] leading-[1.15] tracking-[-0.04em] text-slate-950">{title}</h3>
        <p className="mt-3 text-[0.98rem] leading-6 text-slate-600">{summary}</p>
      </div>
    </article>
  )
}

export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
        <span className="text-sm font-bold">✓</span>
      </span>
      <span className="text-sm leading-6 text-slate-700">{children}</span>
    </div>
  )
}
