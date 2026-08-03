import type { ReactNode } from "react"

import type { BuilderPage } from "@/builder/types"
import { LiveBuilderPage } from "@/builder/live-page"
import { buildSeoHead, resolveSeoDescription, resolveSeoTitle, type SeoConfig } from "@/lib/seo"

export function PublicPayloadBackedPage({
  fallback,
  page,
  slug,
}: {
  fallback: ReactNode
  page?: BuilderPage
  slug: string
}) {
  if (!page) return <>{fallback}</>

  return <LiveBuilderPage key={slug} fallbackData={page.puckData} initialPage={page} slug={slug} />
}

export function getPublicPayloadPageHead(
  page: BuilderPage | undefined,
  fallbackTitle: string,
  fallbackDescription: string,
  seo?: Omit<SeoConfig, "description" | "title">,
) {
  return buildSeoHead({
    description: resolveSeoDescription(page?.metaDescription, fallbackDescription),
    image: seo?.image,
    jsonLd: seo?.jsonLd,
    keywords: seo?.keywords ?? ["Cogesto Consulting", "cabinet de conseil Sénégal", "conseil finance Dakar"],
    path: seo?.path ?? `/${page?.slug ?? ""}`,
    title: resolveSeoTitle(page?.metaTitle, fallbackTitle),
    type: seo?.type,
  })
}
