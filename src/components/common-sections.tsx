import { Link } from "@tanstack/react-router"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowRight, CirclePlay, MoveRight } from "lucide-react"
import { useEffect } from "react"

import { EventCard, ExpertiseCard } from "@/components/cards"
import {
  events,
  homeProcessSteps,
  homeServices,
  leaders,
  partnerRows,
  programResults,
} from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function PartnerLogoCard({
  alt,
  src,
  widthClass,
}: {
  alt: string
  src: string
  widthClass?: string
}) {
  return (
    <article
      className={cn(
        "flex h-[84px] min-w-0 shrink-0 snap-start items-center justify-center rounded-[18px] border border-slate-200/90 bg-white px-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)] backdrop-blur-[3px]",
        widthClass,
      )}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[46px] w-auto max-w-[88%] object-contain [filter:contrast(1.16)_saturate(1.05)_drop-shadow(0_1px_0_rgba(15,23,42,0.04))] sm:max-h-[50px] xl:max-h-[56px]"
        loading="lazy"
        decoding="async"
      />
    </article>
  )
}

function PartnerLogoCarouselRow({
  partners,
  reverse = false,
}: {
  partners: Array<(typeof partnerRows)[number][number]>
  reverse?: boolean
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: true,
  })

  useEffect(() => {
    if (!emblaApi) return

    const interval = window.setInterval(() => {
      if (reverse) {
        emblaApi.scrollPrev()
        return
      }

      emblaApi.scrollNext()
    }, reverse ? 3200 : 2800)

    return () => window.clearInterval(interval)
  }, [emblaApi, reverse])

  return (
    <div
      ref={emblaRef}
      className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)]"
    >
      <div className="flex touch-pan-y gap-3 py-1 sm:gap-4">
        {partners.map((partner) => (
          <PartnerLogoCard
            key={`${partner.src}-${reverse ? "reverse" : "forward"}`}
            {...partner}
            widthClass="w-[154px] sm:w-[176px] lg:w-[190px] xl:w-[204px]"
          />
        ))}
      </div>
    </div>
  )
}

export function PartnerLogoCarousel() {
  const partners = partnerRows.flat()
  const firstRow = partners.filter((_, index) => index % 2 === 0)
  const secondRow = partners.filter((_, index) => index % 2 === 1)

  return (
    <div className="mx-auto mt-10 flex max-w-[1450px] flex-col gap-4">
      <PartnerLogoCarouselRow partners={firstRow} />
      <PartnerLogoCarouselRow partners={secondRow} reverse />
    </div>
  )
}

export function PartnersSection() {
  return (
    <section id="partners" className="partners-section scroll-mt-28 py-[4.75rem] sm:py-[5.75rem]">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-[2rem] tracking-[-0.06em] text-primary sm:text-[2.45rem]">
            Références et partenaires
          </p>
        </div>

        <PartnerLogoCarousel />
      </div>
    </section>
  )
}

