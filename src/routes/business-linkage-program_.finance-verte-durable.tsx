import { createFileRoute } from "@tanstack/react-router"

import { BusinessLinkageOfferPage } from "@/components/business-linkage-offer-page"
import { businessLinkageOfferPages } from "@/lib/site-data"

const offer = businessLinkageOfferPages["finance-verte-durable"]

export const Route = createFileRoute("/business-linkage-program_/finance-verte-durable")({
  head: () => ({
    meta: [
      { title: `${offer.title} | Cogesto Consulting` },
      {
        name: "description",
        content:
          "Finance verte ou durable : accompagnement Cogesto Consulting pour structurer les projets à impact et préparer les dossiers de financement.",
      },
    ],
  }),
  component: FinanceVerteDurablePage,
})

function FinanceVerteDurablePage() {
  return <BusinessLinkageOfferPage offer={offer} />
}
