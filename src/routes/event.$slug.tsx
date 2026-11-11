import { createFileRoute } from "@tanstack/react-router"
import { ArrowUpRight, CalendarDays, ChevronLeft, Clock, MapPin } from "lucide-react"

import { PageLayout } from "@/components/layout"
import { getEventBySlug, type SiteEvent } from "@/lib/site-data"
import { buildEventSeo, buildSeoHead } from "@/lib/seo"

export const Route = createFileRoute("/event/$slug")({
  head: ({ loaderData }) => buildSeoHead(buildEventSeo(loaderData as SiteEvent | undefined)),
  loader: ({ params }): SiteEvent | undefined => getEventBySlug(params.slug),
  component: EventDetailPage,
})

function EventDetailPage() {
  const event = Route.useLoaderData() as SiteEvent | undefined

  if (!event) {
    return (
      <PageLayout>
        <section className="bg-[linear-gradient(180deg,#f4f8fb_0%,#ffffff_42%)] py-20">
          <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8">
            <a href="/events" className="inline-flex items-center gap-2 rounded-full border border-[#d7e4ef] bg-white px-4 py-2 text-sm font-semibold text-[#152036] shadow-[0_10px_24px_rgba(21,32,54,0.05)]">
              <ChevronLeft className="size-4" />
              Tous les Évènements
            </a>
            <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-6 text-slate-700 shadow-[0_20px_55px_rgba(21,32,54,0.06)]">
              Cet évènement est introuvable.
            </div>
          </div>
        </section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <section className="bg-[linear-gradient(180deg,#f4f8fb_0%,#ffffff_34%,#f6fafc_100%)] py-14 sm:py-18">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8">
          <a href="/events" className="inline-flex items-center gap-2 rounded-full border border-[#d7e4ef] bg-white px-4 py-2 text-sm font-semibold text-[#152036] shadow-[0_10px_24px_rgba(21,32,54,0.05)]">
            <ChevronLeft className="size-4" />
            Tous les Évènements
          </a>

          <article className="mt-8 grid gap-8 overflow-hidden rounded-[34px] border border-[#d7e4ef] bg-white p-5 shadow-[0_24px_70px_rgba(21,32,54,0.08)] lg:grid-cols-[1fr_430px] lg:p-7">
            <div className="lg:py-4">
              <div className="inline-flex rounded-full border border-[#cfe8f6] bg-[#eaf7ff] px-4 py-2 text-sm font-semibold text-[#476582]">
                Cet évènement est passé.
              </div>

              <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#978360]">{event.category}</p>
              <h1 className="mt-4 max-w-4xl font-heading text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[#152036] sm:text-[3.35rem]">
                {event.title}
              </h1>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <span className="inline-flex items-center gap-3 rounded-[20px] border border-[#d7e4ef] bg-slate-50 px-4 py-3 text-sm font-semibold text-[#476582]">
                  <CalendarDays className="size-4 text-[#978360]" />
                  {event.date}
                </span>
                <span className="inline-flex items-center gap-3 rounded-[20px] border border-[#d7e4ef] bg-slate-50 px-4 py-3 text-sm font-semibold text-[#476582]">
                  <Clock className="size-4 text-[#978360]" />
                  {event.time}
                </span>
                {"venue" in event && event.venue ? (
                  <span className="inline-flex items-center gap-3 rounded-[20px] border border-[#d7e4ef] bg-slate-50 px-4 py-3 text-sm font-semibold text-[#476582] sm:col-span-2">
                    <MapPin className="size-4 text-[#978360]" />
                    {event.venue}
                  </span>
                ) : null}
              </div>

              <p className="mt-8 max-w-4xl text-[1.08rem] leading-8 text-slate-700">
                {event.summary}
              </p>
            </div>

            <figure className="relative overflow-hidden rounded-[28px] bg-slate-100 ring-1 ring-[#d7e4ef]">
              <img src={event.image} alt={event.title} className="h-full min-h-[320px] w-full object-cover" loading="eager" decoding="async" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#152036]/78 to-transparent p-5 pt-20">
                <p className="text-sm font-semibold text-white/78">{event.gallery.length} photos</p>
                <p className="mt-1 font-heading text-[1.35rem] leading-tight tracking-[-0.04em] text-white">Galerie de l’évènement</p>
              </div>
            </figure>
          </article>

          {event.recap?.length ? (
            <section className="mt-10 rounded-[28px] border border-[#d7e4ef] bg-white p-5 sm:p-8" aria-labelledby="event-recap-title">
              <h2 id="event-recap-title" className="font-heading text-[1.75rem] font-semibold tracking-[-0.04em] text-[#152036]">
                Retour sur la rencontre
              </h2>
              <div className="mt-4 max-w-3xl space-y-4 leading-7 text-slate-700">
                {event.recap.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ) : null}

          <div className="mt-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#978360]">Photos</p>
              <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-tight tracking-[-0.05em] text-[#152036] sm:text-[2.55rem]">
                Galerie de l’évènement.
              </h2>
            </div>
          </div>

          <div className="mt-7 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {event.gallery.map((image, index) => {
              const imagePosition = event.galleryImagePositions?.[index]

              return (
                <figure key={image} className={index === 0 ? "overflow-hidden rounded-[26px] bg-slate-100 shadow-[0_18px_45px_rgba(21,32,54,0.08)] ring-1 ring-[#d7e4ef] sm:col-span-2 sm:row-span-2" : "overflow-hidden rounded-[26px] bg-slate-100 shadow-[0_18px_45px_rgba(21,32,54,0.08)] ring-1 ring-[#d7e4ef]"}>
                  <img
                    src={image}
                    alt={event.galleryImageAlts?.[index] ?? `${event.title} ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    style={imagePosition ? { objectPosition: imagePosition } : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              )
            })}
          </div>

          {event.publications?.length ? (
            <section className="mt-12" aria-labelledby="event-publications-title">
              <h2 id="event-publications-title" className="font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[#152036]">
                Publications liées
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {event.publications.map(({ href, platform, title }) => (
                  <li key={href}>
                    <a href={href} className="flex h-full items-center justify-between gap-4 rounded-[22px] border border-[#d7e4ef] bg-white p-5 text-[#152036] transition-colors hover:border-[#978360]">
                      <div>
                        <p className="text-sm font-semibold text-[#476582]">{platform}</p>
                        <p className="mt-1 font-semibold">{title}</p>
                      </div>
                      <ArrowUpRight className="size-5 shrink-0 text-[#978360]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </section>
    </PageLayout>
  )
}
