import { Render } from "@puckeditor/core"

import type { BuilderPageData } from "@/builder/types"
import { builderConfig } from "@/builder/config"
import { normalizeBuilderPageData } from "@/builder/normalize"

export function BuilderPageRenderer({ data }: { data: BuilderPageData }) {
  return <Render config={builderConfig} data={normalizeBuilderPageData(data)} />
}
