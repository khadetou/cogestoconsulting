import { Link } from "@tanstack/react-router"
import { ArrowRight, CheckCircle2, Compass, Leaf, Target, Users } from "lucide-react"

import type { businessLinkageOfferPages } from "@/lib/site-data"
import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"

type BusinessLinkageOffer = (typeof businessLinkageOfferPages)[keyof typeof businessLinkageOfferPages]

export function BusinessLinkageOfferPage({ offer }: { offer: BusinessLinkageOffer }) {
  const isFinance = offer.slug === "finance-verte-durable"
  const HeroIcon = isFinance ? Leaf : Users

  return (
    <PageLayout>
      <section className="inner-hero overflow-hidden text-white">
        <div className="site-container grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/72 transition hover:bg-white/12 hover:text-white"
              to="/business-linkage-program"
            >
              Business Linkage Program
            </Link>
            <p className="eyebrow mt-8 text-white/70 before:bg-white/20">{offer.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              {offer.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{offer.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary"
                to="/contact"
              >
                Parler à un conseiller
                <ArrowRight className="size-4" />
              </Link>
              <Link
                className="inline-flex items-center gap-3 rounded-full border border-white/14 px-5 py-3 text-sm font-bold text-white/82 hover:bg-white/8"
                to="/business-linkage-program"
              >
                Retour au BLP
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[34px] border border-white/12 bg-white/7 p-2 shadow-[0_30px_80px_rgba(5,8,18,0.34)]">
              <img
                alt={offer.title}
                className="aspect-[16/10] w-full rounded-[26px] object-cover"
                fetchPriority="high"
                src={offer.heroImage}
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-[24px] border border-white/12 bg-[#fbfbf8] p-5 text-[#152036] shadow-[0_24px_55px_rgba(5,8,18,0.22)]">
              <div className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                  <HeroIcon className="size-5" />
                </span>
                <p className="text-sm font-semibold leading-6 text-slate-700">{offer.target}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="eyebrow">Approche</span>
              <h2 className="section-title mt-6 max-w-[12ch]">
                Un accompagnement <span className="accent-text">orienté résultats.</span>
              </h2>
              <p className="section-copy mt-6">{offer.lead}</p>
            </div>

            <div className="grid gap-4">
              {offer.steps.map((step, index) => (
                <article
                  className="grid gap-4 rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)] sm:grid-cols-[auto_1fr] sm:items-start"
                  key={step}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-[1.25rem] leading-[1.12] tracking-[-0.04em] text-slate-950">
                      Étape {index + 1}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-7 text-slate-600">{step}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ec] py-20 sm:py-24">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center before:hidden">Livrables</span>
            <h2 className="section-title mt-6">
              Ce que l’entreprise <span className="accent-text">obtient à la fin du parcours.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {offer.outcomes.map((outcome) => (
              <article
                className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]"
                key={outcome}
              >
                <CheckCircle2 className="size-5 text-primary" />
                <p className="mt-4 text-[0.98rem] font-semibold leading-6 text-slate-700">{outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-shell">
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <Compass className="size-7 text-primary" />
              <h2 className="mt-5 font-heading text-[2rem] leading-[1.05] tracking-[-0.055em] text-slate-950">
                Pour qui ?
              </h2>
              <p className="mt-4 text-[1rem] leading-7 text-slate-600">{offer.target}</p>
            </article>
            <article className="rounded-[30px] border border-slate-200/80 bg-primary p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <Target className="size-7 text-[#c8b58f]" />
              <h2 className="mt-5 font-heading text-[2rem] leading-[1.05] tracking-[-0.055em]">
                Prochaine étape
              </h2>
              <p className="mt-4 text-[1rem] leading-7 text-white/70">
                Échanger avec Cogesto Consulting pour qualifier le besoin, choisir le bon format d’accompagnement et préparer le diagnostic initial.
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary"
                to="/contact"
              >
                Démarrer l’échange
                <ArrowRight className="size-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  )
}
