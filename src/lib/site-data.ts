export type NavItem = {
  label: string
  href: string
  description?: string
}

export type SiteNavLink = {
  children?: Array<SiteNavLink>
  description: string
  href: string
  label: string
}

export type SiteNavSection = {
  description?: string
  href?: string
  links: Array<SiteNavLink>
  title: string
}

export type SiteNavCard = {
  cta: string
  eyebrow: string
  href: string
  text: string
  title: string
}

export type SiteNavItem = NavItem & {
  card?: SiteNavCard
  menuTitle?: string
  sections?: Array<SiteNavSection>
}

export const contact = {
  address:
    "Immeuble Saliou Ndione, 2ème étage, Fenêtre Mermoz, Route de la Corniche Ouest, Dakar",
  email: "infos@cogestoconsulting.com",
  phone: "+221 33 868 43 11",
  mapLink:
    "https://www.google.com/maps/dir/14.761984,-17.4522368/cogesto/@14.7367149,-17.5092327,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0xec173d1b485ff4b:0x44fcc59579727a61!2m2!1d-17.4872972!2d14.7092585?entry=ttu",
}

export const navItems: Array<NavItem> = [
  { href: "/", label: "Accueil" },
  {
    href: "/about",
    label: "A propos",
    description: "Mission, valeurs, équipe dirigeante et engagements.",
  },
  {
    href: "/expertises",
    label: "Nos expertises",
    description: "Expertises fonctionnelles et sectorielles.",
  },
  {
    href: "/business-linkage-program",
    label: "Programmes",
    description: "Accompagnement PME, Oil & Gas, marché et financement.",
  },
  {
    href: "/business-linkage-program/parcours-entrepreneur",
    label: "Parcours de l’entrepreneur",
    description: "Parcours d’accompagnement pour renforcer la posture entrepreneuriale.",
  },
  {
    href: "/expertises#formation",
    label: "Formation",
    description: "Formation, séminaires, coaching et renforcement de capacités.",
  },
  { href: "/events", label: "Évènements" },
  { href: "/contact", label: "Contact" },
]

export const siteMenuItems: Array<SiteNavItem> = [
  { href: "/", label: "Accueil" },
  {
    card: {
      cta: "Découvrir le cabinet",
      eyebrow: "À propos",
      href: "/about",
      text: "Mission, valeurs, équipe dirigeante et engagements : les fondamentaux du cabinet Cogesto Consulting.",
      title: "Un cabinet engagé pour la performance, le capital humain et la création de valeur.",
    },
    description: "Mission, valeurs, équipe dirigeante et engagements du cabinet.",
    href: "/about",
    label: "A propos",
    sections: [
      {
        title: "A propos",
        links: [
          {
            description: "La mission du cabinet et sa proposition de valeur.",
            href: "/about#mission",
            label: "Notre mission",
          },
          {
            description: "Créativité, respect, engagement, éthique et responsabilité.",
            href: "/about#valeurs",
            label: "Nos valeurs",
          },
          {
            description: "Gouvernance, conseil d’administration et comité exécutif.",
            href: "/about#equipe",
            label: "Notre equipe",
          },
          {
            description: "Intégrité, confidentialité, anti-corruption et engagements sociaux.",
            href: "/about#engagements",
            label: "Nos engagements",
          },
        ],
      },
    ],
  },
  {
    card: {
      cta: "Voir les expertises",
      eyebrow: "Nos expertises",
      href: "/expertises",
      text: "Des expertises fonctionnelles et sectorielles pour accompagner les organisations sur leurs enjeux clés.",
      title: "Une offre structurée entre conseil fonctionnel, expertise sectorielle et performance opérationnelle.",
    },
    description: "Expertises fonctionnelles et sectorielles du cabinet.",
    href: "/expertises",
    label: "Nos expertises",
    sections: [
      {
        title: "Nos expertises",
        links: [
          {
            description: "Conseil, organisation, capital humain, performance et finance.",
            href: "/expertises#fonctionnelles",
            label: "Expertises fonctionnelles",
          },
          {
            description: "Secteurs d’intervention et connaissance des marchés.",
            href: "/expertises#sectorielles",
            label: "Expertises sectorielles",
          },
        ],
      },
    ],
  },
  {
    card: {
      cta: "Découvrir le programme",
      eyebrow: "Programmes",
      href: "/business-linkage-program",
      text: "Le programme accompagne la croissance des entreprises du pétrole et du gaz grâce à l’assistance technique et à la formation.",
      title: "Contexte, partenaires, objectifs, résultats et experts mobilisés autour du BLP.",
    },
    description: "Programmes d’accompagnement et dispositifs COGESTO.",
    href: "/business-linkage-program",
    label: "Programmes",
    menuTitle: "Programmes",
    sections: [
      {
        description: "Page principale du Business Linkage Program.",
        href: "/business-linkage-program",
        title: "Business Linkage Program",
        links: [
          {
            description: "Origine, enjeux et contenu local dans l’Oil & Gas.",
            href: "/business-linkage-program#contexte",
            label: "Contexte du BLP",
          },
          {
            description: "Institutions et partenaires mobilisés autour du dispositif.",
            href: "/business-linkage-program#partenaires",
            label: "Partenaires du BLP",
          },
          {
            description: "Objectifs opérationnels et résultats attendus pour les PME.",
            href: "/business-linkage-program#objectifs",
            label: "Objectif du BLP",
          },
          {
            description: "Consultants, experts et accompagnateurs mobilisés.",
            href: "/business-linkage-program#consultants",
            label: "Nos consultants BLP",
          },
        ],
      },
      {
        description: "Accompagnement à la structuration de projets verts et durables.",
        href: "/business-linkage-program/finance-verte-durable",
        links: [],
        title: "Finance verte ou durable",
      },
    ],
  },
  {
    description: "Parcours d’accompagnement pour renforcer la posture entrepreneuriale.",
    href: "/business-linkage-program/parcours-entrepreneur",
    label: "Parcours de l’entrepreneur",
  },
  {
    description: "Formation, séminaires, coaching et renforcement de capacités.",
    href: "/expertises#formation",
    label: "Formation",
  },
  { href: "/events", label: "Évènements" },
  { href: "/contact", label: "Contact" },
]

export const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "A propos" },
  { href: "/expertises", label: "Nos expertises" },
  { href: "/expertises#formation", label: "Formation" },
  { href: "/business-linkage-program", label: "Programmes" },
  { href: "/business-linkage-program/finance-verte-durable", label: "Finance verte ou durable" },
  { href: "/business-linkage-program/parcours-entrepreneur", label: "Parcours de l’entrepreneur" },
  { href: "/events", label: "Évènements" },
  { href: "/contact", label: "Contact" },
]

export const socialLinks = [
  { href: "https://www.facebook.com/cogesto/", icon: "ri:facebook-fill", label: "Facebook" },
  { href: "https://instagram.com/cogestoconsulting1?igshid=MzRlODBiNWFlZA==", icon: "ri:instagram-line", label: "Instagram" },
  { href: "https://www.linkedin.com/company/cogesto-consulting/", icon: "ri:linkedin-fill", label: "LinkedIn" },
  { href: "https://www.youtube.com/channel/UCT7Hd5sd14TuRsSTCoK41_Q/videos", icon: "ri:youtube-fill", label: "YouTube" },
]

export const metrics = [
  { icon: "lucide:building-2", label: "Bureaux", value: "4" },
  { icon: "lucide:globe-2", label: "Pays de présence", value: "3" },
  { icon: "lucide:graduation-cap", label: "personnes formées", value: "+1840" },
  { icon: "lucide:briefcase-business", label: "Années d’expérience cumulée", value: "14+" },
]

export const presence = [
  { country: "Maroc", since: "Depuis 2013" },
  { country: "Sénégal", since: "Depuis 2018" },
  { country: "Canada", since: "Depuis 2022" },
]

export const accreditations = [
  { alt: "Accréditation Cogesto 1", src: "/media/cogesto/references/logo1.png" },
  { alt: "Accréditation Cogesto 2", src: "/media/cogesto/references/logo12.png" },
  { alt: "Accréditation Cogesto 3", src: "/media/cogesto/references/logo29.png" },
]

export const referenceLogos = [
  { alt: "DKT International", src: "/media/cogesto/references/logo1.png" },
  { alt: "UBA", src: "/media/cogesto/references/logo29.png" },
  { alt: "REMA Sénégal", src: "/media/cogesto/references/logo12.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo28.png" },
  { alt: "Petrodis", src: "/media/cogesto/references/logo5-1.png" },
  { alt: "Mécafé", src: "/media/cogesto/references/logo22.png" },
  { alt: "Mardis", src: "/media/cogesto/references/logo27.png" },
  { alt: "OSAMA SA", src: "/media/cogesto/references/logo3.png" },
  { alt: "La Sénégalaise de l’Automobile", src: "/media/cogesto/references/logo2.png" },
  { alt: "Medidis Groupe", src: "/media/cogesto/references/logo26.png" },
  { alt: "Finaliance Audit & Conseil", src: "/media/cogesto/references/logo25.png" },
  { alt: "M&P", src: "/media/cogesto/references/logo24.png" },
  { alt: "Licorne Group", src: "/media/cogesto/references/logo23.png" },
  { alt: "Clinique Dar Salam", src: "/media/cogesto/references/logo21.png" },
  { alt: "Afrique Cables", src: "/media/cogesto/references/logo20.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo19.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo18.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo17.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo16.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo15.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo14.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo13.png" },
  { alt: "Globex Sénégal S.A", src: "/media/cogesto/references/logo11.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo10.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo9.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo8.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo7.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo6.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo5.png" },
  { alt: "Référence Cogesto", src: "/media/cogesto/references/logo4.png" },
]

