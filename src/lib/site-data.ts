export type NavItem = {
  label: string
  href: string
  description?: string
}

export type SiteNavLink = {
  description: string
  href: string
  label: string
}

export type SiteNavSection = {
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
    label: "Business Linkage Program",
    description: "Accompagnement PME, Oil & Gas, marché et financement.",
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
      eyebrow: "Program",
      href: "/business-linkage-program",
      text: "Le programme accompagne la croissance des entreprises du pétrole et du gaz grâce à l’assistance technique et à la formation.",
      title: "Contexte, partenaires, objectifs, résultats et experts mobilisés autour du BLP.",
    },
    description: "Le Business Linkage Program présenté sur une page dédiée.",
    href: "/business-linkage-program",
    label: "Business Linkage Program",
    sections: [
      {
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
            description: "Accompagnement à la structuration de projets verts et durables.",
            href: "/business-linkage-program/finance-verte-durable",
            label: "Finance verte ou durable",
          },
          {
            description: "Parcours d’accompagnement pour renforcer la posture entrepreneuriale.",
            href: "/business-linkage-program/parcours-entrepreneur",
            label: "Parcours de l’entrepreneur",
          },
          {
            description: "Consultants, experts et accompagnateurs mobilisés.",
            href: "/business-linkage-program#consultants",
            label: "Consultants du BLP",
          },
          {
            description: "Cérémonies, séminaires et actions de terrain du programme.",
            href: "/business-linkage-program#evenements",
            label: "Évènements du BLP",
          },
        ],
      },
    ],
  },
  { href: "/events", label: "Évènements" },
  { href: "/contact", label: "Contact" },
]

export const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "A propos" },
  { href: "/expertises", label: "Nos expertises" },
  { href: "/business-linkage-program", label: "Business Linkage Program" },
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
  { icon: "lucide:building-2", label: "Bureaux", value: "3" },
  { icon: "lucide:globe-2", label: "Pays de présence", value: "3" },
  { icon: "lucide:graduation-cap", label: "Heures de formation", value: "+700" },
  { icon: "lucide:briefcase-business", label: "Années d’expérience cumulée", value: "30+" },
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
  "Énergie et hydrocarbures",
  "Immobilier / BTP",
  "Distribution",
  "Santé",
  "Agro-alimentaire / Agro business",
  "Microfinance et SFD",
  "Hôtellerie / Tourisme",
  "Banques et services financiers",
  "Services",
  "Transport et logistique",
  "TIC, ONG et collectivités locales",
]

export const approach = [
  "Mener une analyse sectorielle pointue fondée sur des benchmarks ciblés.",
  "Réaliser un diagnostic approfondi de l’organisme, de ses enjeux et de ses besoins.",
  "Déployer des outils adaptés et un accompagnement personnalisé orienté résultats.",
  "Favoriser le transfert de compétences et l’appropriation durable par les équipes.",
]

export const values = ["Créativité", "Respect", "Engagement", "Éthique", "Responsabilité"]

export const commitments = [
  "Préserver les intérêts des clients",
  "Préserver notre intégrité",
  "Garantir la confidentialité",
  "Adhérer à la charte anti-corruption.",
  "Favoriser le transfert de compétences",
]

export const leaders = [
  {
    image: "/media/cogesto/team/babacar-sow-4.png",
    name: "Babacar Sow",
    role: "Président du Groupe",
    summary:
      "Plus de 30 ans d’expérience en conseil, finance, développement international et direction générale, avec un parcours incluant PricewaterhouseCoopers.",
  },
  {
    image: "/media/cogesto/team/mme-codou-sow.png",
    name: "Codou Sow",
    role: "Directrice",
    summary:
      "CPA à Montréal, expert-comptable inscrit à l’ONECCA du Sénégal, spécialiste audit, IFRS, finance et conseil aux USA, au Canada et en Afrique.",
  },
  {
    image: "/media/cogesto/team/mame-ngone-sow.png",
    name: "Mame Ngoné Sow",
    role: "Conseiller juridique senior",
    summary:
      "Avocate au Barreau de l’Ontario, juriste corporate avec une vingtaine d’années d’expérience et une expertise en droit international.",
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
    name: "Babacar Sow",
    role: "PDG",
    summary:
      "Une trentaine d’années d’expérience, débutées en 1995 chez PricewaterhouseCoopers Maroc, puis prolongées comme Directeur du Développement International, Directeur Financier et Directeur Général.",
  },
  {
    name: "Codou Sow",
    role: "Directrice",
    summary:
      "Certified Public Accountant (CPA) à Montréal, expert-comptable inscrit à l’ONECCA du Sénégal, avec plus de 25 ans d’expérience avérée dans le conseil et la finance aux USA et au Canada, spécialiste audit et normes IFRS, titulaire d’un MBA en Finance Internationale.",
  },
  {
    name: "Mame Ngoné Sow",
    role: "Conseiller juridique senior",
    summary:
      "Avocate au Barreau de l’Ontario, avec une vingtaine d’années d’expérience, titulaire d’un LLM en droit informatique de l’Université de Montréal, d’un LLM en droit international privé et d’un certificat en droit international public et comparé.",
  },
]

