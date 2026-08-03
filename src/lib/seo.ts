import { contact, socialLinks, type SiteEvent } from "@/lib/site-data"

export const SITE_URL = "https://www.cogestoconsulting.com"
export const SITE_NAME = "Cogesto Consulting"
export const DEFAULT_OG_IMAGE = "/og-image.png"

export type SeoConfig = {
  description: string
  image?: string
  keywords: Array<string>
  path: string
  title: string
  type?: "article" | "website"
  jsonLd?: Array<Record<string, unknown>>
}

export const seoPages = {
  home: {
    title: "Cogesto Consulting | Conseil, finance et management de la performance",
    description:
      "Cogesto Consulting accompagne les entreprises, PME, institutions et startups en stratégie, finance, organisation, formation et management de la performance en Afrique francophone.",
    keywords: [
      "Cogesto Consulting",
      "cabinet de conseil Sénégal",
      "conseil finance Dakar",
      "management de la performance",
      "consultance Afrique francophone",
      "formation entreprises Sénégal",
      "accompagnement PME",
    ],
    path: "/",
  },
  about: {
    title: "À propos de Cogesto Consulting | Mission, valeurs et équipe",
    description:
      "Découvrez Cogesto Consulting, cabinet de conseil basé à Dakar : mission, valeurs, gouvernance, équipe dirigeante et engagements pour la performance durable des organisations.",
    keywords: [
      "à propos Cogesto Consulting",
      "cabinet conseil Dakar",
      "mission cabinet conseil",
      "valeurs Cogesto Consulting",
      "gouvernance cabinet conseil",
      "équipe conseil Sénégal",
    ],
    path: "/about",
  },
  expertises: {
    title: "Expertises conseil, finance, organisation et digitalisation | Cogesto",
    description:
      "Explorez les expertises de Cogesto Consulting : stratégie d’entreprise, capital humain, gouvernance, performance, transformation, digitalisation, normes qualité, formation et ingénierie financière.",
    keywords: [
      "expertises conseil Sénégal",
      "stratégie d’entreprise",
      "organisation et capital humain",
      "management de la performance",
      "ingénierie financière",
      "digitalisation entreprise",
      "norme et qualité",
      "QHSE Sénégal",
    ],
    path: "/expertises",
  },
  businessLinkageProgram: {
    title: "Business Linkage Program Sénégal | PME, Oil & Gas et contenu local",
    description:
      "Le Business Linkage Program accompagne les PME sénégalaises dans le secteur Oil & Gas : diagnostics, renforcement de capacités, accès marché, financement et contenu local.",
    keywords: [
      "Business Linkage Program Sénégal",
      "BLP Oil & Gas Sénégal",
      "accompagnement PME Oil & Gas",
      "contenu local Sénégal",
      "accès marché PME",
      "financement PME Sénégal",
      "renforcement de capacités PME",
    ],
    path: "/business-linkage-program",
  },
  financeVerteDurable: {
    title: "Finance verte ou durable | Structuration de projets à impact",
    description:
      "Cogesto Consulting accompagne les projets de finance verte et durable : cadrage, structuration, business plan, conformité ESG/RSE et préparation des dossiers de financement.",
    keywords: [
      "finance verte Sénégal",
      "finance durable PME",
      "projets à impact",
      "financement vert",
      "ESG Sénégal",
      "RSE entreprise",
      "business plan financement",
    ],
    path: "/business-linkage-program/finance-verte-durable",
  },
  parcoursEntrepreneur: {
    title: "PACTES - Parcours de l’entrepreneur | Startups, femmes et PME",
    description:
      "Le parcours PACTES accompagne jeunes, femmes, startups et PME de l’idée au financement : formalisation, business model, business plan bancable, accès marché et croissance.",
    keywords: [
      "PACTES",
      "Parcours de l’entrepreneur Sénégal",
      "accompagnement startups PME",
      "formalisation entreprise",
      "business plan bancable",
      "accès au financement PME",
      "entrepreneuriat Sénégal",
    ],
    path: "/business-linkage-program/parcours-entrepreneur",
  },
  events: {
    title: "Évènements et formations | Cogesto Consulting",
    description:
      "Retrouvez les évènements, formations, séminaires, coaching de dirigeants et galeries d’activités organisés ou animés par Cogesto Consulting.",
    keywords: [
      "évènements Cogesto Consulting",
      "formation analyse financière",
      "coaching top management",
      "séminaires entreprises Sénégal",
      "formation dirigeants Dakar",
      "galerie formations Cogesto",
    ],
    path: "/events",
  },
  contact: {
    title: "Contact Cogesto Consulting | Conseil et formation à Dakar",
    description:
      "Contactez Cogesto Consulting à Dakar pour vos besoins en stratégie, organisation, finance, performance, formation, digitalisation et accompagnement PME.",
    keywords: [
      "contact Cogesto Consulting",
      "cabinet conseil Dakar contact",
      "conseil finance Dakar",
      "formation entreprises Sénégal contact",
      "consultance Dakar",
      "accompagnement PME Sénégal",
    ],
    path: "/contact",
  },
} satisfies Record<string, SeoConfig>

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function resolveSeoTitle(value: string | undefined, fallback: string) {
  if (!value || isPlaceholderSeoText(value)) return fallback
  return value
}

