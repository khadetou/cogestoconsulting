import { Icon } from "@iconify/react"
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CirclePlay,
  Handshake,
  Leaf,
  Mail,
  MapPin,
  MoveRight,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

import type { InlineRichTextMap, InlineTextStyleMap } from "@/builder/inline-editing-public"
import type { AnimationPreset } from "@/builder/types"
import { AnimatedBlock } from "@/builder/animation"
import { InlineText, TextStyleProvider, handleBuilderLinkClick } from "@/builder/inline-editing-public"
import { PartnerLogoCarousel } from "@/components/common-sections"
import { ProgramExpertCard } from "@/components/program-expert-card"
import { SiteHeader } from "@/components/site-header"
import { TeamPortrait } from "@/components/team-portrait"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  aboutApproach,
  aboutBoardMembers,
  aboutExecutiveCommittee,
  aboutPresidentMessage,
  commitments,
  contact,
  detailedFunctionalExpertise,
  events,
  footerLinks,
  homeProcessSteps,
  homeServices,
  leaders,
  programConsultants,
  programContextHighlights,
  programExpertRoster,
  programEvents,
  programEventGallery,
  programKeyFigures,
  programObjectives,
  programPartners,
  programResults,
  sectorExpertise,
  socialCommitments,
  socialLinks,
  valueCards,
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

const aboutMissionParagraphs = [
  "Nous mettons notre expertise au service de la croissance et de la compétitivité des startups et entreprises d’Afrique francophone actives dans des secteurs stratégiques tels que l’agro-industrie et le numérique.",
  "Nous accompagnons leur transformation structurelle, organisationnelle, opérationnelle, stratégique et digitale, en leur offrant des solutions innovantes, durables et adaptées à leurs besoins, pour renforcer leurs capacités, faciliter leur accès aux marchés et aux financements.",
  "Notre intervention vise à renforcer leur performance et leur résilience, tout en soutenant la création de valeur durable.",
]

