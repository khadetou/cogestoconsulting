import type { ReactNode } from "react"

import type { BuilderPage } from "@/builder/types"
import { LiveBuilderPage } from "@/builder/live-page"

export function PublicPayloadBackedPage({
  fallback,
  page,
  slug,
}: {
  fallback: ReactNode
  page?: BuilderPage
  slug: string
}) {
  if (!page || page.source === "fallback") return <>{fallback}</>

  return <LiveBuilderPage key={slug} fallbackData={page.puckData} initialPage={page} slug={slug} />
}

export function getPublicPayloadPageHead(
  page: BuilderPage | undefined,
  fallbackTitle: string,
  fallbackDescription: string,
) {
  return {
    meta: [
      { title: page?.metaTitle || fallbackTitle },
      {
        name: "description",
        content: page?.metaDescription || fallbackDescription,
      },
    ],
  }
}
