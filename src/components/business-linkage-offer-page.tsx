import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRight, CheckCircle2, Compass, Leaf, Target, Users } from "lucide-react"

import type { businessLinkageOfferPages } from "@/lib/site-data"
import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { PactesBannerPlayer } from "@/components/pactes-banner-player"
import { parcoursEntrepreneurContent } from "@/lib/site-data"

type BusinessLinkageOffer = (typeof businessLinkageOfferPages)[keyof typeof businessLinkageOfferPages]

const pactesMedia = "/media/cogesto/pactes"
const pactesVideos = [
  {
    title: "Présentation de la formation PACTES",
    description: "L’équipe Cogesto présente le Parcours de l’entrepreneur.",
    file: "presentation-formation.mp4",
    poster: "presentation-formation.webp",
  },
  {
    title: "Au cœur d’un atelier PACTES",
    description: "Des échanges entre les participants et l’équipe pendant la formation.",
    file: "atelier-formation.mp4",
    poster: "atelier-formation.webp",
  },
]
const pactesPhotos = [
  { file: "formation-groupe.webp", alt: "Photo de groupe devant les affiches de Cogesto et du PACTES" },
  { file: "formation-echanges.webp", alt: "Deux participantes échangent autour de la table de formation" },
  { file: "formation-intervention.webp", alt: "Un intervenant prend la parole pendant l’atelier" },
  { file: "formation-participantes.webp", alt: "Deux participantes écoutent la discussion dans la salle de formation" },
]

