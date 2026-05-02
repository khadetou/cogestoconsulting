import { Icon } from "@iconify/react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Check } from "lucide-react"
import gsap from "gsap"
import { useEffect, useMemo, useRef } from "react"

import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { detailedFunctionalExpertise, sectorExpertise } from "@/lib/site-data"

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
  "Banques et services financiers": "mdi:bank-outline",
  "Distribution": "mdi:storefront-outline",
  "Énergie et hydrocarbures": "mdi:fire-circle",
  "Hôtellerie / Tourisme": "mdi:briefcase-variant-outline",
  "Immobilier / BTP": "mdi:crane",
  "Industrie": "mdi:factory",
  "Microfinance et SFD": "mdi:hand-coin-outline",
  "Santé": "mdi:medical-bag",
  "Services": "mdi:briefcase-check-outline",
  "TIC, ONG et collectivités locales": "mdi:earth",
  "Transport et logistique": "mdi:truck-delivery-outline",
}

const sectorGroups = [
  {
    description:
      "Une lecture opérationnelle des chaînes de valeur industrielles, énergétiques et logistiques, avec une attention forte aux exigences de performance et de contenu local.",
    icon: "mdi:factory",
    image: "/media/cogesto/extra/expertise-cogesto.jpg",
    sectors: ["Industrie", "Énergie et hydrocarbures", "Immobilier / BTP", "Transport et logistique"],
    title: "Industrie & infrastructures",
  },
  {
    description:
      "Un accompagnement des acteurs de marché dans leurs enjeux de croissance, structuration, pilotage financier, distribution et transformation des services.",
    icon: "mdi:chart-areaspline",
    image: "/media/cogesto/services/Design-sans-titre-23.jpg",
    sectors: ["Distribution", "Banques et services financiers", "Services", "TIC, ONG et collectivités locales"],
    title: "Marchés & services",
  },
  {
    description:
      "Une expertise adaptée aux secteurs fortement liés au développement des territoires, au capital humain, à l’inclusion financière et à la création de valeur locale.",
    icon: "mdi:map-marker-radius-outline",
    image: "/media/cogesto/services/Design-sans-titre-25.jpg",
    sectors: ["Santé", "Agro-alimentaire / Agro business", "Microfinance et SFD", "Hôtellerie / Tourisme"],
    title: "Impact & territoires",
  },
]

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
  const scopeRef = useRef<HTMLDivElement>(null)
  const firstExpertise = useMemo(() => detailedFunctionalExpertise[0]?.title ?? "", [])

  useEffect(() => {
    if (!scopeRef.current) return

    const context = gsap.context(() => {
      gsap.from("[data-expertise-reveal]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
      })
    }, scopeRef)

    return () => context.revert()
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

        <section id="fonctionnelles" className="py-16 sm:py-20">
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

            <Tabs defaultValue={firstExpertise} className="mt-10" data-expertise-reveal>
              <TabsList className="grid !h-auto w-full grid-cols-1 items-stretch gap-2 rounded-[28px] border border-slate-200/80 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:grid-cols-2 lg:grid-cols-3">
                {detailedFunctionalExpertise.map((item) => {
                  const visual = expertiseVisuals[item.title]

                  return (
                    <TabsTrigger
                      key={item.title}
                      value={item.title}
                      className="!h-auto min-h-[84px] justify-start rounded-[22px] px-4 py-4 text-left data-active:bg-primary data-active:text-white data-active:shadow-[0_18px_35px_rgba(21,32,54,0.18)]"
                    >
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary data-[state=active]:bg-white/10">
                        <Icon icon={visual.icon} className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] opacity-70">
                          {visual.kicker}
                        </span>
                        <span className="mt-1 block whitespace-normal font-heading text-[1.05rem] leading-tight tracking-[-0.03em]">
                          {item.title}
                        </span>
                      </span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {detailedFunctionalExpertise.map((item) => (
                <TabsContent key={item.title} value={item.title} className="mt-8">
                  <FunctionalPanel item={item} />
                </TabsContent>
              ))}
            </Tabs>
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

            <Tabs defaultValue={sectorGroups[0].title} className="mt-10" data-expertise-reveal>
              <TabsList className="grid !h-auto w-full grid-cols-1 items-stretch gap-2 rounded-[28px] border border-slate-200/80 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.05)] lg:grid-cols-3">
                {sectorGroups.map((group) => (
                  <TabsTrigger
                    key={group.title}
                    value={group.title}
                    className="!h-auto min-h-[76px] justify-start rounded-[22px] px-4 py-4 text-left data-active:bg-primary data-active:text-white data-active:shadow-[0_18px_35px_rgba(21,32,54,0.18)]"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Icon icon={group.icon} className="size-5" />
                    </span>
                    <span className="block whitespace-normal font-heading text-[1.08rem] leading-tight tracking-[-0.03em]">
                      {group.title}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {sectorGroups.map((group) => (
                <TabsContent key={group.title} value={group.title} className="mt-8">
                  <SectorPanel group={group} />
                </TabsContent>
              ))}
            </Tabs>

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
    <article className="overflow-hidden rounded-[34px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.07)]">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[380px] overflow-hidden bg-primary">
          <img src={visual.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.08),rgba(5,8,18,0.72)),linear-gradient(90deg,rgba(21,32,54,0.72),rgba(21,32,54,0.12))]" />
          <div className="relative z-10 flex min-h-[380px] flex-col justify-end p-6 text-white sm:p-8">
            <span className="inline-flex size-13 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#d8ceb9] backdrop-blur-md">
              <Icon icon={visual.icon} className="size-7" />
            </span>
            <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/62">{visual.kicker}</p>
            <h3 className="mt-3 max-w-[12ch] font-heading text-[2.15rem] leading-[1.02] tracking-[-0.06em] text-white sm:text-[2.7rem]">
              {item.title}
            </h3>
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:p-6">
          <div className="grid gap-4 xl:grid-cols-3">
            <Column title="Vos enjeux" items={item.enjeux} />
            <Column title="Notre savoir-faire" items={item.savoirFaire} />
            <Column title="Nos atouts" items={item.atouts} />
          </div>
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
    <article className="overflow-hidden rounded-[34px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.07)]">
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
            <article key={sector} className="flex min-h-[118px] items-start gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-[0_10px_24px_rgba(21,32,54,0.08)]">
                <Icon icon={sectorIcons[sector]} className="size-6" />
              </span>
              <div>
                <p className="font-heading text-[1.15rem] leading-tight tracking-[-0.03em] text-slate-950">{sector}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
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

function Column({ items, title }: { items: Array<string>; title: string }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <h4 className="font-heading text-[1.15rem] tracking-[-0.03em] text-slate-950">{title}</h4>
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
