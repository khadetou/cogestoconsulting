import { getDefaultBuilderPageData } from "../src/builder/default-page-data"
import { normalizeBuilderPageData } from "../src/builder/normalize"
import { getPayloadClient } from "../src/server/payload/client"

const slug = process.argv[2]?.trim() || "accueil"

const payload = await getPayloadClient()
const existing = await payload.find({
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

if (!existing.docs.length) {
  await payload.create({
    collection: "pages",
    data: {
      _status: "published",
      puckData: normalizeBuilderPageData(getDefaultBuilderPageData(slug)),
      slug,
      title: slug === "accueil" ? "Accueil éditable" : `Page ${slug}`,
    },
    overrideAccess: true,
  })
} else {
  await payload.update({
    collection: "pages",
    data: {
      _status: "published",
      puckData: normalizeBuilderPageData(getDefaultBuilderPageData(slug)),
    },
    id: existing.docs[0].id,
    overrideAccess: true,
  })
}

await payload.destroy()
process.exit(0)