export const partnerRows = [
  referenceLogos.slice(0, 8).map((partner) => ({
    ...partner,
    widthClass: "w-[156px] xl:w-[166px] 2xl:w-[176px]",
  })),
  referenceLogos.slice(8, 16).map((partner) => ({
    ...partner,
    widthClass: "w-[156px] xl:w-[166px] 2xl:w-[176px]",
  })),
  referenceLogos.slice(16, 24).map((partner) => ({
    ...partner,
    widthClass: "w-[156px] xl:w-[166px] 2xl:w-[176px]",
  })),
  referenceLogos.slice(24).map((partner) => ({
    ...partner,
    widthClass: "w-[156px] xl:w-[166px] 2xl:w-[176px]",
  })),
]

export const functionalExpertise = [
  {
    icon: "solar:target-bold-duotone",
    image: "/media/cogesto/services/concept-cible-strategie-entrepreneur-demarrage-entreprise-1-scaled.jpg",
    title: "Stratégie d’entreprises",
    summary:
      "Diagnostic stratégique, formulation de stratégies de croissance, cadrage de plans stratégiques et développement de l’entreprise.",
  },
  {
    icon: "solar:users-group-rounded-bold-duotone",
    image: "/media/cogesto/services/Design-sans-titre-25.jpg",
    title: "Organisation et Capital Humain",
    summary:
      "Diagnostic organisationnel, optimisation des structures, cartographie des processus et développement du capital humain.",
  },
  {
    icon: "solar:chart-2-bold-duotone",
    image: "/media/cogesto/services/Design-sans-titre-23.jpg",
    title: "Management de la performance",
    summary:
      "Pilotage, processus budgétaires, tableaux de bord, MBO et dispositifs de suivi pour mieux exécuter la stratégie.",
  },
  {
    icon: "solar:wallet-money-bold-duotone",
    image: "/media/cogesto/services/Design-sans-titre-21-3.jpg",
    title: "Conseil financier et ingénierie financière",
    summary:
      "Ingénierie financière, structuration des investissements, conseil aux décisions et accompagnement des projets structurants.",
  },
]

export const homeServices = functionalExpertise.map((item, index) => ({
  description: item.summary,
  featured: index === 0,
  imageAlt: item.title,
  imagePosition: index === 0 ? "center 82%" : index === 1 ? "center 42%" : index === 2 ? "center 65%" : "center 38%",
  imageSrc: item.image,
  tag: "Fonctionnelle",
  title: item.title,
}))

export const homeProcessSteps = [
  {
    active: false,
    description: "",
    title: "Mener une analyse sectorielle pointue fondée sur des benchmarks ciblés",
  },
  {
    active: false,
    description: "",
    title: "Réaliser un diagnostic approfondi de l’organisme, de ses enjeux et de ses besoins",
  },
  {
    active: true,
    description:
      "Le cabinet privilégie des outils pratiques, adaptés au contexte de la mission, avec un accompagnement personnalisé et interactif qui transforme les recommandations en actions concrètes.",
    title: "Déployer des outils adaptés et un accompagnement personnalisé orienté résultats",
  },
  {
    active: false,
    description: "",
    title: "Favoriser le transfert de compétences et l’appropriation durable par les équipes",
  },
]

export const extendedExpertise = [
  "Cartographie des processus et revue des procédures internes",
  "Politiques RH, rémunération et fiches de poste",
  "Gouvernance, cartographie des risques et contrôle interne",
  "Transformation structurelle et alignement des organisations",
  "Formation, séminaires, coaching et renforcement de capacités",
  "Conseil à l’investissement et appui à l’entrepreneuriat",
]

export const detailedFunctionalExpertise = [
  {
    title: "Stratégie d’entreprises",
    enjeux: [
      "Un monde de plus en plus globalisé.",
      "Un environnement marqué par des mutations profondes et rapides.",
      "L’apparition de nouveaux risques et une révolution numérique conduisant à la digitalisation de l’économie.",
      "La nécessité de réinventer sans cesse le business model pour assurer le développement et pérenniser les activités.",
    ],
    savoirFaire: [
      "Diagnostic stratégique",
      "Formulation de stratégie de croissance",
      "Cadrage, élaboration et déclinaison de plans stratégiques",
      "Stratégie de développement et d’internationalisation de l’entreprise",
      "Études sectorielles",
    ],
    atouts: [
      "Retour d’expérience dans divers secteurs d’activités.",
      "Missions réalisées en agro-industrie, immobilier, BTP, matériaux de construction, équipements automobiles, fonderie, sidérurgie, industrie, services, transport, électricité et électromécanique.",
    ],
  },
  {
    title: "Organisation et Capital Humain",
    enjeux: [
      "La performance et la compétitivité sont des enjeux majeurs pour les entreprises.",
      "La performance opérationnelle et managériale devient un facteur clé de succès et le socle du développement durable.",
      "Les organisations les plus performantes disposent d’une organisation agile et donnent une priorité au développement du capital humain.",
    ],
    savoirFaire: [
      "Diagnostic organisationnel et opérationnel",
      "Optimisation des organisations",
      "Élaboration de cartographie des processus",
      "Revue des procédures internes",
      "Alignement d’organisation à la stratégie d’entreprise",
      "Élaboration de manuels de procédures de gestion",
      "Audit social",
      "Rédaction de politiques et de référentiels RH",
      "Élaboration de politiques de rémunération, GPEC et fiches de postes",
    ],
    atouts: [
      "Un retour d’expérience porté par des experts ayant mené plusieurs missions en audit organisationnel et opérationnel.",
    ],
  },
  {
    title: "Gouvernance et Gestion des risques",
    enjeux: [
      "Face à l’émergence de nouveaux risques, la mise en place d’une gouvernance et d’un dispositif de prévention et de gestion des risques devient une priorité pour les dirigeants.",
      "Disposer d’une bonne gouvernance et d’un système consolidé de gestion des risques devient un enjeu stratégique.",
    ],
    savoirFaire: [
      "Accompagnement à la mise en place de gouvernance d’entreprise",
      "Rédaction des normes et procédures",
      "Élaboration de la cartographie des risques",
      "Conception et déploiement de dispositifs de contrôle interne",
      "Revue et optimisation des processus de gestion des risques",
    ],
    atouts: [
      "Expertise et connaissance des métiers",
      "Maîtrise des risques et contraintes spécifiques",
      "Capacité à construire une équipe et des compétences sur mesure",
      "Mode d’intervention collaboratif fondé sur la participation des équipes et le transfert de compétences",
    ],
  },
  {
    title: "Management de la performance",
    enjeux: [
      "Un environnement plus complexe et très concurrentiel.",
      "Un contexte de ralentissement de l’économie.",
      "Une forte érosion des marges et l’émergence de nouveaux business models fondés sur le low-cost.",
      "Un besoin d’anticipation pour faire face aux nouveaux enjeux et pérenniser l’entreprise.",
    ],
    savoirFaire: [
      "Assistance à l’opérationnalisation de plans stratégiques",
      "Conception et élaboration du processus budgétaire",
      "Déclinaison et évaluation du système budgétaire",
      "Analyse financière de portefeuilles d’activités",
      "Formalisation de référentiel budgétaire interne",
      "Mise en œuvre d’un Management par Objectif",
      "Conception et mise en place de tableaux de bord de gestion et opérationnels",
      "Formalisation et déclinaison des critères de performance",
      "Optimisation de la fonction contrôle de gestion et pilotage",
      "Pilotage des coûts, rentabilité et comptabilité analytique",
      "Évaluation et amélioration de système de comptabilité analytique",
    ],
    atouts: [
      "Expérience avérée dans le management de la performance.",
      "Missions de conception et d’opérationnalisation de processus budgétaires dans l’industrie, les services, les TIC, la santé, l’immobilier et le BTP.",
      "Participation à des projets d’implémentation de systèmes d’informations de gestion.",
    ],
  },
  {
    title: "Transformations structurelles",
    enjeux: [
      "Globalisation, agilité, résilience, pression concurrentielle, révolution numérique, économie d’innovation et ubérisation transforment le fonctionnement des organisations.",
      "Les entreprises doivent aligner leurs systèmes d’information à leur stratégie et disposer de compétences clés pour conduire les projets structurants.",
    ],
    savoirFaire: [
      "Adaptation et transformation de l’organisation",
      "Redéfinition et valorisation du capital numérique",
      "Conduite du changement et transformation culturelle",
      "Transformation des systèmes d’information et digitalisation de l’entreprise",
      "Restructuration d’entreprise",
      "Assistance à la maîtrise d’ouvrage dans le cadre de projets structurants",
    ],
    atouts: [
      "Démarche orientée performance.",
      "Équipes disposant d’une expérience avérée dans la fonction financière et le métier du conseil.",
      "Intervention collaborative avec des équipes projets mixtes composées de consultants et de collaborateurs internes.",
    ],
  },
  {
    title: "Digitalisation",
    enjeux: [
      "La révolution numérique transforme les modèles économiques, les parcours clients et les modes de pilotage des organisations.",
      "Les entreprises doivent disposer de systèmes d’information cohérents, interconnectés et alignés avec leur stratégie.",
      "La digitalisation des processus, du reporting et de la relation client devient un levier majeur de productivité, de transparence et de compétitivité.",
    ],
    savoirFaire: [
      "Diagnostic de maturité digitale et des systèmes d’information",
      "Cartographie et digitalisation des processus métiers",
      "Définition de feuilles de route digitales",
      "Accompagnement à la mise en place d’outils de pilotage, CRM et reporting",
      "Assistance à la maîtrise d’ouvrage de projets digitaux",
      "Conduite du changement et appropriation des outils numériques",
    ],
    atouts: [
      "Approche pragmatique reliant stratégie, organisation, systèmes d’information et performance opérationnelle.",
      "Expérience dans l’accompagnement de projets de transformation digitale, de reporting et d’outils de gestion.",
    ],
  },
  {
    title: "Norme et Qualité",
    enjeux: [
      "Les exigences réglementaires, clients, bailleurs et partenaires imposent aux organisations des standards élevés de qualité, sécurité, environnement et conformité.",
      "La maîtrise des processus et des procédures devient indispensable pour sécuriser les opérations et renforcer la confiance des parties prenantes.",
      "Les normes qualité et QHSE constituent un levier d’accès aux marchés, de performance durable et d’amélioration continue.",
    ],
    savoirFaire: [
      "Diagnostic qualité, QHSE et conformité",
      "Mise en place et revue de manuels de procédures",
      "Cartographie des processus, risques et contrôles associés",
      "Accompagnement aux référentiels ISO 9001, ISO 14001 et ISO 45001",
      "Préparation aux audits internes et plans d’amélioration",
      "Formation et transfert de compétences sur les exigences normatives",
    ],
    atouts: [
      "Expertise en qualité, QHSE, contrôle interne et formalisation de référentiels de gestion.",
      "Méthode participative favorisant l’appropriation des normes par les équipes et la transformation des exigences en pratiques opérationnelles.",
    ],
  },
  {
    title: "Conseil à l’investissement et à l’entrepreneuriat",
    enjeux: ["Réussir une implantation et sécuriser les décisions d’investissement."],
    savoirFaire: [
      "Assistance et conseil à l’investissement et à l’entrepreneuriat",
      "Études de faisabilité",
      "Études de marché",
      "Évaluations et revues de projets",
    ],
    atouts: [
      "Compétences avérées et sérieuses références en conseil financier et évaluation de projets d’investissement.",
    ],
  },
  {
    title: "Formation, séminaires et Team building",
    enjeux: ["Renforcer les compétences managériales, techniques et organisationnelles des équipes."],
    savoirFaire: [
      "Finance, comptabilité, fiscalité et droit",
      "Management, gestion des ressources humaines, logistique, marketing et communication",
      "Stratégie, audit, contrôle de gestion et QHSE",
      "Qualité avec référentiels ISO 9001, ISO 14001 et ISO 45001",
    ],
    atouts: [
      "Transfert d’expérience d’experts seniors.",
      "Dispositifs de formation adaptés aux besoins des organisations.",
    ],
  },
  {
    title: "Appui aux fonctions supports des entreprises",
    enjeux: [
      "Compétitivité croissante.",
      "Nouvelles contraintes réglementaires.",
      "Exigences des investisseurs et des directions générales.",
      "Transformation des fonctions Finance, Contrôle de Gestion, SI et Capital Humain pour accroître leurs performances.",
    ],
    savoirFaire: [
      "Optimisation du processus d’arrêté et de synthèse",
      "Optimisation des systèmes de pilotage et de reporting",
      "Organisation de la fonction finance",
      "Pilotage des risques financiers et du contrôle interne",
      "Optimisation de la trésorerie",
      "Études financières et choix du financement des investissements",
      "Assistance dans les relations avec les organismes bancaires",
      "Accompagnement des Directeurs et responsables du Capital Humain",
      "Accompagnement dans le déploiement de chantiers de systèmes d’information",
    ],
    atouts: [
      "Démarche orientée performance.",
      "Équipes expérimentées dans la fonction financière et le métier du conseil.",
      "Fonctionnement collaboratif avec les équipes internes des organisations accompagnées.",
    ],
  },
  {
    title: "Conseil financier et ingénierie financière",
    enjeux: ["Structurer, financer et piloter les projets de croissance et d’investissement."],
    savoirFaire: [
      "Ingénierie financière",
      "Structuration des investissements",
      "Conseil aux décisions financières",
      "Accompagnement des projets structurants",
    ],
    atouts: [
      "Expérience en conseil financier, contrôle de gestion, structuration et appui aux fonctions financières.",
    ],
  },
]

