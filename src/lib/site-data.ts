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
    label: "À propos",
    description: "Mission, valeurs, équipe dirigeante et engagements.",
  },
  {
    href: "/expertises",
    label: "Expertises",
    description: "Expertises fonctionnelles et sectorielles.",
  },
  {
    href: "/business-linkage-program",
    label: "Business Linkage Program",
    description: "Accompagnement PME, Oil & Gas, marché et financement.",
  },
  { href: "/events", label: "Events / News" },
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
    label: "À propos",
    sections: [
      {
        title: "Explorer",
        links: [
          {
            description: "Mission, valeurs, équipe et engagements du cabinet.",
            href: "/about",
            label: "Le cabinet",
          },
          {
            description: "Vision, proposition de valeur et engagements du cabinet.",
            href: "/about",
            label: "Mission et valeurs",
          },
          {
            description: "Gouvernance, conseil d’administration et comité exécutif.",
            href: "/about",
            label: "Équipe dirigeante",
          },
        ],
      },
      {
        title: "Accès rapide",
        links: [
          {
            description: "Méthode d’intervention et promesse d’accompagnement.",
            href: "/about",
            label: "Proposition de valeur",
          },
          {
            description: "Intégrité, confidentialité, responsabilité sociale et écologique.",
            href: "/about",
            label: "Engagements",
          },
          {
            description: "Vision et message du Président du Groupe.",
            href: "/about",
            label: "Mot du Président",
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
        title: "Explorer",
        links: [
          {
            description: "Vue d’ensemble de l’offre du cabinet.",
            href: "/expertises",
            label: "Toutes les expertises",
          },
          {
            description: "Conseil, organisation, capital humain, performance et finance.",
            href: "/expertises",
            label: "Expertises fonctionnelles",
          },
          {
            description: "Secteurs d’intervention et connaissance des marchés.",
            href: "/expertises",
            label: "Expertises sectorielles",
          },
        ],
      },
      {
        title: "Accès rapide",
        links: [
          {
            description: "Stratégie d’entreprise, organisation et capital humain.",
            href: "/expertises",
            label: "Stratégie et organisation",
          },
          {
            description: "Management de la performance, conseil financier et ingénierie financière.",
            href: "/expertises",
            label: "Finance et performance",
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
    label: "Program",
    sections: [
      {
        title: "Explorer",
        links: [
          {
            description: "Contexte, objectifs, résultats et consultants du dispositif.",
            href: "/business-linkage-program",
            label: "Vue d’ensemble du programme",
          },
          {
            description: "Origine, enjeux et contenu local dans l’Oil & Gas.",
            href: "/business-linkage-program",
            label: "Contexte du programme",
          },
          {
            description: "Institutions et partenaires mobilisés autour du dispositif.",
            href: "/business-linkage-program",
            label: "Partenaires du BLP",
          },
        ],
      },
      {
        title: "Accès rapide",
        links: [
          {
            description: "Objectifs opérationnels et résultats attendus pour les PME.",
            href: "/business-linkage-program",
            label: "Objectifs et résultats",
          },
          {
            description: "Consultants, experts et accompagnateurs mobilisés.",
            href: "/business-linkage-program",
            label: "Consultants du BLP",
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
  { href: "/about", label: "À propos" },
  { href: "/expertises", label: "Expertises" },
  { href: "/business-linkage-program", label: "Program" },
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
      "Compétitivité croissante, nouvelles contraintes réglementaires et exigences des investisseurs et directions générales.",
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
      "Assistance sur des problématiques comptables, fiscales, juridiques et sociales",
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
  "Adhérer à la charte anti-corruption",
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
    image: "/media/cogesto/team/dr-amadou-ba.png",
    name: "Dr. Amadou Ba",
    role: "Vice-Président",
    summary:
      "Expert senior en politiques publiques et développement, avec une quarantaine d’années d’expérience en administration, formation et accompagnement stratégique.",
  },
]

export const aboutPresidentMessage = [
  "Je suis ravi de m’exprimer aujourd’hui sur notre engagement à contribuer au développement de l’Afrique à travers la consultance et la formation.",
  "Chez Cogesto Consulting, nous sommes convaincus que l’Afrique regorge de potentialités et que son développement passe par sa capacité à favoriser l’émergence d’entreprises championnes fortement créatrices de valeur.",
  "Conscients que la plupart des entreprises africaines sont souvent confrontées à des problématiques majeures liées à leur faible niveau de productivité, leur sous-capitalisation, aux difficultés d’accès aux marchés et aux financements et au déficit de personnel qualifié, nous œuvrons pour contribuer de manière efficace à la performance durable des organisations.",
  "En tant qu’entreprise de conseil, nous avons toujours eu pour objectif d’apporter des solutions innovantes et adaptées aux défis auxquels nos clients sont confrontés, et notre présence en Afrique nous offre une opportunité unique de soutenir le développement économique et social du continent à travers la formation de talents locaux.",
  "Accompagnés par une équipe composée de professionnels hautement qualifiés et expérimentés qui partagent tous une passion commune pour l’excellence et l’impact positif, nous croyons fermement en la valeur de la collaboration et de l’échange de connaissances.",
  "En ma qualité de Président du Groupe Cogesto, je m’engage à soutenir le développement professionnel du capital humain et à créer un environnement propice à l’apprentissage et à l’innovation.",
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
    name: "Mame Ngone Sow",
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
      "Cogesto Consulting s’engage à révolutionner son impact environnemental et social avec des actions concrètes, de la réduction de l’empreinte carbone à la promotion de l’égalité des chances.",
  },
  {
    date: "05-10-2023",
    href: "https://usercontent.one/wp/www.cogestoconsulting.com/wp-content/uploads/2023/11/Lettre-declaration-Politique-RSE-5-Octobre-2023.pdf?media=1699980106",
    title: "Lettre déclaration Politique RSE",
    summary:
      "Cogesto Consulting redéfinit la responsabilité d’entreprise avec un engagement profond envers les employés, l’environnement et l’éthique des affaires.",
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
  "80 PME solides identifiées dans le cadre du programme.",
  "60 PME ciblées sélectionnées pour bénéficier d’une formation sur les compétences de base.",
  "40 PME sélectionnées pour bénéficier de l’assistance technique, du marché et du financement.",
  "Développement de partenariats commerciaux avec des entreprises du secteur pétrolier et gazier.",
  "Accès à des opportunités d’investissement dans le secteur Oil & Gas.",
]

export const programContextHighlights = [
  "Découvertes majeures de gaz et de pétrole au Sénégal entre 2014 et 2015.",
  "Loi 2019-04 relative au contenu local pour accroître la valeur ajoutée créée au Sénégal.",
  "Initiative d’Invest In Africa financée par la Banque Africaine de Développement et en partenariat avec le Fonds pour les Partenariats Africains.",
  "Réponse concrète au déficit de compétences locales dans le secteur de l’Oil & Gas.",
  "Appui technique pour aider les PME à intégrer les chaînes d’approvisionnement des grandes entreprises et à accéder au financement.",
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
    image: "/media/cogesto/team/babacar-sow-4.png",
    name: "Babacar Sow",
    role: "Senior Advisor en stratégie",
    summary:
      "Président de Cogesto Consulting SAS, avec plus de 30 ans d’expérience dans le conseil, l’audit, le contrôle de gestion et l’administration des entreprises.",
  },
  {
    image: "/media/cogesto/team/dr-amadou-ba.png",
    name: "Dr. Amadou Ba",
    role: "Expert senior en politiques publiques et développement",
    summary:
      "Profil senior mobilisé sur les questions de développement, d’organisation, d’administration publique et d’accompagnement de projets structurants.",
  },
  {
    image: "/media/cogesto/team/equipe-cogesto-11.png",
    name: "Équipe BLP Cogesto",
    role: "Coaching, accompagnement et renforcement de capacités",
    summary:
      "Une équipe d’experts de haut niveau mobilisée pour accompagner la croissance des entreprises dans le secteur de l’Oil & Gas.",
  },
]

export const programExpertRoster = [
  {
    highlights: [
      "35 ans d’expérience",
      "Ingénieur en électromécanique",
      "Ancien dirigeant chez Libya Oil au Sénégal, au Tchad et au Soudan",
      "Ancien responsable opérations et supply chez Exxon Mobil Afrique",
    ],
    title: "Directeur de mission, consultant ingénieur industriel et pétrolier",
  },
  {
    highlights: [
      "22 ans d’expérience en RH et organisation",
      "Ancienne DRH de Neurotech, Matforce et Unilever Sénégal",
      "Certifiée RSE et audit des processus RH",
    ],
    title: "Experte en organisation et capital humain",
  },
  {
    highlights: [
      "27 ans d’expérience en conseil et business",
      "Certified Public Accountant à Montréal, spécialiste IFRS",
      "Expériences en direction financière et analyse financière en Amérique du Nord",
    ],
    title: "Experte en organisation et finance",
  },
  {
    highlights: [
      "Spécialiste en restructuration d’entreprises et diagnostic organisationnel",
      "37 ans d’expérience en conseil et en entreprise",
      "Président de SOFICO SAS, cabinet de conseil financier et conseil à l’investissement",
      "Ancien consultant chez Arthur Andersen & Co et Coopers & Lybrand",
    ],
    title: "Senior en restructuration d’entreprises",
  },
  {
    highlights: [
      "Expert international en marchés financiers et banque",
      "32 ans d’expérience dans les métiers du conseil et de la finance",
      "Docteur en économie et enseignant chercheur",
      "Ancien Directeur de l’Antenne de la BRVM au Sénégal",
    ],
    title: "Économiste, expert en banque et finance",
  },
  {
    highlights: [
      "29 ans d’expérience",
      "Enseignant, formateur et concepteur de programmes",
      "Ph.D. Philosophy",
      "Expérience académique internationale",
    ],
    title: "Expert en pédagogie",
  },
  {
    highlights: [
      "27 ans d’expérience dans le conseil et la formation",
      "Consultant international en management de projets et stratégie de développement",
      "Spécialiste ingénierie de formation Oil & Gas et contenu local",
    ],
    title: "Expert en management de projet et renforcement de compétences",
  },
  {
    highlights: [
      "28 ans d’expérience en logistique et supply chain",
      "Consultant et coach, DG Confluence Conseils & Events",
      "Interventions en distribution, agroalimentaire et industries",
    ],
    title: "Expert senior en logistique et supply chain",
  },
  {
    highlights: [
      "25 ans d’expérience en administration et conseil HSE",
      "Ancien directeur HSE chez DP World Afrique et ExxonMobil Afrique de l’Ouest et du Centre",
      "Formation en gestion des opérations pétrolières et systèmes intégrés",
    ],
    title: "QHSE et sécurité au BLP",
  },
  {
    highlights: [
      "Avocate au Barreau de l’Ontario",
      "Senior Associate DLA Piper Africa",
      "Spécialiste en droit corporate, droit informatique et droit international",
    ],
    title: "Avocate au Barreau de l’Ontario, consultante senior et juriste corporate",
  },
  {
    highlights: [
      "38 ans d’expérience en fiscalité",
      "Ancien directeur du contrôle interne de la DGID",
      "Ancien conseiller technique du Directeur général des Impôts et Domaines",
    ],
    title: "Consultant senior en organisation et fiscalité",
  },
  {
    highlights: [
      "21 ans d’expérience",
      "Expert-comptable inscrit à l’ONECCA Sénégal",
      "Expérience chez Baker Tilly, NSIA, SAHAM et Mazars",
    ],
    title: "Expert senior en structuration de financement",
  },
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

export const siteCopy = {
  description:
    "Cogesto Consulting SAS fournit des services de conseil et de formation aux entreprises publiques et privées. Le cabinet est spécialisé en élaboration et opérationnalisation de politiques stratégiques et financières, en accompagnement organisationnel et en management de la performance.",
  proposition:
    "Votre partenaire de confiance pour bâtir des organisations fortes, opérationnaliser les politiques stratégiques et piloter la performance.",
}
