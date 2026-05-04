import type { Data } from "@puckeditor/core"

export type AnimationPreset = "none" | "fade-up" | "fade-in" | "scale-soft"

export type BuilderRootProps = {
  layout?: "home" | "standard"
  title?: string
}

// Puck page data is intentionally flexible: Payload stores validated JSON,
// while the actual editable surface is constrained by `builderConfig`.
export type BuilderPageData = Data<Record<string, Record<string, any>>, BuilderRootProps>

export type BuilderPage = {
  id?: number | string
  slug: string
  title: string
  metaTitle?: string
  metaDescription?: string
  source?: "payload" | "fallback"
  status: "draft" | "published"
  puckData: BuilderPageData
  updatedAt?: string
}