export const aboutExecutiveCommittee = [
  {
    name: "Babacar Sow",
    role: "PDG",
    summary:
      "Manager chez PwC puis dirigeant d’entreprises privées, avec une forte expérience en conseil, finance, transformation et direction générale.",
  },
  {
    name: "Amy Rose Konaté",
    role: "Vice-Présidente, experte en développement de personnel",
    summary:
      "28 ans d’expérience en conseil et en entreprise, spécialiste en conduite du changement, coach certifiée et consultante en organisation.",
  },
  {
    name: "Coumba Diop Ndiaye",
    role: "Vice-Présidente, experte RH & organisation",
    summary:
      "24 ans d’expérience en RH et organisation, ancienne DRH de Neurotech, Matforce et Unilever Sénégal, certifiée RSE et audit des processus RH.",
  },
  {
    name: "Dr. Amadou Ba",
    role: "Vice-Président, expert senior en politiques publiques",
    summary:
      "Une quarantaine d’années d’expérience en administration, formation, développement, hygiène, qualité et sécurité, avec une forte expertise de terrain.",
  },
]

export const aboutApproach = [
  "Une analyse sectorielle pointue fondée sur des benchmarks ciblés afin de répondre de manière appropriée aux problématiques des grandes entreprises et PME.",
  "Un diagnostic approfondi et ciblé de l’organisme pour une meilleure connaissance de ses problématiques, enjeux et besoins spécifiques.",
  "Le recours à des outils pratiques et adaptés au contexte de la mission.",
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
  "Développer leurs capacités entrepreneuriales et leurs réseaux de partenariat.",
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
    name: "Invest In Africa",
  },
  {
    description: "Appui technique et financement du dispositif pour accélérer la montée en capacité des entreprises.",
    name: "Banque Africaine de Développement",
  },
  {
    description: "Soutien au partenariat africain pour renforcer l’impact économique du programme.",
    name: "Fonds pour les Partenariats Africains (FAPA)",
  },
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
      "Un parcours d’accompagnement pour aider les dirigeants à clarifier leur modèle, renforcer leur pilotage et accélérer leur accès au marché.",
    href: "/business-linkage-program/parcours-entrepreneur",
    image: "/media/cogesto/ai/business-linkage/parcours-entrepreneur.png",
    label: "Parcours de l’entrepreneur",
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
    eyebrow: "Business Linkage Program",
    heroImage: "/media/cogesto/ai/business-linkage/parcours-entrepreneur.png",
    intro:
      "Le Parcours de l’entrepreneur aide les dirigeants à consolider leur vision, leur posture, leur organisation et leur capacité à saisir les opportunités de marché.",
    lead:
      "Le dispositif combine diagnostic, formation, coaching, outils de gestion et mise en situation pour faire progresser l’entreprise de manière structurée.",
    slug: "parcours-entrepreneur",
    title: "Parcours de l’entrepreneur",
    outcomes: [
      "Une vision d’entreprise clarifiée et traduite en priorités opérationnelles.",
      "Des outils de pilotage adaptés aux réalités de l’entreprise.",
      "Une meilleure préparation à la négociation, au financement et aux partenariats.",
      "Un plan de croissance concret, séquencé et suivi.",
    ],
    steps: [
      "Diagnostic entrepreneurial et cartographie des besoins du dirigeant.",
      "Ateliers sur modèle économique, marché, organisation, finance et leadership.",
      "Coaching individuel ou collectif sur les décisions clés de croissance.",
      "Plan d’action, suivi des progrès et préparation aux opportunités commerciales.",
    ],
    target:
      "Entrepreneurs, fondateurs, dirigeants de PME et équipes de croissance qui veulent passer d’une intuition à une entreprise mieux structurée.",
  },
} as const

export const programExperts = [
  "Directeur de mission, consultant ingénieur industriel et pétrolier",
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
    image: "/media/cogesto/blp/consultants/lamine-kaba.png",
    name: "Directeur de mission",
    role: "Consultant ingénieur industriel et pétrolier BLP",
    summary:
      "35 ans d’expérience, ingénieur en électromécanique, ancien dirigeant et responsable opérations dans le secteur Oil & Gas.",
  },
  {
    image: "/media/cogesto/blp/consultants/babacar-sow-blp.png",
    name: "Babacar Sow",
    role: "Engaging Partner - Senior Advisor en stratégie",
    summary:
      "Président de Cogesto Consulting SAS, plus de 30 ans d’expérience dans les métiers du conseil et de l’administration des entreprises.",
  },
  {
    image: "/media/cogesto/blp/consultants/amy-rose-konate-blp.png",
    name: "Amy Rose Konaté",
    role: "Directrice de mission adjointe - développement personnel et coaching",
    summary:
      "28 ans d’expérience professionnelle, consultante en organisation stratégique et conduite du changement, coach professionnelle certifiée.",
  },
]

