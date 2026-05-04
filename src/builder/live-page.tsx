import { useServerFn } from "@tanstack/react-start"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import type { BuilderPage, BuilderPageData } from "@/builder/types"
import { subscribeToBuilderPageUpdates } from "@/builder/live-sync"
import { BuilderPageRenderer } from "@/builder/renderer"
import { getPublishedBuilderPage } from "@/server/payload/pages"

export function LiveBuilderPage({
  fallbackData,
  initialPage,
  slug,
}: {
  fallbackData: BuilderPageData
  initialPage?: BuilderPage
  slug: string
}) {
  const getPage = useServerFn(getPublishedBuilderPage)
  const [page, setPage] = useState<BuilderPage | undefined>(initialPage)
  const latestUpdatedAt = useRef(initialPage?.updatedAt ?? "")
  const isRefreshing = useRef(false)
  const currentPage = page?.slug === slug ? page : undefined
  const renderData = useMemo(() => currentPage?.puckData ?? fallbackData, [currentPage?.puckData, fallbackData])

  useEffect(() => {
    const nextPage = initialPage?.slug === slug ? initialPage : undefined

    setPage(nextPage)
    latestUpdatedAt.current = nextPage?.updatedAt ?? ""
  }, [initialPage, slug])

  const refreshPublishedPage = useCallback(async () => {
    if (isRefreshing.current) return

    isRefreshing.current = true

    try {
      const nextPage = await getPage({ data: { slug } })

      if (nextPage.source === "fallback") return
      if (nextPage.slug !== slug) return

      latestUpdatedAt.current = nextPage.updatedAt ?? latestUpdatedAt.current
      setPage(nextPage)
    } catch (error) {
      console.warn("Impossible de synchroniser la page Cogesto publiée.", error)
    } finally {
      isRefreshing.current = false
    }
  }, [getPage, slug])

  useEffect(() => {
    return subscribeToBuilderPageUpdates((event) => {
      if (event.slug !== slug || event.status !== "published") return
      void refreshPublishedPage()
    })
  }, [refreshPublishedPage, slug])

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refreshPublishedPage()
    }, 1000)

    return () => window.clearInterval(interval)
  }, [refreshPublishedPage])

  return <BuilderPageRenderer data={renderData} />
}
