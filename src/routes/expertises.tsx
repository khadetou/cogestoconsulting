import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Check } from "lucide-react"

import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { detailedFunctionalExpertise, functionalExpertise, sectorExpertise } from "@/lib/site-data"

export const Route = createFileRoute("/expertises")({
  head: () => ({
    meta: [
      { title: "Expertises | Cogesto Consulting" },
      {
        name: "description",
        content:
          "Expertises fonctionnelles et sectorielles de Cogesto Consulting : stratégie, organisation, gouvernance, performance, transformation, investissement, formation et fonctions supports.",
      },
    ],
  }),
  component: ExpertisesPage,
})

function ExpertisesPage() {
  return (
    <PageLayout>
      <section className="inner-hero text-white">
        <div className="site-container py-20 sm:py-28">
          <p className="eyebrow text-white/70 before:bg-white/20">Nos expertises</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Expertises fonctionnelles et sectorielles.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Cogesto Consulting accompagne la croissance des entreprises à travers des outils et méthodes éprouvés, le retour d’expérience d’experts de haut niveau et une approche personnalisée des enjeux stratégiques, organisationnels, opérationnels et financiers.
          </p>
        </div>
      </section>

      <section id="fonctionnelles" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <span className="eyebrow">Expertises fonctionnelles</span>
              <h2 className="section-title mt-6 max-w-[13ch]">
                Des réponses concrètes aux enjeux <span className="accent-text">stratégiques, organisationnels et financiers.</span>
              </h2>
            </div>
            <p className="section-copy max-w-[42ch] lg:justify-self-end">
              COGESTO Consulting offre son expertise pour accompagner la croissance des entreprises, atteindre l’excellence opérationnelle et apporter des solutions pratiques aux problématiques d’ordre stratégique, organisationnel, opérationnel et financier.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {functionalExpertise.map((item, index) => (
              <article
                key={item.title}
                className="group flex h-full min-h-[390px] flex-col overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-[0_20px_55px_rgba(15,23,42,0.06)]"
              >
                <div className="relative h-[180px] overflow-hidden rounded-[24px] border border-slate-200/80">
                  <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  Expertise {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-[1.55rem] leading-[1.12] tracking-[-0.05em] text-slate-950">{item.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-6 text-slate-600">{item.summary}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-5">
            {detailedFunctionalExpertise.map((item) => (
              <article key={item.title} className="rounded-[30px] border border-slate-200/80 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[0.48fr_1.52fr]">
                  <div className="flex min-h-full flex-col justify-between rounded-[24px] bg-primary p-5 text-white">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/54">Expertise fonctionnelle</p>
                    <h3 className="mt-4 font-heading text-[1.7rem] leading-[1.06] tracking-[-0.05em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-6 text-sm leading-6 text-white/62">
                      Diagnostic, cadrage, accompagnement et transfert de compétences adaptés aux réalités de chaque organisation.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Column title="Vos enjeux" items={item.enjeux} />
                    <Column title="Notre savoir-faire" items={item.savoirFaire} />
                    <Column title="Nos atouts" items={item.atouts} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sectorielles" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <span className="eyebrow">Expertises sectorielles</span>
              <h2 className="section-title mt-6 max-w-[12ch]">
                Une connaissance fine des marchés, <span className="accent-text">acteurs et dynamiques sectorielles.</span>
              </h2>
              <p className="section-copy mt-6 max-w-[46ch]">
                L’expertise sectorielle de COGESTO Consulting est au cœur de sa proposition de valeur. Notre connaissance approfondie de divers secteurs d’activités, des enjeux des acteurs clés et des dynamiques de marchés, nous permet de créer de la valeur pour nos clients.
              </p>
              <p className="section-copy mt-4 max-w-[46ch]">
                COGESTO Consulting offre aux entreprises l’opportunité de capitaliser sur l’expérience d’experts de haut niveau pour garantir la performance opérationnelle.
              </p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">
                Contactez-nous
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sectorExpertise.map((sector) => (
                <article key={sector} className="rounded-[22px] border border-slate-200/80 bg-white px-4 py-5 text-center shadow-[0_14px_36px_rgba(15,23,42,0.04)]">
                  <p className="font-medium text-slate-800">{sector}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  )
}

function Column({ items, title }: { items: Array<string>; title: string }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
      <h4 className="font-heading text-[1.1rem] tracking-[-0.03em] text-slate-950">{title}</h4>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-2.5">
            <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
              <Check className="size-3" />
            </span>
            <p className="text-sm leading-6 text-slate-600">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
