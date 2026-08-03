import { defaultBuilderPagesBySlug, getDefaultBuilderPageData } from "../src/builder/default-page-data"
import { normalizeBuilderPageData } from "../src/builder/normalize"
import { getPayloadClient } from "../src/server/payload/client"
import type { BuilderPageData } from "../src/builder/types"

const email = process.env.PAYLOAD_ADMIN_EMAIL ?? "admin@cogestoconsulting.com"
const password = process.env.PAYLOAD_ADMIN_PASSWORD ?? "ChangeMeCogesto2026!"
const isProductionSeed = process.env.VERCEL || process.env.NODE_ENV === "production"

if (isProductionSeed && password === "ChangeMeCogesto2026!") {
  throw new Error("PAYLOAD_ADMIN_PASSWORD must be set to a strong production password before seeding.")
}

const payload = await getPayloadClient()

const editablePageMeta: Record<string, { metaDescription: string; metaTitle: string; title: string }> = {
  accueil: {
    metaDescription:
      "Cogesto Consulting accompagne les entreprises, PME, institutions et startups en stratégie, finance, organisation, formation et management de la performance en Afrique francophone.",
    metaTitle: "Cogesto Consulting | Conseil, finance et management de la performance",
    title: "Accueil",
  },
  about: {
    metaDescription:
      "Découvrez Cogesto Consulting, cabinet de conseil basé à Dakar : mission, valeurs, gouvernance, équipe dirigeante et engagements pour la performance durable des organisations.",
    metaTitle: "À propos de Cogesto Consulting | Mission, valeurs et équipe",
    title: "À propos",
  },
  expertises: {
    metaDescription:
      "Explorez les expertises de Cogesto Consulting : stratégie d’entreprise, capital humain, gouvernance, performance, transformation, digitalisation, normes qualité, formation et ingénierie financière.",
    metaTitle: "Expertises conseil, finance, organisation et digitalisation | Cogesto",
    title: "Expertises",
  },
  "business-linkage-program": {
    metaDescription:
      "Le Business Linkage Program accompagne les PME sénégalaises dans le secteur Oil & Gas : diagnostics, renforcement de capacités, accès marché, financement et contenu local.",
    metaTitle: "Business Linkage Program Sénégal | PME, Oil & Gas et contenu local",
    title: "Business Linkage Program",
  },
  events: {
    metaDescription:
      "Retrouvez les évènements, formations, séminaires, coaching de dirigeants et galeries d’activités organisés ou animés par Cogesto Consulting.",
    metaTitle: "Évènements et formations | Cogesto Consulting",
    title: "Évènements",
  },
  contact: {
    metaDescription:
      "Contactez Cogesto Consulting à Dakar pour vos besoins en stratégie, organisation, finance, performance, formation, digitalisation et accompagnement PME.",
    metaTitle: "Contact Cogesto Consulting | Conseil et formation à Dakar",
    title: "Contact",
  },
}

type BuilderBlockData = {
  props: Record<string, any> & { id: string }
  type: string
}

function mergeDefaultPageBlocks(slug: string, existing: unknown) {
  const defaultData = getDefaultBuilderPageData(slug)
  const existingData = existing ? (existing as BuilderPageData) : defaultData
  const normalizedExisting = normalizeBuilderPageData(existingData)
  const normalizedDefault = normalizeBuilderPageData(defaultData)
  const normalizedExistingById = new Map(
    normalizedExisting.content.map((item) => [String(item.props.id), item]),
  )
  const normalizedExistingBySignature = new Map(
    normalizedExisting.content.map((item) => [`${item.type}:${String(item.props.title ?? "")}`, item]),
  )
  const mergedDefaultBlocks = normalizedDefault.content.map((defaultItem) => {
    const existingItem =
      normalizedExistingById.get(String(defaultItem.props.id)) ??
      normalizedExistingBySignature.get(`${defaultItem.type}:${String(defaultItem.props.title ?? "")}`)

    if (!existingItem) return defaultItem

    return {
      ...existingItem,
      props: mergeDefaultBlockProps(slug, defaultItem, existingItem),
    }
  })
  const defaultSignatures = new Set(
    normalizedDefault.content.map((item) => `${item.type}:${String(item.props.title ?? "")}`),
  )
  const defaultIds = new Set(normalizedDefault.content.map((item) => String(item.props.id)))
  const legacyHomeBlockIds = new Set([
    "cogesto-home-about",
    "cogesto-home-blp",
    "cogesto-home-contact",
    "cogesto-home-cta",
    "cogesto-home-events",
    "cogesto-home-expertises",
    "cogesto-home-method",
    "cogesto-home-partners",
    "cogesto-home-showcase",
    "cogesto-home-team",
  ])
  const customBlocks = normalizedExisting.content.filter(
    (item) =>
      (slug !== "accueil" || !legacyHomeBlockIds.has(String(item.props.id))) &&
      (slug !== "accueil" || item.type !== "HomeBaseSectionBlock") &&
      !defaultIds.has(String(item.props.id)) &&
      !defaultSignatures.has(`${item.type}:${String(item.props.title ?? "")}`),
  )

  return {
    ...normalizedExisting,
    root: {
      ...normalizedDefault.root,
      ...normalizedExisting.root,
      props: mergeDefaultRootProps(normalizedDefault.root.props, normalizedExisting.root.props),
    },
    content: [...mergedDefaultBlocks, ...customBlocks],
  }
}

