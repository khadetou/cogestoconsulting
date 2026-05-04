import { createFileRoute } from "@tanstack/react-router"

import type { BuilderPage } from "@/builder/types"
import { getDefaultBuilderPageData } from "@/builder/default-page-data"
import { LiveBuilderPage } from "@/builder/live-page"
import { getPublishedBuilderPage } from "@/server/payload/pages"

export const Route = createFileRoute("/pages/$slug")({
  head: ({ loaderData }) => {
    const page = loaderData as BuilderPage | undefined

    return {
      meta: [
        { title: page?.metaTitle || `${page?.title ?? "Page"} | Cogesto Consulting` },
        {
          name: "description",
          content:
            page?.metaDescription ||
            "Page éditable Cogesto Consulting, rendue par TanStack Start depuis Payload CMS.",
        },
      ],
    }
  },
  loader: async ({ params }): Promise<BuilderPage> => getPublishedBuilderPage({ data: { slug: params.slug } }),
  component: EditablePublicPage,
})

function EditablePublicPage() {
  const page = Route.useLoaderData() as unknown as BuilderPage | undefined
  const data = page?.puckData ?? getDefaultBuilderPageData(page?.slug ?? "accueil")

  return <LiveBuilderPage fallbackData={data} initialPage={page} slug={page?.slug ?? "accueil"} />
}
