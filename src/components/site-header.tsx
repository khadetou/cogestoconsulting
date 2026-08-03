import { Link, useLocation } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  ExternalLink,
  Globe2,
  Handshake,
  LayoutGrid,
  LogIn,
  LogOut,
  Mail,
  Menu,
  UserRound,
  Users,
  X,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { MouseEvent } from "react"

import type { OdooSessionProfile } from "@/lib/odoo-session-profile"
import type { SiteNavItem, SiteNavLink } from "@/lib/site-data"
import {
  getOdooAvatarUrl,
  getOdooProfileInitials,
  logoutFromOdoo,
  readOdooSessionProfile,
} from "@/lib/odoo-session-profile"
import { contact, siteMenuItems } from "@/lib/site-data"
import { cn } from "@/lib/utils"
import { getSiteNavigationSettings } from "@/server/payload/pages"

export const siteNavigationUpdateEvent = "cogesto-navigation:update"

const itemIcon = {
  "A propos": Users,
  "Nos expertises": BriefcaseBusiness,
  Programmes: Handshake,
} as const

const editablePageSlugs = new Set([
  "accueil",
  "about",
  "expertises",
  "business-linkage-program",
  "events",
  "contact",
])

export function SiteHeader({
  editorNavigation = false,
}: {
  editorNavigation?: boolean
}) {
  const location = useLocation()
  const getNavigation = useServerFn(getSiteNavigationSettings)
  const headerRef = useRef<HTMLDivElement>(null)
  const [desktopMenuLabel, setDesktopMenuLabel] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileSections, setMobileSections] = useState<Array<string>>([])
  const [navigationItems, setNavigationItems] =
    useState<Array<SiteNavItem>>(siteMenuItems)
  const [odooProfile, setOdooProfile] = useState<OdooSessionProfile | null>(
    null
  )
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  useEffect(() => {
    let active = true

    async function loadNavigation() {
      try {
        const settings = await getNavigation()
        if (active && Array.isArray(settings.items) && settings.items.length) {
          setNavigationItems(settings.items)
        }
      } catch {
        if (active) setNavigationItems(siteMenuItems)
      }
    }

    function handleNavigationUpdate(event: Event) {
      const detail = (event as CustomEvent<{ items?: Array<SiteNavItem> }>)
        .detail

      if (Array.isArray(detail.items) && detail.items.length) {
        setNavigationItems(detail.items)
      } else {
        void loadNavigation()
      }
    }

    function handleNavigationMessage(event: MessageEvent) {
      const data = event.data as {
        items?: Array<SiteNavItem>
        type?: string
      } | null

      if (
        data?.type === siteNavigationUpdateEvent &&
        Array.isArray(data.items) &&
        data.items.length
      ) {
        setNavigationItems(data.items)
      }
    }

    void loadNavigation()
    window.addEventListener(siteNavigationUpdateEvent, handleNavigationUpdate)
    window.addEventListener("message", handleNavigationMessage)

    return () => {
      active = false
      window.removeEventListener(
        siteNavigationUpdateEvent,
        handleNavigationUpdate
      )
      window.removeEventListener("message", handleNavigationMessage)
    }
  }, [getNavigation])

  useEffect(() => {
    function syncOdooProfile() {
      setOdooProfile(readOdooSessionProfile())
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") syncOdooProfile()
    }

    syncOdooProfile()
    window.addEventListener("focus", syncOdooProfile)
    window.addEventListener("pageshow", syncOdooProfile)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("focus", syncOdooProfile)
      window.removeEventListener("pageshow", syncOdooProfile)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  const activeDesktopItem = useMemo(
    () =>
      navigationItems.find(
        (item) => item.label === desktopMenuLabel && item.sections
      ),
    [desktopMenuLabel, navigationItems]
  )

  const activeDesktopLinkCount = useMemo(() => {
    if (!activeDesktopItem?.sections) return 0

    const seen = new Set<string>()
    let count = 0

    activeDesktopItem.sections.forEach((section) => {
      if (section.href && !seen.has(section.href)) {
        seen.add(section.href)
        count += 1
      }

      function visitLinks(links: Array<SiteNavLink>) {
        links.forEach((link) => {
          if (!seen.has(link.href)) {
            seen.add(link.href)
            count += 1
          }
          visitLinks(link.children ?? [])
        })
      }

      visitLinks(section.links)
    })

    return count
  }, [activeDesktopItem])

  const isProgrammeDesktopMenu = activeDesktopItem?.label === "Programmes"

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDesktopMenuLabel(null)
        setProfileMenuOpen(false)
        setDrawerOpen(false)
      }
    }

    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  useEffect(() => {
    setDesktopMenuLabel(null)
    setProfileMenuOpen(false)
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!odooProfile) setProfileMenuOpen(false)
  }, [odooProfile])

  useEffect(() => {
    document.documentElement.style.overflow = drawerOpen ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [drawerOpen])

  function isItemActive(item: SiteNavItem) {
    const itemTarget = splitHref(item.href)
    const currentHash =
      typeof window === "undefined" ? "" : window.location.hash
    const hasExactDirectItem = navigationItems.some((candidate) => {
      if (candidate.label === item.label || candidate.sections) return false

      const candidateTarget = splitHref(candidate.href)

      return (
        candidateTarget.path === location.pathname &&
        (!candidateTarget.hash || candidateTarget.hash === currentHash)
      )
    })
    const hasExactHashItem = navigationItems.some((candidate) => {
      if (candidate.label === item.label) return false

      const candidateTarget = splitHref(candidate.href)

      return (
        Boolean(candidateTarget.hash) &&
        candidateTarget.path === itemTarget.path &&
        candidateTarget.hash === currentHash
      )
    })

    if (itemTarget.path === "/")
      return (
        location.pathname === "/" &&
        (!itemTarget.hash || currentHash === itemTarget.hash)
      )
    if (itemTarget.hash)
      return (
        location.pathname === itemTarget.path && currentHash === itemTarget.hash
      )
    if (hasExactHashItem) return false
    if (
      item.sections &&
      hasExactDirectItem &&
      location.pathname !== itemTarget.path
    )
      return false

    return (
      location.pathname === itemTarget.path ||
      location.pathname.startsWith(`${itemTarget.path}/`)
    )
  }

  function toggleMobileSection(label: string) {
    setMobileSections((sections) =>
      sections.includes(label)
        ? sections.filter((section) => section !== label)
        : [...sections, label]
    )
  }

  function navTo(href: string) {
    return editorNavigation ? getEditorBuilderPath(href) : href
  }

  function handleEditorNav(event: MouseEvent<HTMLElement>, href: string) {
    if (!editorNavigation) return

    event.preventDefault()
    event.stopPropagation()
    window.top?.location.assign(navTo(href))
  }

  const ActiveIcon = activeDesktopItem
    ? itemIcon[activeDesktopItem.label as keyof typeof itemIcon]
    : Globe2

  function renderDesktopNavLinks(
    links: Array<SiteNavLink>,
    sectionTitle: string,
    depth = 0
  ) {
    return links.map((link) => {
      const children = link.children ?? []

      return (
        <div
          key={`${sectionTitle}-${depth}-${link.label}-${link.href}`}
          className="min-w-0"
        >
          <Link
            target={editorNavigation ? "_top" : undefined}
            to={navTo(link.href)}
            className={cn(
              "group block rounded-[14px] border border-transparent py-2 pr-3 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.045]",
              depth === 0 ? "pl-3" : "pl-2"
            )}
            onClick={(event) => {
              setDesktopMenuLabel(null)
              handleEditorNav(event, link.href)
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span
                  className={cn(
                    "block font-semibold tracking-[-0.015em] text-white",
                    depth === 0 ? "text-[0.86rem]" : "text-[0.8rem]"
                  )}
                >
                  {link.label}
                </span>
                {!isProgrammeDesktopMenu || depth > 0 ? (
                  <span className="mt-1 line-clamp-1 block text-[0.74rem] leading-5 text-white/42">
                    {link.description}
                  </span>
                ) : null}
              </div>
              <ArrowRight className="size-3.5 shrink-0 text-white/38 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/68" />
            </div>
          </Link>

          {children.length ? (
            <div className="mt-1 ml-3 border-l border-white/10 pl-2">
              {renderDesktopNavLinks(children, sectionTitle, depth + 1)}
            </div>
          ) : null}
        </div>
      )
    })
  }

  function renderMobileNavLinks(
    links: Array<SiteNavLink>,
    sectionTitle: string,
    depth = 0
  ) {
    return links.map((link) => {
      const children = link.children ?? []

      return (
        <div key={`${sectionTitle}-${depth}-${link.label}-${link.href}`}>
          <Link
            target={editorNavigation ? "_top" : undefined}
            to={navTo(link.href)}
            className={cn(
              "flex items-center justify-between rounded-2xl border border-transparent py-2.5 pr-3 text-white transition-colors hover:border-white/10 hover:bg-white/[0.04]",
              depth === 0 ? "pl-3" : "pl-2"
            )}
            onClick={(event) => handleEditorNav(event, link.href)}
          >
            <span
              className={cn(
                "block font-semibold text-white",
                depth === 0 ? "text-sm" : "text-[0.82rem]"
              )}
            >
              {link.label}
            </span>
            <ArrowRight className="size-4 shrink-0 text-white/42" />
          </Link>
          {children.length ? (
            <div className="ml-3 border-l border-white/10 pl-2">
              {renderMobileNavLinks(children, sectionTitle, depth + 1)}
            </div>
          ) : null}
        </div>
      )
    })
  }

  return (
    <div
      ref={headerRef}
      className={cn(
        "relative z-40",
        editorNavigation && "puck-editor-site-nav"
      )}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setDesktopMenuLabel(null)
          setProfileMenuOpen(false)
          setDrawerOpen(false)
        }
      }}
    >
      <header className="relative z-50 flex items-center justify-between gap-4 rounded-full border border-[#978360]/22 bg-[#152036]/78 px-4 py-3 shadow-[0_18px_55px_rgba(5,8,18,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-6 lg:px-7">
        <Link
          to={navTo("/")}
          target={editorNavigation ? "_top" : undefined}
          className="flex min-w-0 items-center gap-3 text-sm font-semibold tracking-tight text-white"
          onClick={(event) => handleEditorNav(event, "/")}
        >
          <span className="inline-flex h-12 w-[156px] shrink-0 items-center justify-center px-1">
            <img
              src="/brand/cogesto-logo-official.svg"
              alt="Cogesto Consulting"
              className="h-full w-full object-contain brightness-0 drop-shadow-[0_10px_22px_rgba(5,8,18,0.32)] invert"
              decoding="async"
            />
          </span>
          <span className="sr-only">Cogesto Consulting</span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 min-[1720px]:flex"
          aria-label="Navigation principale"
        >
          {navigationItems.map((item) =>
            item.sections ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDesktopMenuLabel(item.label)}
              >
                <button
                  type="button"
                  aria-expanded={desktopMenuLabel === item.label}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[0.9rem] font-medium transition-colors duration-200",
                    desktopMenuLabel === item.label || isItemActive(item)
                      ? "bg-[#978360]/24 text-white"
                      : "text-white/74 hover:bg-[#978360]/14 hover:text-white"
                  )}
                  onClick={() => setDesktopMenuLabel(item.label)}
                  onFocus={() => setDesktopMenuLabel(item.label)}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      desktopMenuLabel === item.label && "rotate-180"
                    )}
                  />
                </button>
              </div>
            ) : (
              <Link
                key={item.label}
                target={editorNavigation ? "_top" : undefined}
                to={navTo(item.href)}
                onClick={(event) => handleEditorNav(event, item.href)}
                onMouseEnter={() => setDesktopMenuLabel(null)}
                className={cn(
                  "inline-flex items-center rounded-full px-3.5 py-2.5 text-[0.9rem] font-medium transition-colors duration-200",
                  isItemActive(item)
                    ? "bg-[#978360]/24 text-white"
                    : "text-white/74 hover:bg-[#978360]/14 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2.5 min-[1720px]:flex">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#978360]/22 bg-white/7 text-white/78 transition-colors hover:bg-[#978360]/14 hover:text-white"
            aria-label="Envoyer un email à Cogesto Consulting"
          >
            <Mail className="size-4" />
          </a>
          {odooProfile ? (
            <ProfileControl
              editorNavigation={editorNavigation}
              onMenuOpenChange={setProfileMenuOpen}
              open={profileMenuOpen}
              profile={odooProfile}
            />
          ) : (
            <a
              href="/login"
              target={editorNavigation ? "_top" : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-[#978360]/24 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#978360]/16"
            >
              <LogIn className="size-4" />
              Connexion
            </a>
          )}
          <Link
            target={editorNavigation ? "_top" : undefined}
            to={navTo("/contact")}
            className="inline-flex items-center gap-2 rounded-full border border-[#978360]/24 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#978360]/16"
            onClick={(event) => handleEditorNav(event, "/contact")}
          >
            Contactez-nous
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 min-[1720px]:hidden">
          {odooProfile ? (
            <ProfileControl
              compact
              editorNavigation={editorNavigation}
              onMenuOpenChange={setProfileMenuOpen}
              open={profileMenuOpen}
              profile={odooProfile}
            />
          ) : (
            <a
              href="/login"
              target={editorNavigation ? "_top" : undefined}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#978360]/24 bg-white/8 px-3 text-sm font-semibold text-white transition-colors hover:bg-[#978360]/16 sm:px-4"
              aria-label="Se connecter au back-office Cogesto"
            >
              <LogIn className="size-4" />
              <span className="hidden sm:inline">Connexion</span>
            </a>
          )}
          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#978360]/24 bg-white/8 text-white transition-colors hover:bg-[#978360]/16"
            aria-label="Ouvrir le menu"
            onClick={() => {
              setDesktopMenuLabel(null)
              setProfileMenuOpen(false)
              setDrawerOpen(true)
            }}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {activeDesktopItem ? (
        <div
          className="absolute top-[calc(100%+14px)] left-1/2 z-50 hidden w-[min(800px,calc(100vw-56px))] -translate-x-1/2 min-[1720px]:block"
          onMouseLeave={() => setDesktopMenuLabel(null)}
        >
          <div className="rounded-[24px] border border-white/12 bg-[#0c1422]/97 p-3 shadow-[0_24px_70px_rgba(5,8,18,0.46)] backdrop-blur-2xl">
            <div className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="flex min-h-[290px] flex-col rounded-[20px] border border-white/8 bg-white/[0.035] p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.64rem] font-semibold tracking-[0.16em] text-white/54 uppercase">
                    Navigation
                  </span>
                  <span className="inline-flex size-8 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.05] text-[#d8ceb9]">
                    <ActiveIcon className="size-4" />
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-[1.42rem] leading-[1.03] tracking-[-0.05em] text-white">
                  {activeDesktopItem.menuTitle ?? activeDesktopItem.label}
                </h3>
                <p className="mt-3 text-[0.82rem] leading-5 text-white/58">
                  {activeDesktopItem.description}
                </p>
                <Link
                  target={editorNavigation ? "_top" : undefined}
                  to={navTo(activeDesktopItem.href)}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-[0_18px_35px_rgba(255,255,255,0.12)] transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={(event) => {
                    setDesktopMenuLabel(null)
                    handleEditorNav(event, activeDesktopItem.href)
                  }}
                >
                  Vue d’ensemble
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-slate-900 text-white">
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>

              <div className="rounded-[20px] border border-white/8 bg-white/[0.025] p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.67rem] font-semibold tracking-[0.16em] text-white/44 uppercase">
                    {isProgrammeDesktopMenu ? "Programmes" : "Accès rapides"}
                  </p>
                  <span className="text-[0.74rem] font-medium text-white/32">
                    {activeDesktopLinkCount}{" "}
                    {isProgrammeDesktopMenu ? "programmes" : "liens"}
                  </span>
                </div>
                <div className="mt-3 grid gap-3">
                  {activeDesktopItem.sections?.map((section) => (
                    <div
                      key={section.title}
                      className={cn(
                        "rounded-[18px] border border-white/7 bg-white/[0.025] p-2",
                        isProgrammeDesktopMenu && "bg-white/[0.035]"
                      )}
                    >
                      {section.href ? (
                        <Link
                          target={editorNavigation ? "_top" : undefined}
                          to={navTo(section.href)}
                          className="group block rounded-[14px] px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.055]"
                          onClick={(event) => {
                            setDesktopMenuLabel(null)
                            handleEditorNav(event, section.href!)
                          }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <span className="block text-[0.98rem] font-semibold tracking-[-0.015em] text-white">
                                {section.title}
                              </span>
                              {section.description ? (
                                <span className="mt-1 block text-[0.78rem] leading-5 text-white/48">
                                  {section.description}
                                </span>
                              ) : null}
                            </div>
                            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/54 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:border-white/16 group-hover:text-white">
                              <ArrowRight className="size-3.5" />
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <p className="px-3 pt-2 pb-1 text-[0.67rem] font-semibold tracking-[0.16em] text-white/44 uppercase">
                          {section.title}
                        </p>
                      )}

                      {section.links.length ? (
                        <div className="mt-2 border-t border-white/7 pt-2">
                          {isProgrammeDesktopMenu ? (
                            <p className="px-3 pb-1 text-[0.62rem] font-semibold tracking-[0.16em] text-white/34 uppercase">
                              Sous-pages du BLP
                            </p>
                          ) : null}
                          <div
                            className={cn(
                              "grid gap-1",
                              isProgrammeDesktopMenu && "sm:grid-cols-2"
                            )}
                          >
                            {renderDesktopNavLinks(
                              section.links,
                              section.title
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 min-[1720px]:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/54 backdrop-blur-[2px]"
            aria-label="Fermer le menu"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 flex min-h-0 w-full max-w-[390px] flex-col border-l border-white/10 bg-[#0c1422]/96 px-3 py-3 shadow-[-24px_0_60px_rgba(5,8,18,0.3)] backdrop-blur-2xl sm:px-4">
            <div className="flex shrink-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex h-[52px] w-[164px] items-center justify-center px-1">
                  <img
                    src="/brand/cogesto-logo-official.svg"
                    alt="Cogesto Consulting"
                    className="h-full w-full object-contain brightness-0 drop-shadow-[0_10px_22px_rgba(5,8,18,0.32)] invert"
                    decoding="async"
                  />
                </span>
                <p className="mt-0.5 text-[0.66rem] font-semibold tracking-[0.18em] text-white/42 uppercase">
                  Navigation
                </p>
              </div>
              <button
                type="button"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition-colors hover:bg-white/14"
                aria-label="Fermer le menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>

            {odooProfile ? (
              <MobileProfileCard
                editorNavigation={editorNavigation}
                onNavigate={() => setDrawerOpen(false)}
                profile={odooProfile}
              />
            ) : null}

            <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {navigationItems.map((item) =>
                item.sections ? (
                  <div
                    key={item.label}
                    className="overflow-hidden rounded-[22px] border border-white/8 bg-white/[0.04]"
                  >
                    <button
                      type="button"
                      aria-expanded={mobileSections.includes(item.label)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                      onClick={() => toggleMobileSection(item.label)}
                    >
                      <p className="text-[0.95rem] font-semibold text-white">
                        {item.label}
                      </p>
                      <ChevronDown
                        className={cn(
                          "size-4 shrink-0 text-white/60 transition-transform duration-200",
                          mobileSections.includes(item.label) && "rotate-180"
                        )}
                      />
                    </button>
                    {mobileSections.includes(item.label) ? (
                      <div className="border-t border-white/8 px-4 pt-3 pb-4">
                        <Link
                          target={editorNavigation ? "_top" : undefined}
                          to={navTo(item.href)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-white/64 uppercase"
                          onClick={(event) => handleEditorNav(event, item.href)}
                        >
                          Vue d’ensemble
                          <ArrowRight className="size-3.5" />
                        </Link>
                        <p className="mt-4 text-[0.66rem] font-semibold tracking-[0.16em] text-white/38 uppercase">
                          {item.label === "Programmes"
                            ? "Programmes"
                            : "Accès rapides"}
                        </p>
                        <div className="mt-2 space-y-3">
                          {item.sections.map((section) => (
                            <article key={section.title}>
                              {section.href ? (
                                <Link
                                  target={editorNavigation ? "_top" : undefined}
                                  to={navTo(section.href)}
                                  className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-3 text-white transition-colors hover:border-white/12 hover:bg-white/[0.055]"
                                  onClick={(event) =>
                                    handleEditorNav(event, section.href!)
                                  }
                                >
                                  <span>
                                    <span className="block text-sm font-semibold text-white">
                                      {section.title}
                                    </span>
                                    {section.description ? (
                                      <span className="mt-1 block text-xs leading-5 text-white/42">
                                        {section.description}
                                      </span>
                                    ) : null}
                                  </span>
                                  <ArrowRight className="size-4 shrink-0 text-white/42 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                              ) : (
                                <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-white/42 uppercase">
                                  {section.title}
                                </p>
                              )}
                              {section.links.length &&
                              item.label === "Programmes" ? (
                                <p className="mt-3 px-3 text-[0.62rem] font-semibold tracking-[0.16em] text-white/34 uppercase">
                                  Sous-pages du BLP
                                </p>
                              ) : null}
                              <div className="mt-2 space-y-1.5">
                                {renderMobileNavLinks(
                                  section.links,
                                  section.title
                                )}
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    target={editorNavigation ? "_top" : undefined}
                    to={navTo(item.href)}
                    className="flex items-center justify-between rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-[0.95rem] font-semibold text-white"
                    onClick={(event) => handleEditorNav(event, item.href)}
                  >
                    {item.label}
                    <ArrowRight className="size-4 text-white/50" />
                  </Link>
                )
              )}
            </div>

            {!odooProfile ? (
              <a
                href="/login"
                target={editorNavigation ? "_top" : undefined}
                className="mt-3 inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[18px] bg-white px-4 text-sm font-extrabold text-[#152036] transition-transform hover:-translate-y-0.5"
                onClick={() => setDrawerOpen(false)}
              >
                <LogIn className="size-4" />
                Connexion au back-office
              </a>
            ) : null}

            <div className="mt-3 shrink-0 rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-white/38 uppercase">
                    Contact
                  </p>
                  <p className="mt-1 truncate text-xs text-white/58">
                    {contact.email}
                  </p>
                </div>
                <Link
                  target={editorNavigation ? "_top" : undefined}
                  to={navTo("/contact")}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 transition-transform hover:-translate-y-0.5"
                  aria-label="Contacter le cabinet"
                  onClick={(event) => handleEditorNav(event, "/contact")}
                >
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  )
}

function ProfileControl({
  compact = false,
  editorNavigation,
  onMenuOpenChange,
  open,
  profile,
}: {
  compact?: boolean
  editorNavigation: boolean
  onMenuOpenChange: (open: boolean) => void
  open: boolean
  profile: OdooSessionProfile
}) {
  const target = editorNavigation ? "_top" : undefined

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "inline-flex h-11 max-w-[230px] items-center gap-2 rounded-full border border-[#978360]/24 bg-white/8 text-left text-white transition-colors hover:bg-[#978360]/16 focus-visible:ring-2 focus-visible:ring-[#d8ceb9]/70 focus-visible:outline-none",
          compact ? "px-1.5 sm:px-2.5" : "px-2.5 pr-3"
        )}
        onClick={() => onMenuOpenChange(!open)}
      >
        <ProfileAvatar profile={profile} size="sm" />
        <span className={cn("min-w-0", compact && "hidden min-[720px]:block")}>
          <span
            className="block truncate text-[0.8rem] leading-4 font-semibold"
            title={profile.name}
          >
            {profile.name}
          </span>
          {!compact ? (
            <span className="block truncate text-[0.66rem] leading-4 text-white/52">
              {profile.isInternal ? "Back-office actif" : "Portail actif"}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-white/58 transition-transform duration-200",
            compact && "hidden min-[720px]:block",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+12px)] right-0 z-[80] w-[min(320px,calc(100vw-28px))] overflow-hidden rounded-[24px] border border-white/12 bg-[#0c1422]/98 p-3 text-white shadow-[0_24px_70px_rgba(5,8,18,0.5)] backdrop-blur-2xl"
        >
          <div className="rounded-[18px] border border-white/8 bg-white/[0.045] p-3">
            <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[#d8ceb9] uppercase">
              Session Odoo active
            </p>
            <div className="mt-3 flex items-center gap-3">
              <ProfileAvatar profile={profile} size="lg" />
              <div className="min-w-0">
                <p
                  className="truncate text-sm font-semibold"
                  title={profile.name}
                >
                  {profile.name}
                </p>
                <p
                  className="mt-0.5 truncate text-xs text-white/52"
                  title={profile.login}
                >
                  {profile.login}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 grid gap-1.5">
            {profile.isInternal ? (
              <a
                role="menuitem"
                href="https://erp.cogestoconsulting.com/odoo"
                target={target}
                className="flex min-h-11 items-center justify-between gap-3 rounded-2xl bg-white px-3.5 py-2.5 text-sm font-bold text-[#152036] transition-colors hover:bg-[#f3eee4]"
                onClick={() => onMenuOpenChange(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <LayoutGrid className="size-4" />
                  Back-office
                </span>
                <ExternalLink className="size-3.5" />
              </a>
            ) : null}
            <a
              role="menuitem"
              href="/portal"
              target={target}
              className="flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-white/9 bg-white/[0.045] px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.085]"
              onClick={() => onMenuOpenChange(false)}
            >
              <span className="inline-flex items-center gap-2">
                <UserRound className="size-4" />
                Mon portail
              </span>
              <ExternalLink className="size-3.5 text-white/48" />
            </a>
            <button
              role="menuitem"
              type="button"
              className="flex min-h-11 w-full items-center gap-2 rounded-2xl px-3.5 py-2.5 text-left text-sm font-semibold text-white/66 transition-colors hover:bg-red-500/12 hover:text-red-100"
              onClick={logoutFromOdoo}
            >
              <LogOut className="size-4" />
              Se déconnecter
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function MobileProfileCard({
  editorNavigation,
  onNavigate,
  profile,
}: {
  editorNavigation: boolean
  onNavigate: () => void
  profile: OdooSessionProfile
}) {
  const target = editorNavigation ? "_top" : undefined

  return (
    <div className="mt-3 rounded-[22px] border border-[#978360]/18 bg-[#978360]/10 p-3">
      <div className="flex items-center gap-3">
        <ProfileAvatar profile={profile} size="lg" />
        <div className="min-w-0">
          <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[#d8ceb9] uppercase">
            Connecté à Odoo
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {profile.name}
          </p>
          <p className="truncate text-xs text-white/48">{profile.login}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {profile.isInternal ? (
          <a
            href="https://erp.cogestoconsulting.com/odoo"
            target={target}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white px-3 text-xs font-bold text-[#152036]"
            onClick={onNavigate}
          >
            <LayoutGrid className="size-3.5" />
            Back-office
          </a>
        ) : null}
        <a
          href="/portal"
          target={target}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-3 text-xs font-semibold text-white",
            !profile.isInternal && "col-span-2"
          )}
          onClick={onNavigate}
        >
          <UserRound className="size-3.5" />
          Mon portail
        </a>
      </div>
      <button
        type="button"
        className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl text-xs font-semibold text-white/58 transition-colors hover:bg-red-500/10 hover:text-red-100"
        onClick={logoutFromOdoo}
      >
        <LogOut className="size-3.5" />
        Se déconnecter
      </button>
    </div>
  )
}

function ProfileAvatar({
  profile,
  size,
}: {
  profile: OdooSessionProfile
  size: "sm" | "lg"
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/14 bg-[#978360]/24 font-bold text-white",
        size === "sm" ? "size-8 text-[0.65rem]" : "size-11 text-xs"
      )}
      aria-hidden="true"
    >
      <span>{getOdooProfileInitials(profile.name)}</span>
      <img
        src={getOdooAvatarUrl(profile.uid)}
        alt=""
        className="absolute inset-0 size-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none"
        }}
      />
    </span>
  )
}

function getEditorBuilderPath(href: string) {
  if (href === "/") return "/admin/builder/accueil"

  const slug = href
    .replace(/^\/pages\//, "")
    .replace(/^\//, "")
    .replace(/\/+$/g, "")

  return slug && editablePageSlugs.has(slug) ? `/admin/builder/${slug}` : href
}

function splitHref(href: string) {
  const [path = "/", hash] = href.split("#")

  return {
    hash: hash ? `#${hash}` : "",
    path: path || "/",
  }
}