export const extendedFunctionalExpertise = detailedFunctionalExpertise
  .filter((item) =>
    [
      "Transformations structurelles",
      "Conseil à l’investissement et à l’entrepreneuriat",
      "Formation, séminaires et Team building",
      "Appui aux fonctions supports des entreprises",
    ].includes(item.title),
  )
  .map((item) => ({
    items: item.savoirFaire.slice(0, 4),
    summary: item.enjeux.join(" "),
    title: item.title,
  }))

export const sectorExpertise = [
  "Industrie",
  "Agro-alimentaire / Agro business",
  "Oil & Gas",
  "Immobilier / BTP",
  "Construction métallique",
  "Automobile",
  "Énergie et électricité",
  "Mécanique générale",
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
  "ONG",
  "Agences publiques",
  "Organismes",
]

export const approach = [
  "Mener une analyse sectorielle pointue fondée sur des benchmarks ciblés.",
  "Réaliser un diagnostic approfondi de l’organisme, de ses enjeux et de ses besoins.",
  "Déployer des outils adaptés et un accompagnement personnalisé orienté résultats.",
  "Favoriser le transfert de compétences et l’appropriation durable par les équipes.",
]

export const values = ["Créativité", "Respect", "Engagement", "Éthique", "Responsabilité"]

export const valueCards = [
  {
    image: "/media/cogesto/references/values/value-2.png",
    summary: "Imaginer des réponses utiles, concrètes et adaptées aux réalités de chaque organisation.",
    title: "Créativité",
  },
  {
    image: "/media/cogesto/references/values/value-3.png",
    summary: "Construire des relations de confiance, fondées sur l’écoute, la considération et la transparence.",
    title: "Respect",
  },
  {
    image: "/media/cogesto/references/values/value-4.png",
    summary: "S’impliquer avec rigueur auprès des clients pour transformer les recommandations en résultats.",
    title: "Engagement",
  },
  {
    image: "/media/cogesto/references/values/value-5.png",
    summary: "Agir avec intégrité, confidentialité et responsabilité dans chaque mission confiée.",
    title: "Éthique",
  },
  {
    image: "/media/cogesto/references/values/value-6.png",
    summary: "Porter une démarche durable, inclusive et attentive aux impacts économiques, sociaux et environnementaux.",
    title: "Responsabilité",
  },
]

export const commitments = [
  "Préserver les intérêts des clients",
  "Préserver notre intégrité",
  "Garantir la confidentialité",
  "Adhérer à la charte anti-corruption.",
  "Favoriser le transfert de compétences",
]

const mameNgoneProfileTitle =
  "Avocate au barreau de l’Ontario (Canada) et Consultante, conseillère juridique senior"

const mameNgoneProfileParagraphs = [
  "Mame est Avocate au barreau de l’Ontario (Canada) et Consultante, conseillère juridique senior fournissant des services juridiques en Afrique subsaharienne.",
  "Elle a dirigé une équipe des Services bancaires et financiers dans un cabinet d’avocats au Sénégal pendant 10 ans et 3 mois.",
  "Apportant des années d'expérience de travail du Canada, des États-Unis et de l’Angleterre dans sa ville natale de Dakar, Mame travaille avec des investisseurs étrangers pour s'assurer qu'ils comprennent les exigences légales et les opportunités dans ce cadre de leurs transactions commerciales et corporatives.",
  "Elle supervise les diligences juridiques complexes dans le secteur des services financiers et la conformité des transactions aux règlementations communautaires.",
  "Mame aide ses clients à naviguer à travers les lois sur l'investissement au Sénégal et dans d'autres juridictions membres de l'OHADA. Elle intervient régulièrement dans le cadre de transactions transfrontalières dans ces juridictions.",
  "Elle a été détachée auprès de grands cabinets d'avocats à Londres, dont Dentons et d’autres grands cabinets d’avocats.",
  "Mame est une ancienne récipiendaire de la bourse « International Lawyers for Africa (ILFA) », grâce à laquelle elle a été détachée au cabinet Dentons à Londres en 2013.",
]

const mameNgoneExperience = [
  "​Chef d'équipe du département des services financiers, Mame a acquis une expérience précieuse dans le conseil sur les questions bancaires et financières, y compris une expérience dans l'industrie aéronautique, les prêts et garanties, les produits dérivés, les bons et les obligations, pour n'en citer que quelques-uns.",
]