function mergeDefaultRootProps(
  defaultProps: BuilderPageData["root"]["props"],
  existingProps: BuilderPageData["root"]["props"],
) {
  const safeDefaultProps = defaultProps ?? {}
  const safeExistingProps = existingProps ?? {}
  const props = {
    ...safeDefaultProps,
    ...safeExistingProps,
  }

  if (safeExistingProps.title === "Page Cogesto Consulting") {
    props.title = safeDefaultProps.title
  }

  return props
}

function mergeDefaultBlockProps(
  slug: string,
  defaultItem: BuilderBlockData,
  existingItem: BuilderBlockData,
) {
  const props: BuilderBlockData["props"] = {
    ...defaultItem.props,
    ...existingItem.props,
    id: defaultItem.props.id,
  }

  if (slug !== "accueil" || defaultItem.props.id !== "cogesto-home-hero") return props

  const oldHomeHeroDefaults: Record<string, unknown> = {
    body: "Cogesto Consulting accompagne les organisations publiques et privées dans leurs enjeux de stratégie, finance, organisation, performance et transformation.",
    primaryHref: "/contact",
    primaryLabel: "Contacter le cabinet",
    secondaryHref: "/expertises",
    secondaryLabel: "Nos expertises",
    variant: "image",
  }

  for (const [key, oldValue] of Object.entries(oldHomeHeroDefaults)) {
    if (existingItem.props[key] === oldValue) {
      props[key] = defaultItem.props[key]
    }
  }

  return props
}

const existingUsers = await payload.find({
  collection: "users",
  limit: 1,
  overrideAccess: true,
  pagination: false,
  where: {
    email: {
      equals: email,
    },
  },
})

if (!existingUsers.docs.length) {
  await payload.create({
    collection: "users",
    data: {
      email,
      password,
    },
    overrideAccess: true,
  })

  console.log(`Created Payload editor user: ${email}`)
} else {
  console.log(`Payload editor user already exists: ${email}`)
}

for (const slug of Object.keys(defaultBuilderPagesBySlug)) {
  const meta = editablePageMeta[slug]
  const existingPages = await payload.find({
    collection: "pages",
    draft: true,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!existingPages.docs.length) {
    await payload.create({
      collection: "pages",
      data: {
        _status: "published",
        metaDescription: meta.metaDescription,
        metaTitle: meta.metaTitle,
        puckData: normalizeBuilderPageData(getDefaultBuilderPageData(slug)),
        slug,
        title: meta.title,
      },
      overrideAccess: true,
    })

    console.log(`Created published editable page: /pages/${slug}`)
  } else {
    await payload.update({
      collection: "pages",
      data: {
        metaDescription: meta.metaDescription,
        metaTitle: meta.metaTitle,
        puckData: mergeDefaultPageBlocks(slug, existingPages.docs[0].puckData),
        title: meta.title,
      },
      id: existingPages.docs[0].id,
      overrideAccess: true,
    })

    console.log(`Editable page already exists: /pages/${slug}`)
  }
}

await payload.destroy()
process.exit(0)
