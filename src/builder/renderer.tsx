import type { ComponentType } from "react"

import type { BuilderPageData } from "@/builder/types"
import {
  BuilderAboutPageContentBlock,
  BuilderBlpPageContentBlock,
  BuilderContactBlock,
  BuilderContactPageContentBlock,
  BuilderCtaBlock,
  BuilderEventsPageContentBlock,
  BuilderExpertisesPageContentBlock,
  BuilderFooterBlock,
  BuilderHeroBlock,
  BuilderHomeContentBlock,
  BuilderIconCardsBlock,
  BuilderTextImageBlock,
} from "@/builder/blocks"
import { PageLayout } from "@/components/layout"
import { normalizeBuilderPageData } from "@/builder/normalize"

const publicBlockComponents: Record<string, ComponentType<any>> = {
  AboutPageContentBlock: BuilderAboutPageContentBlock,
  BlpPageContentBlock: BuilderBlpPageContentBlock,
  ContactBlock: BuilderContactBlock,
  ContactPageContentBlock: BuilderContactPageContentBlock,
  CtaBlock: BuilderCtaBlock,
  EventsPageContentBlock: BuilderEventsPageContentBlock,
  ExpertisesPageContentBlock: BuilderExpertisesPageContentBlock,
  FooterBlock: BuilderFooterBlock,
  HeroBlock: BuilderHeroBlock,
  HomeContentBlock: BuilderHomeContentBlock,
  IconCardsBlock: BuilderIconCardsBlock,
  TextImageBlock: BuilderTextImageBlock,
}

export function BuilderPageRenderer({ data }: { data: BuilderPageData }) {
  const normalizedData = normalizeBuilderPageData(data)
  const rootProps = normalizedData.root?.props ?? {}
  const layout = rootProps.layout === "home" ? "home" : "standard"
  const blocks = normalizedData.content?.map((item, index) => {
    const Component = publicBlockComponents[item.type ?? ""]

    if (!Component) return null

    const props = item.props && typeof item.props === "object" ? item.props : {}
    const key = typeof props.id === "string" ? props.id : `${item.type}-${index}`

    return <Component key={key} {...props} />
  })

  if (layout === "home") {
    return <main className="overflow-x-hidden bg-background text-foreground">{blocks}</main>
  }

  return (
    <PageLayout showFooter={false}>
      <main className="overflow-x-hidden bg-background text-foreground">{blocks}</main>
    </PageLayout>
  )
}
