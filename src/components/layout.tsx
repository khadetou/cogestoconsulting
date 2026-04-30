import type { ReactNode } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="bg-[#082040] px-3 py-5 sm:px-4 lg:py-6">
        <div className="mx-auto max-w-[1840px]">
          <SiteHeader />
        </div>
      </div>
      {children}
      <SiteFooter />
    </div>
  )
}
