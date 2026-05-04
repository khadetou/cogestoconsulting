import { Icon } from "@iconify/react"
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CirclePlay,
  Handshake,
  Leaf,
  Mail,
  MapPin,
  MoveRight,
  Phone,
  RouteIcon,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import type { ReactNode } from "react"

import type { InlineRichTextMap, InlineTextStyleMap } from "@/builder/inline-editing"
import type { AnimationPreset } from "@/builder/types"
import { AnimatedBlock } from "@/builder/animation"
import { InlineText, TextStyleProvider, handleBuilderLinkClick } from "@/builder/inline-editing"
import { PartnerLogoCarousel } from "@/components/common-sections"
import { SiteHeader } from "@/components/site-header"
import { TeamPortrait } from "@/components/team-portrait"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  aboutApproach,
  aboutBoardMembers,
  aboutExecutiveCommittee,
  aboutPresidentMessage,
  businessLinkageOffers,
  commitments,
  contact,
  detailedFunctionalExpertise,
  eventGalleries,
  events,
  homeProcessSteps,
  homeServices,
  leaders,
  programConsultants,
  programContextHighlights,
  programEventGallery,
  programExpertRoster,
  programObjectives,
  programPartners,
  programResults,
  sectorExpertise,
  socialCommitments,
  values,
} from "@/lib/site-data"
import { cn } from "@/lib/utils"

type ButtonLink = {
  href?: string
  label?: string
}

type EditableBlockProps = {
  animation?: AnimationPreset
  id?: string
  puck?: {
    isEditing?: boolean
  }
  richText?: InlineRichTextMap
  textStyles?: InlineTextStyleMap
}

type HomeTextItem = {
  body?: string
  date?: string
  description?: string
  label?: string
  role?: string
  summary?: string
  tag?: string
  title: string
}

export type HomeContentCopy = {
  about?: {
    badge?: string
    body?: string
    buttonLabel?: string
    eyebrow?: string
    missionBody?: string
    missionEyebrow?: string
    missionTitle?: string
    titleAccent?: string
    titleLead?: string
  }
  events?: {
    body?: string
    buttonLabel?: string
    eyebrow?: string
    items?: Array<HomeTextItem>
    titleAccent?: string
    titleLead?: string
  }
  expertises?: {
    body?: string
    buttonLabel?: string
    eyebrow?: string
    services?: Array<HomeTextItem>
    titleAccent?: string
    titleLead?: string
  }
  method?: {
    buttonLabel?: string
    steps?: Array<HomeTextItem>
    titleAccent?: string
    titleLead?: string
  }
  partners?: {
    title?: string
  }
  showcase?: {
    caption?: string
  }
  team?: {
    body?: string
    eyebrow?: string
    leaders?: Array<HomeTextItem>
    titleAccent?: string
    titleLead?: string
  }
}

export const defaultHomeContentCopy: HomeContentCopy = {
  about: {
    badge: "Une équipe composée de professionnels hautement qualifiés et expérimentés.",
    body: "Cogesto Consulting aide les clients à résoudre des problèmes importants afin d’assurer le développement durable de leur entreprise. Son approche combine expertise sectorielle, expertise fonctionnelle et transfert de compétences.",
    buttonLabel: "Découvrir le cabinet",
    eyebrow: "À propos",
    missionBody:
      "Une démarche orientée diagnostic, outils pratiques, accompagnement personnalisé et résultats durables.",
    missionEyebrow: "Mission",
    missionTitle:
      "Mettre l’expertise au service de la performance, du capital humain et de la création de valeur.",
    titleAccent: "performance des organisations.",
    titleLead: "Un cabinet engagé pour la",
  },
  events: {
    body: "Cogesto Consulting déploie des programmes, des formations et des sessions de coaching pour renforcer la préparation des entreprises face à leurs nouveaux marchés.",
    buttonLabel: "Voir tous les évènements",
    eyebrow: "Évènements",
    items: events.map((event) => ({
      date: event.date,
      summary: event.summary,
      title: event.title,
    })),
    titleAccent: "ancrées dans le terrain.",
    titleLead: "Des actions concrètes",
  },
  expertises: {
    body: "Des outils et méthodes éprouvés, développés à partir du retour d’expérience d’experts de haut niveau, pour permettre aux organisations d’atteindre l’excellence opérationnelle.",
    buttonLabel: "Voir toutes les expertises",
    eyebrow: "Nos expertises",
    services: homeServices.map((service) => ({
      summary: service.description,
      tag: service.tag,
      title: service.title,
    })),
    titleAccent: "créer de la valeur et renforcer la compétitivité.",
    titleLead: "Des expertises conçues pour",
  },
  method: {
    buttonLabel: "Notre proposition de valeur",
    steps: homeProcessSteps.map((step) => ({
      description: step.description,
      title: step.title,
    })),
    titleAccent: "clarifiée.",
    titleLead: "Notre démarche,",
  },
  partners: {
    title: "Références et partenaires",
  },
  showcase: {
    caption: "Le programme accompagne la croissance des entreprises dans le secteur du pétrole et du gaz.",
  },
  team: {
    body: "Des profils expérimentés, issus du conseil, de la finance, des politiques publiques et de la transformation, mobilisés au service de la performance des organisations.",
    eyebrow: "Notre équipe",
    leaders: leaders.map((leader) => ({
      role: leader.role,
      summary: leader.summary,
      title: leader.name,
    })),
    titleAccent: "senior et engagée.",
    titleLead: "Une direction",
  },
}

function mergeHomeCopy(copy?: HomeContentCopy): HomeContentCopy {
  return {
    about: {
      ...defaultHomeContentCopy.about,
      ...copy?.about,
    },
    events: {
      ...defaultHomeContentCopy.events,
      ...copy?.events,
      items: mergeTextItems(defaultHomeContentCopy.events?.items, copy?.events?.items),
    },
    expertises: {
      ...defaultHomeContentCopy.expertises,
      ...copy?.expertises,
      services: mergeTextItems(defaultHomeContentCopy.expertises?.services, copy?.expertises?.services),
    },
    method: {
      ...defaultHomeContentCopy.method,
      ...copy?.method,
      steps: mergeTextItems(defaultHomeContentCopy.method?.steps, copy?.method?.steps),
    },
    partners: {
      ...defaultHomeContentCopy.partners,
      ...copy?.partners,
    },
    showcase: {
      ...defaultHomeContentCopy.showcase,
      ...copy?.showcase,
    },
    team: {
      ...defaultHomeContentCopy.team,
      ...copy?.team,
      leaders: mergeTextItems(defaultHomeContentCopy.team?.leaders, copy?.team?.leaders),
    },
  }
}

function mergeTextItems(defaultItems: Array<HomeTextItem> = [], customItems: Array<HomeTextItem> = []) {
  return defaultItems.map((item, index) => ({
    ...item,
    ...customItems[index],
  }))
}

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
  Distribution: "mdi:storefront-outline",
  "Énergie et hydrocarbures": "mdi:fire-circle",
  "Hôtellerie / Tourisme": "mdi:briefcase-variant-outline",
  "Immobilier / BTP": "mdi:crane",
  Industrie: "mdi:factory",
  "Microfinance et SFD": "mdi:hand-coin-outline",
  Santé: "mdi:medical-bag",
  Services: "mdi:briefcase-check-outline",
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

export const defaultAboutPageCopy = {
  aboutApproach,
  aboutBoardMembers,
  aboutExecutiveCommittee,
  aboutPresidentMessage,
  commitments,
  leaders,
  socialCommitments,
  values,
}

export const defaultExpertisesPageCopy = {
  detailedFunctionalExpertise,
  functionalIntro: [
    "COGESTO Consulting offre son expertise pour accompagner la croissance des entreprises. À cet effet, il a développé des outils et méthodes éprouvés, à travers le retour d’expérience d’experts de haut niveau, pour permettre aux entreprises d’atteindre l’excellence opérationnelle.",
    "Notre approche permet de personnaliser nos services pour répondre aux besoins uniques de chaque organisation.",
  ],
  sectorGroups,
  sectorIntro: [
    "L’expertise sectorielle de COGESTO Consulting est au cœur de sa proposition de valeur. Notre connaissance approfondie de divers secteurs d’activités, des enjeux des acteurs clés et des dynamiques de marchés, nous permet de créer de la valeur pour nos clients.",
    "Cogesto Consulting offre aux entreprises l’opportunité de capitaliser sur l’expérience d’experts de haut niveau pour garantir la performance opérationnelle.",
  ],
}

export const defaultBlpPageCopy = {
  context: [
    "Les découvertes, durant la période 2014-2015, ont permis au Sénégal d’initier deux projets majeurs, gazier et pétrolier, avec une mise en production prévue en 2024.",
    "Ce secteur pétrolier et gazier naissant présente de nombreux atouts pour le Sénégal et les PME locales. Le Sénégal a créé en 2016 un Comité Stratégique d’Orientation et érigé en 2019 la loi 2019-04 relative au contenu local dans le secteur des hydrocarbures.",
    "Consciente des enjeux du secteur pétrolier, la Banque Africaine de Développement a mis en place un mécanisme d’assistance technique aux PME locales sur sollicitation d’Invest In Africa et avec l’appui du Fonds d’Assistance au Secteur Privé Africain.",
  ],
  events,
  programConsultants,
  programContextHighlights,
  programEventGallery,
  programExpertRoster,
  programObjectives,
  programPartners,
  programResults,
}

