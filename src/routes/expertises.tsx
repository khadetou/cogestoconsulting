import { Icon } from "@iconify/react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Check, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import type { BuilderPage } from "@/builder/types"
import { PublicPayloadBackedPage, getPublicPayloadPageHead } from "@/builder/public-page-route"
import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { detailedFunctionalExpertise, sectorExpertise } from "@/lib/site-data"
import { buildBreadcrumbSchema, buildServiceSchema, seoPages } from "@/lib/seo"
import { getPublishedBuilderPage } from "@/server/payload/pages"
import { animateNativeReveal } from "@/lib/dom-animations"

const expertisesMeta = {
  description: seoPages.expertises.description,
  title: seoPages.expertises.title,
}

const formationExpertiseTitle = "Formation, séminaires et Team building"

const expertiseVisuals: Record<string, { icon: string; image: string; kicker: string }> = {
  "Appui aux fonctions supports des entreprises": {
    icon: "mdi:office-building-cog",
    image: "/media/cogesto/services/Design-sans-titre-28.jpg",
    kicker: "Fonctions supports",
  },
  "Conseil à l’investissement et à l’entrepreneuriat": {
    icon: "mdi:briefcase-arrow-up-down",
    image: "/media/cogesto/services/Design-sans-titre-25.jpg",
    kicker: "Investissement",
  },
  "Conseil financier et ingénierie financière": {
    icon: "mdi:finance",
    image: "/media/cogesto/services/Design-sans-titre-21-3.jpg",
    kicker: "Finance",
  },
  Digitalisation: {
    icon: "mdi:monitor-dashboard",
    image: "/media/cogesto/ai/services/digitalisation-ai.png",
    kicker: "Digitalisation",
  },
  "Formation, séminaires et Team building": {
    icon: "mdi:school-outline",
    image: "/media/cogesto/services/Design-sans-titre-26.jpg",
    kicker: "Formation",
  },
  "Gouvernance et Gestion des risques": {
    icon: "mdi:shield-check-outline",
    image: "/media/cogesto/services/Design-sans-titre-22.jpg",
    kicker: "Gouvernance",
  },
  "Management de la performance": {
    icon: "mdi:chart-line",
    image: "/media/cogesto/services/Design-sans-titre-23.jpg",
    kicker: "Performance",
  },
  "Norme et Qualité": {
    icon: "mdi:clipboard-check-outline",
    image: "/media/cogesto/ai/services/norme-qualite-ai.png",
    kicker: "Qualité",
  },
  "Organisation et Capital Humain": {
    icon: "mdi:account-group-outline",
    image: "/media/cogesto/services/Design-sans-titre-21-3.jpg",
    kicker: "Capital humain",
  },
  "Stratégie d’entreprises": {
    icon: "mdi:target-variant",
    image: "/media/cogesto/services/concept-cible-strategie-entrepreneur-demarrage-entreprise-1-scaled.jpg",
    kicker: "Stratégie",
  },
  "Transformations structurelles": {
    icon: "mdi:transit-connection-variant",
    image: "/media/cogesto/services/Design-sans-titre-24.jpg",
    kicker: "Transformation",
  },
}

const sectorIcons: Record<string, string> = {
  "Agro-alimentaire / Agro business": "mdi:sprout",
  "Agences publiques": "mdi:office-building-outline",
  Automobile: "mdi:car",
  "Banques et services financiers": "mdi:bank-outline",
  "Construction métallique": "mdi:hammer-wrench",
  "Distribution": "mdi:storefront-outline",
  "Énergie et électricité": "mdi:transmission-tower",
  "Éducation": "mdi:school-outline",
  "Étude, ingénierie et conseil": "mdi:clipboard-search-outline",
  "Hôtel & restauration": "mdi:silverware-fork-knife",
  "Immobilier / BTP": "mdi:crane",
  "Industrie": "mdi:factory",
  "Mécanique générale": "mdi:cog-outline",
  "Microfinance et SFD": "mdi:hand-coin-outline",
  "Oil & Gas": "mdi:oil",
  "ONG": "mdi:hand-heart-outline",
  "Organismes": "mdi:domain",
  "Santé": "mdi:medical-bag",
  "TIC": "mdi:monitor-cellphone",
  "Transport et logistique": "mdi:truck-delivery-outline",
  "Transport maritime": "mdi:ferry",
}

