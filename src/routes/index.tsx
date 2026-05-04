import { createFileRoute } from "@tanstack/react-router"

import type { BuilderPage } from "@/builder/types"
import { getDefaultBuilderPageData } from "@/builder/default-page-data"
import { LiveBuilderPage } from "@/builder/live-page"
import {
  AboutHomeSection,
  EventsPreview,
  ExpertisePreview,
  MethodSection,
  PartnersSection,
  ShowcaseSection,
  TeamSection,
} from "@/components/common-sections"
import { Hero } from "@/components/hero"
import { SiteFooter } from "@/components/site-footer"
import { getPublishedBuilderPage } from "@/server/payload/pages"

export const Route = createFileRoute("/")({
  head: ({ loaderData }) => {
    const page = loaderData

    return {
      meta: [
        { title: page?.metaTitle || "Cogesto Consulting | Conseil, finance et management de la performance" },
        {
          name: "description",
          content:
            page?.metaDescription ||
            "Cabinet de conseil et de formation au service de la performance des organisations : stratégie, finance, accompagnement organisationnel et renforcement de capacités.",
        },
      ],
    }
  },
  loader: async (): Promise<BuilderPage> => getPublishedBuilderPage({ data: { slug: "accueil" } }),
  component: HomePage,
})

function HomePage() {
  const page = Route.useLoaderData() as unknown as BuilderPage | undefined
  const data = page?.puckData ?? getDefaultBuilderPageData("accueil")

  if (!page || page.source === "fallback") {
    return <HomeBasePage />
  }

  return <LiveBuilderPage key="accueil" fallbackData={data} initialPage={page} slug="accueil" />
}

function HomeBasePage() {
  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <Hero />
      <PartnersSection />
      <AboutHomeSection />
      <ExpertisePreview />
      <MethodSection />
      <ShowcaseSection />
      <EventsPreview />
      <TeamSection />
      <SiteFooter />
    </main>
  )
}