const blpStory = [
  "Cogesto Consulting SAS, cabinet de conseil et de formation, a été sélectionné à l’issue d’un appel d’offres pour opérationnaliser l’accompagnement des PME sénégalaises en vue de leur faciliter l’accès aux marchés et aux financements dans le cadre du Business Linkage Program.",
  "Le BLP est une initiative d’Invest In Africa, financée par la Banque Africaine de Développement et en partenariat avec le Fonds pour les Partenariats Africains, pour apporter une réponse concrète à la problématique de déficit de compétences locales dans le secteur de l’Oil & Gas.",
  "Ce programme vise en particulier à apporter un appui technique aux PME sénégalaises pour leur intégration dans les chaînes d’approvisionnement des grandes entreprises par le renforcement de leurs capacités, de leurs normes QHSE, de leurs infrastructures et par l’accès au financement.",
  "Depuis la cérémonie d’information et de lancement officiel organisée le 14 juin 2023 à l’Hôtel King Fahd Place, Cogesto Consulting a mené plusieurs activités dans le cadre du BLP.",
  "Après des sessions de formation et de sensibilisation sur les opportunités du secteur de l’Oil & Gas, Cogesto Consulting déploie une phase de diagnostic 360° pour les entreprises bénéficiaires de l’accompagnement.",
  "À travers ces activités, Cogesto Consulting œuvre au quotidien pour permettre aux entreprises sénégalaises de se préparer aux exigences et normes du secteur.",
  "À côté de ses partenaires et des entreprises accompagnées, Cogesto Consulting est résolument engagé pour le développement et la prospérité des entreprises africaines dans le domaine du Oil & Gas.",
  "Cogesto Consulting s’est donné pour mission de créer un écosystème plus fort et plus durable dans le secteur du Oil & Gas, offrant non seulement des opportunités de croissance pour les entreprises mais aussi contribuant à l’économie globale du continent africain.",
]

export const defaultEventsPageCopy = {
  blpStory,
  eventGalleries,
  events,
  sideNote:
    "À travers ces activités, Cogesto Consulting œuvre au quotidien pour permettre aux entreprises de se préparer aux exigences, normes et opportunités de leurs marchés, en particulier dans le secteur de l’Oil & Gas.",
  training:
    "Séminaires organisés par 3FPT dans le cadre du programme « Parcours du Chef d’entreprise », assurés par Cogesto Consulting SAS et animés par Abdoul Wahab Touré et Amy Rose Konaté en octobre 2023 au Novotel Dakar et à l’Hôtel Le Ndiambour.",
  coaching:
    "Sessions de coaching de l’équipe dirigeante de la société de bourse FGI, animées par Amy Rose Konaté, pour renforcer les pratiques de pilotage, de gouvernance et de transformation.",
}

export const defaultContactPageCopy = {
  addressValue: `9, Imm Saliou Ndione Fenêtre Mermoz, Dakar Sénégal. ${contact.address}`,
  email: contact.email,
  formBody:
    "Notre équipe vous répond pour qualifier vos besoins et structurer une démarche d’accompagnement adaptée à vos enjeux.",
  phone: contact.phone,
}

const heroMetrics = [
  { icon: Users, label: "Bureaux", value: "3" },
  { icon: TrendingUp, label: "Heures de formation", value: "+700" },
  { icon: BriefcaseBusiness, label: "Années d’expérience", value: "30+" },
  { icon: Sparkles, label: "Pays de présence", value: "3" },
]

type BuilderHeroMetric = {
  label?: string
  value?: string
}