export const leaders = [
  {
    image: "/media/cogesto/team/babacar-sow-4.png",
    name: "M. Babacar Sow",
    role: "Président du Groupe",
    summary:
      "Plus de 32 ans d’expérience en conseil, finance, développement international et direction générale, avec un parcours incluant PricewaterhouseCoopers.",
  },
  {
    image: "/media/cogesto/team/mme-codou-sow.png",
    name: "Codou Sow",
    role: "Directrice",
    summary:
      "CPA à Montréal, expert-comptable inscrit à l’ONECCA du Sénégal, avec plus de 27 ans d’expérience en audit, IFRS, finance et conseil aux USA, au Canada et en Afrique.",
  },
  {
    image: "/media/cogesto/team/mame-ngone-sow.png",
    name: "Mame Ngoné Sow",
    role: mameNgoneProfileTitle,
    summary: mameNgoneProfileParagraphs[0],
  },
  {
    image: "/media/cogesto/blp/consultants/equipe-cogesto-13.png",
    name: "M. Yankhouba Dianesy",
    role: "Expert financier et coach certifié",
    summary:
      "Consultant en finance, formateur et coach certifié, il accompagne les PME et startups sur l’entrepreneuriat, la structuration financière et l’accès au financement.",
  },
  {
    image: "/media/cogesto/blp/consultants/cheikh-ahmadou-bamba-badji.png",
    name: "M. Cheikh Ahmadou Bamba Badji",
    role: "Ingénieur pétrolier et expert en organisation",
    summary:
      "Ingénieur pétrolier, consultant QHSE et ESG, il coordonne des missions de conseil et d’accompagnement opérationnel, notamment dans l’Oil & Gas et le Business Linkage Program.",
  },
  {
    image: "/media/cogesto/blp/consultants/saodou-amadou-ba.png",
    imageScale: 1.62,
    name: "M. Saodou Amadou Ba",
    role: "Analyste financier et consultant en finance",
    summary:
      "Analyste financier, il intervient en ingénierie financière, évaluation d’entreprises, due diligence, plans d’affaires et structuration de dossiers de financement.",
  },
]

export const aboutPresidentMessage = [
  "Je suis ravi de m’exprimer aujourd’hui sur notre engagement à contribuer au développement de l’Afrique à travers la consultance et la formation.",
  "Chez Cogesto Consulting, nous sommes convaincus que l’Afrique regorge de potentialités et que son développement passe par sa capacité à favoriser l’émergence d’entreprises championnes fortement créatrices de valeur.",
  "Conscients que la plupart des entreprises africaines sont souvent confrontées à des problématiques majeures liées à leur faible niveau de productivité, leur sous-capitalisation, aux difficultés d’accès aux marchés et aux financements et au déficit de personnel qualifié, nous œuvrons pour contribuer de manière efficace à la performance durable des organisations.",
  "En tant qu’entreprise de conseil, nous avons toujours eu pour objectif d’apporter des solutions innovantes et adaptées aux défis auxquels nos clients sont confrontés, et notre présence en Afrique nous offre une opportunité unique de soutenir le développement économique et social du continent à travers la formation de talents locaux.",
  "Accompagnés par une équipe composée de professionnels hautement qualifiés et expérimentés qui partagent tous une passion commune pour l’excellence et l’impact positif, nous croyons fermement en la valeur de la collaboration et de l’échange de connaissances.",
  "En ma qualité de Président du Groupe Cogesto, je m’engage à soutenir le développement professionnel du capital humain et à créer un environnement propice à l’apprentissage et à l’innovation, tout en encourageant chacun à continuer à alimenter les forces par lesquelles nous construirons l’Afrique que nous voulons.",
]

export const aboutBoardMembers = [
  {
    image: "/media/cogesto/team/babacar-sow-4.png",
    name: "M. Babacar Sow",
    role: "Président Conseil d’Administration",
    summary:
      "Plus de 32 ans d’expérience, débutés en 1995 chez PricewaterhouseCoopers Maroc, puis prolongés comme Directeur du Développement International, Directeur Financier et Directeur Général.",
  },
  {
    image: "/media/cogesto/team/mme-codou-sow.png",
    name: "Codou Sow",
    role: "Directrice, Certified Public Accountant",
    summary:
      "Certified Public Accountant (CPA) à Montréal, expert-comptable inscrit à l’ONECCA du Sénégal, avec plus de 27 ans d’expérience avérée dans le conseil et la finance aux USA et au Canada, spécialiste audit et normes IFRS, titulaire d’un MBA en Finance Internationale.",
  },
  {
    image: "/media/cogesto/team/mame-ngone-sow.png",
    name: "Mame Ngoné Sow",
    role: mameNgoneProfileTitle,
    summary: mameNgoneProfileParagraphs[0],
  },
  {
    image: "/media/cogesto/blp/consultants/equipe-cogesto-13.png",
    name: "M. Yankhouba Dianesy",
    role: "Expert financier et coach certifié",
    summary:
      "Consultant en finance, formateur et coach certifié, il accompagne les PME et startups sur l’entrepreneuriat, la structuration financière et l’accès au financement.",
  },
  {
    image: "/media/cogesto/blp/consultants/cheikh-ahmadou-bamba-badji.png",
    name: "M. Cheikh Ahmadou Bamba Badji",
    role: "Ingénieur pétrolier et expert en organisation",
    summary:
      "Ingénieur pétrolier, consultant QHSE et ESG, il coordonne des missions de conseil et d’accompagnement opérationnel, notamment dans l’Oil & Gas et le Business Linkage Program.",
  },
  {
    image: "/media/cogesto/blp/consultants/saodou-amadou-ba.png",
    imageScale: 1.62,
    name: "M. Saodou Amadou Ba",
    role: "Analyste financier et consultant en finance",
    summary:
      "Analyste financier, il intervient en ingénierie financière, évaluation d’entreprises, due diligence, plans d’affaires et structuration de dossiers de financement.",
  },
]

export const aboutExecutiveCommittee = [
  {
    image: "/media/cogesto/team/babacar-sow-4.png",
    name: "M. Babacar Sow",
    role: "Président, expert en stratégie et finance",
    summary:
      "PDG avec plus de 32 ans d’expérience en conseil et en entreprise. Il a été successivement Manager chez PWC, Directeur du Développement International, Directeur Financier et Directeur Général dans des entreprises privées. Il est titulaire d’un Master en Comptabilité, Contrôle et Audit et en Diagnostic Économique des Entreprises.",
  },
  {
    image: "/media/cogesto/blp/consultants/amy-rose-konate-blp.png",
    name: "Amy Rose Konaté",
    role: "Vice-Présidente, experte senior en conduite du changement et organisation",
    summary:
      "Vice-Présidente, experte en développement de personnel et coach certifiée. Elle capitalise 30 ans d’expérience en conseil et en entreprise, avec des missions de conduite du changement auprès d’entreprises privées, publiques et d’institutions sous-régionales.",
  },
  {
    image: "/media/cogesto/blp/consultants/equipe-cogesto-12.png",
    name: "Coumba Diop Ndiaye",
    role: "Vice-Présidente, experte en développement du capital humain",
    summary:
      "Vice-Présidente, experte en RH et organisation. Elle capitalise 26 ans d’expérience, ancienne DRH de Neurotech, Matforce et Unilever Sénégal, certifiée en Responsabilité Sociétale des Entreprises et audit des processus RH.",
  },
  {
    image: "/media/cogesto/team/dr-amadou-ba.png",
    name: "Dr. Amadou Ba",
    role: "Vice-Président, expert senior en politiques publiques",
    summary:
      "Vice-Président, expert senior en politiques publiques et développement. Il capitalise 42 ans d’expérience en administration et formation, avec une expertise en aménagement du territoire, gestion urbaine, environnement, hygiène, qualité et sécurité.",
  },
  {
    image: "/media/cogesto/team/gilles-cloutier-card.png",
    name: "Dr. Gilles Cloutier",
    role: "Vice-Président Amérique du Nord",
    summary:
      "Diplômé de l’Université d’Oxford (M.A.) et du MIT (PhD), expert international et administrateur de sociétés avec plus de 47 ans d’expérience. Il a conseillé le FMI, la Banque mondiale, la SFI, le PNUD et plusieurs institutions régionales.",
  },
  {
    image: "/media/cogesto/team/aziz-chaib-card.jpeg",
    name: "Dr. Aziz Chaib",
    role: "Vice-Président Afrique du Nord - Moyen-Orient",
    summary:
      "Consultant en développement des affaires et formateur international, directeur fondateur de l’École Mérieux Oran. Auditeur ISO et Lean manufacturing, il accompagne des projets de formation industrielle, santé-environnement et développement en Afrique et aux Comores.",
  },
]

export const aboutApproach = [
  "Une analyse sectorielle pointue fondée sur des benchmarks ciblés afin de répondre de manière appropriée aux problématiques des grandes entreprises et PME.",
  "Un accompagnement personnalisé et interactif qui fait de notre cabinet une force de propositions et d’innovations.",
]

export const socialCommitments = [
  {
    date: "05-10-2023",
    href: "https://usercontent.one/wp/www.cogestoconsulting.com/wp-content/uploads/2023/11/Lettre-de_claration-politique-environnementale-5-Octobre-2023-vf.pdf?media=1699980106",
    title: "Lettre déclaration politique environnementale",
    summary:
      "Découvrez comment Cogesto Consulting s’engage à révolutionner son impact environnemental et social avec des actions concrètes. De la réduction de l’empreinte carbone à la promotion de l’égalité des chances, plongez dans notre déclaration d’engagement pour un avenir durable.",
  },
  {
    date: "05-10-2023",
    href: "https://usercontent.one/wp/www.cogestoconsulting.com/wp-content/uploads/2023/11/Lettre-declaration-Politique-RSE-5-Octobre-2023.pdf?media=1699980106",
    title: "Lettre déclaration Politique RSE",
    summary:
      "Cogesto Consulting redéfinit la responsabilité d’entreprise avec un engagement profond envers les employés, l’environnement, et l’éthique des affaires. Cette déclaration détaille notre dévouement à l’excellence, à l’intégrité et au bien-être communautaire.",
  },
]