export const defaultHomeContentCopy: HomeContentCopy = {
  about: {
    badge: "Une équipe composée de professionnels hautement qualifiés et expérimentés.",
    body: "Cogesto Consulting aide ses clients à bâtir une organisation performante et durable. Notre méthode, éprouvée par des expériences et expertises sectorielles diverses, favorise le transfert de compétences et renforce la performance collective des équipes.",
    buttonLabel: "Découvrir le cabinet",
    eyebrow: "À propos",
    missionBody:
      "Nous mettons notre expertise au service de la croissance et de la compétitivité des startups et entreprises d’Afrique francophone actives dans des secteurs stratégiques tels que l’agro-industrie et le numérique.",
    missionEyebrow: "Mission",
    missionTitle:
      "Mettre l’expertise au service de la performance des organisations et des équipes.",
    titleAccent: "faisons.",
    titleLead: "Ce que nous",
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
    titleAccent: "segments d’expertises !",
    titleLead: "Découvrez nos principaux",
  },
  method: {
    buttonLabel: "Notre proposition de valeur",
    steps: homeProcessSteps.map((step) => ({
      description: step.description,
      title: step.title,
    })),
    titleAccent: "prestations à forte valeur ajoutée !",
    titleLead: "Un cabinet de conseil avec des",
  },
  partners: {
    title: "Ils nous ont fait confiance !",
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

function mergeRecords<T extends Record<string, unknown>>(defaultItems: Array<T>, customItems?: Array<Partial<T>>) {
  const custom = Array.isArray(customItems) ? customItems : []
  const length = Math.max(defaultItems.length, custom.length)

  return Array.from({ length }, (_, index) => ({
    ...(defaultItems[index] ?? {}),
    ...(custom[index] ?? {}),
  })) as Array<T>
}

function mergeBlpCopy(copy?: Partial<typeof defaultBlpPageCopy>) {
  return {
    ...defaultBlpPageCopy,
    ...copy,
    context: copy?.context?.length ? copy.context : defaultBlpPageCopy.context,
    events: mergeRecords(defaultBlpPageCopy.events, copy?.events),
    programConsultants: mergeRecords(defaultBlpPageCopy.programConsultants, copy?.programConsultants),
    programContextHighlights: copy?.programContextHighlights?.length
      ? copy.programContextHighlights
      : defaultBlpPageCopy.programContextHighlights,
    programEventGallery: mergeRecords(defaultBlpPageCopy.programEventGallery, copy?.programEventGallery),
    programObjectives: copy?.programObjectives?.length ? copy.programObjectives : defaultBlpPageCopy.programObjectives,
    programPartners: mergeRecords(defaultBlpPageCopy.programPartners, copy?.programPartners),
    programResults: copy?.programResults?.length ? copy.programResults : defaultBlpPageCopy.programResults,
  }
}

function mergeEventsCopy(copy?: Partial<typeof defaultEventsPageCopy>) {
  return {
    ...defaultEventsPageCopy,
    ...copy,
    events: defaultEventsPageCopy.events,
  }
}

function mergeContactCopy(copy?: Partial<typeof defaultContactPageCopy>) {
  return {
    ...defaultContactPageCopy,
    ...copy,
  }
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

const formationExpertiseTitle = "Formation, séminaires et Team building"

const sectorIcons: Record<string, string> = {
  "Agro-alimentaire / Agro business": "mdi:sprout",
  "Agences publiques": "mdi:office-building-outline",
  Automobile: "mdi:car",
  "Banques et services financiers": "mdi:bank-outline",
  "Construction métallique": "mdi:hammer-wrench",
  Distribution: "mdi:storefront-outline",
  "Énergie et électricité": "mdi:transmission-tower",
  "Éducation": "mdi:school-outline",
  "Étude, ingénierie et conseil": "mdi:clipboard-search-outline",
  "Hôtel & restauration": "mdi:silverware-fork-knife",
  "Immobilier / BTP": "mdi:crane",
  Industrie: "mdi:factory",
  "Mécanique générale": "mdi:cog-outline",
  "Microfinance et SFD": "mdi:hand-coin-outline",
  "Oil & Gas": "mdi:oil",
  ONG: "mdi:hand-heart-outline",
  Organismes: "mdi:domain",
  Santé: "mdi:medical-bag",
  TIC: "mdi:monitor-cellphone",
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

export const defaultAboutPageCopy = {
  aboutApproach,
  aboutBoardMembers,
  aboutExecutiveCommittee,
  aboutPresidentMessage,
  commitments,
  leaders,
  socialCommitments,
  valueCards,
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
    "Le Sénégal dispose désormais d’un réel potentiel économique pétrolier et gazier suite aux découvertes d’importants gisements offshore entre 2014 et 2015.",
    "Pour créer les conditions d’une industrie profitable aux entreprises nationales, le Sénégal a créé en 2016 un Comité Stratégique d’Orientation et adopté la loi 2019-04 relative au contenu local dans le secteur des hydrocarbures.",
    "La Banque Africaine de Développement a mis en place un mécanisme d’assistance technique aux PME locales, sur sollicitation d’Invest In Africa et avec l’appui du Fonds d’Assistance au Secteur Privé Africain.",
  ],
  events: programEvents,
  programConsultants,
  programContextHighlights,
  programEventGallery,
  programObjectives,
  programPartners,
  programResults,
}

export const defaultEventsPageCopy = {
  events,
}

export const defaultContactPageCopy = {
  addressValue: `9, Imm Saliou Ndione Fenêtre Mermoz, Dakar Sénégal. ${contact.address}`,
  email: contact.email,
  formBody:
    "Notre équipe vous répond pour qualifier vos besoins et structurer une démarche d’accompagnement adaptée à vos enjeux.",
  phone: contact.phone,
}

const heroMetrics = [
  { icon: Users, label: "Bureaux", value: "4" },
  { icon: TrendingUp, label: "personnes formées", value: "+1840" },
  { icon: BriefcaseBusiness, label: "Années d’expérience", value: "14+" },
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
      <section id="partners" className="partners-section scroll-mt-28 py-14 sm:py-16">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[#978360]/20 bg-white/70 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#978360] shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              Ils nous font confiance
            </span>
            <InlineText
              as="p"
              blockId={blockId}
              className="mt-4 font-heading text-[2rem] tracking-[-0.04em] text-[#152036] sm:text-[2.45rem]"
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
                  className="inline-flex items-center gap-3 rounded-full bg-[#f8f6f1] px-5 py-3 text-sm font-bold text-[#152036] shadow-[0_18px_35px_rgba(21,32,54,0.16)] ring-1 ring-[#978360]/18 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
                  onClick={(event) => handleBuilderLinkClick(event, "/about", isEditing)}
                >
                  <InlineText
                    blockId={blockId}
                    editing={isEditing}
                    field="about.buttonLabel"
                    path={["copy", "about", "buttonLabel"]}
                    value={content.about?.buttonLabel}
                  />
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#152036] bg-[#152036] text-white">
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
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#978360]"
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
                Découvrez nos principaux <span className="accent-text">segments d’expertises !</span>
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
              className="inline-flex items-center gap-3 rounded-full bg-[#152036] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(21,32,54,0.12)] transition-colors hover:bg-[#1d2a42]"
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
              className="inline-flex items-center gap-3 self-start rounded-full bg-[#f8f6f1] px-5 py-3 text-sm font-bold text-[#152036] shadow-[0_18px_35px_rgba(21,32,54,0.12)] ring-1 ring-[#978360]/18 transition-colors hover:bg-white lg:self-auto"
              onClick={(event) => handleBuilderLinkClick(event, "/about", isEditing)}
            >
              <InlineText
                blockId={blockId}
                editing={isEditing}
                field="method.buttonLabel"
                path={["copy", "method", "buttonLabel"]}
                value={content.method?.buttonLabel}
              />
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#152036] bg-[#152036] text-white">
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
                        ? "rounded-[28px] border border-[#e6e0d4] bg-[#f8f6f1] text-[#152036] shadow-[0_24px_55px_rgba(21,32,54,0.18)]"
                        : "border-b border-[#dce8f4] text-[#31425c]",
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
                          className="mt-4 max-w-[46ch] text-sm leading-6 text-[#526076]"
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
                        step.active
                          ? "mr-6 border-[#152036] bg-[#152036] text-white"
                          : "border-[#d6e4f2] bg-[#f7fbff] text-[#152036] shadow-[0_8px_22px_rgba(21,32,54,0.08)]",
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
                  <TeamPortrait src={leader.image} alt={leader.name} imageScale={leader.imageScale} />
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
                      className="mt-1 text-sm font-semibold text-[#978360]"
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
  copy,
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps & {
  copy?: typeof defaultAboutPageCopy & {
    mission?: {
      paragraphs?: Array<string>
    }
  }
}) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id
  const missionParagraphs = copy?.mission?.paragraphs?.length ? copy.mission.paragraphs : aboutMissionParagraphs
  const valueItems = copy?.values?.length ? copy.values : values

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

      <section id="mission" className="bg-white py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <article>
              <InlineText as="span" blockId={blockId} className="eyebrow before:hidden !text-[#978360]" editing={isEditing} field="mission.eyebrow" path={["copy", "mission", "eyebrow"]} value="Notre mission" />
              <InlineText as="h2" blockId={blockId} className="mt-5 max-w-[12ch] font-heading text-[2rem] leading-[1.05] tracking-tight text-[#152036] md:text-[2.8rem]" editing={isEditing} field="mission.title" path={["copy", "mission", "title"]} value="Mettre l’expertise au service de la performance." />
              <div className="mt-7 space-y-5">
                {missionParagraphs.map((paragraph, index) => (
                  <InlineText key={index} as="p" blockId={blockId} className="text-[1.02rem] leading-8 text-[#4f5f76]" editing={isEditing} field="mission.paragraph" multiline path={["copy", "mission", "paragraphs", index]} value={paragraph} />
                ))}
              </div>
            </article>

            <article id="valeurs" className="rounded-[30px] border border-[#d8e6f4] bg-[#f4f8fb] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={isEditing} field="values.eyebrow" path={["copy", "values", "eyebrow"]} value="Nos valeurs" />
              <p className="mt-3 text-[1rem] leading-7 text-slate-600">Notre approche est principalement basée sur :</p>
              <div className="mt-6 overflow-hidden rounded-[28px] border border-[#d8e6f4] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                {valueCards.map((value, index) => (
                  <div key={value.title} className="grid gap-4 border-t border-[#d8e6f4] px-5 py-5 text-center first:border-t-0 sm:grid-cols-[7.5rem_1fr_2.25rem] sm:items-center sm:text-left">
                    <div className="mx-auto flex size-28 items-center justify-center rounded-[24px] bg-[#f8fbff] sm:mx-0">
                      <img src={value.image} alt={value.title} className="size-full scale-[1.15] object-contain" loading="lazy" />
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <InlineText as="span" blockId={blockId} className="text-base font-semibold text-[#172238]" editing={isEditing} field="values.item" path={["copy", "values", index]} value={valueItems[index] ?? value.title} />
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
              <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="approach.eyebrow" path={["copy", "approach", "eyebrow"]} value="Notre proposition de valeur" />
              <h2 className="section-title mt-6 max-w-[12ch]">
                <InlineText as="span" blockId={blockId} editing={isEditing} field="approach.titleLead" path={["copy", "approach", "titleLead"]} value="Une approche" />{" "}
                <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="approach.titleAccent" path={["copy", "approach", "titleAccent"]} value="ancrée dans l’analyse et l’action." />
              </h2>
              <InlineText as="p" blockId={blockId} className="section-copy mt-5 max-w-[42ch]" editing={isEditing} field="approach.intro" multiline path={["copy", "approach", "intro"]} value="Notre approche est principalement basée sur des méthodes concrètes, un diagnostic ciblé et un accompagnement interactif." />
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
              <InlineText as="span" blockId={blockId} editing={isEditing} field="team.titleLead" path={["copy", "team", "titleLead"]} value="Une gouvernance et un comité de direction" />{" "}
              <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="team.titleAccent" path={["copy", "team", "titleAccent"]} value="à forte expérience." />
            </h2>
            <InlineText as="p" blockId={blockId} className="section-copy mt-5" editing={isEditing} field="team.intro" multiline path={["copy", "team", "intro"]} value="Le conseil d’administration et le comité exécutif réunissent des profils expérimentés en conseil, finance, droit, organisation, ressources humaines et politiques publiques." />
          </div>

          <ProfileGridEditable
            blockId={blockId}
            editing={isEditing}
            eyebrow="Le Conseil d’Administration"
            intro="Le conseil d’administration de Cogesto Consulting est composé d’administrateurs expérimentés ayant une expérience avérée en tant que consultants et managers."
            pathRoot={["copy", "aboutBoardMembers"]}
            people={aboutBoardMembers}
          />

          <ProfileGridEditable
            blockId={blockId}
            className="mt-14"
            editing={isEditing}
            eyebrow="Notre comité exécutif"
            intro="Un comité de direction réunissant des profils seniors aux expériences complémentaires en conseil, entreprise et institutions internationales."
            pathRoot={["copy", "aboutExecutiveCommittee"]}
            people={aboutExecutiveCommittee}
          />
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
              <a href="/contact" className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#152036] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1d2a42]" onClick={(event) => handleBuilderLinkClick(event, "/contact", isEditing)}>
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
  const [activeExpertise, setActiveExpertise] = useState(detailedFunctionalExpertise[0]?.title ?? "")
  const [activeSectorGroup, setActiveSectorGroup] = useState(sectorGroups[0]?.title ?? "")
  const activeExpertiseIndex = Math.max(
    0,
    detailedFunctionalExpertise.findIndex((item) => item.title === activeExpertise),
  )
  const activeSectorGroupIndex = Math.max(
    0,
    sectorGroups.findIndex((group) => group.title === activeSectorGroup),
  )
  const activeExpertiseItem = detailedFunctionalExpertise[activeExpertiseIndex]
  const activeSectorGroupItem = sectorGroups[activeSectorGroupIndex]
  const selectExpertise = (title: string, scrollToPanel = false) => {
    setActiveExpertise(title)

    if (!scrollToPanel || typeof window === "undefined" || !window.matchMedia("(max-width: 1023px)").matches) {
      return
    }

    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        document.getElementById("builder-functional-mobile-panel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 0)
    })
  }

  useEffect(() => {
    if (typeof window === "undefined" || isEditing) return

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
  }, [isEditing])

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section id="fonctionnelles" className="scroll-mt-28 py-16 sm:py-20">
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

          <div className="mt-10 rounded-[28px] border border-slate-200/90 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:hidden">
            <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-3">
            {detailedFunctionalExpertise.map((item, index) => {
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
                      <span className={["inline-flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors", isActive ? "bg-white/12 text-white" : "bg-[#dff2ff] text-[#0f4f86]"].join(" ")}>
                        <Icon icon={visual.icon} className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <InlineText as="span" blockId={blockId} className={["block text-[0.68rem] font-semibold uppercase tracking-[0.16em]", isActive ? "text-white/68" : "text-[#5f7792]"].join(" ")} editing={isEditing} field="functional.kicker" path={["copy", "detailedFunctionalExpertise", index, "kicker"]} value={visual.kicker} />
                        <InlineText as="span" blockId={blockId} className={["mt-1 block whitespace-normal font-heading text-[1.05rem] leading-tight tracking-[-0.03em]", isActive ? "text-white" : "text-[#1f334d]"].join(" ")} editing={isEditing} field="functional.title" multiline path={["copy", "detailedFunctionalExpertise", index, "title"]} value={item.title} />
                      </span>
                    </span>
                  </button>
              )
            })}
            </div>

            {activeExpertiseItem ? (
              <div id="builder-functional-mobile-panel" className="scroll-mt-24">
                <FunctionalPanelEditable blockId={blockId} editing={isEditing} item={activeExpertiseItem} itemIndex={activeExpertiseIndex} />
              </div>
            ) : null}
          </div>

          <div className="mt-10 hidden items-start gap-4 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
            <div className="grid content-start gap-1.5 rounded-[26px] border border-slate-200/90 bg-white p-2.5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] lg:sticky lg:top-28 lg:max-h-[calc(100vh-20rem)] lg:overflow-y-auto lg:pr-2">
              {detailedFunctionalExpertise.map((item, index) => {
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
                        <InlineText as="span" blockId={blockId} className="hidden" editing={isEditing} field="functional.kicker" path={["copy", "detailedFunctionalExpertise", index, "kicker"]} value={visual.kicker} />
                        <InlineText as="span" blockId={blockId} className={["block font-heading text-[0.82rem] leading-tight tracking-[-0.02em]", isActive ? "text-white" : "text-[#1f334d]"].join(" ")} editing={isEditing} field="functional.title" multiline path={["copy", "detailedFunctionalExpertise", index, "title"]} value={item.title} />
                      </span>
                    </span>
                    <ArrowRight className={["size-4 shrink-0", isActive ? "text-white/70" : "text-[#5f7792]"].join(" ")} />
                  </button>
                )
              })}
            </div>

            {activeExpertiseItem ? (
              <FunctionalPanelEditable blockId={blockId} editing={isEditing} item={activeExpertiseItem} itemIndex={activeExpertiseIndex} />
            ) : null}
          </div>
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

          <div className="mt-10 grid items-start gap-3 rounded-[28px] border border-slate-200/90 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:hidden">
            {sectorGroups.map((group, index) => {
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
                      <span className={["inline-flex size-11 shrink-0 items-center justify-center rounded-2xl", isActive ? "bg-white/12 text-white" : "bg-[#dff2ff] text-[#0f4f86]"].join(" ")}>
                        <Icon icon={group.icon} className="size-5" />
                      </span>
                      <InlineText as="span" blockId={blockId} className={["block whitespace-normal font-heading text-[1.08rem] leading-tight tracking-[-0.03em]", isActive ? "text-white" : "text-[#1f334d]"].join(" ")} editing={isEditing} field="sector.groupTitle" multiline path={["copy", "sectorGroups", index, "title"]} value={group.title} />
                    </span>
                    <ChevronDown className={["size-4 shrink-0 transition-transform duration-200", isActive ? "rotate-180 text-white/70" : "text-[#5f7792]"].join(" ")} />
                  </button>

                  {isActive ? (
                    <div className="col-span-full">
                      <SectorPanelEditable blockId={blockId} editing={isEditing} group={group} groupIndex={index} />
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="mt-10 hidden items-start gap-4 lg:grid lg:grid-cols-[340px_minmax(0,1fr)]">
            <div className="grid content-start gap-2 rounded-[30px] border border-slate-200/90 bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              {sectorGroups.map((group, index) => {
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
                      <InlineText as="span" blockId={blockId} className={["block font-heading text-[1rem] leading-tight tracking-[-0.02em]", isActive ? "text-white" : "text-[#1f334d]"].join(" ")} editing={isEditing} field="sector.groupTitle" multiline path={["copy", "sectorGroups", index, "title"]} value={group.title} />
                    </span>
                    <ArrowRight className={["size-4 shrink-0", isActive ? "text-white/70" : "text-[#5f7792]"].join(" ")} />
                  </button>
                )
              })}
            </div>

            {activeSectorGroupItem ? (
              <SectorPanelEditable blockId={blockId} editing={isEditing} group={activeSectorGroupItem} groupIndex={activeSectorGroupIndex} />
            ) : null}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[30px] bg-[#152036] p-6 text-white shadow-[0_24px_60px_rgba(21,32,54,0.16)] sm:flex-row sm:items-center">
            <div>
              <InlineText as="p" blockId={blockId} className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/58" editing={isEditing} field="coverage.eyebrow" path={["copy", "coverage", "eyebrow"]} value="Couverture sectorielle" />
              <InlineText as="p" blockId={blockId} className="mt-2 max-w-3xl text-[1rem] leading-7 text-white/72" editing={isEditing} field="coverage.body" multiline path={["copy", "coverage", "body"]} value={`${sectorExpertise.length} secteurs d’intervention structurés pour aider les organisations à arbitrer, financer, organiser et piloter leurs priorités.`} />
            </div>
            <a href="/contact" onClick={(event) => handleBuilderLinkClick(event, "/contact", isEditing)} className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#152036]">
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
  copy = defaultBlpPageCopy,
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps & {
  copy?: Partial<typeof defaultBlpPageCopy>
}) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id
  const content = mergeBlpCopy(copy)

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
              {content.context.map((paragraph, index) => (
                <InlineText key={index} as="p" blockId={blockId} className="section-copy mt-4 first:mt-6" editing={isEditing} field="context.paragraph" multiline path={["copy", "context", "paragraphs", index]} value={paragraph} />
              ))}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {content.programContextHighlights.map((item, index) => (
                  <InlineText key={index} as="div" blockId={blockId} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-[0.92rem] leading-6 text-slate-700" editing={isEditing} field="context.highlight" multiline path={["copy", "programContextHighlights", index]} value={item} />
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
            <InlineText as="span" blockId={blockId} className="eyebrow justify-center before:hidden" editing={isEditing} field="partners.eyebrow" path={["copy", "partners", "eyebrow"]} value="Partenaires du BLP" />
            <h2 className="section-title mt-6">
              <InlineText as="span" blockId={blockId} editing={isEditing} field="partners.titleLead" path={["copy", "partners", "titleLead"]} value="Un écosystème" />{" "}
              <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="partners.titleAccent" path={["copy", "partners", "titleAccent"]} value="mobilisé autour du programme." />
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {content.programPartners.map((partner, index) => (
              <article key={partner.name} className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <div className="flex min-h-28 items-center justify-center rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                  {"logo" in partner && partner.logo ? <img src={partner.logo as string} alt={partner.name} className="max-h-20 w-full object-contain" loading="lazy" /> : <Handshake className="size-10 text-primary" />}
                </div>
                <InlineText as="h3" blockId={blockId} className="mt-5 font-heading text-[1.45rem] tracking-[-0.04em] text-slate-950" editing={isEditing} field="partner.name" path={["copy", "programPartners", index, "name"]} value={partner.name} />
                <InlineText as="p" blockId={blockId} className="mt-3 text-[0.98rem] leading-6 text-slate-600" editing={isEditing} field="partner.description" multiline path={["copy", "programPartners", index, "description"]} value={partner.description} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="objectifs" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mb-10 max-w-4xl">
            <InlineText as="span" blockId={blockId} className="eyebrow" editing={isEditing} field="objectives.eyebrow" path={["copy", "objectives", "eyebrow"]} value="Objectifs et résultats" />
            <h2 className="section-title mt-6">
              <InlineText as="span" blockId={blockId} editing={isEditing} field="objectives.titleLead" path={["copy", "objectives", "titleLead"]} value="Apporter une assistance technique concrète aux" />{" "}
              <InlineText as="span" blockId={blockId} className="accent-text" editing={isEditing} field="objectives.titleAccent" path={["copy", "objectives", "titleAccent"]} value="PME à forts potentiels." />
            </h2>
            <InlineText as="p" blockId={blockId} className="section-copy mt-5" editing={isEditing} field="objectives.intro" multiline path={["copy", "objectives", "intro"]} value="Le programme vise à permettre aux PME ciblées d’accéder aux marchés et aux financements, tout en améliorant leur intégration dans la chaîne de valeur de l’industrie pétrolière et gazière et la génération d’emplois décents au Sénégal." />
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <ProgramListEditable blockId={blockId} editing={isEditing} icon="target" items={content.programObjectives} pathRoot={["copy", "programObjectives"]} title="Objectifs du programme." />
            <ProgramListEditable blockId={blockId} editing={isEditing} icon="trend" items={content.programResults} pathRoot={["copy", "programResults"]} title="Résultats attendus." />
          </div>
        </div>
      </section>

      <section id="consultants" className="bg-[#eaf3fb] py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <InlineText as="span" blockId={blockId} className="eyebrow justify-center before:hidden !text-[#8b7655]" editing={isEditing} field="consultants.eyebrow" path={["copy", "consultants", "eyebrow"]} value="Nos consultants BLP" />
            <h2 className="section-title mt-6 !text-[#152036]">
              <InlineText as="span" blockId={blockId} className="!text-[#152036]" editing={isEditing} field="consultants.titleLead" path={["copy", "consultants", "titleLead"]} value="Une équipe d’experts de très haut niveau" />{" "}
              <InlineText as="span" blockId={blockId} className="!text-[#978360]" editing={isEditing} field="consultants.titleAccent" path={["copy", "consultants", "titleAccent"]} value="mobilisée pour les PME." />
            </h2>
            <InlineText as="p" blockId={blockId} className="section-copy mt-5 !text-[#3d526c]" editing={isEditing} field="consultants.intro" multiline path={["copy", "consultants", "intro"]} value="Les profils mobilisés couvrent l’Oil & Gas, la stratégie, l’organisation, le capital humain, la finance, la restructuration, la pédagogie, la supply chain, la QHSE, le droit, la fiscalité et la structuration de financement." />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {programExpertRoster.map((expert) => (
              <ProgramExpertCard key={expert.name} expert={expert} />
            ))}
          </div>
        </div>
      </section>
    </TextStyleProvider>
  )
}

export function BuilderEventsPageContentBlock({
  copy = defaultEventsPageCopy,
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps & {
  copy?: Partial<typeof defaultEventsPageCopy>
}) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id
  const content = mergeEventsCopy(copy)

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8">
          <div className="rounded-[2px] border border-slate-200 bg-white">
            <div className="grid gap-4 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-center gap-3 text-slate-500">
                <Search className="size-5" />
                <span className="text-sm">Rechercher évènements</span>
              </div>
              <div className="flex items-center gap-6 text-sm font-semibold">
                <span className="rounded-[4px] bg-[#3347ff] px-6 py-3 text-white">Chercher</span>
                <span className="border-b-2 border-slate-950 pb-3 text-slate-950">Liste</span>
                <span className="pb-3 text-slate-600">Mois</span>
                <span className="pb-3 text-slate-600">Jour</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-5 text-slate-700">
            <span className="text-2xl leading-none">‹</span>
            <span className="text-2xl leading-none">›</span>
            <span className="rounded-[4px] border border-slate-200 px-4 py-2 text-sm text-slate-500">Aujourd’hui</span>
          </div>

          <div className="mt-8 rounded-[4px] bg-slate-100 px-5 py-5 text-center text-sm font-medium text-slate-700">
            <InlineText as="span" blockId={blockId} editing={isEditing} field="empty.title" path={["copy", "empty", "title"]} value="Il n’y a pas d’évènements à venir." />
          </div>

          <InlineText as="h1" blockId={blockId} className="mt-10 font-heading text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-[2.4rem]" editing={isEditing} field="past.title" path={["copy", "past", "title"]} value="Derniers Évènements passés" />

          <div className="mt-10 grid gap-12">
            {content.events.map((event, index) => (
              <EventTimelineItemEditable key={event.title} blockId={blockId} editing={isEditing} event={event} pathRoot={["copy", "events", index]} />
            ))}
          </div>
        </div>
      </section>
    </TextStyleProvider>
  )
}

export function BuilderContactPageContentBlock({
  copy = defaultContactPageCopy,
  id,
  puck,
  richText,
  textStyles,
}: EditableBlockProps & {
  copy?: Partial<typeof defaultContactPageCopy>
}) {
  const isEditing = Boolean(puck?.isEditing)
  const blockId = id
  const content = mergeContactCopy(copy)

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <section className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            <ContactCardEditable blockId={blockId} editing={isEditing} href={contact.mapLink} icon={<MapPin className="size-5" />} pathRoot={["copy", "contactCards", 0]} title="Adresse" value={content.addressValue} />
            <ContactCardEditable blockId={blockId} editing={isEditing} href={`mailto:${content.email}`} icon={<Mail className="size-5" />} pathRoot={["copy", "contactCards", 1]} title="Nous écrire par mail" value={content.email} />
            <ContactCardEditable blockId={blockId} editing={isEditing} href={`tel:${content.phone.replace(/\s+/g, "")}`} icon={<Phone className="size-5" />} pathRoot={["copy", "contactCards", 2]} title="Où nous appeler ?" value={content.phone} />
          </div>

          <div className="mt-12 grid gap-8 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.05)] lg:grid-cols-[0.85fr_1fr]">
            <div>
              <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={isEditing} field="form.eyebrow" path={["copy", "form", "eyebrow"]} value="Soyez libre de nous contacter" />
              <InlineText as="h2" blockId={blockId} className="section-title mt-5 max-w-[13ch]" editing={isEditing} field="form.title" multiline path={["copy", "form", "title"]} value="Veuillez remplir le formulaire ci-dessous." />
              <InlineText as="p" blockId={blockId} className="section-copy mt-5" editing={isEditing} field="form.body" multiline path={["copy", "formBody"]} value={content.formBody} />
            </div>
            <form className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input className="h-12 bg-white" placeholder="Prénom et Nom" />
                <Input className="h-12 bg-white" placeholder="Email" type="email" />
              </div>
              <Textarea className="mt-4 min-h-40 bg-white" placeholder="Message" />
              <Button className="mt-5 h-12 w-full rounded-full bg-[#152036] px-6 text-white hover:bg-[#1d2a42] sm:w-auto">Envoyer</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="partners-section py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <InlineText as="h2" blockId={blockId} className="section-title" editing={isEditing} field="partners.title" multiline path={["copy", "partners", "title"]} value="Faites comme nos partenaires, rejoignez l’aventure !" />
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
  const isBusinessLinkageHero = variant === "program"
  const effectiveTitle = isBusinessLinkageHero
    ? "Accompagner la croissance des entreprises dans le secteur du pétrole et du gaz."
    : title
  const effectiveBody = isBusinessLinkageHero
    ? "Un programme de partenariat d’affaires conçu pour renforcer les compétences de gestion, les capacités de production, l’accès aux marchés et l’accès au financement des PME sénégalaises."
    : body

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
              variant === "program" && "grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-14",
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
	                value={effectiveTitle}
	              />
              <InlineText
                as="p"
                blockId={id}
                className={cn("mt-6 text-lg leading-8 text-white/72", variant === "program" ? "max-w-2xl" : "max-w-3xl")}
                editing={isEditing}
	                field="body"
	                multiline
	                value={effectiveBody}
	              />
            </div>

            {variant === "program" ? (
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
                <img
                  src={image || "/media/cogesto/ai/business-linkage/business-linkage-hero-african-professionals.png"}
                  alt="Professionnels africains en réunion dans le cadre du Business Linkage Program"
                  className="aspect-[1.57] h-full max-h-[500px] w-full object-cover"
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
              ? "border-[#e6e0d4] bg-[#f8f6f1] text-[#152036]"
              : "border-[#e6e0d4] bg-[#f8f6f1] text-[#152036]",
          )}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <InlineText
                as="h2"
                blockId={id}
                className={cn(
                  "font-heading text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl",
                  variant === "light" || variant === "navy" ? "!text-[#152036]" : "",
                )}
                editing={isEditing}
                field="title"
                value={title}
              />
              <InlineText
                as="p"
                blockId={id}
                className={cn("mt-5 max-w-2xl text-base leading-8", variant === "navy" ? "!text-[#526076]" : "!text-[#526076]")}
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
              variant="solid"
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

export function BuilderFooterBlock({
  address = contact.address,
  body = "Un cabinet engagé pour accompagner la croissance, la transformation et la compétitivité des organisations publiques et privées.",
  copyright = "Copyright 2026. Tous droits réservés.",
  email = contact.email,
  id,
  phone = contact.phone,
  presence = "Présence au Sénégal, au Maroc et au Canada.",
  puck,
  richText,
  textStyles,
  title = "Conseil, finance et management de la performance.",
}: EditableBlockProps & {
  address?: string
  body?: string
  copyright?: string
  email?: string
  phone?: string
  presence?: string
  title?: string
}) {
  const isEditing = Boolean(puck?.isEditing)

  return (
    <TextStyleProvider richText={richText} styles={textStyles}>
      <footer className="bg-background pb-8 pt-12">
        <div className="page-shell">
          <div className="grid gap-5 rounded-[32px] border border-[#29456a] bg-[#142a46] px-5 py-6 shadow-[0_24px_60px_rgba(5,8,18,0.24)] lg:grid-cols-[1.1fr_0.9fr] lg:px-7">
            <div>
              <span className="inline-flex h-16 w-[178px] items-center justify-center px-1">
                <img src="/brand/cogesto-logo-official.svg" alt="Cogesto Consulting" className="h-full w-full object-contain brightness-0 invert drop-shadow-[0_10px_22px_rgba(5,8,18,0.28)]" decoding="async" />
              </span>
              <InlineText
                as="h2"
                blockId={id}
                className="mt-3 font-heading text-[1.85rem] leading-[1.05] tracking-[-0.05em] text-white sm:text-[2.4rem]"
                editing={isEditing}
                field="title"
                multiline
                value={title}
              />
              <InlineText
                as="p"
                blockId={id}
                className="mt-4 max-w-[54ch] text-[1rem] leading-7 text-[#d9e8f6]"
                editing={isEditing}
                field="body"
                multiline
                value={body}
              />

              <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#d6e7f8]">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleBuilderLinkClick(event, link.href, isEditing)}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="rounded-[24px] border border-white/18 bg-[#142a46] px-4 py-4 text-white shadow-[0_12px_30px_rgba(5,8,18,0.14)]">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <a
                  href={contact.mapLink}
                  onClick={(event) => handleBuilderLinkClick(event, contact.mapLink, isEditing)}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[18px] transition-colors hover:text-white"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_8px_20px_rgba(5,8,18,0.12)]">
                    <MapPin className="size-4" />
                  </span>
                  <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/62">Adresse</p>
                  <InlineText as="p" blockId={id} className="mt-2 text-sm leading-6 text-white/86" editing={isEditing} field="address" multiline value={address} />
                </a>

                <a
                  href={`mailto:${email}`}
                  onClick={(event) => handleBuilderLinkClick(event, `mailto:${email}`, isEditing)}
                  className="block rounded-[18px] transition-colors hover:text-white"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_8px_20px_rgba(5,8,18,0.12)]">
                    <Mail className="size-4" />
                  </span>
                  <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/62">Email</p>
                  <InlineText as="p" blockId={id} className="mt-2 text-sm leading-6 text-white/86" editing={isEditing} field="email" value={email} />
                </a>

                <div className="sm:col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      onClick={(event) => handleBuilderLinkClick(event, `tel:${phone.replace(/\s+/g, "")}`, isEditing)}
                      className="block rounded-[18px] transition-colors hover:text-white"
                    >
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_8px_20px_rgba(5,8,18,0.12)]">
                      <Phone className="size-4" />
                    </span>
                    <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/62">
                      Téléphone
                    </p>
                    <InlineText as="p" blockId={id} className="mt-2 text-sm leading-6 text-white/86 sm:whitespace-nowrap" editing={isEditing} field="phone" value={phone} />
                  </a>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        onClick={(event) => handleBuilderLinkClick(event, social.href, isEditing)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition-colors hover:border-white/34 hover:bg-white/16"
                      >
                        <Icon icon={social.icon} className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="mt-8 overflow-hidden border-b border-slate-200 pb-6">
            <p className="font-heading text-[3rem] leading-[0.92] tracking-[-0.08em] text-[#233451] min-[440px]:text-[3.6rem] sm:whitespace-nowrap sm:text-[6.5rem] sm:tracking-[-0.1em] lg:text-[9.5rem]">
              Cogesto <span className="text-[#d8e0ea]">Consulting</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <InlineText as="span" blockId={id} editing={isEditing} field="copyright" value={copyright} />
            <InlineText as="span" blockId={id} editing={isEditing} field="presence" value={presence} />
          </div>
        </div>
      </footer>
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
  person: { image: string; imageScale?: number; name?: string; role: string; summary: string; title?: string }
}) {
  const name = person.name ?? person.title ?? ""

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
      <TeamPortrait src={person.image} alt={name} imageScale={person.imageScale} />
      <div className="p-5">
        <InlineText as="h3" blockId={blockId} className="font-heading text-[1.45rem] leading-[1.1] tracking-[-0.04em] text-slate-950" editing={editing} field="profile.name" path={[...pathRoot, person.name ? "name" : "title"]} value={name} />
        <InlineText as="p" blockId={blockId} className="mt-1 text-sm font-semibold text-[#978360]" editing={editing} field="profile.role" path={[...pathRoot, "role"]} value={person.role} />
        <InlineText as="p" blockId={blockId} className="mt-3 text-sm leading-6 text-slate-600" editing={editing} field="profile.summary" multiline path={[...pathRoot, "summary"]} value={person.summary} />
      </div>
    </article>
  )
}

function ProfileGridEditable({
  blockId,
  className = "mt-12",
  editing,
  eyebrow,
  intro,
  pathRoot,
  people,
}: {
  blockId?: string
  className?: string
  editing: boolean
  eyebrow: string
  intro: string
  pathRoot: Array<string | number>
  people: Array<{ image: string; imageScale?: number; name: string; role: string; summary: string }>
}) {
  return (
    <div className={className}>
      <div className="mb-6 max-w-3xl">
        <InlineText as="span" blockId={blockId} className="eyebrow before:hidden" editing={editing} field="people.eyebrow" path={[...pathRoot, "eyebrow"]} value={eyebrow} />
        <InlineText as="p" blockId={blockId} className="mt-3 text-[1rem] leading-7 text-slate-600" editing={editing} field="people.intro" multiline path={[...pathRoot, "intro"]} value={intro} />
      </div>
      <div className={`grid gap-5 md:grid-cols-2 ${people.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
        {people.map((person, index) => (
          <ProfileCardEditable key={`${eyebrow}-${person.name}`} blockId={blockId} editing={editing} pathRoot={[...pathRoot, index]} person={person} />
        ))}
      </div>
    </div>
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
    <article className="self-start overflow-hidden rounded-[28px] border border-[#b8def7]/80 bg-white shadow-[0_22px_55px_rgba(15,76,129,0.1)] lg:sticky lg:top-28">
      <div className="grid gap-0">
        <div className="relative min-h-[230px] overflow-hidden bg-[#152036] text-white lg:min-h-[250px]">
          <img src={visual.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover opacity-74" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.06),rgba(5,8,18,0.74)),linear-gradient(90deg,rgba(21,32,54,0.78),rgba(21,32,54,0.2))]" />
          <div className="relative z-10 flex min-h-[230px] flex-col justify-end p-6 text-white sm:p-7 lg:min-h-[250px]">
            <div className="flex items-end gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-white backdrop-blur-sm">
                <Icon icon={visual.icon} className="size-6" />
              </span>
              <div>
                <InlineText as="p" blockId={blockId} className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/62" editing={editing} field="functional.kicker" path={["copy", "detailedFunctionalExpertise", itemIndex, "kicker"]} value={visual.kicker} />
                <InlineText as="h3" blockId={blockId} className="mt-2 max-w-[18ch] font-heading text-[1.9rem] leading-[1.02] tracking-[-0.05em] text-white sm:text-[2.35rem]" editing={editing} field="functional.title" multiline path={["copy", "detailedFunctionalExpertise", itemIndex, "title"]} value={item.title} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="grid content-start gap-4">
            <ExpertiseListEditable blockId={blockId} editing={editing} items={item.enjeux} pathRoot={["copy", "detailedFunctionalExpertise", itemIndex, "enjeux"]} title="Vos enjeux" />
            <ExpertiseListEditable blockId={blockId} editing={editing} items={item.atouts} pathRoot={["copy", "detailedFunctionalExpertise", itemIndex, "atouts"]} title="Nos atouts" />
          </div>
          <ExpertiseListEditable blockId={blockId} editing={editing} items={item.savoirFaire} pathRoot={["copy", "detailedFunctionalExpertise", itemIndex, "savoirFaire"]} title="Notre savoir-faire" wide />
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
  wide = false,
}: {
  blockId?: string
  editing: boolean
  items: Array<string>
  pathRoot: Array<string | number>
  title: string
  wide?: boolean
}) {
  return (
    <div className="rounded-[22px] border border-[#d7e6f4] bg-[#f8fbfe] p-4 sm:p-5">
      <InlineText as="h3" blockId={blockId} className="font-heading text-[1.18rem] tracking-[-0.03em] text-slate-950" editing={editing} field="list.title" path={[...pathRoot, "title"]} value={title} />
      <div className={["mt-4 grid gap-2.5", wide ? "lg:grid-cols-2" : ""].join(" ")}>
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 text-[0.9rem] leading-6 text-[#465a73]">
            <Check className="mt-1 size-4 shrink-0 text-[#0f4f86]" />
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
    <article className="grid self-start overflow-hidden rounded-[28px] border border-[#b8def7]/80 bg-white shadow-[0_22px_55px_rgba(15,76,129,0.1)] lg:sticky lg:top-28 lg:grid-cols-[0.92fr_1.08fr]">
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
            <div key={sector} className="flex items-center gap-3 rounded-[20px] border border-[#d7e6f4] bg-[#f8fbfe] px-4 py-4">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e5f5ff] text-[#0f4f86] shadow-[0_8px_18px_rgba(15,76,129,0.08)]">
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
      <InlineText as="h2" blockId={blockId} className="mt-5 max-w-[12ch] font-heading text-[2.15rem] leading-[1.02] tracking-[-0.055em] text-[#152036] sm:text-[2.8rem]" editing={editing} field="programList.title" path={[...pathRoot, "title"]} value={title} />
      <div className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <InlineText key={index} as="div" blockId={blockId} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-[0.98rem] leading-6 text-slate-700" editing={editing} field="programList.item" multiline path={[...pathRoot, index]} value={item} />
        ))}
      </div>
    </article>
  )
}

function EventTimelineItemEditable({
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
    <article className="grid gap-6 lg:grid-cols-[72px_1fr_380px] lg:gap-8">
      <div className="flex justify-start lg:justify-center lg:pt-2">
        <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-[24px] bg-[#152036] text-white shadow-[0_14px_30px_rgba(21,32,54,0.18)]">
          <InlineText as="p" blockId={blockId} className="text-[0.68rem] font-semibold uppercase leading-none tracking-[0.14em] text-white/62" editing={editing} field="event.month" path={[...pathRoot, "month"]} value={event.month} />
          <InlineText as="p" blockId={blockId} className={event.year ? "font-heading text-[2rem] font-semibold leading-none tracking-[-0.04em]" : "mt-1 font-heading text-[1.72rem] font-semibold leading-none tracking-[-0.035em]"} editing={editing} field="event.day" path={[...pathRoot, "day"]} value={event.day} />
          {event.year ? <InlineText as="p" blockId={blockId} className="text-[0.72rem] font-semibold leading-none text-white/62" editing={editing} field="event.year" path={[...pathRoot, "year"]} value={event.year} /> : null}
        </div>
      </div>

      <div className="border-l-4 border-[#3347ff] pl-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="font-semibold text-[#3347ff]">Mis en avant</span>
          <span>-</span>
          <InlineText as="span" blockId={blockId} editing={editing} field="event.date" path={[...pathRoot, "date"]} value={`${event.date} @ ${event.time}`} />
        </div>
        <a href={event.href} onClick={(clickEvent) => handleBuilderLinkClick(clickEvent, event.href, editing)} className="mt-4 block font-heading text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-slate-950 transition-colors hover:text-[#3347ff]">
          <InlineText as="span" blockId={blockId} editing={editing} field="event.title" multiline path={[...pathRoot, "title"]} value={event.title} />
        </a>
        {"location" in event && event.location ? (
          <InlineText as="p" blockId={blockId} className="mt-5 text-[0.98rem] leading-6 text-slate-500" editing={editing} field="event.location" multiline path={[...pathRoot, "location"]} value={event.location} />
        ) : null}
        <InlineText as="p" blockId={blockId} className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-slate-700" editing={editing} field="event.summary" multiline path={[...pathRoot, "summary"]} value={event.summary} />
      </div>

      <a href={event.href} onClick={(clickEvent) => handleBuilderLinkClick(clickEvent, event.href, editing)} className="block overflow-hidden rounded-[2px] bg-slate-100">
        <img src={event.image} alt={event.title} className="aspect-[1.32] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" loading="lazy" decoding="async" />
      </a>
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
        variant === "light" && "bg-white text-[#152036] hover:bg-white/90",
        variant === "solid" && "bg-[#152036] text-white hover:bg-[#1d2a42]",
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
      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white text-[#152036] shadow-[0_10px_24px_rgba(21,32,54,0.08)]">
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
