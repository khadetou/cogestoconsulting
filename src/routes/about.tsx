import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Check, Leaf, ShieldCheck } from "lucide-react"

import type { BuilderPage } from "@/builder/types"
import { PublicPayloadBackedPage, getPublicPayloadPageHead } from "@/builder/public-page-route"
import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { TeamPortrait } from "@/components/team-portrait"
import {
  aboutApproach,
  aboutBoardMembers,
  aboutExecutiveCommittee,
  aboutPresidentMessage,
  commitments,
  socialCommitments,
  valueCards,
} from "@/lib/site-data"
import { buildBreadcrumbSchema, seoPages } from "@/lib/seo"
import { getPublishedBuilderPage } from "@/server/payload/pages"

const aboutMeta = {
  description: seoPages.about.description,
  title: seoPages.about.title,
}

export const Route = createFileRoute("/about")({
  head: ({ loaderData }) =>
    getPublicPayloadPageHead(loaderData, aboutMeta.title, aboutMeta.description, {
      ...seoPages.about,
      jsonLd: [
        buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/about" },
        ]),
      ],
    }),
  loader: async (): Promise<BuilderPage> => getPublishedBuilderPage({ data: { slug: "about" } }),
  component: AboutPage,
})

function AboutPage() {
  const page = Route.useLoaderData() as unknown as BuilderPage | undefined

  return <PublicPayloadBackedPage fallback={<AboutBasePage />} page={page} slug="about" />
}

