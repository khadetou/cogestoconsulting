import { createFileRoute } from "@tanstack/react-router"

import type { BuilderPage } from "@/builder/types"
import { getDefaultBuilderPageData } from "@/builder/default-page-data"
import { LiveBuilderPage } from "@/builder/live-page"
import {
  AboutHomeSection,
  ExpertisePreview,
  MethodSection,
  PartnersSection,
  ShowcaseSection,
  TeamSection,
} from "@/components/common-sections"
import { Hero } from "@/components/hero"
import { SiteFooter } from "@/components/site-footer"
import { buildBreadcrumbSchema, buildSeoHead, buildServiceSchema, resolveSeoDescription, resolveSeoTitle, seoPages } from "@/lib/seo"
import { getPublishedBuilderPage } from "@/server/payload/pages"

export const Route = createFileRoute("/")({
  head: ({ loaderData }) => {
    const page = loaderData
    const seo = seoPages.home

    return buildSeoHead({
      ...seo,
      title: resolveSeoTitle(page?.metaTitle, seo.title),
      description: resolveSeoDescription(page?.metaDescription, seo.description),
      jsonLd: [
        buildServiceSchema(seo, "Conseil, finance, formation et management de la performance"),
        buildBreadcrumbSchema([{ name: "Accueil", path: "/" }]),
      ],
    })
  },
  loader: async (): Promise<BuilderPage> => getPublishedBuilderPage({ data: { slug: "accueil" } }),
  component: HomePage,
})

function HomePage() {
  const page = Route.useLoaderData() as unknown as BuilderPage | undefined
  const data = page?.puckData ?? getDefaultBuilderPageData("accueil")

  if (!page) {
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
      <TeamSection />
      <SiteFooter />
    </main>
  )
}
