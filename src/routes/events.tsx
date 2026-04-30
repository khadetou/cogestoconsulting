import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

import { EventCard } from "@/components/cards"
import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { events } from "@/lib/site-data"

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Évènements | Cogesto Consulting" },
      {
        name: "description",
        content:
          "Cérémonies, formations et sessions de coaching menées par Cogesto Consulting.",
      },
    ],
  }),
  component: EventsPage,
})

const blpStory = [
  "Cogesto Consulting SAS, cabinet de conseil et de formation, a été sélectionné à l’issue d’un appel d’offres pour opérationnaliser l’accompagnement des PME sénégalaises en vue de leur faciliter l’accès aux marchés et aux financements dans le cadre du Business Linkage Program.",
  "Le BLP est une initiative d’Invest In Africa, financée par la Banque Africaine de Développement et en partenariat avec le Fonds pour les Partenariats Africains, pour apporter une réponse concrète à la problématique de déficit de compétences locales dans le secteur de l’Oil & Gas.",
  "Ce programme vise en particulier à apporter un appui technique aux PME sénégalaises pour leur intégration dans les chaînes d’approvisionnement des grandes entreprises par le renforcement de leurs capacités, de leurs normes QHSE, de leurs infrastructures et par l’accès au financement.",
  "Depuis la cérémonie d’information et de lancement officiel organisée le 14 juin 2023 à l’Hôtel King Fahd Place, Cogesto Consulting a mené plusieurs activités dans le cadre du BLP.",
  "Après des sessions de formation et de sensibilisation sur les opportunités du secteur de l’Oil & Gas, Cogesto Consulting déploie une phase de diagnostic 360° pour les entreprises bénéficiaires de l’accompagnement.",
]

function EventsPage() {
  return (
    <PageLayout>
      <section className="inner-hero text-white">
        <div className="site-container py-20 sm:py-28">
          <p className="eyebrow text-white/70 before:bg-white/20">Évènements</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Des évènements tournés vers l’action.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Cogesto Consulting mène des cérémonies de lancement, des séminaires de formation et des sessions de coaching pour accompagner les entreprises dans leur structuration, leur montée en capacité et leur accès aux opportunités du marché.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>

          <div className="mt-12 grid gap-6 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.05)] lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <span className="eyebrow before:hidden">Cérémonie lancement BLP</span>
              <h2 className="section-title mt-5 max-w-[13ch]">
                Une expertise locale pour accélérer la croissance dans <span className="accent-text">l’Oil & Gas.</span>
              </h2>
              <div className="mt-6 space-y-4">
                {blpStory.map((paragraph) => (
                  <p key={paragraph} className="section-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <img src="/media/cogesto/tof8053.jpg" alt="Cérémonie de lancement du BLP" className="rounded-[28px] border border-slate-200/80 object-cover shadow-[0_18px_45px_rgba(15,23,42,0.08)]" />
              <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <span className="eyebrow before:hidden">Sur le terrain</span>
                <p className="mt-4 text-[1rem] leading-7 text-slate-600">
                  À travers ces activités, Cogesto Consulting œuvre au quotidien pour permettre aux entreprises de se préparer aux exigences, normes et opportunités de leurs marchés, en particulier dans le secteur de l’Oil & Gas.
                </p>
                <Link to="/contact" className="mt-5 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">
                  Organiser un échange
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">Séminaires de formation organisé par 3FPT</p>
              <h3 className="mt-3 font-heading text-[1.55rem] leading-[1.1] tracking-[-0.04em] text-slate-950">
                Marketing & Communication pour 30 dirigeants d’entreprise.
              </h3>
              <p className="mt-4 text-[1rem] leading-7 text-slate-600">
                Séminaires organisés par 3FPT dans le cadre du programme « Parcours du Chef d’entreprise », assurés par Cogesto Consulting SAS et animés par Abdoul Wahab Touré et Amy Rose Konaté en octobre 2023 au Novotel Dakar et à l’Hôtel Le Ndiambour.
              </p>
            </article>
            <article className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">Sessions de coaching</p>
              <h3 className="mt-3 font-heading text-[1.55rem] leading-[1.1] tracking-[-0.04em] text-slate-950">
                Accompagnement de l’équipe dirigeante de FGI.
              </h3>
              <p className="mt-4 text-[1rem] leading-7 text-slate-600">
                Sessions de coaching de l’équipe dirigeante de la société de bourse FGI, animées par Amy Rose Konaté, pour renforcer les pratiques de pilotage, de gouvernance et de transformation.
              </p>
            </article>
          </div>
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  )
}
