import { createFileRoute } from "@tanstack/react-router"

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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cogesto Consulting | Conseil, finance et management de la performance" },
      {
        name: "description",
        content:
          "Cabinet de conseil et de formation au service de la performance des organisations : stratégie, finance, accompagnement organisationnel et renforcement de capacités.",
      },
    ],
  }),
  component: HomePage,
})

function HomePage() {
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