export function AboutHomeSection() {
  return (
    <section id="about" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-[38.75rem]">
            <span className="eyebrow">À propos</span>
            <h2 className="section-title mt-6">
              Un cabinet engagé pour la <span className="accent-text">performance des organisations.</span>
            </h2>
            <p className="section-copy mt-6 max-w-[58ch]">
              Cogesto Consulting aide les clients à résoudre des problèmes importants afin d’assurer le développement durable de leur entreprise. Son approche combine expertise sectorielle, expertise fonctionnelle et transfert de compétences.
            </p>

            <div className="mt-10">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(20,40,75,0.16)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Découvrir le cabinet
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white">
                  <MoveRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[22.5rem] sm:min-h-[27.5rem]">
            <div className="absolute inset-y-3 left-0 right-16 overflow-hidden rounded-[34px] border border-slate-200/70 shadow-[0_26px_70px_rgba(15,23,42,0.12)] sm:right-24">
              <img
                src="/media/cogesto/services/Design-sans-titre-22.jpg"
                alt="Professionnels en échange illustrant la proposition de valeur de Cogesto Consulting"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[13.125rem] rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_24px_50px_rgba(15,23,42,0.12)] sm:w-[250px]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">Mission</p>
              <h3 className="mt-4 font-heading text-[1.5rem] leading-[1.12] tracking-tighter text-slate-950">
                Mettre l’expertise au service de la performance, du capital humain et de la création de valeur.
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Une démarche orientée diagnostic, outils pratiques, accompagnement personnalisé et résultats durables.
              </p>
            </div>
            <div className="absolute right-10 top-5 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-[0_15px_35px_rgba(15,23,42,0.08)] sm:inline-flex">
              Une équipe composée de professionnels hautement qualifiés et expérimentés.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ExpertisePreview() {
  return (
    <section id="services" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <span className="eyebrow">Nos expertises</span>
            <h2 className="section-title mt-6 max-w-[22ch]">
              Des expertises conçues pour <span className="accent-text">créer de la valeur et renforcer la compétitivité.</span>
            </h2>
          </div>
          <p className="section-copy max-w-[60ch] lg:justify-self-end">
            Des outils et méthodes éprouvés, développés à partir du retour d’expérience d’experts de haut niveau, pour permettre aux organisations d’atteindre l’excellence opérationnelle.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {homeServices.map((service) => (
            <ExpertiseCard
              key={service.title}
              featured={service.featured}
              image={service.imageSrc}
              imagePosition={service.imagePosition}
              summary={service.description}
              tag={service.tag}
              title={service.title}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/expertises"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(20,40,75,0.12)]"
          >
            Voir toutes les expertises
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/16 bg-white/12">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function MethodSection() {
  return (
    <section id="method" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="section-title max-w-[11ch]">
            Notre démarche, <span className="accent-text">clarifiée.</span>
          </h2>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 self-start rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(20,40,75,0.12)] lg:self-auto"
          >
            Notre proposition de valeur
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/16 bg-white/12">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-4">
            {homeProcessSteps.map((step) => (
              <article
                key={step.title}
                className={cn(
                  "flex items-center justify-between gap-4 px-0 py-5 sm:px-1",
                  step.active
                    ? "rounded-[28px] bg-primary text-white shadow-[0_24px_55px_rgba(8,32,64,0.18)]"
                    : "border-b border-slate-200 text-slate-900",
                )}
              >
                <div className={cn("flex-1", step.active && "px-6 py-6")}>
                  <h3 className="max-w-[36ch] text-[1.02rem] font-medium leading-7">{step.title}</h3>
                  {step.active ? (
                    <p className="mt-4 max-w-[46ch] text-sm leading-6 text-white/64">{step.description}</p>
                  ) : null}
                </div>
                <span
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full border",
                    step.active ? "mr-6 border-white/14 bg-white/10 text-white" : "border-slate-200 bg-white text-slate-500",
                  )}
                >
                  <ArrowRight className="size-4" />
                </span>
              </article>
            ))}
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[32px] border border-slate-200/70 shadow-[0_25px_65px_rgba(15,23,42,0.10)] lg:min-h-[400px]">
            <img
              src="/media/cogesto/services/Design-sans-titre-23.jpg"
              alt="Tableau de bord illustrant la démarche d’accompagnement de Cogesto"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,19,31,0.18),rgba(255,255,255,0.02)_52%,rgba(8,19,31,0.1))]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function ShowcaseSection() {
  return (
    <section id="showcase" className="showcase-band scroll-mt-28 py-16 sm:py-20">
      <div className="page-shell">
        <div className="relative mx-auto min-h-[320px] max-w-[1050px] overflow-hidden rounded-[34px] border border-slate-200/70 shadow-[0_30px_80px_rgba(15,23,42,0.10)] sm:min-h-[420px]">
          <img
            src="/media/cogesto/tof8053.jpg"
            alt="Photo officielle du programme de Cogesto Consulting"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-transparent" />
          <div className="absolute inset-x-0 top-[38%] flex justify-center">
            <Link
              to="/business-linkage-program"
              className="inline-flex size-20 items-center justify-center rounded-full border border-white/18 bg-white/18 text-white shadow-[0_25px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-transform hover:scale-[1.03]"
            >
              <CirclePlay className="size-9" />
            </Link>
          </div>
          <p className="absolute inset-x-0 bottom-8 px-6 text-center font-heading text-[1.55rem] tracking-[-0.04em] text-white sm:text-[2rem]">
            Le programme accompagne la croissance des entreprises dans le secteur du pétrole et du gaz.
          </p>
        </div>
      </div>
    </section>
  )
}

export function ProgramPreview() {
  return (
    <section className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="eyebrow">Business Linkage Program</span>
          <h2 className="section-title mt-6 max-w-[15ch]">
            Renforcer les PME pour les chaînes de valeur <span className="accent-text">Oil & Gas.</span>
          </h2>
          <p className="section-copy mt-5 max-w-[58ch]">
            Cogesto Consulting accompagne la croissance des entreprises par la formation, l’assistance technique, l’accès au marché et l’accès au financement.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {programResults.slice(0, 4).map((item) => (
            <div key={item} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.05)]">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <p className="mt-4 text-sm leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EventsPreview() {
  return (
    <section id="insights" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center before:hidden">Évènements</span>
          <h2 className="section-title mt-6">
            Des actions concrètes <span className="accent-text">ancrées dans le terrain.</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            Cogesto Consulting déploie des programmes, des formations et des sessions de coaching pour renforcer la préparation des entreprises face à leurs nouveaux marchés.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(20,40,75,0.12)]"
          >
            Voir tous les évènements
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/16 bg-white/12">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center before:hidden">Notre équipe</span>
          <h2 className="section-title mt-6">
            Une direction <span className="accent-text">senior et engagée.</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            Des profils expérimentés, issus du conseil, de la finance, des politiques publiques et de la transformation, mobilisés au service de la performance des organisations.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]"
            >
              <img src={leader.image} alt={leader.name} className="aspect-[4/3] w-full object-cover object-top" />
              <div className="p-5">
                <h3 className="font-heading text-[1.45rem] leading-[1.1] tracking-[-0.04em] text-slate-950">{leader.name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{leader.role}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{leader.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaSection() {
  return (
    <section className="section-pad bg-white">
      <div className="page-shell">
        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-primary p-8 text-white shadow-[0_30px_80px_rgba(8,32,64,0.18)] sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-white/70 before:bg-white/20">Renforcez votre compétitivité</p>
              <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Contactez Cogesto Consulting pour des solutions adaptées à vos besoins.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Conseil, formation, accompagnement organisationnel, stratégie, finance et performance.
              </p>
            </div>
            <Link to="/contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-bold text-primary shadow-[0_16px_34px_rgba(255,255,255,0.16)] transition-transform hover:-translate-y-0.5">
              Contactez-nous
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