export const programObjectives = [
  "Identifier les PME ciblées à fort potentiel.",
  "Assurer leur formation, renforcer leurs capacités et les accompagner.",
  "Développer leurs capacités entrepreneuriales et les orienter vers des partenariats et réseaux avec les grandes sociétés.",
  "Faciliter l’accès au financement des PME.",
  "Mettre en place un réseau de PME compétitives dont 40% dirigées par des femmes.",
  "Favoriser une meilleure intégration dans la chaîne de valeur de l’industrie pétrolière et gazière.",
]

export const programResults = [
  "80 solides PME seront identifiées dans le cadre de ce programme.",
  "60 PME ciblées seront sélectionnées pour bénéficier d’une formation sur les compétences de base.",
  "40 PME seront sélectionnées pour bénéficier d’assistance technique nécessaire aux PME à forts potentiels ciblées pour leur permettre d’avoir accès aux marchés et aux financements.",
  "Développement de partenariats commerciaux avec des entreprises du secteur pétrolier et gazier.",
  "Accès aux opportunités d’investissement dans le secteur Oil & Gaz.",
]

export const programContextHighlights = [
  "Une production pétrolière estimée à plus de 100 000 barils par jour en phase de plateau, soit environ 5 millions de tonnes par an.",
  "Une production de gaz naturel liquéfié estimée à plus de 2,5 millions de tonnes par an dès 2023 et pouvant atteindre 10 millions de tonnes par an à terme.",
  "Des réserves de gaz estimées à 450 milliards de mètres cubes pour le gisement en eaux profondes de Grand Tortue/Ahmeyim, avec une zone pouvant contenir jusqu’à 2 800 milliards de mètres cubes de gaz naturel.",
  "La loi 2019-04 relative au contenu local dans le secteur des hydrocarbures vise l’accroissement de la valeur localement ajoutée.",
  "Le programme apporte un appui technique aux PME sénégalaises pour renforcer compétences, technicité, normes QHSE, infrastructures et accès au financement.",
]

export const programPartners = [
  {
    description: "Initiative structurante pour l’intégration des PME locales dans les chaînes de valeur.",
    logo: "/media/cogesto/blp/design-32.jpg",
    name: "Invest In Africa",
  },
  {
    description: "Appui technique et financement du dispositif pour accélérer la montée en capacité des entreprises.",
    logo: "/media/cogesto/blp/design-30.jpg",
    name: "Banque Africaine de Développement",
  },
  {
    description: "Soutien au partenariat africain pour renforcer l’impact économique du programme.",
    logo: "/media/cogesto/blp/design-31.jpg",
    name: "Fonds pour les Partenariats Africains (FAPA)",
  },
]

export const programKeyFigures = [
  { label: "barils/jour", value: "+100 000", detail: "production pétrolière estimée en phase de plateau" },
  { label: "tonnes/an", value: "2,5 M", detail: "production de gaz naturel liquéfié estimée dès 2023" },
  { label: "milliards m³", value: "450", detail: "réserves de gaz estimées sur Grand Tortue/Ahmeyim" },
  { label: "PME identifiées", value: "80", detail: "entreprises à fort potentiel ciblées par le programme" },
]

export const businessLinkageOffers = [
  {
    description:
      "Structurer les projets à impact, préparer les dossiers de financement et aligner les entreprises avec les exigences ESG des partenaires.",
    href: "/business-linkage-program/finance-verte-durable",
    image: "/media/cogesto/ai/business-linkage/finance-verte-durable.png",
    label: "Finance verte ou durable",
  },
  {
    description:
      "PACTES accompagne les jeunes, femmes, startups et PME dans la création, la structuration, l’accès au marché et la mobilisation de financements.",
    href: "/business-linkage-program/parcours-entrepreneur",
    image: "/media/cogesto/ai/business-linkage/parcours-entrepreneur.png",
    label: "PACTES - Parcours de l’entrepreneur",
  },
]

export const businessLinkageOfferPages = {
  "finance-verte-durable": {
    eyebrow: "Business Linkage Program",
    heroImage: "/media/cogesto/ai/business-linkage/finance-verte-durable.png",
    intro:
      "Cogesto Consulting accompagne les entrepreneurs et PME dans la structuration de projets compatibles avec les standards de finance verte, durable et à impact.",
    lead:
      "L’objectif est de transformer une ambition environnementale ou sociale en projet finançable, documenté et crédible auprès des banques, fonds, institutions et partenaires techniques.",
    slug: "finance-verte-durable",
    title: "Finance verte ou durable",
    outcomes: [
      "Clarification du modèle économique et de l’impact attendu.",
      "Structuration du dossier de financement et des hypothèses clés.",
      "Préparation des indicateurs ESG, risques et mesures d’atténuation.",
      "Accompagnement à la présentation du projet auprès des partenaires.",
    ],
    steps: [
      "Diagnostic du projet, du besoin de financement et du niveau de maturité.",
      "Alignement avec les critères de finance durable, climat, inclusion ou transition.",
      "Construction du plan d’action, du budget, des indicateurs et du récit investisseur.",
      "Préparation des supports de décision et coaching avant échanges financiers.",
    ],
    target:
      "Entrepreneurs, PME, organisations et porteurs de projets engagés dans l’énergie, l’agriculture, l’économie circulaire, les services essentiels ou la transition durable.",
  },
  "parcours-entrepreneur": {
    eyebrow: "PACTES",
    heroImage: "/media/cogesto/ai/business-linkage/parcours-entrepreneur.png",
    intro:
      "Le Parcours de l’entrepreneur accompagne les jeunes et femmes entrepreneurs sénégalais dans la conceptualisation, la structuration, le développement et la pérennisation de leurs entreprises.",
    lead:
      "Le programme PACTES se déploie sur une période de trois à six mois, selon le niveau de maturité de la startup ou de la PME, avec des ateliers, formations, coaching, mentorat, outils digitaux et appui à l’accès aux marchés et aux financements.",
    slug: "parcours-entrepreneur",
    title: "Parcours de l’entrepreneur",
    outcomes: [
      "100 entreprises formalisées et opérationnelles par an.",
      "150 jeunes et femmes entrepreneurs formés par an.",
      "100 porteurs de projets disposant d’un business-plan bancable.",
      "50 PME utilisant un outil digital de vente, CRM ou tunnel de vente.",
      "30 entreprises structurées.",
      "50 entreprises bénéficiant d’un financement auprès d’institutions financières ou de bailleurs.",
    ],
    steps: [
      "Idéation et formalisation de l’entreprise : créativité, proposition de valeur, business model, capacités managériales, formalisation, plan d’affaires, pitch, coaching et mentorat.",
      "Organisation et structuration de l’entreprise : lancement commercial, gestion des PME, organisation interne, stratégie digitale, accès au marché et accès au financement.",
      "Accélération de la croissance et de la transformation : diagnostic organisationnel, structuration avancée, stratégie marketing et commerciale, réseautage, accélération commerciale, transformation digitale et financements structurants.",
      "Méthodologie inspirée de GERME, enrichie par des outils numériques et d’intelligence artificielle pour les études de marché, les projections financières et la préparation des décisions.",
    ],
    target:
      "Jeunes, femmes, entrepreneurs et porteurs de projets innovants, startups en lancement ou en croissance, et PME actives dans des secteurs stratégiques tels que l’agriculture, l’artisanat, la transformation agroalimentaire, les services numériques et la transition énergétique.",
  },
} as const