export const programExpertRoster = [
  {
    highlights: [
      "35 ans d’expérience",
      "Consultant indépendant",
      "Ingénieur en électromécanique",
      "Ancien Conseiller Spécial de l’Administrateur Général Libya Oil Sénégal",
      "Ancien Administrateur Général Libya Oil Tchad et Libya Oil Sudan",
      "Ancien Directeur de l’Exploitation et de la Clientèle Libya Oil Sudan et Libya Oil Sénégal",
      "Ancien Chef Supply Fuel Projet SAP R3 Afrique Exxon Mobil Afrique et Moyen Orient",
      "Ancien Directeur des Opérations Exxon Mobil Afrique de l’Ouest",
      "Ancien Chef de Dépôt Dakar Océan Terminal Mobil Côte d’Ivoire",
      "Ancien Responsable Support Technique et Projet Mobil Sénégal",
      "Ancien Chef de Service Maintenance et Projet Sonacos Sénégal",
      "Ancien Chef de Division Électricité et Instrumentation Sonacos Sénégal",
      "Ancien Ingénieur Production Sonacos Sénégal",
    ],
    image: "/media/cogesto/blp/consultants/lamine-kaba.png",
    title: "Directeur de mission, consultant ingénieur industriel et pétrolier",
  },
  {
    highlights: [
      "Président de Cogesto Consulting SAS",
      "+30 ans d’expérience dans les métiers du conseil et de l’administration des entreprises",
      "Ancien Directeur Développement à l’International de Jet Group",
      "Ancien Directeur Administratif et Financier",
      "Ancien Directeur Audit et Contrôle de Gestion",
      "Ancien Manager - PricewaterhouseCoopers",
      "Master 2 en Comptabilité, Contrôle et Audit",
      "DESS en Diagnostic Économique des Firmes",
      "Diplôme du Cycle Normal - Option Finances-Comptabilité",
    ],
    image: "/media/cogesto/blp/consultants/babacar-sow-blp.png",
    title: "Engaging Partner, Senior Advisor en stratégie",
  },
  {
    highlights: [
      "28 ans d’expérience professionnelle",
      "Consultante en organisation stratégique et conduite du changement",
      "Coach professionnelle certifiée, coach d’entreprise, développement personnel et communication",
      "Coach et formatrice en séminaires et renforcement de capacités",
      "Master 2 Coach professionnel et personnel certifié",
      "Master 2 Conseil en Organisation spécialiste de la conduite du changement",
      "Master 1 Ingénieur du Commerce et de la distribution",
      "DUT Technicien en Marketing-Communication",
    ],
    image: "/media/cogesto/blp/consultants/amy-rose-konate-blp.png",
    title: "Directrice de mission adjointe, experte senior en développement personnel et coaching",
  },
  {
    highlights: [
      "22 ans d’expérience en RH et organisation",
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
    highlights: [
      "Certified Public Accountant à Montréal, spécialiste IFRS",
      "27 ans d’expérience dans le conseil et le business",
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
    highlights: [
      "Spécialiste en restructuration d’entreprises et diagnostic organisationnel",
      "37 ans d’expérience en conseil et en entreprise",
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
    highlights: [
      "Expert international en marchés financiers et banque",
      "32 ans d’expérience dans les métiers du conseil et de la finance",
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
    highlights: [
      "29 ans d’expérience",
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
    highlights: [
      "27 ans d’expérience dans le conseil et la formation",
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
    highlights: [
      "28 ans d’expérience en logistique et supply chain",
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
    highlights: [
      "25 ans d’expérience en administration et conseil HSE",
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
    highlights: [
      "Avocate au Barreau de l’Ontario",
      "Senior Associate DLA Piper Africa",
      "Spécialiste en droit corporate, droit informatique et droit international",
      "Titulaire d’un LLM en droit informatique de l’Université de Montréal",
      "Titulaire d’un LLM en droit international privé",
      "Certificat en droit international public et comparé de l’Université Howard à Washington",
    ],
    image: "/media/cogesto/team/mame-ngone-sow.png",
    title: "Avocate au Barreau de l’Ontario, consultante senior et juriste corporate",
  },
  {
    highlights: [
      "38 ans d’expérience en fiscalité",
      "Ancien Directeur du Contrôle interne de la DGID",
      "Ancien Conseiller Technique du Directeur Général des Impôts et des Domaines",
      "Ancien Chef du Centre des Professions Réglementées",
      "Ancien Chef du Centre des Services Fiscaux de Dakar Plateau II",
      "Ancien Chef du Centre des Services Fiscaux des Parcelles Assainies",
      "Ancien Chef de la Section Taxes Indirectes au Bureau de la Législation et du Contentieux",
      "Ancien Vérificateur à la DVEF/DGID",
      "Ancien Chef d’Inspection fusionnée d’Assiette et de Contrôle",
      "Ancien Inspecteur divisionnaire aux Impôts de Kaolack, Tambacounda et Dakar",
    ],
    image: "/media/cogesto/blp/consultants/cheikh-ahmadou-bamba-badji-1.png",
    title: "Consultant senior en organisation et fiscalité",
  },
  {
    highlights: [
      "Expert-comptable diplômé inscrit à l’ONECCA Sénégal",
      "21 ans d’expérience",
      "Consultant indépendant : conseil et consultant stratégique, corporate finance",
      "Ancien Manager chez Baker Tilly Sénégal : audit et conseil financier, juridique, fiscal et organisationnel",
      "Ancien Directeur Général et Directeur Adjoint chez NSIA",
      "Ancien Directeur Financier et Directeur Adjoint chez SAHAM",
      "Senior Manager chez Mazars : audit, due diligences, conseil stratégique et corporate finance",
    ],
    image: "/media/cogesto/blp/consultants/equipe-cogesto-13.png",
    title: "Expert senior en structuration de financement",
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

export const events = [
  {
    date: "14 juin 2023",
    image: "/media/cogesto/tof8053.jpg",
    title: "Cérémonie de lancement du BLP",
    summary:
      "Lancement officiel du BLP à l’Hôtel King Fahd Place pour accélérer l’intégration des PME sénégalaises dans l’Oil & Gas.",
  },
  {
    date: "Formation",
    image: "/media/cogesto/tof8105.jpg",
    title: "Séminaires de formation organisés par 3FPT",
    summary:
      "Séminaires en marketing et communication pour 30 dirigeants dans le cadre du parcours du chef d’entreprise.",
  },
  {
    date: "Coaching",
    image: "/media/cogesto/tof8077.jpg",
    title: "Sessions de coaching de l’équipe dirigeante de FGI",
    summary:
      "Sessions de coaching pour renforcer les pratiques de pilotage, de gouvernance et de transformation.",
  },
]

export const eventGalleries = [
  {
    images: [
      "/media/cogesto/events/launch/tof4019.jpg",
      "/media/cogesto/events/launch/1-2.jpg",
      "/media/cogesto/events/launch/7-2.jpg",
      "/media/cogesto/events/launch/4-2.jpg",
      "/media/cogesto/events/launch/5-2.jpg",
      "/media/cogesto/events/launch/6-2.jpg",
      "/media/cogesto/events/launch/2-2.jpg",
      "/media/cogesto/events/launch/3-2.jpg",
    ],
    title: "Cérémonie lancement BLP 14 juin 2023",
  },
  {
    images: [
      "/media/cogesto/events/training/design-2.jpg",
      "/media/cogesto/events/training/1.jpg",
      "/media/cogesto/events/training/7.jpg",
      "/media/cogesto/events/training/6.jpg",
      "/media/cogesto/events/training/4.jpg",
      "/media/cogesto/events/training/5.jpg",
      "/media/cogesto/events/training/2.jpg",
      "/media/cogesto/events/training/3.jpg",
    ],
    title: "Séminaires de formation organisé par 3FPT",
  },
  {
    images: [
      "/media/cogesto/events/coaching/telechargement-2.jpeg",
      "/media/cogesto/events/coaching/1-1.jpg",
      "/media/cogesto/events/coaching/2-1.jpg",
      "/media/cogesto/events/coaching/3-1.jpg",
      "/media/cogesto/events/coaching/4-1.jpg",
      "/media/cogesto/events/coaching/5-1.jpg",
      "/media/cogesto/events/coaching/6-1.jpg",
      "/media/cogesto/events/coaching/8.jpg",
      "/media/cogesto/events/coaching/7-1.jpg",
    ],
    title: "Sessions de coaching de l’équipe dirigeante de la société de bourse FGI",
  },
]

export const siteCopy = {
  description:
    "Cogesto Consulting SAS fournit des services de conseil et de formation aux entreprises publiques et privées. Le cabinet est spécialisé en élaboration et opérationnalisation de politiques stratégiques et financières, en accompagnement organisationnel et en management de la performance.",
  proposition:
    "Votre partenaire de confiance pour bâtir des organisations fortes, opérationnaliser les politiques stratégiques et piloter la performance.",
}
