import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Handshake, Target, TrendingUp } from "lucide-react"

import { EventCard } from "@/components/cards"
import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import {
  events,
  programConsultants,
  programContextHighlights,
  programEventGallery,
  programExpertRoster,
  programObjectives,
  programPartners,
  programResults,
} from "@/lib/site-data"

export const Route = createFileRoute("/business-linkage-program")({
  head: () => ({
    meta: [
      { title: "Business Linkage Program | Cogesto Consulting" },
      {
        name: "description",
        content:
          "Business Linkage Program : accompagnement des PME sénégalaises pour le secteur Oil & Gas, accès marché et financement.",
      },
    ],
  }),
  component: ProgramPage,
})

function ProgramPage() {
  return (
    <PageLayout>
      <section className="inner-hero text-white">
        <div className="site-container grid gap-10 py-20 sm:py-28 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow text-white/70 before:bg-white/20">Business Linkage Program</p>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              Un programme structuré pour les PME à fort potentiel.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Le Business Linkage Program accompagne la croissance des entreprises dans le secteur du pétrole et du gaz grâce à l’assistance technique, à la formation, au renforcement de capacités et à l’accès aux marchés ainsi qu’au financement.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl">
            <img
              src="/media/cogesto/blp/business-linkage-program-logo.png"
              alt="Business Linkage Program"
              className="mx-auto max-h-[280px] w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section id="contexte" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="eyebrow">Contexte du BLP</span>
              <h2 className="section-title mt-6 max-w-[12ch]">
                Accompagner la croissance des entreprises dans <span className="accent-text">l’Oil & Gas.</span>
              </h2>
              <p className="section-copy mt-6">
                Les découvertes, durant la période 2014-2015, ont permis au Sénégal d’initier deux projets majeurs, gazier et pétrolier, avec une mise en production prévue en 2024.
              </p>
              <p className="section-copy mt-4">
                Ce secteur pétrolier et gazier naissant présente de nombreux atouts pour le Sénégal et les PME locales. Le Sénégal a créé en 2016 un Comité Stratégique d’Orientation et érigé en 2019 la loi 2019-04 relative au contenu local dans le secteur des hydrocarbures.
              </p>
              <p className="section-copy mt-4">
                Consciente des enjeux du secteur pétrolier, la Banque Africaine de Développement a mis en place un mécanisme d’assistance technique aux PME locales sur sollicitation d’Invest In Africa et avec l’appui du Fonds d’Assistance au Secteur Privé Africain.
              </p>
              <div className="mt-8 grid gap-3">
                {programContextHighlights.map((item) => (
                  <div key={item} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-[0.98rem] leading-6 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
              <img src="/media/cogesto/tof8105.jpg" alt="Participants au programme illustrant le cadre du programme" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="partenaires" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center before:hidden">Partenaires du BLP</span>
            <h2 className="section-title mt-6">
              Un écosystème <span className="accent-text">mobilisé autour du programme.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {programPartners.map((partner) => (
              <article key={partner.name} className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Handshake className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-[1.45rem] tracking-[-0.04em] text-slate-950">{partner.name}</h3>
                <p className="mt-3 text-[0.98rem] leading-6 text-slate-600">{partner.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="objectifs" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-2">
            <ProgramList icon="target" items={programObjectives} title="Objectifs du programme." />
            <ProgramList icon="trend" items={programResults} title="Résultats attendus." />
          </div>
        </div>
      </section>

      <section id="consultants" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center before:hidden">Consultants du BLP</span>
            <h2 className="section-title mt-6">
              Des experts mobilisés <span className="accent-text">pour la croissance des entreprises.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {programConsultants.map((consultant) => (
              <article key={consultant.name} className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
                <div className="aspect-[4/3] overflow-hidden bg-[linear-gradient(180deg,#fbfbf8_0%,#f5f2ec_100%)]">
                  <img
                    src={consultant.image}
                    alt={consultant.name}
                    className="h-full w-full scale-[3.05] object-cover object-[center_42%]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-[1.45rem] leading-[1.1] tracking-[-0.04em] text-slate-950">{consultant.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{consultant.role}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{consultant.summary}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.05)]">
            <div className="max-w-3xl">
              <span className="eyebrow before:hidden">Équipe élargie</span>
              <h3 className="mt-5 font-heading text-[2rem] leading-[1.04] tracking-[-0.05em] text-slate-950">
                Un pool de consultants mobilisés selon les besoins du programme.
              </h3>
              <p className="mt-4 text-[1rem] leading-7 text-slate-600">
                Une équipe d’experts de très haut niveau est mobilisée pour accompagner la croissance des entreprises dans le secteur de l’Oil & Gaz.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {programExpertRoster.map((expert) => (
                <article key={expert.title} className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
                  {"image" in expert && expert.image ? (
                    <div className="aspect-[4/3] overflow-hidden bg-[linear-gradient(180deg,#fbfbf8_0%,#f5f2ec_100%)]">
                      <img
                        src={expert.image}
                        alt={expert.title}
                        className="h-full w-full scale-[3.05] object-cover object-[center_42%]"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                  <h4 className="font-heading text-[1.2rem] leading-[1.12] tracking-[-0.03em] text-slate-950">{expert.title}</h4>
                  <ul className="mt-4 space-y-2.5">
                    {expert.highlights.map((highlight) => (
                      <li key={highlight} className="text-[0.95rem] leading-6 text-slate-600">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="evenements" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center before:hidden">Évènements du BLP</span>
            <h2 className="section-title mt-6">
              Cérémonies, séminaires et <span className="accent-text">actions de terrain.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {programEventGallery.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-[3/2] w-full rounded-[22px] border border-slate-200/80 object-cover shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                loading="lazy"
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">
              Rejoindre le programme
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  )
}

function ProgramList({ icon, items, title }: { icon: "target" | "trend"; items: Array<string>; title: string }) {
  const Icon = icon === "target" ? Target : TrendingUp

  return (
    <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
        <Icon className="size-5" />
      </span>
      <h2 className="section-title mt-5 max-w-[12ch]">{title}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-[0.98rem] leading-6 text-slate-700">
            {item}
          </div>
        ))}
      </div>
    </article>
  )
}
