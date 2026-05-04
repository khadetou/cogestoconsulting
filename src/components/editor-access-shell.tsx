import { CheckCircle2, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type EditorAccessShellProps = {
  children: ReactNode
  description: string
  eyebrow: string
  icon?: LucideIcon
  title: string
}

const accessPoints = ["Pages Cogesto", "Brouillons et publication", "Accès éditeur sécurisé"]

export function EditorAccessShell({ children, description, eyebrow, icon: Icon = ShieldCheck, title }: EditorAccessShellProps) {
  return (
    <main className="relative min-h-svh overflow-hidden bg-[#101a2d] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#978360]/60" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050812]/55 to-transparent" />

      <section className="relative mx-auto grid min-h-svh w-full max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
        <aside className="hidden lg:block">
          <div className="inline-flex h-16 w-[190px] items-center justify-center">
            <img
              alt="Cogesto Consulting"
              className="h-full w-full object-contain brightness-0 invert drop-shadow-[0_16px_28px_rgba(5,8,18,0.34)]"
              decoding="async"
              src="/brand/cogesto-logo-official.svg"
            />
          </div>

          <div className="mt-14 max-w-xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#c8b58f]">Cogesto Builder</p>
            <h2 className="mt-5 max-w-lg font-heading text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white">
              Éditer le contenu sans toucher au design.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/66">
              L’espace éditeur garde les pages Cogesto structurées, publiables et alignées avec la charte visuelle.
            </p>
          </div>

          <div className="mt-10 grid max-w-md gap-3">
            {accessPoints.map((point) => (
              <div
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white/78"
                key={point}
              >
                <CheckCircle2 className="size-4 shrink-0 text-[#c8b58f]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="mx-auto w-full max-w-[31rem] lg:mx-0 lg:justify-self-end">
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <img
              alt="Cogesto Consulting"
              className="h-14 w-auto brightness-0 invert drop-shadow-[0_12px_24px_rgba(5,8,18,0.32)]"
              decoding="async"
              src="/brand/cogesto-logo-official.svg"
            />
          </div>

          <div className="rounded-[28px] border border-white/12 bg-[#fbfbf8] p-3 text-[#152036] shadow-[0_34px_90px_rgba(5,8,18,0.38)]">
            <div className="rounded-[22px] border border-[#e6e0d4] bg-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#152036] text-white shadow-[0_14px_28px_rgba(21,32,54,0.18)]">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[#978360]">{eyebrow}</p>
                  <h1 className="mt-3 font-heading text-3xl font-semibold leading-[1.06] tracking-[-0.055em] text-[#050812] sm:text-[2.45rem]">
                    {title}
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">{description}</p>

              <div className={cn("mt-7", !children && "hidden")}>{children}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