export const parcoursEntrepreneurContent = {
  menu: [
    { href: "#contexte", label: "Contexte" },
    { href: "#justification", label: "Justification" },
    { href: "#objectifs", label: "Objectifs" },
    { href: "#resultats", label: "Résultats attendus" },
    { href: "#cibles", label: "Cibles" },
    { href: "#programme", label: "Programme & services" },
  ],
  context: [
    "Le Sénégal entre dans une phase historique avec une croissance projetée à 8,8% en 2025, portée notamment par le démarrage de l’exploitation des champs pétroliers et gaziers de Sangomar et GTA.",
    "Cette dynamique confirme la bonne tenue de l’économie sénégalaise, qui a enregistré une croissance annuelle de 6,9%, contre 4,3% en 2023, marquant un rebond significatif après plusieurs années de croissance soutenue.",
    "L’économie nationale reste particulièrement portée par les TPE et PME, qui représentent près de 99,8% des entreprises et contribuent fortement à la création de richesse et d’emplois, malgré des défis persistants de productivité, de capitalisation, d’accès aux marchés, d’accès au financement et de qualification.",
    "La Vision Sénégal 2050 met l’accent sur la transformation structurelle de l’économie, le capital humain, l’inclusion, la transition numérique et l’intégration de l’intelligence artificielle dans l’entrepreneuriat.",
    "Dans ce contexte, l’entrepreneuriat devient à la fois une nécessité économique et une opportunité stratégique pour créer des emplois, réduire la pauvreté et renforcer la compétitivité du pays.",
  ],
  justification: [
    "Le Sénégal ambitionne de bâtir une économie prospère, solidaire, résiliente et inclusive, où l’emploi constitue un levier central de croissance et de cohésion sociale.",
    "Plusieurs contraintes limitent encore la pleine réalisation de ce potentiel : chômage structurel, disparités territoriales, accompagnement insuffisant à l’auto-emploi, accès difficile aux financements, barrières d’accès aux marchés et inadéquation entre formation et besoins réels du marché.",
    "La promotion de l’auto-emploi des jeunes et des femmes, la valorisation des compétences et la création de conditions favorables à l’investissement privé constituent des réponses prioritaires.",
    "Le Parcours de l’Entrepreneur propose une réponse structurée à ces enjeux en accompagnant les jeunes et les femmes dans la création, la formalisation, la structuration, la croissance et le financement de leurs entreprises.",
  ],
  objective:
    "Faciliter le développement des jeunes et femmes entrepreneurs sénégalais à travers un parcours d’accompagnement innovant, structuré et adapté à leur niveau de maturité.",
  objectives: [
    "Accompagner les entrepreneurs dans la conceptualisation et la structuration de leurs projets.",
    "Renforcer les capacités des jeunes et femmes entrepreneurs.",
    "Aider les entrepreneurs à structurer et à pérenniser leurs activités.",
    "Faciliter l’accès et le développement de marchés pour les entrepreneurs.",
    "Accompagner la croissance des startups et MTPME.",
    "Faciliter aux entrepreneurs l’accès au financement.",
    "Améliorer la compétitivité des entrepreneurs et startups.",
  ],
  results: [
    "100 entreprises formalisées et opérationnelles par an.",
    "150 jeunes et femmes entrepreneurs formés par an.",
    "100 porteurs de projets disposant de business-plans bancables.",
    "50 PME utilisant un outil digital de vente, CRM ou tunnel de vente.",
    "30 entreprises structurées.",
    "50 entreprises bénéficiant d’un financement auprès d’institutions financières, SFD, banques ou bailleurs.",
  ],
  targets: [
    "Jeunes entrepreneurs.",
    "Femmes entrepreneures.",
    "Entrepreneurs et porteurs de projets innovants.",
    "Startups en phase de lancement ou de croissance.",
    "PME en quête d’optimisation ou d’expansion.",
    "Activités dans les secteurs stratégiques : agriculture, artisanat, transformation agroalimentaire, services numériques et transition énergétique.",
  ],
  phases: [
    {
      acronym: "IFE",
      title: "Idéation et Formalisation de l’Entreprise",
      image: "/media/cogesto/ai/business-linkage/phases/pactes-ife.png",
      description:
        "Clarifier l’idée de projet, construire le business model et formuler la proposition de valeur, accompagner la formalisation de l’entreprise, renforcer les capacités managériales, produire un plan bancable, préparer le pitch et accompagner le lancement.",
      summaryPoints: [
        "Clarifier l’idée de projet.",
        "Construire le business model et formuler la proposition de valeur.",
        "Accompagner la formalisation de l’entreprise.",
        "Renforcer les capacités managériales.",
        "Produire un plan bancable et préparer le pitch.",
        "Accompagner le lancement.",
      ],
      services: [
        "Atelier d’idéation, de créativité et de prototypage.",
        "Atelier de formulation de proposition de valeur.",
        "Renforcement de capacités managériales.",
        "Accompagnement à la formalisation.",
        "Assistance à l’élaboration de plan d’affaires.",
        "Pitch, coaching et mentorat.",
      ],
    },
    {
      acronym: "OSE",
      title: "Organisation et Structuration de l’Entreprise",
      image: "/media/cogesto/ai/business-linkage/phases/pactes-ose.png",
      description:
        "Accompagner le lancement, organiser l’entreprise, structurer les responsabilités, digitaliser la communication et les ventes, renforcer les compétences commerciales et préparer l’accès au marché et au financement.",
      summaryPoints: [
        "Organiser et structurer l’entreprise.",
        "Renforcer les compétences managériales et commerciales.",
        "Digitaliser l’entreprise.",
        "Préparer l’accès au marché et au financement.",
      ],
      services: [
        "Accompagnement au lancement et à la mise sur le marché.",
        "Renforcement de capacités en gestion, vente, marketing et communication.",
        "Structuration de l’organisation de l’entreprise.",
        "Élaboration et opérationnalisation de la stratégie digitale.",
        "Accès au marché et accélération commerciale.",
        "Accès au financement et montage de dossiers bancables.",
      ],
    },
    {
      acronym: "ACTE",
      title: "Accélération de la Croissance et de la Transformation des Entreprises",
      image: "/media/cogesto/ai/business-linkage/phases/pactes-acte.png",
      description:
        "Identifier les leviers de croissance, renforcer la gouvernance, structurer la transformation, accélérer la performance commerciale, digitaliser les processus et mobiliser des financements structurants.",
      summaryPoints: [
        "Renforcer la gouvernance.",
        "Structurer la transformation.",
        "Identifier les leviers de croissance.",
        "Accélérer la performance commerciale.",
        "Digitaliser les processus.",
        "Mobiliser des financements structurants.",
      ],
      services: [
        "Diagnostic organisationnel, financier, commercial et opérationnel.",
        "Structuration et mise à niveau avancée.",
        "Élaboration de stratégie marketing et commerciale.",
        "Réseautage et développement d’opportunités.",
        "Accélération commerciale et préparation aux appels d’offres.",
        "Transformation digitale et accès aux financements structurants.",
      ],
    },
  ],
  methodology:
    "Le parcours s’inspire de la méthodologie GERME, développée par le Bureau International du Travail, et l’enrichit par l’intégration d’outils numériques et d’intelligence artificielle pour faciliter les études de marché, les projections financières et la préparation de décisions entrepreneuriales.",
}

export const programExperts = [
  "Experte en organisation et capital humain",
  "Experte en organisation et finance",
  "Expert en management de projet et renforcement de compétences",
  "Expert senior en logistique et supply chain",
  "Expert QHSE et sécurité",
  "Consultante senior et juriste corporate",
  "Consultant senior en organisation et fiscalité",
  "Expert senior en structuration de financement",
]

export const programConsultants = [
  {
    image: "/media/cogesto/blp/consultants/babacar-sow-blp.png",
    name: "M. Babacar Sow",
    role: "Engaging Partner - Senior Advisor en stratégie",
    summary:
      "Président de Cogesto Consulting SAS, plus de 32 ans d’expérience dans les métiers du conseil et de l’administration des entreprises.",
  },
  {
    image: "/media/cogesto/blp/consultants/amy-rose-konate-blp.png",
    name: "Amy Rose Konaté",
    role: "Directrice de mission adjointe - développement personnel et coaching",
    summary:
      "30 ans d’expérience professionnelle, consultante en organisation stratégique et conduite du changement, coach professionnelle certifiée.",
  },
]