const sectorGroups = [
  {
    description:
      "Une lecture opérationnelle des chaînes de valeur industrielles, agroalimentaires, énergétiques et d’infrastructures, avec une attention forte aux exigences de performance et de contenu local.",
    icon: "mdi:factory",
    image: "/media/cogesto/extra/expertise-cogesto.jpg",
    sectors: [
      "Industrie",
      "Agro-alimentaire / Agro business",
      "Oil & Gas",
      "Immobilier / BTP",
      "Construction métallique",
      "Automobile",
      "Énergie et électricité",
      "Mécanique générale",
    ],
    title: "Industrie & infrastructures",
  },
  {
    description:
      "Un accompagnement des organisations de services dans leurs enjeux de croissance, structuration, pilotage financier, distribution, transport et relation client.",
    icon: "mdi:chart-areaspline",
    image: "/media/cogesto/services/Design-sans-titre-23.jpg",
    sectors: [
      "Distribution",
      "Banques et services financiers",
      "Santé",
      "Microfinance et SFD",
      "Transport et logistique",
      "Transport maritime",
      "Hôtel & restauration",
      "Éducation",
      "Étude, ingénierie et conseil",
      "TIC",
    ],
    title: "Services",
  },
  {
    description:
      "Un accompagnement des acteurs institutionnels et territoriaux dans leurs projets, leur organisation, leur gouvernance et la création de valeur publique.",
    icon: "mdi:map-marker-radius-outline",
    image: "/media/cogesto/services/Design-sans-titre-25.jpg",
    sectors: ["ONG", "Agences publiques", "Organismes"],
    title: "Administration et territoire",
  },
]

export const Route = createFileRoute("/expertises")({
  head: ({ loaderData }) =>
    getPublicPayloadPageHead(loaderData, expertisesMeta.title, expertisesMeta.description, {
      ...seoPages.expertises,
      jsonLd: [
        buildServiceSchema(seoPages.expertises, "Conseil stratégique, organisation, finance, digitalisation et formation"),
        buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Expertises", path: "/expertises" },
        ]),
      ],
    }),
  loader: async (): Promise<BuilderPage> => getPublishedBuilderPage({ data: { slug: "expertises" } }),
  component: ExpertisesPage,
})

function ExpertisesPage() {
  const page = Route.useLoaderData() as unknown as BuilderPage | undefined

  return <PublicPayloadBackedPage fallback={<ExpertisesBasePage />} page={page} slug="expertises" />
}

