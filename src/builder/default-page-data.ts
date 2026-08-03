import type { BuilderPageData } from "@/builder/types"
import { liveBuilderPageDataBySlug } from "@/builder/live-page-snapshots"

export const defaultBuilderPageData: BuilderPageData = liveBuilderPageDataBySlug.accueil

export const defaultBuilderPagesBySlug: Record<string, BuilderPageData> = liveBuilderPageDataBySlug

export function getDefaultBuilderPageData(slug: string) {
  return defaultBuilderPagesBySlug[slug] ?? defaultBuilderPageData
}
