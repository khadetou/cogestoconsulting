import {
  accreditations,
  approach,
  commitments,
  contact,
  events,
  extendedExpertise,
  functionalExpertise,
  leaders,
  metrics,
  presence,
  programExperts,
  programObjectives,
  programPartners,
  programResults,
  referenceLogos,
  sectorExpertise,
  siteCopy,
  socialLinks,
  values,
} from "@/lib/site-data"

export const siteQueryKey = ["cogesto-site-content"] as const

export function getSiteContent() {
  return {
    accreditations,
    approach,
    commitments,
    contact,
    events,
    extendedExpertise,
    functionalExpertise,
    leaders,
    metrics,
    presence,
    programExperts,
    programObjectives,
    programPartners,
    programResults,
    referenceLogos,
    sectorExpertise,
    siteCopy,
    socialLinks,
    values,
  }
}
