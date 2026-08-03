import {
  aboutApproach,
  aboutBoardMembers,
  aboutExecutiveCommittee,
  aboutPresidentMessage,
  commitments,
  contact,
  detailedFunctionalExpertise,
  events,
  homeProcessSteps,
  homeServices,
  leaders,
  programConsultants,
  programContextHighlights,
  programEvents,
  programEventGallery,
  programObjectives,
  programPartners,
  programResults,
  socialCommitments,
  values,
} from "@/lib/site-data"

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