function AboutBasePage() {
  return (
    <PageLayout>
      <section className="inner-hero text-white">
        <div className="site-container py-20 sm:py-28">
          <p className="eyebrow text-white/70 before:bg-white/20">À propos</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Vision, mission, valeurs et engagements.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Cogesto Consulting contribue au développement de l’Afrique à travers la consultance et la formation, avec la conviction que la performance durable passe par l’émergence d’entreprises championnes, créatrices de valeur et capables de grandir dans leur écosystème.
          </p>
        </div>
      </section>

      <section id="president" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
              <img src="/media/cogesto/president.jpg" alt="Babacar Sow" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="eyebrow">Le mot du Président</span>
              <h2 className="section-title mt-6 max-w-[15ch]">
                Une vision tournée vers <span className="accent-text">le développement de l’Afrique.</span>
              </h2>
              <div className="mt-6 space-y-4">
                {aboutPresidentMessage.map((paragraph) => (
                  <p key={paragraph} className="section-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-6 font-heading text-[1.4rem] leading-tight tracking-[-0.04em] text-primary">
                Ensemble, nous pouvons relever les défis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="bg-white py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <article>
              <span className="eyebrow before:hidden !text-[#978360]">Notre mission</span>
              <h2 className="mt-5 max-w-[12ch] font-heading text-[2rem] leading-[1.05] tracking-tight text-[#152036] md:text-[2.8rem]">
                Mettre l’expertise au service de la performance.
              </h2>
              <div className="mt-7 space-y-5">
                <p className="text-[1.02rem] leading-8 text-[#4f5f76]">
                  Nous mettons notre expertise au service de la croissance et de la compétitivité des startups et entreprises d’Afrique francophone actives dans des secteurs stratégiques tels que l’agro-industrie et le numérique.
                </p>
                <p className="text-[1.02rem] leading-8 text-[#4f5f76]">
                  Nous accompagnons leur transformation structurelle, organisationnelle, opérationnelle, stratégique et digitale, en leur offrant des solutions innovantes, durables et adaptées à leurs besoins, pour renforcer leurs capacités, faciliter leur accès aux marchés et aux financements.
                </p>
                <p className="text-[1.02rem] leading-8 text-[#4f5f76]">
                  Notre intervention vise à renforcer leur performance et leur résilience, tout en soutenant la création de valeur durable.
                </p>
              </div>
            </article>

            <article id="valeurs" className="rounded-[30px] border border-[#d8e6f4] bg-[#f4f8fb] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <span className="eyebrow before:hidden">Nos valeurs</span>
              <p className="mt-3 text-[1rem] leading-7 text-slate-600">Notre approche est principalement basée sur :</p>
              <div className="mt-6 overflow-hidden rounded-[28px] border border-[#d8e6f4] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                {valueCards.map((value) => (
                  <div key={value.title} className="grid gap-4 border-t border-[#d8e6f4] px-5 py-5 text-center first:border-t-0 sm:grid-cols-[7.5rem_1fr_2.25rem] sm:items-center sm:text-left">
                    <div className="mx-auto flex size-28 items-center justify-center rounded-[24px] bg-[#f8fbff] sm:mx-0">
                      <img src={value.image} alt={value.title} className="size-full scale-[1.15] object-contain" loading="lazy" />
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <span className="text-base font-semibold text-[#172238]">{value.title}</span>
                        <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#152036] text-white sm:hidden">
                          <Check className="size-3" />
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{value.summary}</p>
                    </div>
                    <span className="hidden size-8 items-center justify-center rounded-full bg-[#152036] text-white sm:inline-flex">
                      <Check className="size-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="proposition" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="eyebrow">Notre proposition de valeur</span>
              <h2 className="section-title mt-6 max-w-[12ch]">
                Une approche <span className="accent-text">ancrée dans l’analyse et l’action.</span>
              </h2>
              <p className="section-copy mt-5 max-w-[42ch]">
                Notre approche est principalement basée sur des méthodes concrètes, un diagnostic ciblé et un accompagnement interactif.
              </p>
            </div>
            <div className="grid gap-4">
              {aboutApproach.map((item) => (
                <article key={item} className="rounded-[24px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_14px_36px_rgba(15,23,42,0.04)]">
                  <p className="text-[1rem] leading-7 text-slate-700">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="equipe" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center before:hidden">Notre équipe</span>
            <h2 className="section-title mt-6">
              Une gouvernance et un comité de direction <span className="accent-text">à forte expérience.</span>
            </h2>
            <p className="section-copy mt-5">
              Le conseil d’administration et le comité exécutif réunissent des profils expérimentés en conseil, finance, droit, organisation, ressources humaines et politiques publiques.
            </p>
          </div>

          <ProfileGrid
            eyebrow="Le Conseil d’Administration"
            intro="Le conseil d’administration de Cogesto Consulting est composé d’administrateurs expérimentés ayant une expérience avérée en tant que consultants et managers."
            people={aboutBoardMembers}
          />

          <ProfileGrid
            className="mt-14"
            eyebrow="Notre comité exécutif"
            intro="Un comité de direction réunissant des profils seniors aux expériences complémentaires en conseil, entreprise et institutions internationales."
            people={aboutExecutiveCommittee}
          />
        </div>
      </section>

      <section id="engagements" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <span className="eyebrow">Nos engagements</span>
              <h2 className="section-title mt-6 max-w-[12ch]">
                Intégrité, confidentialité et <span className="accent-text">responsabilité.</span>
              </h2>
              <p className="section-copy mt-6 max-w-[48ch]">
                Notre ambition est de devenir une référence d’excellence parmi les cabinets de conseil en organisation et management. Nous exprimons ainsi notre ferme volonté d’intervenir en contributeur de performance dans le domaine précis où nous apportons une vraie valeur.
              </p>
              <p className="section-copy mt-4 max-w-[48ch]">
                Pour cela, nous prenons les engagements suivants vis-à-vis de nos clients :
              </p>
              <div className="mt-8 grid gap-3">
                {commitments.map((item) => (
                  <article key={item} className="flex items-center gap-4 rounded-[24px] border border-slate-200/80 bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.04)]">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-slate-950 text-white">
                      <ShieldCheck className="size-4" />
                    </span>
                    <span className="text-[1rem] font-medium text-slate-800">{item}</span>
                  </article>
                ))}
              </div>
            </div>

            <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Leaf className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-[1.8rem] leading-[1.08] tracking-[-0.05em] text-slate-950">
                Engagement écologique et social
              </h3>
              <div className="mt-5 grid gap-4">
                {socialCommitments.map((item) => (
                  <div key={item.title} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">{item.date}</p>
                    <h4 className="mt-2 font-heading text-[1.2rem] leading-tight tracking-[-0.04em] text-slate-950">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-bold text-primary"
                    >
                      Télécharger
                    </a>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">
                Nous contacter
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

function ProfileCard({
  image,
  imageScale,
  name,
  role,
  summary,
}: {
  image: string
  imageScale?: number
  name: string
  role: string
  summary: string
}) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
      <TeamPortrait src={image} alt={name} imageScale={imageScale} />
      <div className="p-5">
        <h3 className="font-heading text-[1.45rem] leading-[1.1] tracking-[-0.04em] text-slate-950">{name}</h3>
        <p className="mt-1 text-sm font-semibold text-primary">{role}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>
      </div>
    </article>
  )
}

function ProfileGrid({
  className = "mt-12",
  eyebrow,
  intro,
  people,
}: {
  className?: string
  eyebrow: string
  intro: string
  people: Array<{ image: string; imageScale?: number; name: string; role: string; summary: string }>
}) {
  return (
    <div className={className}>
      <div className="mb-6 max-w-3xl">
        <span className="eyebrow before:hidden">{eyebrow}</span>
        <p className="mt-3 text-[1rem] leading-7 text-slate-600">{intro}</p>
      </div>
      <div className={`grid gap-5 md:grid-cols-2 ${people.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
        {people.map((person) => (
          <ProfileCard key={`${eyebrow}-${person.name}`} {...person} />
        ))}
      </div>
    </div>
  )
}
