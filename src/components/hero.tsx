import { Link } from "@tanstack/react-router"
import { ArrowRight, BriefcaseBusiness, CirclePlay, Sparkles, TrendingUp, Users } from "lucide-react"
import gsap from "gsap"
import { useEffect, useRef } from "react"

import { SiteHeader } from "@/components/site-header"

const metrics = [
  { icon: Users, label: "Bureaux", value: "3" },
  { icon: TrendingUp, label: "Heures de formation", value: "+700" },
  { icon: BriefcaseBusiness, label: "Années d’expérience", value: "30+" },
  { icon: Sparkles, label: "Pays de présence", value: "3" },
]

export function Hero() {
  const scopeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!scopeRef.current) return

    const context = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      })
    }, scopeRef)

    return () => context.revert()
  }, [])

  return (
    <section ref={scopeRef} id="home" className="hero-section relative min-h-[100svh] overflow-hidden text-white">
      <img
        src="/media/cogesto/hero-candidates/black-professionals-strategy-session.png"
        alt="Professionnels africains en séance de travail stratégique, illustrant l’accompagnement humain et institutionnel de Cogesto Consulting"
        className="hero-banner__background"
      />
      <div className="hero-banner__wash" />
      <div className="hero-banner__left-fade" />
      <div className="hero-banner__bottom-fade" />
      <div className="hero-ambient hero-ambient--left" />
      <div className="hero-ambient hero-ambient--right" />

      <div className="hero-shell relative z-10 flex min-h-[100svh] flex-col py-5 sm:py-6 lg:py-7">
        <SiteHeader />

        <div className="relative z-10 mt-6 flex flex-1 flex-col justify-between px-7 pb-2 pt-7 sm:px-9 sm:pt-10 lg:px-11 lg:pb-3 lg:pt-12">
          <div className="max-w-[880px]">
            <span
              data-hero-item
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/24 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/72 backdrop-blur-sm"
            >
              Conseil, finance et management de la performance
            </span>

            <h1
              data-hero-item
              className="mt-7 font-heading text-[2.45rem] tracking-[-0.07em] text-white drop-shadow-[0_12px_28px_rgba(0,0,0,0.44)] sm:mt-8 sm:text-[3.45rem] lg:text-[3.65rem] xl:text-[3.9rem]"
            >
              <span className="block max-w-[8.3ch] leading-[1.04] sm:max-w-[11.6ch] sm:leading-[1.08] lg:max-w-none lg:whitespace-nowrap">
                Bâtir des organisations fortes.
              </span>
              <span className="mt-2 block max-w-[8ch] leading-[1.06] text-[#d8ceb9] sm:mt-1 sm:max-w-[11.4ch] sm:leading-[1.12] lg:max-w-none lg:whitespace-nowrap">
                Piloter la performance.
              </span>
            </h1>

            <p
              data-hero-item
              className="mt-6 max-w-[26ch] text-[0.98rem] leading-[1.8] text-white/72 sm:mt-8 sm:max-w-[54ch] sm:text-[1.08rem] sm:leading-[1.88]"
            >
              Cogesto Consulting met son expertise au service de la performance des organisations en favorisant le développement du capital humain, la transformation structurelle et la création de valeur.
            </p>

            <div data-hero-item className="mt-8 flex flex-col items-start gap-4 sm:mt-11 sm:flex-row sm:items-center sm:gap-6">
              <Link
                to="/expertises"
                className="inline-flex min-h-[72px] w-full items-center justify-between gap-5 rounded-full bg-white px-6 py-3 text-left text-[1rem] font-bold leading-[1.15] text-slate-900 shadow-[0_18px_40px_rgba(255,255,255,0.16)] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto sm:min-w-[328px] sm:px-8 sm:py-4"
              >
                <span className="sm:whitespace-nowrap">Nos expertises</span>
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                  <ArrowRight className="size-5" />
                </span>
              </Link>
              <div className="hidden items-center gap-4 text-sm text-white/66 sm:flex sm:min-w-0 sm:flex-1">
                <span className="inline-flex size-[62px] shrink-0 items-center justify-center rounded-[22px] border border-white/12 bg-black/24 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/6 text-white/80">
                    <CirclePlay className="size-4.5" />
                  </span>
                </span>
                <span className="block max-w-[330px] text-[0.98rem] leading-7 text-white/66">
                  Un retour d’expérience d’experts seniors, des méthodes éprouvées et des solutions adaptées aux réalités de chaque mission.
                </span>
              </div>
            </div>
          </div>

          <div data-hero-item className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 sm:gap-4 sm:pt-5 lg:grid-cols-4 lg:gap-5 lg:pt-6">
            {metrics.map((metric) => {
              const Icon = metric.icon

              return (
                <article
                  key={metric.label}
                  className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/18 px-3.5 py-3.5 backdrop-blur-sm sm:gap-4 sm:px-4 sm:py-4"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-[#d8ceb9] sm:size-11">
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="font-heading text-[1.28rem] tracking-[-0.05em] text-white sm:text-[1.45rem]">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-5 text-white/58 sm:text-sm">{metric.label}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