export const programExpertRoster = [
  {
    name: "M. Babacar Sow",
    highlights: [
      "Président de Cogesto Consulting SAS",
      "+32 ans d’expérience dans les métiers du conseil et de l’administration des entreprises",
      "Ancien Directeur Développement à l’International de Jet Group",
      "Ancien Directeur Administratif et Financier",
      "Ancien Directeur Audit et Contrôle de Gestion",
      "Ancien Manager - PricewaterhouseCoopers",
      "Master 2 en Comptabilité, Contrôle et Audit",
      "DESS en Diagnostic Économique des Firmes",
      "Diplôme du Cycle Normal - Option Finances-Comptabilité",
    ],
    image: "/media/cogesto/blp/consultants/babacar-sow-blp.png",
    title: "Engaging Partner - Senior Advisor en stratégie",
  },
  {
    name: "Mme. Aminata Rose Konaté",
    highlights: [
      "30 ans d’expérience professionnelle",
      "Consultante en organisation stratégique et conduite du changement",
      "Coach professionnelle certifiée, coach d’entreprise, développement personnel et communication",
      "Coach et formatrice en séminaires et renforcement de capacités",
      "Master 2 Coach professionnel et personnel certifié",
      "Master 2 Conseil en Organisation spécialiste de la conduite du changement",
      "Master 1 Ingénieur du Commerce et de la distribution",
      "DUT Technicien en Marketing-Communication",
    ],
    image: "/media/cogesto/blp/consultants/amy-rose-konate-blp.png",
    title: "Directrice de Mission Adjointe - Experte Senior en développement personnel et Coaching",
  },
  {
    name: "Mme Coumba Diop Ndiaye",
    highlights: [
      "24 ans d’expérience en RH et organisation",
      "Consultante experte en RH et organisation",
      "Ancienne DRH de Neurotech, Matforce et Unilever Sénégal",
      "Senior Executive Program - BEM Management School Bordeaux",
      "Experte certifiée en Responsabilité Sociétale d’Entreprise et audit des processus RH",
      "DESS Management des Ressources Humaines - École Supérieure de Commerce Sup de Co",
    ],
    image: "/media/cogesto/blp/consultants/equipe-cogesto-12.png",
    title: "Experte en organisation et capital humain",
  },
  {
    name: "Mme. Codou Sow",
    highlights: [
      "Certified Public Accountant à Montréal, spécialiste IFRS",
      "29 ans d’expérience dans le conseil et le business",
      "Administrative and Financial Director",
      "Former Financial Analyst Consultant at L’Oréal",
      "Former Financial Accountant at the League of Conservation Voters in Washington DC",
      "Former Real Estate Accountant at US Home Corporation in Maryland",
      "Former Accountant at Robert Half International in Maryland",
      "Master in Business Management in a Chinese context - Université de Sherbrooke",
      "Master’s Degree in Consulting - Université du Québec en Outaouais",
      "MBA in International Finance - New York Institute of Technology",
      "Master’s degree in Economic Administration and Business Management - University of Orleans",
    ],
    image: "/media/cogesto/blp/consultants/equipe-cogesto-14.png",
    title: "Experte en organisation et finance",
  },
  {
    name: "M. Ousseynou Ndiaye",
    highlights: [
      "Spécialiste en restructuration d’entreprises et diagnostic organisationnel",
      "39 ans d’expérience en conseil et en entreprise",
      "Président de SOFICO SAS, cabinet de conseil financier et conseil à l’investissement",
      "Business développeur",
      "Ancien Directeur Général Adjoint de la Société de Conserveries en Afrique SA",
      "Ancien Conseiller du Groupe Dong Won dans leur stratégie d’implantation en Afrique",
      "Ancien Directeur Général de la Société d’Exploitation de la société Nouvelle des Conserveries du Sénégal",
      "Ancien Directeur Général de la Société Sénégalaise d’équipements en Hygiène Sécurité et Environnement",
      "Ancien Directeur Général de la Société AFRI PECHE",
      "Ancien Consultant chez Arthur Andersen & Co et Coopers & Lybrand",
    ],
    image: "/media/cogesto/blp/consultants/consultant-5.png",
    title: "Senior en restructuration d’entreprises",
  },
  {
    name: "M. Ousmane Birame Sane",
    highlights: [
      "Expert international en marchés financiers et banque",
      "34 ans d’expérience dans les métiers du conseil et de la finance",
      "Docteur en économie et enseignant chercheur",
      "Expert financier de l’équipe d’experts en charge de l’élaboration de la loi sur le développement des PME et la modernisation de l’économie",
      "Ancien Directeur de l’Antenne de la BRVM au Sénégal",
      "Membre du pool d’experts formateurs en Marchés Financiers en zones UEMOA et CEMAC",
      "Ancien Gestionnaire du Fonds de Coparticipation Post-Conflit de la Guinée Bissau",
      "Ancien Directeur Administratif et Financier de la SONES",
    ],
    image: "/media/cogesto/blp/consultants/consultant-6.png",
    title: "Économiste, expert en banque et finance",
  },
  {
    name: "M. Serigne Ndiaye",
    highlights: [
      "31 ans d’expérience",
      "Enseignant vacataire",
      "Directeur, formateur et concepteur de programmes",
      "Assistant au Département de Littérature Comparée",
      "Enseignant vacataire au Département de African Studies de SUNY Albany",
      "Instructeur en langue française dans le lycée",
      "Moniteur de langue pour les étudiants de 1ère année",
      "Ph.D. Philosophy",
      "Cours dans le programme doctoral du Program de Humanistic Studies",
      "Diplôme d’Études Approfondies",
    ],
    image: "/media/cogesto/blp/consultants/consultant-7.png",
    title: "Expert en pédagogie",
  },
  {
    name: "M. Issa Diop Ndoye",
    highlights: [
      "29 ans d’expérience dans le conseil et la formation",
      "Consultant international en management de projets et stratégie de développement",
      "Consultant dans l’ingénierie de la formation dans les domaines Oil & Gas et contenu local",
      "Ancien Directeur scientifique",
      "Chargé de cours dans plusieurs académies",
      "Membre de l’Association des Consultants Pétroliers, groupe local content et training",
      "Membre de l’association AND Alternatives Nouvelles de Développement, Montpellier",
      "Membre du Groupe des Professionnels Sénégalais du Oil and Gas de la Diaspora",
      "Ingénieur de projet de formation et de développement à l’international",
      "Ingénieur événementiel de séminaires, forums et ateliers scientifiques",
      "Ancien responsable d’unité d’enseignement Master 2 IDS en Ingénierie de Projet, Consulting",
      "Ancien responsable départemental à Paris CPCV 2010-2013 en ingénierie sociale et de formation",
    ],
    image: "/media/cogesto/blp/consultants/consultant-8.png",
    title: "Expert en management de projet et renforcement de compétences",
  },
  {
    name: "M. Abou Wahab Touré",
    highlights: [
      "30 ans d’expérience en logistique et supply chain",
      "Consultant et coach, DG Confluence Conseils & Events",
      "Spécialisé dans la distribution, l’agroalimentaire et les industries",
      "Chef de projets Intelligence Économique et Sales Intelligence",
      "Enseignant formateur à la FASEG, BEM Dakar, ISM et 3FPT",
      "Consultant pour le montage de la Direction Export de Dalia Food Maroc",
      "Consultant pour la restructuration de la Direction Commerciale Africaine de l’Automobile",
      "Ancien consultant pour le montage de l’usine de farine de Olam à Diamniadio",
      "Ancien Directeur Général Adjoint de NMA - Directeur du Business Unit Pastami",
      "Ancien Coordonnateur des ventes locales et export de Patisen Pakmaya",
    ],
    image: "/media/cogesto/blp/consultants/consultant-9.png",
    title: "Expert senior en logistique et supply chain",
  },
  {
    name: "M. Pape Samba Sow",
    highlights: [
      "27 ans d’expérience en administration et conseil HSE",
      "Consultant HSE et chef de projet",
      "Ancien Directeur HSE chez Lomé Containers Terminal",
      "Ancien Directeur adjoint HSE chez Dubai Port World",
      "Ancien Directeur HSE chez DP World Afrique",
      "Ancien Directeur HSE chez ExxonMobil Afrique de l’Ouest et du Centre",
      "Diplôme d’ingénieur chimiste de la Wayne State University - Detroit",
      "Formation en gestion des opérations pétrolières et systèmes intégrés",
    ],
    image: "/media/cogesto/blp/consultants/consultant-10.png",
    title: "QHSE et sécurité au BLP",
  },
  {
    name: "Mame Ngoné Sow",
    experience: mameNgoneExperience,
    experienceTitle: "EXPERIENCE",
    highlights: [],
    image: "/media/cogesto/team/mame-ngone-sow.png",
    profileParagraphs: mameNgoneProfileParagraphs,
    title: mameNgoneProfileTitle,
  },
  {
    name: "M. Doudou Ndiaye",
    highlights: [
      "Expert Fiscal, formé à l’Académie de Lyon et à l’INTEC (DECS)",
      "Ancien Directeur Administratif et Juridique – Oryx Sénégal",
      "Spécialiste en audit interne, fiscalité et gestion administrative",
      "Plus de 40 ans d’expérience en audit, comptabilité et fiscalité",
      "Ancien Directeur Général de Universel Conseil (cabinet agréé FONDEF/ADPME)",
      "Ancien West African Cluster Payroll Manager chez ExxonMobil (Bureau régional)",
      "Ancien Accounting Manager & Tax Advisor chez Mobil Oil Sénégal",
      "Ancien Auditeur Interne chez Mobil Oil (Bureau régional : Sénégal, Mauritanie, Mali, Guinée, Côte d’Ivoire)",
      "Ancien Auditeur, chef de mission au Cabinet GARECGO (correspondant Ernst & Whinney)",
      "Délégué Général de l’IIA-Sénégal (Institute of Internal Auditors)",
      "Membre de l’IIA Global et de l’UFAI (Union Francophone de l’Audit Interne)",
      "Probatoire du DECS – Académie de Lyon (1981)",
      "DECS partiel (Certificat Économique et Certificat Juridique) – INTEC (1982)",
    ],
    image: "/media/cogesto/blp/consultants/cheikh-ahmadou-bamba-badji-1.png",
    title: "Expert Fiscal - Audit - Comptabilité - GRH",
  },
  {
    name: "M. Madiou Soumaré",
    highlights: [
      "Expert-comptable diplômé inscrit à l’ONECCA Sénégal",
      "23 ans d’expérience",
      "Consultant indépendant : conseil et consultant stratégique, corporate finance",
      "Ancien Manager chez Baker Tilly Sénégal : audit et conseil financier, juridique, fiscal et organisationnel",
      "Ancien Directeur Général et Directeur Adjoint chez NSIA",
      "Ancien Directeur Financier et Directeur Adjoint chez SAHAM",
      "Senior Manager chez Mazars : audit, due diligences, conseil stratégique et corporate finance",
    ],
    image: "/media/cogesto/blp/consultants/cheikh-ahmadou-bamba-badji-2.png",
    title: "Expert senior en structuration de financement / Expert-comptable inscrit à l’ONECCA du Sénégal",
  },
  {
    name: "M. Mamadou Ndiaye",
    highlights: [],
    image: "/media/cogesto/blp/consultants/cheikh-ahmadou-bamba-badji-4.png",
    title: "Expert financier",
  },
  {
    name: "M. Cheikh Ahmadou Bamba Badji",
    highlights: [
      "5 ans d’expériences dans le conseil organisationnel et opérationnel;",
      "Coordinateur des missions de conseil;",
      "Consultant en QHSE et ESG",
      "Coordonnateur de programme dans le cadre du « Business Linkage Programme », mission d’assistance Technique relative au renforcement des capacités et l’accompagnent de 40 PME Sénégalaises;",
      "Coach certifié",
      "Certifié ISO 50001, 26001, Risques des Produits Dangereux",
      "certificate in casing and cementing",
      "Certificate of H.S.E in the oil & Gas Industry",
      "Certificate of First Aid",
      "Advanced petroleum Engineering (Drilling, Reservoir Engineering and Production)",
      "Master 2 en Géologie Minière",
    ],
    image: "/media/cogesto/blp/consultants/cheikh-ahmadou-bamba-badji.png",
    title: "Ingénieur Pétrolier et expert en organisation",
  },
  {
    name: "M. Yankhouba Dianesy",
    highlights: [
      "6 ans d’expérience en finance et conseil",
      "Consultant en finance chez Cogesto consulting",
      "Responsable du Programme d’Accélération de la Croissance et de la Transformation des Entreprises et Startups de Cogesto Consulting;",
      "Expert en Entreprenariat et Coach certifié",
      "Formateur en information financière, gestion financière et Entreprenariat",
      "Préparation et la structuration des dossiers de financement de 20 PME dans le cadre du programme Affirmative Procurement Reform in West Africa ONUFEMME/ADEPME;",
      "Coordination de la mission du Parcours du Chefs d’entreprise de 3FPT pour le renforcement de capacités de 30 dirigeants d’entreprises;",
      "Ancien Coordinateur des activités de formation",
      "Master 2 en Ingénierie financière à l’Institut supérieur des finances (ISF);",
      "Certificat en Entreprenariat à Africa Management Institut (AMI);",
      "Certificat en Data Science Fundamentals (Sénégal numérique)",
    ],
    image: "/media/cogesto/blp/consultants/equipe-cogesto-13.png",
    title: "Expert Financier et coach certifié",
  },
  {
    name: "M. Saodou Amadou Ba",
    highlights: [
      "3 ans d’expérience en finance;",
      "Analyste financier;",
      "Consultant en finance;",
      "Participation à plusieurs missions d’ingénierie financière dans le cadre de mission d’évaluation d’entreprises et de due diligence d’acquisition;",
      "Responsable de suivi-évaluation des programmes PAAICE/ETER pilotés par l’ADEPME;",
      "Conseil financier et Élaboration de plans d’affaires pour plusieurs entreprises;",
      "Chargé de la structuration de dossier de financement dans le cadre du programme Affirmative Procurement Reform in West Africa ONUFEMME/ADEPME;",
      "Assistance à la rédaction de la procédure RSE de Cogesto Consulting",
      "Master 2 en finance d’entreprise et ingénierie financière;",
      "Licence en finance et comptabilité",
    ],
    image: "/media/cogesto/blp/consultants/saodou-amadou-ba.png",
    imageScale: 1.62,
    title: "Analyste financier et Consultant en Finance",
  },
]

