import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Target, TrendingUp } from "lucide-react"

import type { BuilderPage } from "@/builder/types"
import { PublicPayloadBackedPage, getPublicPayloadPageHead } from "@/builder/public-page-route"
import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { ProgramExpertCard } from "@/components/program-expert-card"
import {
  programContextHighlights,
  programExpertRoster,
  programKeyFigures,
  programObjectives,
  programPartners,
  programResults,
} from "@/lib/site-data"
import { buildBreadcrumbSchema, buildServiceSchema, seoPages } from "@/lib/seo"
import { getPublishedBuilderPage } from "@/server/payload/pages"

const programMeta = {
  description: seoPages.businessLinkageProgram.description,
  title: seoPages.businessLinkageProgram.title,
}

export const Route = createFileRoute("/business-linkage-program")({
  head: ({ loaderData }) =>
    getPublicPayloadPageHead(loaderData, programMeta.title, programMeta.description, {
      ...seoPages.businessLinkageProgram,
      jsonLd: [
        buildServiceSchema(seoPages.businessLinkageProgram, "Accompagnement PME, Oil & Gas, contenu local et accès financement"),
        buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Business Linkage Program", path: "/business-linkage-program" },
        ]),
      ],
    }),
  loader: async (): Promise<BuilderPage> => getPublishedBuilderPage({ data: { slug: "business-linkage-program" } }),
  component: ProgramPage,
})

function ProgramPage() {
  const page = Route.useLoaderData() as unknown as BuilderPage | undefined

  return (
    <PublicPayloadBackedPage
      fallback={<ProgramBasePage />}
      page={page}
      slug="business-linkage-program"
    />
  )
}

function ProgramBasePage() {
  return (
    <PageLayout>
      <section className="inner-hero text-white">
        <div className="site-container grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-14">
          <div>
            <p className="eyebrow text-white/70 before:bg-white/20">Business Linkage Program</p>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              Accompagner la croissance des entreprises dans le secteur du pétrole et du gaz.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Un programme de partenariat d’affaires conçu pour renforcer les compétences de gestion, les capacités de production, l’accès aux marchés et l’accès au financement des PME sénégalaises.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#152036] shadow-[0_18px_38px_rgba(255,255,255,0.16)]">
                Rejoindre le programme
                <ArrowRight className="size-4" />
              </Link>
              <a href="#objectifs" className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/14">
                Voir les objectifs
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
            <img
              src="/media/cogesto/ai/business-linkage/business-linkage-hero-african-professionals.png"
              alt="Professionnels africains en réunion dans le cadre du Business Linkage Program"
              className="aspect-[1.57] h-full max-h-[500px] w-full object-cover"
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
                Le Sénégal dispose désormais d’un réel potentiel économique pétrolier et gazier suite aux découvertes d’importants gisements offshore entre 2014 et 2015.
              </p>
              <p className="section-copy mt-4">
                Pour créer les conditions d’une industrie profitable aux entreprises nationales, le Sénégal a créé en 2016 un Comité Stratégique d’Orientation et adopté la loi 2019-04 relative au contenu local dans le secteur des hydrocarbures.
              </p>
              <p className="section-copy mt-4">
                La Banque Africaine de Développement a mis en place un mécanisme d’assistance technique aux PME locales, sur sollicitation d’Invest In Africa et avec l’appui du Fonds d’Assistance au Secteur Privé Africain.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {programContextHighlights.map((item) => (
                  <div key={item} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-[0.92rem] leading-6 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
                <img src="/media/cogesto/blp/tof2870-1200x801.jpg" alt="Session de travail du Business Linkage Program" className="aspect-[4/3] h-full w-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {programKeyFigures.map((figure) => (
                  <div key={figure.label} className="rounded-[22px] border border-[#d7e6f4] bg-[#f8fbfe] p-4">
                    <p className="font-heading text-[2rem] leading-none tracking-[-0.06em] text-[#152036]">{figure.value}</p>
                    <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#5f86ad]">{figure.label}</p>
                    <p className="mt-2 text-sm leading-5 text-slate-600">{figure.detail}</p>
                  </div>
                ))}
              </div>
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
                <div className="flex min-h-28 items-center justify-center rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                  <img src={partner.logo} alt={partner.name} className="max-h-20 w-full object-contain" loading="lazy" />
                </div>
                <h3 className="mt-5 font-heading text-[1.45rem] tracking-[-0.04em] text-slate-950">{partner.name}</h3>
                <p className="mt-3 text-[0.98rem] leading-6 text-slate-600">{partner.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="objectifs" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mb-10 max-w-4xl">
            <span className="eyebrow">Objectifs et résultats</span>
            <h2 className="section-title mt-6">
              Apporter une assistance technique concrète aux <span className="accent-text">PME à forts potentiels.</span>
            </h2>
            <p className="section-copy mt-5">
              Le programme vise à permettre aux PME ciblées d’accéder aux marchés et aux financements, tout en améliorant leur intégration dans la chaîne de valeur de l’industrie pétrolière et gazière et la génération d’emplois décents au Sénégal.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <ProgramList icon="target" items={programObjectives} title="Objectifs du programme." />
            <ProgramList icon="trend" items={programResults} title="Résultats attendus." />
          </div>
        </div>
      </section>

      <section id="consultants" className="bg-[#eaf3fb] py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center before:hidden !text-[#8b7655]">Nos consultants BLP</span>
            <h2 className="section-title mt-6 !text-[#152036]">
              Une équipe d’experts de très haut niveau <span className="!text-[#978360]">mobilisée pour les PME.</span>
            </h2>
            <p className="section-copy mt-5 !text-[#3d526c]">
              Les profils mobilisés couvrent l’Oil & Gas, la stratégie, l’organisation, le capital humain, la finance, la restructuration, la pédagogie, la supply chain, la QHSE, le droit, la fiscalité et la structuration de financement.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {programExpertRoster.map((expert) => (
              <ProgramExpertCard key={expert.name} expert={expert} />
            ))}
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
      <h2 className="mt-5 max-w-[12ch] font-heading text-[2.15rem] leading-[1.02] tracking-[-0.055em] text-[#152036] sm:text-[2.8rem]">{title}</h2>
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
