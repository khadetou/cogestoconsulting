import { createFileRoute } from "@tanstack/react-router"

import type { BuilderPage } from "@/builder/types"
import { getDefaultBuilderPageData } from "@/builder/default-page-data"
import { LiveBuilderPage } from "@/builder/live-page"
import { buildSeoHead, resolveSeoDescription, resolveSeoTitle } from "@/lib/seo"
import { getPublishedBuilderPage } from "@/server/payload/pages"

export const Route = createFileRoute("/pages/$slug")({
  head: ({ loaderData }) => {
    const page = loaderData as BuilderPage | undefined
    const slug = page?.slug ?? "page"

    return buildSeoHead({
      title: resolveSeoTitle(page?.metaTitle, `${page?.title && !page.title.toLowerCase().includes("éditable") ? page.title : "Page"} | Cogesto Consulting`),
      description: resolveSeoDescription(
        page?.metaDescription,
        "Page Cogesto Consulting consacrée au conseil, à la finance, à l’organisation, à la formation et à la performance des entreprises.",
      ),
      keywords: [
        "Cogesto Consulting",
        "cabinet de conseil Sénégal",
        "conseil finance Dakar",
        "formation entreprises Sénégal",
        "performance organisationnelle",
      ],
      path: `/pages/${slug}`,
    })
  },
  loader: async ({ params }): Promise<BuilderPage> => getPublishedBuilderPage({ data: { slug: params.slug } }),
  component: EditablePublicPage,
})

function EditablePublicPage() {
  const page = Route.useLoaderData() as unknown as BuilderPage | undefined
  const data = page?.puckData ?? getDefaultBuilderPageData(page?.slug ?? "accueil")

  return <LiveBuilderPage fallbackData={data} initialPage={page} slug={page?.slug ?? "accueil"} />
}