export function BusinessLinkageOfferPage({ offer }: { offer: BusinessLinkageOffer }) {
  const isFinance = offer.slug === "finance-verte-durable"
  const isParcours = offer.slug === "parcours-entrepreneur"
  const HeroIcon = isFinance ? Leaf : Users

  return (
    <PageLayout>
      <section className="inner-hero overflow-hidden text-white">
        <div className="site-container grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/12 bg-white/7 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/72">
              {isParcours ? offer.eyebrow : "Business Linkage Program"}
            </span>
            <h1 className="mt-8 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
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
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[34px] border border-white/12 bg-white/7 p-2 shadow-[0_30px_80px_rgba(5,8,18,0.34)]">
              {isParcours ? (
                <PactesBannerPlayer
                  durationHint={10}
                  poster={`${pactesMedia}/banniere-atelier.webp`}
                  src={`${pactesMedia}/banniere-atelier.mp4`}
                />
              ) : (
                <img
                  alt={offer.title}
                  className="aspect-[16/10] w-full rounded-[26px] object-cover"
                  fetchPriority="high"
                  src={offer.heroImage}
                />
              )}
            </div>
            <div className={`${isParcours ? "mt-4" : "absolute -bottom-6 left-6 right-6"} rounded-[24px] border border-white/12 bg-[#fbfbf8] p-5 text-[#152036] shadow-[0_24px_55px_rgba(5,8,18,0.22)]`}>
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

      {isParcours ? (
        <ParcoursEntrepreneurDetails />
      ) : (
        <>
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
        </>
      )}

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

function ParcoursEntrepreneurDetails() {
  const content = parcoursEntrepreneurContent

  return (
    <>
      <section className="border-y border-slate-200 bg-white py-5">
        <nav className="site-container flex gap-2 overflow-x-auto">
          {content.menu.map((item) => (
            <a
              className="shrink-0 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </section>

      <section id="videos" aria-labelledby="pactes-video-title" className="scroll-mt-28 bg-[#f5f2ec] py-16 sm:py-20">
        <div className="page-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow before:hidden">La formation</span>
              <h2 id="pactes-video-title" className="section-title mt-5">Le PACTES en vidéo</h2>
            </div>
            <img
              alt="PACTES — Parcours de l’entrepreneur"
              className="h-auto w-48 rounded-lg bg-white p-2"
              height={244}
              loading="lazy"
              src={`${pactesMedia}/logo-pactes.jpeg`}
              width={550}
            />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {pactesVideos.map((video) => (
              <article key={video.file} className="overflow-hidden rounded-[26px] border border-slate-200 bg-white">
                <video
                  aria-label={video.title}
                  className="block aspect-video w-full bg-primary"
                  controls
                  playsInline
                  poster={`${pactesMedia}/${video.poster}`}
                  preload="none"
                >
                  <source src={`${pactesMedia}/${video.file}`} type="video/mp4" />
                  <a href={`${pactesMedia}/${video.file}`}>Ouvrir la vidéo</a>
                </video>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading text-xl font-semibold text-slate-950">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{video.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h3 className="font-heading text-2xl font-semibold text-slate-950 sm:text-3xl">La formation en images</h3>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {pactesPhotos.map((photo) => (
                <li key={photo.file}>
                  <img
                    alt={photo.alt}
                    className="block aspect-[3/2] w-full rounded-2xl object-cover"
                    decoding="async"
                    height={600}
                    loading="lazy"
                    src={`${pactesMedia}/${photo.file}`}
                    width={900}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contexte" className="py-20 sm:py-24">
        <div className="page-shell">
          <SectionIntro eyebrow="Contexte" title="Un programme aligné avec les mutations économiques du Sénégal." />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {content.context.map((paragraph) => (
              <article className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]" key={paragraph}>
                <p className="text-[0.98rem] leading-7 text-slate-700">{paragraph}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="justification" className="bg-[#f5f2ec] py-20 sm:py-24">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionIntro eyebrow="Justification" title="Répondre aux défis de l’emploi, du marché et du financement." />
            <div className="grid gap-4">
              {content.justification.map((paragraph) => (
                <p className="rounded-[24px] border border-slate-200/80 bg-white px-5 py-5 text-[1rem] leading-7 text-slate-700 shadow-[0_14px_36px_rgba(15,23,42,0.04)]" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="objectifs" className="py-20 sm:py-24">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionIntro eyebrow="Objectifs" title="Faciliter le développement des entrepreneurs sénégalais." />
              <p className="section-copy mt-6">{content.objective}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.objectives.map((objective) => (
                <FeatureItem key={objective}>{objective}</FeatureItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="resultats" className="bg-primary py-20 text-white sm:py-24">
        <div className="page-shell">
          <SectionIntro eyebrow="Résultats attendus" title="Des livrables mesurables à la fin du parcours." light />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.results.map((result) => (
              <article className="rounded-[26px] border border-white/12 bg-white/8 p-5" key={result}>
                <CheckCircle2 className="size-5 text-[#c8b58f]" />
                <p className="mt-4 text-[0.98rem] font-semibold leading-6 text-white/82">{result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cibles" className="py-20 sm:py-24">
        <div className="page-shell">
          <SectionIntro eyebrow="Cibles" title="Jeunes, femmes, startups et PME à fort potentiel." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.targets.map((target) => (
              <FeatureItem key={target}>{target}</FeatureItem>
            ))}
          </div>
        </div>
      </section>

      <section id="programme" className="bg-[#eef6fc] py-20 sm:py-24">
        <div className="page-shell">
          <SectionIntro eyebrow="Programme & services" title="Trois cycles d’accompagnement de six mois chacun." />
          <p className="section-copy mt-6 max-w-4xl">{content.methodology}</p>
          <PhaseExplorer phases={content.phases} />
        </div>
      </section>
    </>
  )
}

function PhaseExplorer({ phases }: { phases: typeof parcoursEntrepreneurContent.phases }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhase = phases[activeIndex] ?? phases[0]

  if (!activePhase) return null

  const summaryPoints =
    "summaryPoints" in activePhase && Array.isArray(activePhase.summaryPoints) ? activePhase.summaryPoints : []

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[0.31fr_0.69fr] lg:items-start">
      <div className="flex flex-col rounded-[30px] border border-[#d4e6f5] bg-white/85 p-3 shadow-[0_24px_65px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="px-2 pb-4 pt-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9b835c]">Cycles du parcours</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">Un accompagnement adapté au niveau de maturité de l’entreprise.</p>
        </div>

        <div className="grid gap-3">
          {phases.map((phase, index) => {
            const isActive = index === activeIndex

            return (
              <button
                aria-pressed={isActive}
                className={[
                  "group flex w-full items-center gap-4 rounded-[22px] border p-4 text-left transition",
                  isActive
                    ? "border-primary bg-primary text-white shadow-[0_16px_36px_rgba(21,32,54,0.18)]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary/35 hover:bg-[#f8fbff]",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={phase.acronym}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span
                  className={[
                    "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold",
                    isActive ? "bg-white text-primary" : "bg-[#eaf6ff] text-primary",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {phase.acronym}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[1.05rem] leading-[1.15]">{phase.title}</span>
                  <span className={["mt-1 block text-xs font-semibold", isActive ? "text-white/68" : "text-[#9b835c]"].join(" ")}>
                    {phase.services.length} services offerts
                  </span>
                </span>
                <ArrowRight className={["size-4 shrink-0 transition group-hover:translate-x-0.5", isActive ? "text-white" : "text-slate-400"].join(" ")} />
              </button>
            )
          })}
        </div>

        <div className="mt-4 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Cycle affiché</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-[2rem] leading-none text-primary">{activePhase.acronym}</p>
              <p className="mt-2 text-sm font-semibold leading-5 text-slate-600">
                {activeIndex + 1} sur {phases.length}
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#9b835c] shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
              {activePhase.services.length} services
            </span>
          </div>
        </div>
      </div>

      <article className="overflow-hidden rounded-[30px] border border-[#cfe2f3] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
        <div className="relative h-[280px] overflow-hidden bg-slate-100 sm:h-[330px] lg:h-[320px]">
          <img
            alt={`${activePhase.title} - ${activePhase.acronym}`}
            className="h-full w-full object-cover"
            key={activePhase.image}
            loading="lazy"
            src={activePhase.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/78 via-primary/18 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-primary shadow-[0_10px_26px_rgba(15,23,42,0.16)]">
              {activePhase.acronym}
            </span>
            <h3 className="mt-4 max-w-2xl font-heading text-[1.62rem] leading-[1.04] sm:text-[2.35rem]">{activePhase.title}</h3>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:p-6 xl:grid-cols-[0.38fr_0.62fr] xl:items-start">
          <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.035)]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9b835c]">Résumé</p>
            {summaryPoints.length > 0 ? (
              <ul className="mt-4 grid gap-2.5">
                {summaryPoints.map((point) => (
                  <li className="flex items-start gap-3 text-[0.95rem] leading-6 text-slate-600" key={point}>
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/22 bg-[#f8fbff] text-primary">
                      <CheckCircle2 className="size-3.5" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[0.98rem] leading-8 text-slate-600">{activePhase.description}</p>
            )}
          </div>

          <div id="services" className="scroll-mt-28 rounded-[26px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
            <h4 className="font-heading text-[1.28rem] leading-[1.08] text-slate-950">Services offerts</h4>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {activePhase.services.map((service) => (
                <ServiceItem key={service}>{service}</ServiceItem>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

function SectionIntro({
  eyebrow,
  light = false,
  title,
}: {
  eyebrow: string
  light?: boolean
  title: string
}) {
  return (
    <div>
      <span className={["eyebrow before:hidden", light ? "text-white/62" : ""].filter(Boolean).join(" ")}>{eyebrow}</span>
      <h2 className={["section-title mt-6 max-w-3xl", light ? "text-white" : ""].filter(Boolean).join(" ")}>{title}</h2>
    </div>
  )
}

function FeatureItem({ children }: { children: string }) {
  return (
    <div className="flex gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-[0.95rem] leading-6 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.03)]">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
      <span>{children}</span>
    </div>
  )
}

function ServiceItem({ children }: { children: string }) {
  return (
    <div className="flex min-h-14 items-start gap-3 rounded-[20px] border border-slate-200 bg-[#fbfdff] px-4 py-4 text-[0.95rem] leading-6 text-slate-700">
      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/28 bg-white text-primary">
        <CheckCircle2 className="size-3.5" />
      </span>
      <span>{children}</span>
    </div>
  )
}
