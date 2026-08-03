import type { BuilderPageData } from "@/builder/types"

type EditableItem = {
  props?: Record<string, unknown>
  type?: string
  [key: string]: unknown
}

const siteFooterBlock: EditableItem = {
  props: {
    address:
      "Immeuble Saliou Ndione, 2ème étage, Fenêtre Mermoz, Route de la Corniche Ouest, Dakar",
    body:
      "Un cabinet engagé pour accompagner la croissance, la transformation et la compétitivité des organisations publiques et privées.",
    copyright: "Copyright 2026. Tous droits réservés.",
    email: "infos@cogestoconsulting.com",
    id: "cogesto-site-footer",
    phone: "+221 33 868 43 11",
    presence: "Présence au Sénégal, au Maroc et au Canada.",
    title: "Conseil, finance et management de la performance.",
  },
  type: "FooterBlock",
}

const textCorrections = [
  [
    "Une démarche orientée diagnostic, outils pratiques, accompagnement personnalisé et résultats durables.",
    "Nous mettons notre expertise au service de la croissance et de la compétitivité des startups et entreprises d’Afrique francophone actives dans des secteurs stratégiques tels que l’agro-industrie et le numérique.",
  ],
  [
    "Mettre l’expertise au service de la performance des organisation et  des équipes.",
    "Mettre l’expertise au service de la performance des organisations et des équipes.",
  ],
  [
    "Mettre l’expertise au service de la performance des organisation et des équipes.",
    "Mettre l’expertise au service de la performance des organisations et des équipes.",
  ],
]

const sectorGroupAdditions: Record<string, Array<string>> = {
  "Industrie & infrastructures": [
    "Automobile",
    "Énergie et électricité",
    "Mécanique générale",
  ],
  Services: ["Étude, ingénierie et conseil"],
}

const functionalExpertiseAdditions = [
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
]

function normalizeKnownText(value: string) {
  return textCorrections.reduce((nextValue, [from, to]) => nextValue.replaceAll(from, to), value)
}

function appendMissingItems(items: Array<unknown>, additions: Array<string>) {
  const existing = new Set(items.filter((item): item is string => typeof item === "string"))
  const missing = additions.filter((item) => !existing.has(item))

  return missing.length ? [...items, ...missing] : items
}

function appendMissingRecordsByTitle<T extends { title: string }>(items: Array<unknown>, additions: Array<T>) {
  const existing = new Set(
    items
      .map((item) => (item && typeof item === "object" && "title" in item ? item.title : undefined))
      .filter((title): title is string => typeof title === "string"),
  )
  const missing = additions.filter((item) => !existing.has(item.title))

  return missing.length ? [...items, ...missing] : items
}

function normalizeKnownCopy<T>(value: T): T {
  if (typeof value === "string") return normalizeKnownText(value) as T
  if (Array.isArray(value)) return value.map((item) => normalizeKnownCopy(item)) as T
  if (value && typeof value === "object") {
    const normalizedObject = Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, normalizeKnownCopy(nestedValue)]),
    )
    const title = typeof normalizedObject.title === "string" ? normalizedObject.title : ""
    const additions = sectorGroupAdditions[title]

    if (additions && Array.isArray(normalizedObject.sectors)) {
      normalizedObject.sectors = appendMissingItems(normalizedObject.sectors, additions)
    }

    if (Array.isArray(normalizedObject.detailedFunctionalExpertise)) {
      normalizedObject.detailedFunctionalExpertise = appendMissingRecordsByTitle(
        normalizedObject.detailedFunctionalExpertise,
        functionalExpertiseAdditions,
      )
    }

    return normalizedObject as T
  }

  return value
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function uniqueId(base: string, used: Set<string>) {
  let id = base
  let index = 2

  while (used.has(id)) {
    id = `${base}-${index}`
    index += 1
  }

  used.add(id)
  return id
}

function normalizeContent(content: unknown, zone: string, used: Set<string>) {
  if (!Array.isArray(content)) return []

  return content
    .filter((item): item is EditableItem => Boolean(item) && typeof item === "object")
    .map((item, index) => {
      const props = item.props && typeof item.props === "object" ? item.props : {}
      const type = typeof item.type === "string" ? item.type : "Block"
      const existingId = typeof props.id === "string" && props.id.trim() ? props.id.trim() : ""
      const fallbackId = `cogesto-${toSlug(zone)}-${toSlug(type)}-${index + 1}`
      const id = uniqueId(existingId || fallbackId, used)

      return {
        ...item,
        props: {
          ...props,
          id,
        },
        type,
      }
    })
}

function ensureSiteFooter(content: unknown) {
  const items = Array.isArray(content)
    ? content.filter((item): item is EditableItem => Boolean(item) && typeof item === "object")
    : []
  const hasFooter = items.some((item) => item.type === "FooterBlock")

  return hasFooter ? items : [...items, siteFooterBlock]
}

export function normalizeBuilderPageData(data: BuilderPageData | null | undefined): BuilderPageData {
  const normalizedData = normalizeKnownCopy(data)
  const used = new Set<string>()
  const root = normalizedData?.root
  const rootProps = root && typeof root.props === "object" ? root.props : {}
  const zones = normalizedData?.zones && typeof normalizedData.zones === "object" ? normalizedData.zones : {}

  return {
    content: normalizeContent(ensureSiteFooter(normalizedData?.content), "default-zone", used),
    root: {
      ...root,
      props: {
        title: "Page Cogesto Consulting",
        ...rootProps,
      },
    },
    zones: Object.fromEntries(
      Object.entries(zones).map(([zone, content]) => [zone, normalizeContent(content, zone, used)]),
    ),
  }
}