function ExpertisesBasePage() {
  const scopeRef = useRef<HTMLDivElement>(null)
  const [activeExpertise, setActiveExpertise] = useState(detailedFunctionalExpertise[0]?.title ?? "")
  const [activeSectorGroup, setActiveSectorGroup] = useState(sectorGroups[0]?.title ?? "")
  const activeExpertiseItem =
    detailedFunctionalExpertise.find((item) => item.title === activeExpertise) ?? detailedFunctionalExpertise[0]
  const activeSectorGroupItem =
    sectorGroups.find((group) => group.title === activeSectorGroup) ?? sectorGroups[0]
  const selectExpertise = (title: string, scrollToPanel = false) => {
    setActiveExpertise(title)

    if (!scrollToPanel || typeof window === "undefined" || !window.matchMedia("(max-width: 1023px)").matches) {
      return
    }

    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        document.getElementById("functional-mobile-panel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 0)
    })
  }

  useEffect(() => {
    if (!scopeRef.current) return

    return animateNativeReveal(scopeRef.current, "[data-expertise-reveal]", {
      duration: 700,
      stagger: 60,
      y: 18,
    })
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    function selectFormationFromHash() {
      if (window.location.hash !== "#formation") return

      setActiveExpertise(formationExpertiseTitle)
      window.requestAnimationFrame(() => {
        document.getElementById("fonctionnelles")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      })
    }

    selectFormationFromHash()
    window.addEventListener("hashchange", selectFormationFromHash)

    return () => window.removeEventListener("hashchange", selectFormationFromHash)
  }, [])

  return (
    <PageLayout>
      <div ref={scopeRef}>
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

        <section id="fonctionnelles" className="scroll-mt-28 py-16 sm:py-20">
          <div className="page-shell">
            <div data-expertise-reveal className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <span className="eyebrow">Expertises fonctionnelles</span>
                <h2 className="section-title mt-6 max-w-[13ch]">
                  Une offre lisible, <span className="accent-text">du diagnostic à l’exécution.</span>
                </h2>
              </div>
              <div className="space-y-4">
                <p className="section-copy">
                  COGESTO Consulting offre son expertise pour accompagner la croissance des entreprises. À cet effet, il a développé des outils et méthodes éprouvés, à travers le retour d’expérience d’experts de haut niveau, pour permettre aux entreprises d’atteindre l’excellence opérationnelle.
                </p>
                <p className="section-copy">
                  Notre approche permet de personnaliser nos services pour répondre aux besoins uniques de chaque organisation.
                </p>
              </div>
            </div>

            <div
              className="mt-10 rounded-[28px] border border-slate-200/90 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:hidden"
              data-expertise-reveal
            >
              <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-3">
                {detailedFunctionalExpertise.map((item) => {
                  const visual = expertiseVisuals[item.title]
                  const isActive = activeExpertise === item.title

                  return (
                    <button
                      key={item.title}
                      type="button"
                      aria-expanded={isActive}
                      className={[
                        "group/tab flex min-h-[58px] w-[250px] shrink-0 snap-start items-center gap-3 rounded-[20px] border px-3 py-2.5 text-left transition-all duration-200 sm:w-[280px]",
                        isActive
                          ? "border-[#152036] bg-[#152036] text-white shadow-[0_18px_35px_rgba(21,32,54,0.2)]"
                          : "border-slate-200 bg-[#f8fafc] text-slate-800 hover:border-[#9fb8d4] hover:bg-[#eef6fd] hover:text-slate-950",
                      ].join(" ")}
                      onClick={() => selectExpertise(item.title, true)}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={[
                            "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors",
                            isActive ? "bg-white/12 text-white" : "bg-[#dff2ff] text-[#0f4f86]",
                          ].join(" ")}
                        >
                          <Icon icon={visual.icon} className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span
                            className={[
                              "block text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                              isActive ? "text-white/68" : "text-[#5f7792]",
                            ].join(" ")}
                          >
                            {visual.kicker}
                          </span>
                          <span
                            className={[
                              "mt-1 block whitespace-normal font-heading text-[1.05rem] leading-tight tracking-[-0.03em] transition-colors",
                              isActive ? "text-white" : "text-[#1f334d]",
                            ].join(" ")}
                          >
                            {item.title}
                          </span>
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>

              {activeExpertiseItem ? (
                <div id="functional-mobile-panel" className="scroll-mt-24">
                  <FunctionalPanel item={activeExpertiseItem} />
                </div>
              ) : null}
            </div>

            <div
              className="mt-10 hidden items-start gap-4 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]"
              data-expertise-reveal
            >
              <div className="grid content-start gap-1.5 rounded-[26px] border border-slate-200/90 bg-white p-2.5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] lg:sticky lg:top-28 lg:max-h-[calc(100vh-20rem)] lg:overflow-y-auto lg:pr-2">
                {detailedFunctionalExpertise.map((item) => {
                  const visual = expertiseVisuals[item.title]
                  const isActive = activeExpertise === item.title

                  return (
                    <button
                      key={item.title}
                      type="button"
                      aria-expanded={isActive}
                      className={[
                        "flex min-h-[48px] items-center justify-between gap-2.5 rounded-[16px] border px-3 py-2 text-left transition-all duration-200",
                        isActive
                          ? "border-[#152036] bg-[#152036] text-white shadow-[0_16px_30px_rgba(21,32,54,0.18)]"
                          : "border-slate-200 bg-[#f8fafc] text-[#1f334d] hover:border-[#9fb8d4] hover:bg-[#eef6fd]",
                      ].join(" ")}
                      onClick={() => selectExpertise(item.title)}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className={["inline-flex size-8 shrink-0 items-center justify-center rounded-xl", isActive ? "bg-white/12 text-white" : "bg-[#dff2ff] text-[#0f4f86]"].join(" ")}>
                          <Icon icon={visual.icon} className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="hidden">
                            {visual.kicker}
                          </span>
                          <span className={["block font-heading text-[0.82rem] leading-tight tracking-[-0.02em]", isActive ? "text-white" : "text-[#1f334d]"].join(" ")}>
                            {item.title}
                          </span>
                        </span>
                      </span>
                      <ArrowRight className={["size-4 shrink-0", isActive ? "text-white/70" : "text-[#5f7792]"].join(" ")} />
                    </button>
                  )
                })}
              </div>

              {activeExpertiseItem ? <FunctionalPanel item={activeExpertiseItem} /> : null}
            </div>
          </div>
        </section>

        <section id="sectorielles" className="py-16 sm:py-20">
          <div className="page-shell">
            <div data-expertise-reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <span className="eyebrow">Expertises sectorielles</span>
                <h2 className="section-title mt-6 max-w-[12ch]">
                  Des secteurs regroupés <span className="accent-text">par enjeux de décision.</span>
                </h2>
              </div>
              <div>
                <p className="section-copy">
                  L’expertise sectorielle de COGESTO Consulting est au cœur de sa proposition de valeur. Notre connaissance approfondie de divers secteurs d’activités, des enjeux des acteurs clés et des dynamiques de marchés, nous permet de créer de la valeur pour nos clients.
                </p>
                <p className="section-copy mt-4">
                  Cogesto Consulting offre aux entreprises l’opportunité de capitaliser sur l’expérience d’experts de haut niveau pour garantir la performance opérationnelle.
                </p>
              </div>
            </div>

            <div
              className="mt-10 grid items-start gap-3 rounded-[28px] border border-slate-200/90 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:hidden"
              data-expertise-reveal
            >
              {sectorGroups.map((group) => {
                const isActive = activeSectorGroup === group.title

                return (
                  <div key={group.title} className="contents">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      className={[
                        "flex min-h-[78px] items-center justify-between gap-4 rounded-[22px] border px-4 py-4 text-left transition-all duration-200",
                        isActive
                          ? "border-[#152036] bg-[#152036] text-white shadow-[0_18px_35px_rgba(21,32,54,0.2)]"
                          : "border-slate-200 bg-[#f8fafc] text-[#1f334d] hover:border-[#9fb8d4] hover:bg-[#eef6fd]",
                      ].join(" ")}
                      onClick={() => setActiveSectorGroup(group.title)}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={[
                            "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl",
                            isActive ? "bg-white/12 text-white" : "bg-[#dff2ff] text-[#0f4f86]",
                          ].join(" ")}
                        >
                          <Icon icon={group.icon} className="size-5" />
                        </span>
                        <span className={["block whitespace-normal font-heading text-[1.08rem] leading-tight tracking-[-0.03em]", isActive ? "text-white" : "text-[#1f334d]"].join(" ")}>
                          {group.title}
                        </span>
                      </span>
                      <ChevronDown className={["size-4 shrink-0 transition-transform duration-200", isActive ? "rotate-180 text-white/70" : "text-[#5f7792]"].join(" ")} />
                    </button>

                    {isActive ? (
                      <div className="col-span-full">
                        <SectorPanel group={group} />
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>

            <div
              className="mt-10 hidden items-start gap-4 lg:grid lg:grid-cols-[340px_minmax(0,1fr)]"
              data-expertise-reveal
            >
              <div className="grid content-start gap-2 rounded-[30px] border border-slate-200/90 bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                {sectorGroups.map((group) => {
                  const isActive = activeSectorGroup === group.title

                  return (
                    <button
                      key={group.title}
                      type="button"
                      aria-expanded={isActive}
                      className={[
                        "flex min-h-[76px] items-center justify-between gap-3 rounded-[20px] border px-4 py-3 text-left transition-all duration-200",
                        isActive
                          ? "border-[#152036] bg-[#152036] text-white shadow-[0_16px_30px_rgba(21,32,54,0.18)]"
                          : "border-slate-200 bg-[#f8fafc] text-[#1f334d] hover:border-[#9fb8d4] hover:bg-[#eef6fd]",
                      ].join(" ")}
                      onClick={() => setActiveSectorGroup(group.title)}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className={["inline-flex size-10 shrink-0 items-center justify-center rounded-2xl", isActive ? "bg-white/12 text-white" : "bg-[#dff2ff] text-[#0f4f86]"].join(" ")}>
                          <Icon icon={group.icon} className="size-5" />
                        </span>
                        <span className={["block font-heading text-[1rem] leading-tight tracking-[-0.02em]", isActive ? "text-white" : "text-[#1f334d]"].join(" ")}>
                          {group.title}
                        </span>
                      </span>
                      <ArrowRight className={["size-4 shrink-0", isActive ? "text-white/70" : "text-[#5f7792]"].join(" ")} />
                    </button>
                  )
                })}
              </div>

              {activeSectorGroupItem ? <SectorPanel group={activeSectorGroupItem} /> : null}
            </div>

            <div data-expertise-reveal className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[30px] bg-primary p-6 text-white shadow-[0_24px_60px_rgba(21,32,54,0.16)] sm:flex-row sm:items-center">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/58">
                  Couverture sectorielle
                </p>
                <p className="mt-2 max-w-3xl text-[1rem] leading-7 text-white/72">
                  {sectorExpertise.length} secteurs d’intervention structurés pour aider les organisations à arbitrer, financer, organiser et piloter leurs priorités.
                </p>
              </div>
              <Link to="/contact" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary">
                Contactez-nous
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <CtaSection />
      </div>
    </PageLayout>
  )
}

function FunctionalPanel({
  item,
}: {
  item: (typeof detailedFunctionalExpertise)[number]
}) {
  const visual = expertiseVisuals[item.title]

  return (
    <article className="self-start overflow-hidden rounded-[28px] border border-[#b8def7]/80 bg-white shadow-[0_22px_55px_rgba(15,76,129,0.1)] lg:sticky lg:top-28">
      <div className="grid gap-0">
        <div className="relative min-h-[230px] overflow-hidden bg-primary lg:min-h-[250px]">
          <img src={visual.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.06),rgba(5,8,18,0.74)),linear-gradient(90deg,rgba(21,32,54,0.78),rgba(21,32,54,0.2))]" />
          <div className="relative z-10 flex min-h-[230px] flex-col justify-end p-6 text-white sm:p-7 lg:min-h-[250px]">
            <div className="flex items-end gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#d8ceb9] backdrop-blur-md">
                <Icon icon={visual.icon} className="size-6" />
              </span>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/62">{visual.kicker}</p>
                <h3 className="mt-2 max-w-[18ch] font-heading text-[1.9rem] leading-[1.02] tracking-[-0.05em] text-white sm:text-[2.35rem]">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="grid content-start gap-4">
            <Column title="Vos enjeux" items={item.enjeux} />
            <Column title="Nos atouts" items={item.atouts} />
          </div>
          <Column title="Notre savoir-faire" items={item.savoirFaire} wide />
        </div>
      </div>
    </article>
  )
}

function SectorPanel({
  group,
}: {
  group: (typeof sectorGroups)[number]
}) {
  return (
    <article className="self-start overflow-hidden rounded-[28px] border border-[#b8def7]/80 bg-white shadow-[0_22px_55px_rgba(15,76,129,0.1)] lg:sticky lg:top-28">
      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-[360px] overflow-hidden">
          <img src={group.image} alt={group.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.1),rgba(5,8,18,0.7))]" />
          <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-6 text-white sm:p-8">
            <span className="inline-flex size-13 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#d8ceb9] backdrop-blur-md">
              <Icon icon={group.icon} className="size-7" />
            </span>
            <h3 className="mt-5 font-heading text-[2.2rem] leading-[1.02] tracking-[-0.06em] text-white">
              {group.title}
            </h3>
            <p className="mt-4 max-w-[36ch] text-[0.98rem] leading-7 text-white/72">{group.description}</p>
          </div>
        </div>

        <div className="grid content-start gap-3 p-5 sm:grid-cols-2 sm:p-6">
          {group.sectors.map((sector) => (
            <article key={sector} className="flex min-h-[118px] items-start gap-4 rounded-[24px] border border-[#d7e6f4] bg-[#f8fbfe] p-5">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#e5f5ff] text-[#0f4f86] shadow-[0_10px_24px_rgba(15,76,129,0.08)]">
                <Icon icon={sectorIcons[sector]} className="size-6" />
              </span>
              <div>
                <p className="font-heading text-[1.15rem] leading-tight tracking-[-0.03em] text-slate-950">{sector}</p>
                <p className="mt-2 text-sm leading-6 text-[#465a73]">
                  Analyse sectorielle, benchmark, priorisation et accompagnement opérationnel.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </article>
  )
}

function Column({ items, title, wide = false }: { items: Array<string>; title: string; wide?: boolean }) {
  return (
    <div className="rounded-[22px] border border-[#d7e6f4] bg-[#f8fbfe] p-4 sm:p-5">
      <h4 className="font-heading text-[1.15rem] tracking-[-0.03em] text-slate-950">{title}</h4>
      <div className={["mt-4 grid gap-2.5", wide ? "lg:grid-cols-2" : ""].join(" ")}>
        {items.map((item) => (
          <div key={item} className="flex gap-2.5">
            <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e5f5ff] text-[#0f4f86] shadow-sm">
              <Check className="size-3" />
            </span>
            <p className="text-[0.9rem] leading-6 text-[#465a73]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