export function resolveSeoDescription(value: string | undefined, fallback: string) {
  if (!value || isPlaceholderSeoText(value)) return fallback
  return value
}

function isPlaceholderSeoText(value: string) {
  const normalized = value.toLowerCase()

  return (
    normalized.includes("éditable") ||
    normalized.includes("editable") ||
    normalized.includes("payload cms") ||
    normalized.includes("tanstack start")
  )
}

export function buildSeoHead(config: SeoConfig) {
  const url = absoluteUrl(config.path)
  const image = absoluteUrl(config.image ?? DEFAULT_OG_IMAGE)
  const keywords = config.keywords.join(", ")
  const jsonLd = [buildWebPageSchema(config), ...(config.jsonLd ?? [])]

  return {
    meta: [
      { title: config.title },
      { name: "description", content: config.description },
      { name: "keywords", content: keywords },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: config.type ?? "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: config.title },
      { property: "og:description", content: config.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: `${SITE_NAME} - ${config.title}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: config.title },
      { name: "twitter:description", content: config.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((entry) => ({
      type: "application/ld+json",
      children: JSON.stringify(entry),
    })),
  }
}

export function buildRootSeoHead(stylesheetHref: string) {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#152036" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "stylesheet", href: stylesheetHref },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/icon-192.png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preload", href: "/og-image.png", as: "image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildOrganizationSchema()),
      },
    ],
  }
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildWebPageSchema(config: SeoConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(config.path)}#webpage`,
    url: absoluteUrl(config.path),
    name: config.title,
    description: config.description,
    inLanguage: "fr-SN",
    keywords: config.keywords,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  }
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/brand/cogesto-logo-official.svg"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description:
      "Cabinet de conseil, finance, formation et management de la performance basé à Dakar, au service des organisations publiques et privées.",
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Dakar",
      addressCountry: "SN",
    },
    areaServed: ["Sénégal", "Afrique francophone", "Maroc", "Canada"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "customer service",
      areaServed: "SN",
      availableLanguage: ["fr"],
    },
    sameAs: socialLinks.map((link) => link.href),
  }
}

export function buildServiceSchema(config: SeoConfig, serviceType: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.title,
    description: config.description,
    serviceType,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: ["Sénégal", "Afrique francophone"],
    url: absoluteUrl(config.path),
    keywords: config.keywords,
  }
}

export function buildEventSeo(event: SiteEvent | undefined): SeoConfig {
  if (!event) {
    return {
      title: "Évènement Cogesto Consulting",
      description: "Fiche évènement Cogesto Consulting : formation, coaching, séminaire ou activité professionnelle.",
      keywords: ["évènement Cogesto Consulting", "formation Sénégal", "séminaire entreprise Dakar"],
      path: "/events",
      type: "article",
    }
  }

  const path = event.href
  const keywords = [
    event.title,
    `${event.category} Cogesto Consulting`,
    event.organizer,
    "formation entreprise Sénégal",
    "séminaire professionnel Dakar",
    "renforcement de capacités",
  ].filter(Boolean)
  const config: SeoConfig = {
    title: `${event.title} | Cogesto Consulting`,
    description: event.summary,
    image: event.image,
    keywords,
    path,
    type: "article",
    jsonLd: [
      buildBreadcrumbSchema([
        { name: "Accueil", path: "/" },
        { name: "Évènements", path: "/events" },
        { name: event.title, path },
      ]),
      buildEventSchema(event),
    ],
  }

  return config
}

function buildEventSchema(event: SiteEvent) {
  const startDate = toIsoDate(event.date)

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    image: event.gallery.map((image) => absoluteUrl(image)),
    startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventCompleted",
    location: {
      "@type": "Place",
      name: event.venue ?? event.location ?? "Dakar",
      address: event.location ?? event.venue ?? "Dakar, Sénégal",
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer,
      url: SITE_URL,
    },
    url: absoluteUrl(event.href),
  }
}

function toIsoDate(date: string) {
  const normalized = date.toLowerCase()
  const day = normalized.match(/\b(\d{1,2})\b/)?.[1] ?? "01"
  const year = normalized.match(/\b(20\d{2})\b/)?.[1] ?? "2024"
  const monthMap: Record<string, string> = {
    janvier: "01",
    février: "02",
    fevrier: "02",
    mars: "03",
    avril: "04",
    mai: "05",
    juin: "06",
    juillet: "07",
    août: "08",
    aout: "08",
    septembre: "09",
    octobre: "10",
    novembre: "11",
    décembre: "12",
    decembre: "12",
  }
  const month = Object.entries(monthMap).find(([label]) => normalized.includes(label))?.[1] ?? "01"

  return `${year}-${month}-${day.padStart(2, "0")}`
}