export function BuilderHomeContentBlock({
  copy = defaultHomeContentCopy,
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps & {
  copy?: HomeContentCopy
}) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id
  const content = mergeHomeCopy(copy)

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section id="partners" className="partners-section scroll-mt-28 py-[4.75rem] sm:py-[5.75rem]">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <InlineText
              as="p"
              blockId={blockId}
              className="font-heading text-[2rem] tracking-[-0.06em] text-primary sm:text-[2.45rem]"
              editing={isEditing}
              field="partners.title"
              path={["copy", "partners", "title"]}
              value={content.partners?.title}
            />
          </div>
          <PartnerLogoCarousel />
        </div>
      </section>

      <section id="about" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="max-w-[38.75rem]">
              <InlineText
                as="span"
                blockId={blockId}
                className="eyebrow"
                editing={isEditing}
                field="about.eyebrow"
                path={["copy", "about", "eyebrow"]}
                value={content.about?.eyebrow}
              />
              <h2 className="section-title mt-6">
                <InlineText
                  as="span"
                  blockId={blockId}
                  editing={isEditing}
                  field="about.titleLead"
                  path={["copy", "about", "titleLead"]}
                  value={content.about?.titleLead}
                />{" "}
                <InlineText
                  as="span"
                  blockId={blockId}
                  className="accent-text"
                  editing={isEditing}
                  field="about.titleAccent"
                  path={["copy", "about", "titleAccent"]}
                  value={content.about?.titleAccent}
                />
              </h2>
              <InlineText
                as="p"
                blockId={blockId}
                className="section-copy mt-6 max-w-[58ch]"
                editing={isEditing}
                field="about.body"
                multiline
                path={["copy", "about", "body"]}
                value={content.about?.body}
              />

              <div className="mt-10">
                <a
                  href="/about"
                  className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(21,32,54,0.16)] transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={(event) => handleBuilderLinkClick(event, "/about", isEditing)}
                >
                  <InlineText
                    blockId={blockId}
                    editing={isEditing}
                    field="about.buttonLabel"
                    path={["copy", "about", "buttonLabel"]}
                    value={content.about?.buttonLabel}
                  />
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white">
                    <MoveRight className="size-4" />
                  </span>
                </a>
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
                <InlineText
                  as="p"
                  blockId={blockId}
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary"
                  editing={isEditing}
                  field="about.missionEyebrow"
                  path={["copy", "about", "missionEyebrow"]}
                  value={content.about?.missionEyebrow}
                />
                <InlineText
                  as="h3"
                  blockId={blockId}
                  className="mt-4 font-heading text-[1.5rem] leading-[1.12] tracking-tighter text-slate-950"
                  editing={isEditing}
                  field="about.missionTitle"
                  multiline
                  path={["copy", "about", "missionTitle"]}
                  value={content.about?.missionTitle}
                />
                <InlineText
                  as="p"
                  blockId={blockId}
                  className="mt-3 text-sm leading-6 text-slate-500"
                  editing={isEditing}
                  field="about.missionBody"
                  multiline
                  path={["copy", "about", "missionBody"]}
                  value={content.about?.missionBody}
                />
              </div>
              <InlineText
                as="div"
                blockId={blockId}
                className="absolute right-10 top-5 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-[0_15px_35px_rgba(15,23,42,0.08)] sm:inline-flex"
                editing={isEditing}
                field="about.badge"
                path={["copy", "about", "badge"]}
                value={content.about?.badge}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <InlineText
                as="span"
                blockId={blockId}
                className="eyebrow"
                editing={isEditing}
                field="expertises.eyebrow"
                path={["copy", "expertises", "eyebrow"]}
                value={content.expertises?.eyebrow}
              />
              <h2 className="section-title mt-6 max-w-[22ch]">
                <InlineText
                  as="span"
                  blockId={blockId}
                  editing={isEditing}
                  field="expertises.titleLead"
                  path={["copy", "expertises", "titleLead"]}
                  value={content.expertises?.titleLead}
                />{" "}
                <InlineText
                  as="span"
                  blockId={blockId}
                  className="accent-text"
                  editing={isEditing}
                  field="expertises.titleAccent"
                  path={["copy", "expertises", "titleAccent"]}
                  value={content.expertises?.titleAccent}
                />
              </h2>
            </div>
            <InlineText
              as="p"
              blockId={blockId}
              className="section-copy max-w-[60ch] lg:justify-self-end"
              editing={isEditing}
              field="expertises.body"
              multiline
              path={["copy", "expertises", "body"]}
              value={content.expertises?.body}
            />
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {homeServices.map((service, index) => {
              const text = content.expertises?.services?.[index] ?? defaultHomeContentCopy.expertises?.services?.[index]

              return (
                <article
                  key={service.title}
                  className={cn(
                    "group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[28px] border p-5 md:min-h-[470px] md:p-6",
                    service.featured
                      ? "border-[#978360] bg-[#0c1422] text-white shadow-[0_38px_80px_rgba(5,8,18,0.24)]"
                      : "border-slate-200/80 bg-white text-slate-950 shadow-[0_20px_55px_rgba(15,23,42,0.06)]",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <InlineText
                      as="span"
                      blockId={blockId}
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
                        service.featured ? "border-white/12 bg-white/6 text-white/72" : "border-slate-200 bg-slate-50 text-slate-500",
                      )}
                      editing={isEditing}
                      field="expertises.serviceTag"
                      path={["copy", "expertises", "services", index, "tag"]}
                      value={text?.tag}
                    />
                    <span
                      className={cn(
                        "inline-flex size-9 items-center justify-center rounded-full border transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        service.featured ? "border-white/12 bg-white/8 text-white" : "border-slate-200 bg-white text-slate-500",
                      )}
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <InlineText
                    as="h3"
                    blockId={blockId}
                    className="mt-6 max-w-[12ch] font-heading text-[1.7rem] leading-[1.12] tracking-[-0.05em]"
                    editing={isEditing}
                    field="expertises.serviceTitle"
                    multiline
                    path={["copy", "expertises", "services", index, "title"]}
                    value={text?.title}
                  />
                  <InlineText
                    as="p"
                    blockId={blockId}
                    className={cn("mt-3 max-w-[28ch] text-[0.97rem] leading-6", service.featured ? "text-white/68" : "text-slate-500")}
                    editing={isEditing}
                    field="expertises.serviceSummary"
                    multiline
                    path={["copy", "expertises", "services", index, "summary"]}
                    value={text?.summary}
                  />

                  <div className="mt-auto pt-8">
                    <div className={cn("relative h-[170px] overflow-hidden rounded-[22px] border bg-[linear-gradient(180deg,#dde7ee_0%,#cfdbe4_100%)] md:h-[190px]", service.featured ? "border-white/12" : "border-slate-200/80")}>
                      <img
                        src={service.imageSrc}
                        alt={service.title}
                        style={{ objectPosition: service.imagePosition }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] [filter:saturate(0.94)_contrast(1.08)_brightness(1.05)]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.24),transparent_24%)]" />
                      <div
                        className={cn(
                          "absolute inset-0",
                          service.featured
                            ? "bg-[linear-gradient(180deg,rgba(151,131,96,0.08),rgba(5,8,18,0.34))]"
                            : "bg-[linear-gradient(180deg,rgba(10,20,32,0.02),rgba(10,20,32,0.18))]",
                        )}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/26 to-transparent" />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/expertises"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(21,32,54,0.12)]"
              onClick={(event) => handleBuilderLinkClick(event, "/expertises", isEditing)}
            >
              <InlineText
                blockId={blockId}
                editing={isEditing}
                field="expertises.buttonLabel"
                path={["copy", "expertises", "buttonLabel"]}
                value={content.expertises?.buttonLabel}
              />
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/16 bg-white/12">
                <ArrowRight className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="method" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
        <div className="page-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="section-title max-w-[11ch]">
              <InlineText
                as="span"
                blockId={blockId}
                editing={isEditing}
                field="method.titleLead"
                path={["copy", "method", "titleLead"]}
                value={content.method?.titleLead}
              />{" "}
              <InlineText
                as="span"
                blockId={blockId}
                className="accent-text"
                editing={isEditing}
                field="method.titleAccent"
                path={["copy", "method", "titleAccent"]}
                value={content.method?.titleAccent}
              />
            </h2>
            <a
              href="/about"
              className="inline-flex items-center gap-3 self-start rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(21,32,54,0.12)] lg:self-auto"
              onClick={(event) => handleBuilderLinkClick(event, "/about", isEditing)}
            >
              <InlineText
                blockId={blockId}
                editing={isEditing}
                field="method.buttonLabel"
                path={["copy", "method", "buttonLabel"]}
                value={content.method?.buttonLabel}
              />
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/16 bg-white/12">
                <ArrowRight className="size-4" />
              </span>
            </a>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-4">
              {homeProcessSteps.map((step, index) => {
                const text = content.method?.steps?.[index] ?? defaultHomeContentCopy.method?.steps?.[index]

                return (
                  <article
                    key={step.title}
                    className={cn(
                      "flex items-center justify-between gap-4 px-0 py-5 sm:px-1",
                      step.active
                        ? "rounded-[28px] bg-primary text-white shadow-[0_24px_55px_rgba(21,32,54,0.18)]"
                        : "border-b border-slate-200 text-slate-900",
                    )}
                  >
                    <div className={cn("flex-1", step.active && "px-6 py-6")}>
                      <InlineText
                        as="h3"
                        blockId={blockId}
                        className="max-w-[36ch] text-[1.02rem] font-medium leading-7"
                        editing={isEditing}
                        field="method.stepTitle"
                        multiline
                        path={["copy", "method", "steps", index, "title"]}
                        value={text?.title}
                      />
                      {step.active ? (
                        <InlineText
                          as="p"
                          blockId={blockId}
                          className="mt-4 max-w-[46ch] text-sm leading-6 text-white/64"
                          editing={isEditing}
                          field="method.stepDescription"
                          multiline
                          path={["copy", "method", "steps", index, "description"]}
                          value={text?.description}
                        />
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
                )
              })}
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
              <a
                href="/business-linkage-program"
                className="inline-flex size-20 items-center justify-center rounded-full border border-white/18 bg-white/18 text-white shadow-[0_25px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-transform hover:scale-[1.03]"
                onClick={(event) => handleBuilderLinkClick(event, "/business-linkage-program", isEditing)}
              >
                <CirclePlay className="size-9" />
              </a>
            </div>
            <InlineText
              as="p"
              blockId={blockId}
              className="absolute inset-x-0 bottom-8 px-6 text-center font-heading text-[1.55rem] tracking-[-0.04em] text-white sm:text-[2rem]"
              editing={isEditing}
              field="showcase.caption"
              multiline
              path={["copy", "showcase", "caption"]}
              value={content.showcase?.caption}
            />
          </div>
        </div>
      </section>

      <section id="insights" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <InlineText
              as="span"
              blockId={blockId}
              className="eyebrow justify-center before:hidden"
              editing={isEditing}
              field="events.eyebrow"
              path={["copy", "events", "eyebrow"]}
              value={content.events?.eyebrow}
            />
            <h2 className="section-title mt-6">
              <InlineText
                as="span"
                blockId={blockId}
                editing={isEditing}
                field="events.titleLead"
                path={["copy", "events", "titleLead"]}
                value={content.events?.titleLead}
              />{" "}
              <InlineText
                as="span"
                blockId={blockId}
                className="accent-text"
                editing={isEditing}
                field="events.titleAccent"
                path={["copy", "events", "titleAccent"]}
                value={content.events?.titleAccent}
              />
            </h2>
            <InlineText
              as="p"
              blockId={blockId}
              className="section-copy mx-auto mt-5 max-w-2xl"
              editing={isEditing}
              field="events.body"
              multiline
              path={["copy", "events", "body"]}
              value={content.events?.body}
            />
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {events.map((event, index) => {
              const text = content.events?.items?.[index] ?? defaultHomeContentCopy.events?.items?.[index]

              return (
                <article key={event.title} className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative h-[220px] overflow-hidden bg-slate-100">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] [filter:saturate(0.9)_contrast(1.08)_brightness(1.05)]"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.2),transparent_26%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <InlineText
                      as="p"
                      blockId={blockId}
                      className="absolute left-4 top-4 rounded-full border border-white/18 bg-white/14 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
                      editing={isEditing}
                      field="events.itemDate"
                      path={["copy", "events", "items", index, "date"]}
                      value={text?.date}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <InlineText
                      as="h3"
                      blockId={blockId}
                      className="font-heading text-[1.42rem] leading-[1.15] tracking-[-0.04em] text-slate-950"
                      editing={isEditing}
                      field="events.itemTitle"
                      multiline
                      path={["copy", "events", "items", index, "title"]}
                      value={text?.title}
                    />
                    <InlineText
                      as="p"
                      blockId={blockId}
                      className="mt-3 text-[0.98rem] leading-6 text-slate-600"
                      editing={isEditing}
                      field="events.itemSummary"
                      multiline
                      path={["copy", "events", "items", index, "summary"]}
                      value={text?.summary}
                    />
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="/events"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(21,32,54,0.12)]"
              onClick={(event) => handleBuilderLinkClick(event, "/events", isEditing)}
            >
              <InlineText
                blockId={blockId}
                editing={isEditing}
                field="events.buttonLabel"
                path={["copy", "events", "buttonLabel"]}
                value={content.events?.buttonLabel}
              />
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/16 bg-white/12">
                <ArrowRight className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <InlineText
              as="span"
              blockId={blockId}
              className="eyebrow justify-center before:hidden"
              editing={isEditing}
              field="team.eyebrow"
              path={["copy", "team", "eyebrow"]}
              value={content.team?.eyebrow}
            />
            <h2 className="section-title mt-6">
              <InlineText
                as="span"
                blockId={blockId}
                editing={isEditing}
                field="team.titleLead"
                path={["copy", "team", "titleLead"]}
                value={content.team?.titleLead}
              />{" "}
              <InlineText
                as="span"
                blockId={blockId}
                className="accent-text"
                editing={isEditing}
                field="team.titleAccent"
                path={["copy", "team", "titleAccent"]}
                value={content.team?.titleAccent}
              />
            </h2>
            <InlineText
              as="p"
              blockId={blockId}
              className="section-copy mx-auto mt-5 max-w-2xl"
              editing={isEditing}
              field="team.body"
              multiline
              path={["copy", "team", "body"]}
              value={content.team?.body}
            />
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {leaders.map((leader, index) => {
              const text = content.team?.leaders?.[index] ?? defaultHomeContentCopy.team?.leaders?.[index]

              return (
                <article
                  key={leader.name}
                  className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]"
                >
                  <TeamPortrait src={leader.image} alt={leader.name} />
                  <div className="p-5">
                    <InlineText
                      as="h3"
                      blockId={blockId}
                      className="font-heading text-[1.45rem] leading-[1.1] tracking-[-0.04em] text-slate-950"
                      editing={isEditing}
                      field="team.leaderName"
                      path={["copy", "team", "leaders", index, "title"]}
                      value={text?.title}
                    />
                    <InlineText
                      as="p"
                      blockId={blockId}
                      className="mt-1 text-sm font-semibold text-primary"
                      editing={isEditing}
                      field="team.leaderRole"
                      path={["copy", "team", "leaders", index, "role"]}
                      value={text?.role}
                    />
                    <InlineText
                      as="p"
                      blockId={blockId}
                      className="mt-3 text-sm leading-6 text-slate-600"
                      editing={isEditing}
                      field="team.leaderSummary"
                      multiline
                      path={["copy", "team", "leaders", index, "summary"]}
                      value={text?.summary}
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </TextStyleProvider>
  )
}

export function BuilderAboutPageContentBlock({
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps & {
  copy?: typeof defaultAboutPageCopy
}) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section id="president" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
              <img src="/media/cogesto/president.jpg" alt="Babacar Sow" className="h-full w-full object-cover" />
            </div>
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="president.eyebrow" path={["copy", "president", "eyebrow"]} value="Le mot du Président" />
              <h2 className="section-title mt-6 max-w-[15ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="president.titleLead" path={["copy", "president", "titleLead"]} value="Une vision tournée vers" />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="president.titleAccent" path={["copy", "president", "titleAccent"]} value="le développement de l’Afrique." />
              </h2>
              <div className="mt-6 space-y-4">
                {aboutPresidentMessage.map((paragraph, index) => (
                  <InlineText key={index} as="p" blockId={blockId} className="section-copy" editing={isEditing} field="president.paragraph" multiline path={["copy", "aboutPresidentMessage", index]} value={paragraph} />
                ))}
              </div>
              <InlineText as="p" blockId={blockId} className="mt-6 font-heading text-[1.4rem] leading-tight tracking-[-0.04em] text-primary" editing={isEditing} field="president.closing" path={["copy", "president", "closing"]} value="Ensemble, nous pouvons relever les défis." />
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={isEditing} field="mission.eyebrow" path={["copy", "mission", "eyebrow"]} value="Notre mission" />
              <InlineText as="h2" blockId={blockId} className="section-title mt-5 max-w-[14ch]" editing={isEditing} field="mission.title" path={["copy", "mission", "title"]} value="Mettre l’expertise au service de la performance." />
              {[
                "Mettre notre expertise au service de la performance des organisations en favorisant le développement de leur capital humain et la création de valeur.",
                "Cogesto Consulting aide les clients à résoudre des problèmes importants afin d’assurer le développement durable de leur entreprise. Créer de la valeur en apportant aux entreprises un savoir-faire éprouvé est notre credo.",
                "C’est pourquoi, Cogesto Consulting a mobilisé des experts capables d’apporter leur expertise sectorielle et fonctionnelle aux clients publics et privés, afin de leur permettre de répondre aux enjeux stratégiques et opérationnels spécifiques à leurs besoins et réalités.",
                "Les méthodes et approches utilisées favorisent le renforcement des compétences des collaborateurs des clients, à travers un mécanisme de partage du retour d’expérience d’experts seniors.",
              ].map((paragraph, index) => (
                <InlineText key={index} as="p" blockId={blockId} className="section-copy mt-4 first:mt-5" editing={isEditing} field="mission.paragraph" multiline path={["copy", "mission", "paragraphs", index]} value={paragraph} />
              ))}
            </article>

            <article id="valeurs" className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={isEditing} field="values.eyebrow" path={["copy", "values", "eyebrow"]} value="Nos valeurs" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {values.map((value, index) => (
                  <div key={value} className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-800">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                      <Check className="size-4" />
                    </span>
                    <InlineText as="span" blockId={blockId} className="font-semibold" editing={isEditing} field="values.item" path={["copy", "values", index]} value={value} />
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
              <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="approach.eyebrow" path={["copy", "approach", "eyebrow"]} value="Notre proposition de valeur" />
              <h2 className="section-title mt-6 max-w-[12ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="approach.titleLead" path={["copy", "approach", "titleLead"]} value="Une approche" />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="approach.titleAccent" path={["copy", "approach", "titleAccent"]} value="ancrée dans l’analyse et l’action." />
              </h2>
            </div>
            <div className="grid gap-4">
              {aboutApproach.map((item, index) => (
                <article key={index} className="rounded-[24px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_14px_36px_rgba(15,23,42,0.04)]">
                  <InlineText as="p" blockId={blockId} className="text-[1rem] leading-7 text-slate-700" editing={isEditing} field="approach.item" multiline path={["copy", "aboutApproach", index]} value={item} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="equipe" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <InlineText as="span" blockId={blockId} className="eyebrow justify-center before:hidden" editing={isEditing} field="team.eyebrow" path={["copy", "team", "eyebrow"]} value="Notre équipe" />
            <h2 className="section-title mt-6">
              <InlineText as="span" blockId={blockId} editing={isEditing} field="team.titleLead" path={["copy", "team", "titleLead"]} value="Une équipe de direction" />{" "}
              <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="team.titleAccent" path={["copy", "team", "titleAccent"]} value="à forte expérience." />
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {leaders.map((leader, index) => (
              <ProfileCardEditable key={leader.name} blockId={blockId} editing={isEditing} pathRoot={["copy", "leaders", index]} person={leader} />
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <PeopleListEditable blockId={blockId} editing={isEditing} eyebrow="Conseil d’administration" pathRoot={["copy", "aboutBoardMembers"]} people={aboutBoardMembers} />
            <PeopleListEditable blockId={blockId} editing={isEditing} eyebrow="Comité exécutif" pathRoot={["copy", "aboutExecutiveCommittee"]} people={aboutExecutiveCommittee} />
          </div>
        </div>
      </section>

      <section id="engagements" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="commitments.eyebrow" path={["copy", "commitments", "eyebrow"]} value="Nos engagements" />
              <h2 className="section-title mt-6 max-w-[12ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="commitments.titleLead" path={["copy", "commitments", "titleLead"]} value="Intégrité, confidentialité et" />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="commitments.titleAccent" path={["copy", "commitments", "titleAccent"]} value="responsabilité." />
              </h2>
              <InlineText as="p" blockId={blockId} className="section-copy mt-6 max-w-[48ch]" editing={isEditing} field="commitments.body1" multiline path={["copy", "commitments", "body1"]} value="Notre ambition est de devenir une référence d’excellence parmi les cabinets de conseil en organisation et management. Nous exprimons ainsi notre ferme volonté d’intervenir en contributeur de performance dans le domaine précis où nous apportons une vraie valeur." />
              <InlineText as="p" blockId={blockId} className="section-copy mt-4 max-w-[48ch]" editing={isEditing} field="commitments.body2" multiline path={["copy", "commitments", "body2"]} value="Pour cela, nous prenons les engagements suivants vis-à-vis de nos clients :" />
              <div className="mt-8 grid gap-3">
                {commitments.map((item, index) => (
                  <article key={item} className="flex items-center gap-4 rounded-[24px] border border-slate-200/80 bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.04)]">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-slate-950 text-white">
                      <ShieldCheck className="size-4" />
                    </span>
                    <InlineText as="span" blockId={blockId} className="text-[1rem] font-medium text-slate-800" editing={isEditing} field="commitments.item" path={["copy", "commitments", "items", index]} value={item} />
                  </article>
                ))}
              </div>
            </div>

            <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Leaf className="size-5" />
              </span>
              <InlineText as="h3" blockId={blockId} className="mt-5 font-heading text-[1.8rem] leading-[1.08] tracking-[-0.05em] text-slate-950" editing={isEditing} field="social.title" multiline path={["copy", "social", "title"]} value="Engagement écologique et social" />
              <div className="mt-5 grid gap-4">
                {socialCommitments.map((item, index) => (
                  <div key={item.title} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                    <InlineText as="p" blockId={blockId} className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary" editing={isEditing} field="social.date" path={["copy", "socialCommitments", index, "date"]} value={item.date} />
                    <InlineText as="h3" blockId={blockId} className="mt-2 font-heading text-[1.2rem] leading-tight tracking-[-0.04em] text-slate-950" editing={isEditing} field="social.title" multiline path={["copy", "socialCommitments", index, "title"]} value={item.title} />
                    <InlineText as="p" blockId={blockId} className="mt-3 text-sm leading-6 text-slate-600" editing={isEditing} field="social.summary" multiline path={["copy", "socialCommitments", index, "summary"]} value={item.summary} />
                    <a href={item.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-primary">Télécharger</a>
                  </div>
                ))}
              </div>
              <a href="/contact" className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white" onClick={(event) => handleBuilderLinkClick(event, "/contact", isEditing)}>
                Nous contacter
                <ArrowRight className="size-4" />
              </a>
            </article>
          </div>
        </div>
      </section>
    </TextStyleProvider>
  )
}

export function BuilderExpertisesPageContentBlock({
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id
  const firstExpertise = detailedFunctionalExpertise[0]?.title ?? ""

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section id="fonctionnelles" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="functional.eyebrow" path={["copy", "functional", "eyebrow"]} value="Expertises fonctionnelles" />
              <h2 className="section-title mt-6 max-w-[13ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="functional.titleLead" path={["copy", "functional", "titleLead"]} value="Une offre lisible," />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="functional.titleAccent" path={["copy", "functional", "titleAccent"]} value="du diagnostic à l’exécution." />
              </h2>
            </div>
            <div className="space-y-4">
              {defaultExpertisesPageCopy.functionalIntro.map((paragraph, index) => (
                <InlineText key={index} as="p" blockId={blockId} className="section-copy" editing={isEditing} field="functional.intro" multiline path={["copy", "functionalIntro", index]} value={paragraph} />
              ))}
            </div>
          </div>

          <Tabs defaultValue={firstExpertise} className="mt-10">
            <TabsList className="grid !h-auto w-full grid-cols-1 items-stretch gap-2 rounded-[28px] border border-slate-200/80 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:grid-cols-2 lg:grid-cols-3">
              {detailedFunctionalExpertise.map((item, index) => {
                const visual = expertiseVisuals[item.title]

                return (
                  <TabsTrigger key={item.title} value={item.title} className="group/tab !h-auto min-h-[84px] justify-start rounded-[22px] px-4 py-4 text-left text-slate-600 hover:bg-slate-50 hover:text-slate-950 data-[state=active]:!bg-primary data-[state=active]:!text-white">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary group-data-[state=active]/tab:bg-white/12 group-data-[state=active]/tab:text-white">
                      <Icon icon={visual.icon} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <InlineText as="span" blockId={blockId} className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-400 group-data-[state=active]/tab:text-white/62" editing={isEditing} field="functional.kicker" path={["copy", "detailedFunctionalExpertise", index, "kicker"]} value={visual.kicker} />
                      <InlineText as="span" blockId={blockId} className="mt-1 block whitespace-normal font-heading text-[1.05rem] leading-tight tracking-[-0.03em] text-slate-700 group-data-[state=active]/tab:text-white" editing={isEditing} field="functional.title" multiline path={["copy", "detailedFunctionalExpertise", index, "title"]} value={item.title} />
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {detailedFunctionalExpertise.map((item, index) => (
              <TabsContent key={item.title} value={item.title} className="mt-8">
                <FunctionalPanelEditable blockId={blockId} editing={isEditing} item={item} itemIndex={index} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="sectorielles" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="sector.eyebrow" path={["copy", "sector", "eyebrow"]} value="Expertises sectorielles" />
              <h2 className="section-title mt-6 max-w-[12ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="sector.titleLead" path={["copy", "sector", "titleLead"]} value="Des secteurs regroupés" />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="sector.titleAccent" path={["copy", "sector", "titleAccent"]} value="par enjeux de décision." />
              </h2>
            </div>
            <div>
              {defaultExpertisesPageCopy.sectorIntro.map((paragraph, index) => (
                <InlineText key={index} as="p" blockId={blockId} className="section-copy mt-4 first:mt-0" editing={isEditing} field="sector.intro" multiline path={["copy", "sectorIntro", index]} value={paragraph} />
              ))}
            </div>
          </div>

          <Tabs defaultValue={sectorGroups[0].title} className="mt-10">
            <TabsList className="grid !h-auto w-full grid-cols-1 items-stretch gap-2 rounded-[28px] border border-slate-200/80 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.05)] lg:grid-cols-3">
              {sectorGroups.map((group, index) => (
                <TabsTrigger key={group.title} value={group.title} className="group/tab !h-auto min-h-[76px] justify-start rounded-[22px] px-4 py-4 text-left text-slate-600 hover:bg-slate-50 hover:text-slate-950 data-[state=active]:!bg-primary data-[state=active]:!text-white">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary group-data-[state=active]/tab:bg-white/12 group-data-[state=active]/tab:text-white">
                    <Icon icon={group.icon} className="size-5" />
                  </span>
                  <InlineText as="span" blockId={blockId} className="block whitespace-normal font-heading text-[1.08rem] leading-tight tracking-[-0.03em] text-slate-700 group-data-[state=active]/tab:text-white" editing={isEditing} field="sector.groupTitle" multiline path={["copy", "sectorGroups", index, "title"]} value={group.title} />
                </TabsTrigger>
              ))}
            </TabsList>

            {sectorGroups.map((group, index) => (
              <TabsContent key={group.title} value={group.title} className="mt-8">
                <SectorPanelEditable blockId={blockId} editing={isEditing} group={group} groupIndex={index} />
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[30px] bg-primary p-6 text-white shadow-[0_24px_60px_rgba(21,32,54,0.16)] sm:flex-row sm:items-center">
            <div>
              <InlineText as="p" blockId={blockId} className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/58" editing={isEditing} field="coverage.eyebrow" path={["copy", "coverage", "eyebrow"]} value="Couverture sectorielle" />
              <InlineText as="p" blockId={blockId} className="mt-2 max-w-3xl text-[1rem] leading-7 text-white/72" editing={isEditing} field="coverage.body" multiline path={["copy", "coverage", "body"]} value={`${sectorExpertise.length} secteurs d’intervention structurés pour aider les organisations à arbitrer, financer, organiser et piloter leurs priorités.`} />
            </div>
            <a href="/contact" onClick={(event) => handleBuilderLinkClick(event, "/contact", isEditing)} className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary">
              Contactez-nous
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </TextStyleProvider>
  )
}

export function BuilderBlpPageContentBlock({
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section id="contexte" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="context.eyebrow" path={["copy", "context", "eyebrow"]} value="Contexte du BLP" />
              <h2 className="section-title mt-6 max-w-[12ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="context.titleLead" path={["copy", "context", "titleLead"]} value="Accompagner la croissance des entreprises dans" />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="context.titleAccent" path={["copy", "context", "titleAccent"]} value="l’Oil & Gas." />
              </h2>
              {defaultBlpPageCopy.context.map((paragraph, index) => (
                <InlineText key={index} as="p" blockId={blockId} className="section-copy mt-4 first:mt-6" editing={isEditing} field="context.paragraph" multiline path={["copy", "context", "paragraphs", index]} value={paragraph} />
              ))}
              <div className="mt-8 grid gap-3">
                {programContextHighlights.map((item, index) => (
                  <InlineText key={index} as="div" blockId={blockId} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-[0.98rem] leading-6 text-slate-700" editing={isEditing} field="context.highlight" multiline path={["copy", "programContextHighlights", index]} value={item} />
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
            <InlineText as="span" blockId={blockId} className="eyebrow justify-center before:hidden" editing={isEditing} field="partners.eyebrow" path={["copy", "partners", "eyebrow"]} value="Partenaires du BLP" />
            <h2 className="section-title mt-6">
              <InlineText as="span" blockId={blockId} editing={isEditing} field="partners.titleLead" path={["copy", "partners", "titleLead"]} value="Un écosystème" />{" "}
              <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="partners.titleAccent" path={["copy", "partners", "titleAccent"]} value="mobilisé autour du programme." />
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {programPartners.map((partner, index) => (
              <article key={partner.name} className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary"><Handshake className="size-5" /></span>
                <InlineText as="h3" blockId={blockId} className="mt-5 font-heading text-[1.45rem] tracking-[-0.04em] text-slate-950" editing={isEditing} field="partner.name" path={["copy", "programPartners", index, "name"]} value={partner.name} />
                <InlineText as="p" blockId={blockId} className="mt-3 text-[0.98rem] leading-6 text-slate-600" editing={isEditing} field="partner.description" multiline path={["copy", "programPartners", index, "description"]} value={partner.description} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="offres" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="offers.eyebrow" path={["copy", "offers", "eyebrow"]} value="Offres BLP" />
              <h2 className="section-title mt-6 max-w-[13ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="offers.titleLead" path={["copy", "offers", "titleLead"]} value="Deux parcours pour" />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="offers.titleAccent" path={["copy", "offers", "titleAccent"]} value="accélérer les entrepreneurs." />
              </h2>
            </div>
            <InlineText
              as="p"
              blockId={blockId}
              className="section-copy max-w-[56ch] lg:justify-self-end"
              editing={isEditing}
              field="offers.intro"
              multiline
              path={["copy", "offers", "intro"]}
              value="Le Business Linkage Program se prolonge avec des dispositifs ciblés pour structurer les projets durables et renforcer la trajectoire des dirigeants d’entreprise."
            />
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {businessLinkageOffers.map((offer, index) => {
              const OfferIcon = index === 0 ? Leaf : RouteIcon

              return (
                <article key={offer.href} className="group overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
                  <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                    <img alt={offer.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" loading="lazy" src={offer.image} />
                  </div>
                  <div className="p-6">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <OfferIcon className="size-5" />
                    </span>
                    <InlineText as="h3" blockId={blockId} className="mt-5 font-heading text-[1.75rem] leading-[1.08] tracking-[-0.05em] text-slate-950" editing={isEditing} field="offer.label" path={["copy", "businessLinkageOffers", index, "label"]} value={offer.label} />
                    <InlineText as="p" blockId={blockId} className="mt-3 text-[1rem] leading-7 text-slate-600" editing={isEditing} field="offer.description" multiline path={["copy", "businessLinkageOffers", index, "description"]} value={offer.description} />
                    <a className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white" href={offer.href}>
                      Découvrir
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="objectifs" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-2">
            <ProgramListEditable blockId={blockId} editing={isEditing} icon="target" items={programObjectives} pathRoot={["copy", "programObjectives"]} title="Objectifs du programme." />
            <ProgramListEditable blockId={blockId} editing={isEditing} icon="trend" items={programResults} pathRoot={["copy", "programResults"]} title="Résultats attendus." />
          </div>
        </div>
      </section>

      <section id="consultants" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <InlineText as="span" blockId={blockId} className="eyebrow justify-center before:hidden" editing={isEditing} field="consultants.eyebrow" path={["copy", "consultants", "eyebrow"]} value="Consultants du BLP" />
            <h2 className="section-title mt-6">
              <InlineText as="span" blockId={blockId} editing={isEditing} field="consultants.titleLead" path={["copy", "consultants", "titleLead"]} value="Des experts mobilisés" />{" "}
              <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="consultants.titleAccent" path={["copy", "consultants", "titleAccent"]} value="pour la croissance des entreprises." />
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {programConsultants.map((consultant, index) => (
              <ProfileCardEditable key={consultant.name} blockId={blockId} editing={isEditing} pathRoot={["copy", "programConsultants", index]} person={consultant} />
            ))}
          </div>
          <div className="mt-12 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.05)]">
            <div className="max-w-3xl">
              <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={isEditing} field="roster.eyebrow" path={["copy", "roster", "eyebrow"]} value="Équipe élargie" />
              <InlineText as="h3" blockId={blockId} className="mt-5 font-heading text-[2rem] leading-[1.04] tracking-[-0.05em] text-slate-950" editing={isEditing} field="roster.title" multiline path={["copy", "roster", "title"]} value="Un pool de consultants mobilisés selon les besoins du programme." />
              <InlineText as="p" blockId={blockId} className="mt-4 text-[1rem] leading-7 text-slate-600" editing={isEditing} field="roster.intro" multiline path={["copy", "roster", "intro"]} value="Une équipe d’experts de très haut niveau est mobilisée pour accompagner la croissance des entreprises dans le secteur de l’Oil & Gaz." />
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {programExpertRoster.map((expert, index) => (
                <article key={expert.title} className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
                  {"image" in expert && expert.image ? <TeamPortrait src={expert.image} alt={expert.title} /> : null}
                  <div className="p-5">
                    <InlineText as="h3" blockId={blockId} className="font-heading text-[1.2rem] leading-[1.12] tracking-[-0.03em] text-slate-950" editing={isEditing} field="expert.title" multiline path={["copy", "programExpertRoster", index, "title"]} value={expert.title} />
                    <ul className="mt-4 space-y-2.5">
                      {expert.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex}>
                          <InlineText as="span" blockId={blockId} className="text-[0.95rem] leading-6 text-slate-600" editing={isEditing} field="expert.highlight" multiline path={["copy", "programExpertRoster", index, "highlights", highlightIndex]} value={highlight} />
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

      <BlpEventsEditable blockId={blockId} editing={isEditing} />
    </TextStyleProvider>
  )
}

export function BuilderEventsPageContentBlock({
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            {events.map((event, index) => (
              <EventCardEditable key={event.title} blockId={blockId} editing={isEditing} event={event} pathRoot={["copy", "events", index]} />
            ))}
          </div>

          <div className="mt-12 grid gap-6 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.05)] lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={isEditing} field="story.eyebrow" path={["copy", "story", "eyebrow"]} value="Cérémonie lancement BLP" />
              <h2 className="section-title mt-5 max-w-[13ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="story.titleLead" path={["copy", "story", "titleLead"]} value="Une expertise locale pour accélérer la croissance dans" />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="story.titleAccent" path={["copy", "story", "titleAccent"]} value="l’Oil & Gas." />
              </h2>
              <div className="mt-6 space-y-4">
                {blpStory.map((paragraph, index) => (
                  <InlineText key={index} as="p" blockId={blockId} className="section-copy" editing={isEditing} field="story.paragraph" multiline path={["copy", "blpStory", index]} value={paragraph} />
                ))}
              </div>
            </div>
            <div>
              <img src="/media/cogesto/tof8053.jpg" alt="Cérémonie de lancement du BLP" className="rounded-[28px] border border-slate-200/80 object-cover shadow-[0_18px_45px_rgba(15,23,42,0.08)]" />
              <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={isEditing} field="side.eyebrow" path={["copy", "side", "eyebrow"]} value="Sur le terrain" />
                <InlineText as="p" blockId={blockId} className="mt-4 text-[1rem] leading-7 text-slate-600" editing={isEditing} field="side.note" multiline path={["copy", "sideNote"]} value={defaultEventsPageCopy.sideNote} />
                <a href="/contact" onClick={(event) => handleBuilderLinkClick(event, "/contact", isEditing)} className="mt-5 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">
                  Organiser un échange
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <InlineText as="p" blockId={blockId} className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary" editing={isEditing} field="training.eyebrow" path={["copy", "training", "eyebrow"]} value="Séminaires de formation organisé par 3FPT" />
              <InlineText as="h3" blockId={blockId} className="mt-3 font-heading text-[1.55rem] leading-[1.1] tracking-[-0.04em] text-slate-950" editing={isEditing} field="training.title" multiline path={["copy", "training", "title"]} value="Marketing & Communication pour 30 dirigeants d’entreprise." />
              <InlineText as="p" blockId={blockId} className="mt-4 text-[1rem] leading-7 text-slate-600" editing={isEditing} field="training.body" multiline path={["copy", "training", "body"]} value={defaultEventsPageCopy.training} />
            </article>
            <article className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <InlineText as="p" blockId={blockId} className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary" editing={isEditing} field="coaching.eyebrow" path={["copy", "coaching", "eyebrow"]} value="Sessions de coaching" />
              <InlineText as="h3" blockId={blockId} className="mt-3 font-heading text-[1.55rem] leading-[1.1] tracking-[-0.04em] text-slate-950" editing={isEditing} field="coaching.title" multiline path={["copy", "coaching", "title"]} value="Accompagnement de l’équipe dirigeante de FGI." />
              <InlineText as="p" blockId={blockId} className="mt-4 text-[1rem] leading-7 text-slate-600" editing={isEditing} field="coaching.body" multiline path={["copy", "coaching", "body"]} value={defaultEventsPageCopy.coaching} />
            </article>
          </div>

          <div className="mt-12 grid gap-6">
            {eventGalleries.map((gallery, index) => (
              <section key={gallery.title} className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                <InlineText as="h3" blockId={blockId} className="font-heading text-[1.55rem] leading-[1.1] tracking-[-0.04em] text-slate-950" editing={isEditing} field="gallery.title" multiline path={["copy", "eventGalleries", index, "title"]} value={gallery.title} />
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {gallery.images.map((src) => (
                    <img key={src} src={src} alt={gallery.title} className="aspect-[3/2] w-full rounded-[20px] border border-slate-200/80 object-cover" loading="lazy" />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </TextStyleProvider>
  )
}

export function BuilderContactPageContentBlock({
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            <ContactCardEditable blockId={blockId} editing={isEditing} href={contact.mapLink} icon={<MapPin className="size-5" />} pathRoot={["copy", "contactCards", 0]} title="Adresse" value={defaultContactPageCopy.addressValue} />
            <ContactCardEditable blockId={blockId} editing={isEditing} href={`mailto:${contact.email}`} icon={<Mail className="size-5" />} pathRoot={["copy", "contactCards", 1]} title="Nous écrire par mail" value={contact.email} />
            <ContactCardEditable blockId={blockId} editing={isEditing} href={`tel:${contact.phone.replace(/\s+/g, "")}`} icon={<Phone className="size-5" />} pathRoot={["copy", "contactCards", 2]} title="Où nous appeler ?" value={contact.phone} />
          </div>

          <div className="mt-12 grid gap-8 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.05)] lg:grid-cols-[0.85fr_1fr]">
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={isEditing} field="form.eyebrow" path={["copy", "form", "eyebrow"]} value="Soyez libre de nous contacter" />
              <InlineText as="h2" blockId={blockId} className="section-title mt-5 max-w-[13ch]" editing={isEditing} field="form.title" multiline path={["copy", "form", "title"]} value="Veuillez remplir le formulaire ci-dessous." />
              <InlineText as="p" blockId={blockId} className="section-copy mt-5" editing={isEditing} field="form.body" multiline path={["copy", "formBody"]} value={defaultContactPageCopy.formBody} />
            </div>
            <form className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input className="h-12 bg-white" placeholder="Prénom et Nom" />
                <Input className="h-12 bg-white" placeholder="Email" type="email" />
              </div>
              <Textarea className="mt-4 min-h-40 bg-white" placeholder="Message" />
              <Button className="mt-5 h-12 w-full rounded-full bg-primary px-6 text-white hover:bg-primary/90 sm:w-auto">Envoyer</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="partners-section py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <InlineText as="span" blockId={blockId} className="eyebrow justify-center before:hidden" editing={isEditing} field="partners.eyebrow" path={["copy", "partners", "eyebrow"]} value="Faites comme nos partenaires" />
            <h2 className="section-title mt-6">
              <InlineText as="span" blockId={blockId} editing={isEditing} field="partners.titleLead" path={["copy", "partners", "titleLead"]} value="Rejoignez" />{" "}
              <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="partners.titleAccent" path={["copy", "partners", "titleAccent"]} value="l’aventure." />
            </h2>
          </div>
          <PartnerLogoCarousel />
        </div>
      </section>
    </TextStyleProvider>
  )
}

export function BuilderHeroBlock({
  animation = "none",
  body,
  eyebrow,
  id,
  image,
  primaryHref,
  primaryLabel,
  puck,
  metrics,
  richText,
  secondaryLabel,
  textStyles,
  title,
  titleLine1,
  titleLine2,
  variant = "image",
}: EditableBlockProps & {
  body: string
  eyebrow: string
  image: string
  metrics?: Array<BuilderHeroMetric>
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  title: string
  titleLine1?: string
  titleLine2?: string
  variant?: "home" | "image" | "navy" | "program"
}) {
  const isEditing = Boolean(puck?.isEditing)

  if (variant === "home") {
    const [fallbackFirstLine, fallbackSecondLine] = splitHomeHeroTitle(title)
    const firstLine = titleLine1?.trim() || fallbackFirstLine
    const secondLine = titleLine2?.trim() || fallbackSecondLine
    const editableMetrics = heroMetrics.map((metric, index) => ({
      ...metric,
      label: metrics?.[index]?.label || metric.label,
      value: metrics?.[index]?.value || metric.value,
    }))

    return (
      <TextStyleProvider richText={richText} styles={textStyles}>
        <AnimatedBlock disabled={isEditing} preset={animation}>
          <section id="home" className="hero-section relative min-h-[100svh] overflow-hidden text-white">
            <img
              src={image}
              alt=""
              className="hero-banner__background"
              loading="eager"
            />
          <div className="hero-banner__wash" />
          <div className="hero-banner__left-fade" />
          <div className="hero-banner__bottom-fade" />
          <div className="hero-ambient hero-ambient--left" />
          <div className="hero-ambient hero-ambient--right" />

          <div className="hero-shell relative z-10 flex min-h-[100svh] flex-col py-5 sm:py-6 lg:py-7">
            <SiteHeader editorNavigation={isEditing} />

            <div className="relative z-10 mt-6 flex flex-1 flex-col justify-between px-7 pb-2 pt-7 sm:px-9 sm:pt-10 lg:px-11 lg:pb-3 lg:pt-12">
              <div className="max-w-[880px]">
                <InlineText
                  as="span"
                  blockId={id}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/24 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/72 backdrop-blur-sm"
                  editing={isEditing}
                  field="eyebrow"
                  value={eyebrow}
                />

                <h1 className="mt-7 font-heading text-[2.45rem] tracking-[-0.07em] text-white drop-shadow-[0_12px_28px_rgba(0,0,0,0.44)] sm:mt-8 sm:text-[3.45rem] lg:text-[3.65rem] xl:text-[3.9rem]">
                  <InlineText
                    as="span"
                    blockId={id}
                    className="block max-w-[8.3ch] leading-[1.04] sm:max-w-[11.6ch] sm:leading-[1.08] lg:max-w-none lg:whitespace-nowrap"
                    editing={isEditing}
                    field="titleLine1"
                    value={firstLine}
                  />
                  {secondLine ? (
                    <InlineText
                      as="span"
                      blockId={id}
                      className="mt-2 block max-w-[8ch] leading-[1.06] text-[#d8ceb9] sm:mt-1 sm:max-w-[11.4ch] sm:leading-[1.12] lg:max-w-none lg:whitespace-nowrap"
                      editing={isEditing}
                      field="titleLine2"
                      value={secondLine}
                    />
                  ) : null}
                </h1>

                <InlineText
                  as="p"
                  blockId={id}
                  className="mt-6 max-w-[26ch] text-[0.98rem] leading-[1.8] text-white/72 sm:mt-8 sm:max-w-[54ch] sm:text-[1.08rem] sm:leading-[1.88]"
                  editing={isEditing}
                  field="body"
                  multiline
                  value={body}
                />

                <div className="mt-8 flex flex-col items-start gap-4 sm:mt-11 sm:flex-row sm:items-center sm:gap-6">
                  {primaryHref && primaryLabel ? (
                    <a
                      href={primaryHref}
                      className="inline-flex min-h-[72px] w-full items-center justify-between gap-5 rounded-full bg-white px-6 py-3 text-left text-[1rem] font-bold leading-[1.15] text-slate-900 shadow-[0_18px_40px_rgba(255,255,255,0.16)] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto sm:min-w-[328px] sm:px-8 sm:py-4"
                      onClick={(event) => handleBuilderLinkClick(event, primaryHref, isEditing)}
                    >
                      <InlineText
                        as="span"
                        blockId={id}
                        className="sm:whitespace-nowrap"
                        editing={isEditing}
                        field="primaryLabel"
                        value={primaryLabel}
                      />
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                        <ArrowRight className="size-5" />
                      </span>
                    </a>
                  ) : null}
                  <div className="hidden items-center gap-4 text-sm text-white/66 sm:flex sm:min-w-0 sm:flex-1">
                    <span className="inline-flex size-[62px] shrink-0 items-center justify-center rounded-[22px] border border-white/12 bg-black/24 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
                      <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/6 text-white/80">
                        <CirclePlay className="size-4.5" />
                      </span>
                    </span>
                    <InlineText
                      as="span"
                      blockId={id}
                      className="block max-w-[330px] text-[0.98rem] leading-7 text-white/66"
                      editing={isEditing}
                      field="secondaryLabel"
                      multiline
                      value={
                        secondaryLabel ||
                        "Un retour d’expérience d’experts seniors, des méthodes éprouvées et des solutions adaptées aux réalités de chaque mission."
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 sm:gap-4 sm:pt-5 lg:grid-cols-4 lg:gap-5 lg:pt-6">
                {editableMetrics.map((metric, index) => {
                  const MetricIcon = metric.icon

                  return (
                    <article
                      key={metric.label}
                      className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/18 px-3.5 py-3.5 backdrop-blur-sm sm:gap-4 sm:px-4 sm:py-4"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-[#d8ceb9] sm:size-11">
                        <MetricIcon className="size-4.5" />
                      </span>
                      <div>
                        <InlineText
                          as="p"
                          blockId={id}
                          className="font-heading text-[1.28rem] tracking-[-0.05em] text-white sm:text-[1.45rem]"
                          editing={isEditing}
                          field="metricValue"
                          path={["metrics", index, "value"]}
                          value={metric.value}
                        />
                        <InlineText
                          as="p"
                          blockId={id}
                          className="mt-1 text-[0.78rem] leading-5 text-white/58 sm:text-sm"
                          editing={isEditing}
                          field="metricLabel"
                          path={["metrics", index, "label"]}
                          value={metric.label}
                        />
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
          </section>
        </AnimatedBlock>
      </TextStyleProvider>
    )
  }

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <AnimatedBlock disabled={isEditing} preset={animation}>
        <section className="inner-hero text-white">
          <div
            className={cn(
              "site-container py-20 sm:py-28",
              variant === "program" && "grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center",
            )}
          >
            <div>
              <InlineText
                as="p"
                blockId={id}
                className="eyebrow text-white/70 before:bg-white/20"
                editing={isEditing}
                field="eyebrow"
                value={eyebrow}
              />
              <InlineText
                as="h1"
                blockId={id}
                className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl"
                editing={isEditing}
                field="title"
                value={title}
              />
              <InlineText
                as="p"
                blockId={id}
                className={cn("mt-6 text-lg leading-8 text-white/72", variant === "program" ? "max-w-2xl" : "max-w-3xl")}
                editing={isEditing}
                field="body"
                multiline
                value={body}
              />
            </div>

            {variant === "program" ? (
              <div className="rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl">
                <img
                  src={image || "/media/cogesto/blp/business-linkage-program-logo.png"}
                  alt="Business Linkage Program"
                  className="mx-auto max-h-[280px] w-full object-contain"
                />
              </div>
            ) : null}
          </div>
        </section>
      </AnimatedBlock>
    </TextStyleProvider>
  )
}

function splitHomeHeroTitle(title: string) {
  const trimmedTitle = title.trim()
  const firstSentenceMatch = trimmedTitle.match(/^(.+?\.)\s+(.+)$/)

  if (!firstSentenceMatch) return [trimmedTitle, ""]

  return [firstSentenceMatch[1], firstSentenceMatch[2]]
}

export function BuilderTextImageBlock({
  animation = "none",
  body,
  eyebrow,
  id,
  image,
  imageSide = "right",
  linkHref,
  linkLabel,
  puck,
  richText,
  textStyles,
  title,
}: EditableBlockProps & {
  body: string
  eyebrow: string
  image: string
  imageSide?: "left" | "right"
  linkHref?: string
  linkLabel?: string
  title: string
}) {
  const isEditing = Boolean(puck?.isEditing)

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <AnimatedBlock disabled={isEditing} preset={animation} className="py-16 sm:py-20 lg:py-24">
      <section className="page-shell">
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center",
            imageSide === "left" && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div>
            <InlineText as="span" blockId={id} className="eyebrow" editing={isEditing} field="eyebrow" value={eyebrow} />
            <InlineText
              as="h2"
              blockId={id}
              className="section-title mt-6 max-w-[13ch]"
              editing={isEditing}
              field="title"
              value={title}
            />
            <InlineText
              as="p"
              blockId={id}
              className="section-copy mt-6 max-w-[58ch]"
              editing={isEditing}
              field="body"
              multiline
              value={body}
            />
            <BuilderButton
              blockId={id}
              className="mt-8"
              editing={isEditing}
              field="linkLabel"
              href={linkHref}
              label={linkLabel}
            />
          </div>
          <div className="overflow-hidden rounded-[34px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <img src={image} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>
      </AnimatedBlock>
    </TextStyleProvider>
  )
}

export function BuilderIconCardsBlock({
  animation = "none",
  cards = [],
  eyebrow,
  id,
  puck,
  richText,
  textStyles,
  title,
}: EditableBlockProps & {
  cards: Array<{ body: string; icon: string; title: string }>
  eyebrow: string
  title: string
}) {
  const isEditing = Boolean(puck?.isEditing)

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <AnimatedBlock disabled={isEditing} preset={animation} className="py-16 sm:py-20 lg:py-24">
      <section className="page-shell">
        <div className="max-w-3xl">
          <InlineText as="span" blockId={id} className="eyebrow" editing={isEditing} field="eyebrow" value={eyebrow} />
          <InlineText
            as="h2"
            blockId={id}
            className="section-title mt-6"
            editing={isEditing}
            field="title"
            value={title}
          />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <article key={`${card.title}-${index}`} className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon icon={card.icon} className="size-6" />
              </span>
              <InlineText
                as="h3"
                blockId={id}
                className="mt-5 font-heading text-[1.45rem] leading-[1.08] tracking-[-0.04em] text-slate-950"
                editing={isEditing}
                field="title"
                path={["cards", index, "title"]}
                value={card.title}
              />
              <InlineText
                as="p"
                blockId={id}
                className="mt-3 text-[0.98rem] leading-7 text-slate-600"
                editing={isEditing}
                field="body"
                multiline
                path={["cards", index, "body"]}
                value={card.body}
              />
            </article>
          ))}
        </div>
      </section>
      </AnimatedBlock>
    </TextStyleProvider>
  )
}

export function BuilderCtaBlock({
  animation = "none",
  body,
  href,
  id,
  label,
  puck,
  richText,
  textStyles,
  title,
  variant = "navy",
}: EditableBlockProps &
  ButtonLink & {
    body: string
    title: string
    variant?: "navy" | "light"
  }) {
  const isEditing = Boolean(puck?.isEditing)

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <AnimatedBlock disabled={isEditing} preset={animation} className="py-16 sm:py-20">
      <section className="page-shell">
        <div
          className={cn(
            "rounded-[30px] border p-8 shadow-[0_30px_80px_rgba(21,32,54,0.14)] sm:p-12 lg:p-16",
            variant === "navy"
              ? "border-white/10 bg-primary text-white"
              : "border-slate-200/80 bg-white text-slate-950",
          )}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <InlineText
                as="h2"
                blockId={id}
                className="font-heading text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl"
                editing={isEditing}
                field="title"
                value={title}
              />
              <InlineText
                as="p"
                blockId={id}
                className={cn("mt-5 max-w-2xl text-base leading-8", variant === "navy" ? "text-white/70" : "text-slate-600")}
                editing={isEditing}
                field="body"
                multiline
                value={body}
              />
            </div>
            <BuilderButton
              blockId={id}
              editing={isEditing}
              field="label"
              href={href}
              label={label}
              variant={variant === "navy" ? "light" : "solid"}
            />
          </div>
        </div>
      </section>
      </AnimatedBlock>
    </TextStyleProvider>
  )
}

export function BuilderContactBlock({
  animation = "none",
  address,
  email,
  id,
  puck,
  phone,
  richText,
  textStyles,
  title,
}: EditableBlockProps & {
  address: string
  email: string
  phone: string
  title: string
}) {
  const isEditing = Boolean(puck?.isEditing)

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <AnimatedBlock disabled={isEditing} preset={animation} className="py-16 sm:py-20">
      <section className="page-shell">
        <div className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)] sm:p-8">
          <InlineText
            as="h2"
            blockId={id}
            className="section-title max-w-[12ch]"
            editing={isEditing}
            field="title"
            value={title}
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <ContactItem
              blockId={id}
              editing={isEditing}
              field="address"
              icon={<MapPin className="size-5" />}
              label="Adresse"
              value={address}
            />
            <ContactItem
              blockId={id}
              editing={isEditing}
              field="email"
              icon={<Mail className="size-5" />}
              label="Email"
              value={email}
            />
            <ContactItem
              blockId={id}
              editing={isEditing}
              field="phone"
              icon={<Phone className="size-5" />}
              label="Téléphone"
              value={phone}
            />
          </div>
        </div>
      </section>
      </AnimatedBlock>
    </TextStyleProvider>
  )
}

function ProfileCardEditable({
  blockId,
  editing,
  pathRoot,
  person,
}: {
  blockId?: string
  editing: boolean
  pathRoot: Array<string | number>
  person: { image: string; name?: string; role: string; summary: string; title?: string }
}) {
  const name = person.name ?? person.title ?? ""

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
      <TeamPortrait src={person.image} alt={name} />
      <div className="p-5">
        <InlineText as="h3" blockId={blockId} className="font-heading text-[1.45rem] leading-[1.1] tracking-[-0.04em] text-slate-950" editing={editing} field="profile.name" path={[...pathRoot, person.name ? "name" : "title"]} value={name} />
        <InlineText as="p" blockId={blockId} className="mt-1 text-sm font-semibold text-primary" editing={editing} field="profile.role" path={[...pathRoot, "role"]} value={person.role} />
        <InlineText as="p" blockId={blockId} className="mt-3 text-sm leading-6 text-slate-600" editing={editing} field="profile.summary" multiline path={[...pathRoot, "summary"]} value={person.summary} />
      </div>
    </article>
  )
}

function PeopleListEditable({
  blockId,
  editing,
  eyebrow,
  pathRoot,
  people,
}: {
  blockId?: string
  editing: boolean
  eyebrow: string
  pathRoot: Array<string | number>
  people: Array<{ name: string; role: string; summary: string }>
}) {
  return (
    <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={editing} field="people.eyebrow" path={[...pathRoot, "eyebrow"]} value={eyebrow} />
      <div className="mt-5 grid gap-4">
        {people.map((member, index) => (
          <div key={`${member.name}-${member.role}`} className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-4">
            <InlineText as="h3" blockId={blockId} className="font-heading text-[1.25rem] leading-[1.1] tracking-[-0.03em] text-slate-950" editing={editing} field="people.name" path={[...pathRoot, index, "name"]} value={member.name} />
            <InlineText as="p" blockId={blockId} className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary" editing={editing} field="people.role" path={[...pathRoot, index, "role"]} value={member.role} />
            <InlineText as="p" blockId={blockId} className="mt-3 text-[0.98rem] leading-6 text-slate-600" editing={editing} field="people.summary" multiline path={[...pathRoot, index, "summary"]} value={member.summary} />
          </div>
        ))}
      </div>
    </article>
  )
}

function FunctionalPanelEditable({
  blockId,
  editing,
  item,
  itemIndex,
}: {
  blockId?: string
  editing: boolean
  item: (typeof detailedFunctionalExpertise)[number]
  itemIndex: number
}) {
  const visual = expertiseVisuals[item.title]

  return (
    <article className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[360px] overflow-hidden bg-primary text-white">
          <img src={visual.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover opacity-74" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/12 text-white backdrop-blur-sm">
              <Icon icon={visual.icon} className="size-6" />
            </span>
            <InlineText as="p" blockId={blockId} className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/62" editing={editing} field="functional.kicker" path={["copy", "detailedFunctionalExpertise", itemIndex, "kicker"]} value={visual.kicker} />
            <InlineText as="h3" blockId={blockId} className="mt-2 font-heading text-[2rem] leading-[1.04] tracking-[-0.05em] text-white" editing={editing} field="functional.title" multiline path={["copy", "detailedFunctionalExpertise", itemIndex, "title"]} value={item.title} />
          </div>
        </div>
        <div className="grid gap-5 p-6 lg:grid-cols-3">
          <ExpertiseListEditable blockId={blockId} editing={editing} items={item.enjeux} pathRoot={["copy", "detailedFunctionalExpertise", itemIndex, "enjeux"]} title="Vos enjeux" />
          <ExpertiseListEditable blockId={blockId} editing={editing} items={item.savoirFaire} pathRoot={["copy", "detailedFunctionalExpertise", itemIndex, "savoirFaire"]} title="Notre savoir-faire" />
          <ExpertiseListEditable blockId={blockId} editing={editing} items={item.atouts} pathRoot={["copy", "detailedFunctionalExpertise", itemIndex, "atouts"]} title="Nos atouts" />
        </div>
      </div>
    </article>
  )
}

function ExpertiseListEditable({
  blockId,
  editing,
  items,
  pathRoot,
  title,
}: {
  blockId?: string
  editing: boolean
  items: Array<string>
  pathRoot: Array<string | number>
  title: string
}) {
  return (
    <div>
      <InlineText as="h3" blockId={blockId} className="font-heading text-[1.18rem] tracking-[-0.03em] text-slate-950" editing={editing} field="list.title" path={[...pathRoot, "title"]} value={title} />
      <div className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 text-[0.94rem] leading-6 text-slate-600">
            <Check className="mt-1 size-4 shrink-0 text-primary" />
            <InlineText as="p" blockId={blockId} editing={editing} field="list.item" multiline path={[...pathRoot, index]} value={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

function SectorPanelEditable({
  blockId,
  editing,
  group,
  groupIndex,
}: {
  blockId?: string
  editing: boolean
  group: (typeof sectorGroups)[number]
  groupIndex: number
}) {
  return (
    <article className="grid overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
      <div className="relative min-h-[320px] overflow-hidden">
        <img src={group.image} alt={group.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/72 via-primary/16 to-transparent" />
      </div>
      <div className="p-6">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Icon icon={group.icon} className="size-6" />
        </span>
        <InlineText as="h3" blockId={blockId} className="mt-5 font-heading text-[2rem] leading-[1.04] tracking-[-0.05em] text-slate-950" editing={editing} field="sector.groupTitle" multiline path={["copy", "sectorGroups", groupIndex, "title"]} value={group.title} />
        <InlineText as="p" blockId={blockId} className="mt-4 text-[1rem] leading-7 text-slate-600" editing={editing} field="sector.groupDescription" multiline path={["copy", "sectorGroups", groupIndex, "description"]} value={group.description} />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {group.sectors.map((sector, index) => (
            <div key={sector} className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                <Icon icon={sectorIcons[sector] ?? "mdi:briefcase-outline"} className="size-4" />
              </span>
              <InlineText as="span" blockId={blockId} className="text-[0.98rem] font-semibold text-slate-800" editing={editing} field="sector.item" path={["copy", "sectorGroups", groupIndex, "sectors", index]} value={sector} />
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

function ProgramListEditable({
  blockId,
  editing,
  icon,
  items,
  pathRoot,
  title,
}: {
  blockId?: string
  editing: boolean
  icon: "target" | "trend"
  items: Array<string>
  pathRoot: Array<string | number>
  title: string
}) {
  const IconComponent = icon === "target" ? Target : TrendingUp

  return (
    <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
        <IconComponent className="size-5" />
      </span>
      <InlineText as="h2" blockId={blockId} className="section-title mt-5 max-w-[12ch]" editing={editing} field="programList.title" path={[...pathRoot, "title"]} value={title} />
      <div className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <InlineText key={index} as="div" blockId={blockId} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-[0.98rem] leading-6 text-slate-700" editing={editing} field="programList.item" multiline path={[...pathRoot, index]} value={item} />
        ))}
      </div>
    </article>
  )
}

function BlpEventsEditable({ blockId, editing }: { blockId?: string; editing: boolean }) {
  return (
    <section id="evenements" className="py-16 sm:py-20">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <InlineText as="span" blockId={blockId} className="eyebrow justify-center before:hidden" editing={editing} field="blpEvents.eyebrow" path={["copy", "blpEvents", "eyebrow"]} value="Évènements du BLP" />
          <h2 className="section-title mt-6">
            <InlineText as="span" blockId={blockId} editing={editing} field="blpEvents.titleLead" path={["copy", "blpEvents", "titleLead"]} value="Cérémonies, séminaires et" />{" "}
            <InlineText as="span" blockId={blockId} className="accent-text" editing={editing} field="blpEvents.titleAccent" path={["copy", "blpEvents", "titleAccent"]} value="actions de terrain." />
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCardEditable key={event.title} blockId={blockId} editing={editing} event={event} pathRoot={["copy", "events", index]} />
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {programEventGallery.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} className="aspect-[3/2] w-full rounded-[22px] border border-slate-200/80 object-cover shadow-[0_12px_30px_rgba(15,23,42,0.06)]" loading="lazy" />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href="/contact" onClick={(event) => handleBuilderLinkClick(event, "/contact", editing)} className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">
            Rejoindre le programme
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function EventCardEditable({
  blockId,
  editing,
  event,
  pathRoot,
}: {
  blockId?: string
  editing: boolean
  event: (typeof events)[number]
  pathRoot: Array<string | number>
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-[220px] overflow-hidden bg-slate-100">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <InlineText as="p" blockId={blockId} className="absolute left-4 top-4 rounded-full border border-white/18 bg-white/14 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm" editing={editing} field="event.date" path={[...pathRoot, "date"]} value={event.date} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <InlineText as="h3" blockId={blockId} className="font-heading text-[1.42rem] leading-[1.15] tracking-[-0.04em] text-slate-950" editing={editing} field="event.title" multiline path={[...pathRoot, "title"]} value={event.title} />
        <InlineText as="p" blockId={blockId} className="mt-3 text-[0.98rem] leading-6 text-slate-600" editing={editing} field="event.summary" multiline path={[...pathRoot, "summary"]} value={event.summary} />
      </div>
    </article>
  )
}

function ContactCardEditable({
  blockId,
  editing,
  href,
  icon,
  pathRoot,
  title,
  value,
}: {
  blockId?: string
  editing: boolean
  href: string
  icon: ReactNode
  pathRoot: Array<string | number>
  title: string
  value: string
}) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onClick={(event) => handleBuilderLinkClick(event, href, editing)} className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">{icon}</span>
      <InlineText as="h2" blockId={blockId} className="mt-5 font-heading text-[1.55rem] tracking-[-0.04em] text-slate-950" editing={editing} field="contact.title" path={[...pathRoot, "title"]} value={title} />
      <InlineText as="p" blockId={blockId} className="mt-3 text-[1rem] leading-7 text-slate-600" editing={editing} field="contact.value" multiline path={[...pathRoot, "value"]} value={value} />
    </a>
  )
}

function BuilderButton({
  blockId,
  className,
  editing,
  field,
  href,
  label,
  path,
  variant = "solid",
}: ButtonLink & {
  blockId?: string
  className?: string
  editing?: boolean
  field?: string
  path?: Array<number | string>
  variant?: "ghost" | "light" | "solid"
}) {
  if (!href || !label) return null

  return (
    <Button
      asChild
      className={cn(
        "h-12 rounded-full px-5 font-bold",
        variant === "ghost" && "border border-white/15 bg-white/8 text-white hover:bg-white/14",
        variant === "light" && "bg-white text-primary hover:bg-white/90",
        variant === "solid" && "bg-primary text-white hover:bg-primary/90",
        className,
      )}
    >
      <a
        href={href}
        onClick={(event) => handleBuilderLinkClick(event, href, Boolean(editing))}
      >
        {field ? (
          <InlineText blockId={blockId} editing={editing} field={field} path={path} value={label} />
        ) : (
          label
        )}
        <ArrowRight className="size-4" />
      </a>
    </Button>
  )
}

function ContactItem({
  blockId,
  editing,
  field,
  icon,
  label,
  value,
}: {
  blockId?: string
  editing?: boolean
  field: string
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white text-primary shadow-[0_10px_24px_rgba(21,32,54,0.08)]">
        {icon}
      </span>
      <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">{label}</p>
      <InlineText
        as="p"
        blockId={blockId}
        className="mt-2 text-[0.98rem] leading-7 text-slate-700"
        editing={editing}
        field={field}
        multiline
        value={value}
      />
    </article>
  )
}
