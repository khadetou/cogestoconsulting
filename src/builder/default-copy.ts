import {
  aboutApproach,
  aboutBoardMembers,
  aboutExecutiveCommittee,
  aboutPresidentMessage,
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
