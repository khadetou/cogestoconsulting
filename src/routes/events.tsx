import { createFileRoute } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { events } from "@/lib/site-data"
import { buildBreadcrumbSchema, buildSeoHead, seoPages } from "@/lib/seo"

export const Route = createFileRoute("/events")({
  head: () =>
    buildSeoHead({
      ...seoPages.events,
      jsonLd: [
        buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Évènements", path: "/events" },
        ]),
      ],
    }),
  component: EventsPage,
})

function EventsPage() {
  return (
    <PageLayout>
      <section className="bg-[linear-gradient(180deg,#f4f8fb_0%,#ffffff_32%,#f6fafc_100%)] py-14 sm:py-18">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#978360]">Agenda Cogesto</p>
              <h1 className="mt-4 max-w-4xl font-heading text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[#152036] sm:text-[3.5rem]">
                Évènements, formations et sessions de coaching.
              </h1>
              <p className="mt-5 max-w-2xl text-[1.04rem] leading-7 text-slate-600">
                Retrouvez les derniers rendez-vous professionnels conduits par Cogesto Consulting, avec les comptes rendus et galeries associés.
              </p>
            </div>
            <div className="rounded-[28px] border border-[#d7e4ef] bg-white p-5 shadow-[0_18px_50px_rgba(21,32,54,0.07)]">
              <p className="text-sm font-semibold text-slate-500">Évènements passés</p>
              <p className="mt-2 font-heading text-[3rem] leading-none tracking-[-0.06em] text-[#152036]">{events.length}</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">Fiches détaillées avec photos et synthèse des activités.</p>
            </div>
          </div>

          <div className="mt-12 rounded-[28px] border border-[#d7e4ef] bg-white p-4 shadow-[0_20px_55px_rgba(21,32,54,0.06)]">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex min-h-12 items-center gap-3 rounded-[20px] bg-slate-50 px-4 text-slate-500 ring-1 ring-slate-200">
                <Search className="size-5 text-[#476582]" />
                <span className="text-sm">Rechercher évènements</span>
              </div>
              <div className="flex items-center gap-6 text-sm font-semibold">
                <span className="rounded-full bg-[#152036] px-6 py-3 text-white shadow-[0_10px_22px_rgba(21,32,54,0.16)]">Chercher</span>
                <span className="rounded-full bg-[#eef4f8] px-4 py-2 text-[#152036]">Liste</span>
                <span className="text-slate-500">Mois</span>
                <span className="text-slate-500">Jour</span>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3 text-slate-700">
            <button className="inline-flex size-11 items-center justify-center rounded-full border border-[#d7e4ef] bg-white text-[#152036] shadow-[0_10px_24px_rgba(21,32,54,0.05)]" type="button" aria-label="Période précédente">
              <ChevronLeft className="size-5" />
            </button>
            <button className="inline-flex size-11 items-center justify-center rounded-full border border-[#d7e4ef] bg-white text-[#152036] shadow-[0_10px_24px_rgba(21,32,54,0.05)]" type="button" aria-label="Période suivante">
              <ChevronRight className="size-5" />
            </button>
            <span className="rounded-full border border-[#d7e4ef] bg-white px-5 py-3 text-sm font-semibold text-slate-500">Aujourd’hui</span>
          </div>

          <div className="mt-7 rounded-[22px] border border-[#cfe8f6] bg-[#eaf7ff] px-5 py-5 text-center text-sm font-semibold text-[#476582]">
            Il n’y a pas d’évènements à venir.
          </div>

          <h2 className="mt-12 font-heading text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-[#152036] sm:text-[2.45rem]">
            Derniers Évènements passés
          </h2>

          <div className="mt-8 grid gap-6">
            {events.map((event) => (
              <EventTimelineItem key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  )
}

function EventTimelineItem({ event }: { event: (typeof events)[number] }) {
  return (
    <article className="grid gap-6 rounded-[32px] border border-[#d7e4ef] bg-white p-5 shadow-[0_20px_60px_rgba(21,32,54,0.07)] lg:grid-cols-[88px_1fr_380px] lg:gap-7 lg:p-6">
      <div className="flex justify-start lg:justify-center">
        <EventDateBadge event={event} />
      </div>

      <div className="border-l-4 border-[#978360] pl-6 lg:py-2">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-[#f5f0e7] px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#978360]">{event.category}</span>
          <span className="font-semibold text-[#476582]">Mis en avant</span>
          <span>{event.date} @ {event.time}</span>
        </div>
        <a href={event.href} className="mt-4 block font-heading text-[1.75rem] font-semibold leading-tight tracking-[-0.04em] text-[#152036] transition-colors hover:text-[#978360]">
          {event.title}
        </a>
        {event.location ? <p className="mt-4 text-[0.98rem] leading-6 text-[#476582]">{event.location}</p> : null}
        <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-slate-600">{event.summary}</p>
      </div>

      <a href={event.href} className="group relative block overflow-hidden rounded-[26px] bg-slate-100 ring-1 ring-[#d7e4ef]">
        <img src={event.image} alt={event.title} className="aspect-[1.32] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" decoding="async" />
        <span className="absolute bottom-4 right-4 rounded-full bg-white/92 px-4 py-2 text-sm font-bold text-[#152036] shadow-[0_12px_28px_rgba(21,32,54,0.14)] backdrop-blur-sm">
          Voir détails
        </span>
      </a>
    </article>
  )
}

function EventDateBadge({ event }: { event: (typeof events)[number] }) {
  const hasYear = Boolean(event.year)

  return (
    <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-[24px] bg-[#152036] text-white shadow-[0_14px_30px_rgba(21,32,54,0.18)]">
      <p className="text-[0.68rem] font-semibold uppercase leading-none tracking-[0.14em] text-white/62">{event.month}</p>
      <p className={hasYear ? "font-heading text-[2rem] font-semibold leading-none tracking-[-0.04em]" : "mt-1 font-heading text-[1.72rem] font-semibold leading-none tracking-[-0.035em]"}>
        {event.day}
      </p>
      {hasYear ? <p className="text-[0.72rem] font-semibold leading-none text-white/62">{event.year}</p> : null}
    </div>
  )
}