export const programEventGallery = [
  { alt: "Séminaire BLP", src: "/media/cogesto/blp/tof8105-300x200.jpg" },
  { alt: "Session BLP", src: "/media/cogesto/blp/tof8077-300x200.jpg" },
  { alt: "Participants BLP", src: "/media/cogesto/blp/tof8062-300x200.jpg" },
  { alt: "Atelier BLP", src: "/media/cogesto/blp/tof7780-3-300x200.jpg" },
  { alt: "Lancement BLP", src: "/media/cogesto/blp/tof8053-1-300x200.jpg" },
  { alt: "Échange BLP", src: "/media/cogesto/blp/tof7861-300x200.jpg" },
  { alt: "Cérémonie BLP", src: "/media/cogesto/blp/tof7979-1-300x200.jpg" },
  { alt: "Panel BLP", src: "/media/cogesto/blp/tof7969-1-300x200.jpg" },
  { alt: "Communication BLP", src: "/media/cogesto/blp/design-32.jpg" },
  { alt: "Objectifs BLP", src: "/media/cogesto/blp/design-30.jpg" },
  { alt: "Partenaires BLP", src: "/media/cogesto/blp/design-31.jpg" },
  { alt: "Séance terrain BLP", src: "/media/cogesto/blp/tof2870-1200x801.jpg" },
]

export const programEvents = [
  {
    date: "14 juin 2023",
    image: "/media/cogesto/tof8053.jpg",
    title: "Cérémonie de lancement du BLP",
    summary:
      "Lancement officiel du BLP à l’Hôtel King Fahd Place pour accélérer l’intégration des PME sénégalaises dans l’Oil & Gas.",
  },
  {
    date: "Séminaire",
    image: "/media/cogesto/tof8105.jpg",
    title: "Seminaire de sensibilisation sur les opportunités du O&G",
    summary:
      "Séminaire de sensibilisation autour des opportunités du secteur Oil & Gas pour les entreprises accompagnées par le programme.",
  },
]

export type SiteEvent = {
  category: string
  date: string
  day: string
  gallery: Array<string>
  galleryImagePositions?: Record<number, string>
  href: string
  image: string
  imagePosition?: string
  location?: string
  month: string
  organizer: string
  slug: string
  summary: string
  time: string
  title: string
  venue?: string
  year?: string
}

export const events: Array<SiteEvent> = [
  {
    category: "Formation",
    date: "17 septembre 2024",
    day: "17",
    gallery: [
      "/media/cogesto/events/uba-financial-analysis/uba-analysis-01-group.jpg",
      "/media/cogesto/events/uba-financial-analysis/uba-analysis-02-session.jpg",
      "/media/cogesto/events/uba-financial-analysis/uba-analysis-03-certificate.jpg",
      "/media/cogesto/events/uba-financial-analysis/uba-analysis-04-certificate.jpg",
      "/media/cogesto/events/uba-financial-analysis/uba-analysis-05-certificate.jpg",
      "/media/cogesto/events/uba-financial-analysis/uba-analysis-06-certificate.jpg",
    ],
    galleryImagePositions: {
      0: "50% 26%",
      1: "48% 16%",
      2: "48% 10%",
      3: "48% 10%",
      4: "48% 10%",
      5: "48% 10%",
    },
    href: "/event/seminaire-uba-senegal-analyse-financiere",
    image: "/media/cogesto/events/uba-financial-analysis/uba-analysis-01-group.jpg",
    location: "UBA Sénégal, Dakar",
    month: "SEPT",
    organizer: "Cogesto Consulting, 3FPT et UBA Sénégal",
    slug: "seminaire-uba-senegal-analyse-financiere",
    title: "Séminaire UBA Sénégal en analyse financière",
    summary:
      "Séminaire de formation pour l’équipe de UBA Sénégal sur l’analyse financière, animé par l’Expert-Comptable Madiou Soumaré de Cogesto Consulting en partenariat avec 3FPT. Cette formation pratique, déroulée en 5 sessions, a permis de former 74 cadres de la banque aux techniques d’analyse financière.",
    time: "5 sessions",
    venue: "UBA Sénégal",
    year: "2024",
  },
  {
    category: "Coaching",
    date: "20 décembre 2023",
    day: "20",
    gallery: [
      "/media/cogesto/events/coaching/1-1.jpg",
      "/media/cogesto/events/coaching/2-1.jpg",
      "/media/cogesto/events/coaching/3-1.jpg",
      "/media/cogesto/events/coaching/4-1.jpg",
      "/media/cogesto/events/coaching/5-1.jpg",
      "/media/cogesto/events/coaching/6-1.jpg",
      "/media/cogesto/events/coaching/8.jpg",
      "/media/cogesto/events/coaching/7-1.jpg",
    ],
    href: "/event/coaching-du-top-management",
    image: "/media/cogesto/events/coaching/1-1.jpg",
    month: "Déc",
    organizer: "Cogesto",
    slug: "coaching-du-top-management",
    title: "Coaching du Top Management",
    summary:
      "Sessions de coaching de l’équipe dirigeante de la société de bourse FGI animées par Amy Rose KONATE (Cogesto Consulting SAS) - Novembre 2023.",
    time: "08:00 - 17:00",
    year: "2023",
  },
  {
    category: "Formation",
    date: "20 décembre 2023",
    day: "20",
    gallery: [
      "/media/cogesto/events/training/4.jpg",
      "/media/cogesto/events/training/2.jpg",
      "/media/cogesto/events/training/3.jpg",
      "/media/cogesto/events/training/5.jpg",
      "/media/cogesto/events/training/6.jpg",
      "/media/cogesto/events/training/7.jpg",
      "/media/cogesto/events/training/1.jpg",
    ],
    href: "/event/seminaires-de-formation-en-marketing-communication",
    image: "/media/cogesto/events/training/4.jpg",
    location: "Novotel Dakar et Hôtel Le Ndiambour, Dakar",
    month: "Déc",
    organizer: "Cogesto",
    slug: "seminaires-de-formation-en-marketing-communication",
    title: "Séminaires de formation en Marketing & Communication",
    summary:
      "Séminaires de formation en Marketing & Communication pour 30 dirigeants d’entreprise organisé par 3FPT dans le cadre du programme « Parcours du Chef d’entreprise » assurés par Cogesto Consulting SAS. Séminaires Abdoul Wahab Touré et Amy Rose KONATÉ. Octobre 2023.",
    time: "08:00 - 17:00",
    venue: "Novotel Dakar et Hôtel Le Ndiambour",
    year: "2023",
  },
]

export const eventGalleries = [
  {
    images: events[0].gallery,
    title: "Séminaire UBA Sénégal en analyse financière",
  },
  {
    images: events[1].gallery,
    title: "Coaching du Top Management",
  },
  {
    images: events[2].gallery,
    title: "Séminaires de formation en Marketing & Communication",
  },
]

export function getEventBySlug(slug: string): SiteEvent | undefined {
  return events.find((event) => event.slug === slug)
}

export const siteCopy = {
  description:
    "Cogesto Consulting SAS fournit des services de conseil et de formation aux entreprises publiques et privées. Le cabinet est spécialisé en élaboration et opérationnalisation de politiques stratégiques et financières, en accompagnement organisationnel et en management de la performance.",
  proposition:
    "Votre partenaire de confiance pour bâtir des organisations fortes, opérationnaliser les politiques stratégiques et piloter la performance.",
}
