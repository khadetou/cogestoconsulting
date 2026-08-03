import { createFileRoute } from "@tanstack/react-router"

import { BusinessLinkageOfferPage } from "@/components/business-linkage-offer-page"
import { businessLinkageOfferPages } from "@/lib/site-data"
import { buildBreadcrumbSchema, buildSeoHead, buildServiceSchema, seoPages } from "@/lib/seo"

const offer = businessLinkageOfferPages["parcours-entrepreneur"]

export const Route = createFileRoute("/business-linkage-program_/parcours-entrepreneur")({
  head: () =>
    buildSeoHead({
      ...seoPages.parcoursEntrepreneur,
      jsonLd: [
        buildServiceSchema(seoPages.parcoursEntrepreneur, "Accompagnement entrepreneurial, formalisation, business plan et accès au financement"),
        buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Business Linkage Program", path: "/business-linkage-program" },
          { name: offer.title, path: seoPages.parcoursEntrepreneur.path },
        ]),
      ],
    }),
  component: ParcoursEntrepreneurPage,
})

function ParcoursEntrepreneurPage() {
  return <BusinessLinkageOfferPage offer={offer} />
}
