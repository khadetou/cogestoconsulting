import { createFileRoute } from "@tanstack/react-router"

import { BusinessLinkageOfferPage } from "@/components/business-linkage-offer-page"
import { businessLinkageOfferPages } from "@/lib/site-data"

const offer = businessLinkageOfferPages["parcours-entrepreneur"]

export const Route = createFileRoute("/business-linkage-program_/parcours-entrepreneur")({
  head: () => ({
    meta: [
      { title: `${offer.title} | Cogesto Consulting` },
      {
        name: "description",
        content:
          "Parcours de l’entrepreneur : accompagnement Cogesto Consulting pour structurer le pilotage, la croissance et l’accès au marché des dirigeants de PME.",
      },
    ],
  }),
  component: ParcoursEntrepreneurPage,
})

function ParcoursEntrepreneurPage() {
  return <BusinessLinkageOfferPage offer={offer} />
}
