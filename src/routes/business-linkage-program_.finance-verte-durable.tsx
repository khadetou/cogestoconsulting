import { createFileRoute } from "@tanstack/react-router"

import { BusinessLinkageOfferPage } from "@/components/business-linkage-offer-page"
import { businessLinkageOfferPages } from "@/lib/site-data"
import { buildBreadcrumbSchema, buildSeoHead, buildServiceSchema, seoPages } from "@/lib/seo"

const offer = businessLinkageOfferPages["finance-verte-durable"]

export const Route = createFileRoute("/business-linkage-program_/finance-verte-durable")({
  head: () =>
    buildSeoHead({
      ...seoPages.financeVerteDurable,
      jsonLd: [
        buildServiceSchema(seoPages.financeVerteDurable, "Finance verte, finance durable, ESG et structuration de projets à impact"),
        buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Business Linkage Program", path: "/business-linkage-program" },
          { name: offer.title, path: seoPages.financeVerteDurable.path },
        ]),
      ],
    }),
  component: FinanceVerteDurablePage,
})

function FinanceVerteDurablePage() {
  return <BusinessLinkageOfferPage offer={offer} />
}
