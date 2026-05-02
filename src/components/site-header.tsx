import { Link, useLocation } from "@tanstack/react-router"
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  Globe2,
  Handshake,
  Mail,
  Menu,
  Users,
  X,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

import type { SiteNavItem } from "@/lib/site-data"
import { contact, siteMenuItems } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const itemIcon = {
  "A propos": Users,
  "Business Linkage Program": Handshake,
  "Nos expertises": BriefcaseBusiness,
} as const

export function SiteHeader() {
  const location = useLocation()
  const headerRef = useRef<HTMLDivElement>(null)
  const [desktopMenuLabel, setDesktopMenuLabel] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileSections, setMobileSections] = useState<Array<string>>([])

  const activeDesktopItem = useMemo(
    () => siteMenuItems.find((item) => item.label === desktopMenuLabel && item.sections),
    [desktopMenuLabel],
  )

  const activeDesktopLinks = useMemo(() => {
    if (!activeDesktopItem?.sections) return []
    const seen = new Set<string>()

    return activeDesktopItem.sections
      .flatMap((section) =>
        section.links.map((link) => ({
          ...link,
          sectionTitle: section.title,
        })),
      )
      .filter((link) => {
        const key = `${link.sectionTitle}-${link.label}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
  }, [activeDesktopItem])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDesktopMenuLabel(null)
        setDrawerOpen(false)
      }
    }

    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  useEffect(() => {
    setDesktopMenuLabel(null)
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.style.overflow = drawerOpen ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [drawerOpen])

  function isItemActive(item: SiteNavItem) {
    if (item.href === "/") return location.pathname === "/"
    return location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
  }

  function toggleMobileSection(label: string) {
    setMobileSections((sections) =>
      sections.includes(label) ? sections.filter((section) => section !== label) : [...sections, label],
    )
  }

  const ActiveIcon = activeDesktopItem
    ? itemIcon[activeDesktopItem.label as keyof typeof itemIcon]
    : Globe2

  return (
    <div ref={headerRef} className="relative z-40" onKeyDown={(event) => {
      if (event.key === "Escape") {
        setDesktopMenuLabel(null)
        setDrawerOpen(false)
      }
    }}>
      <header className="relative z-50 flex items-center justify-between gap-4 rounded-full border border-[#978360]/22 bg-[#152036]/78 px-4 py-3 shadow-[0_18px_55px_rgba(5,8,18,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-6 lg:px-7">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-sm font-semibold tracking-tight text-white">
          <span className="inline-flex h-12 w-[156px] shrink-0 items-center justify-center px-1">
            <img
              src="/brand/cogesto-logo-official.svg"
              alt="Cogesto Consulting"
              className="h-full w-full object-contain brightness-0 invert drop-shadow-[0_10px_22px_rgba(5,8,18,0.32)]"
              decoding="async"
            />
          </span>
          <span className="sr-only">Cogesto Consulting</span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigation principale">
          {siteMenuItems.map((item) =>
            item.sections ? (
              <div key={item.label} className="relative" onMouseEnter={() => setDesktopMenuLabel(item.label)}>
                <button
                  type="button"
                  aria-expanded={desktopMenuLabel === item.label}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.92rem] font-medium transition-colors duration-200",
                    desktopMenuLabel === item.label || isItemActive(item)
                      ? "bg-[#978360]/24 text-white"
                      : "text-white/74 hover:bg-[#978360]/14 hover:text-white",
                  )}
                  onClick={() => setDesktopMenuLabel(item.label)}
                  onFocus={() => setDesktopMenuLabel(item.label)}
                >
                  {item.label}
                  <ChevronDown className={cn("size-4 transition-transform duration-200", desktopMenuLabel === item.label && "rotate-180")} />
                </button>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                onMouseEnter={() => setDesktopMenuLabel(null)}
                className={cn(
                  "inline-flex items-center rounded-full px-4 py-2.5 text-[0.92rem] font-medium transition-colors duration-200",
                  isItemActive(item) ? "bg-[#978360]/24 text-white" : "text-white/74 hover:bg-[#978360]/14 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#978360]/22 bg-white/7 text-white/78 transition-colors hover:bg-[#978360]/14 hover:text-white"
            aria-label="Envoyer un email à Cogesto Consulting"
          >
            <Mail className="size-4" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#978360]/24 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#978360]/16"
          >
            Contactez-nous
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-[#978360]/24 bg-white/8 text-white transition-colors hover:bg-[#978360]/16 xl:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => {
            setDesktopMenuLabel(null)
            setDrawerOpen(true)
          }}
        >
          <Menu className="size-5" />
        </button>
      </header>

      {activeDesktopItem ? (
        <div
          className="absolute left-1/2 top-[calc(100%+14px)] z-50 hidden w-[min(720px,calc(100vw-56px))] -translate-x-1/2 xl:block"
          onMouseLeave={() => setDesktopMenuLabel(null)}
        >
          <div className="rounded-[24px] border border-white/12 bg-[#0c1422]/97 p-3 shadow-[0_24px_70px_rgba(5,8,18,0.46)] backdrop-blur-2xl">
            <div className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="rounded-[20px] border border-white/8 bg-white/[0.035] p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/54">
                    Navigation
                  </span>
                  <span className="inline-flex size-8 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.05] text-[#d8ceb9]">
                    <ActiveIcon className="size-4" />
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-[1.42rem] leading-[1.03] tracking-[-0.05em] text-white">
                  {activeDesktopItem.label}
                </h3>
                <p className="mt-3 text-[0.82rem] leading-5 text-white/58">
                  {activeDesktopItem.description}
                </p>
                <Link
                  to={activeDesktopItem.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-[0_18px_35px_rgba(255,255,255,0.12)] transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={() => setDesktopMenuLabel(null)}
                >
                  Vue d’ensemble
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-slate-900 text-white">
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>

              <div className="rounded-[20px] border border-white/8 bg-white/[0.025] p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-white/44">Accès rapides</p>
                  <span className="text-[0.74rem] font-medium text-white/32">{activeDesktopLinks.length} liens</span>
                </div>
                <div className="mt-3 grid gap-1.5">
                  {activeDesktopLinks.map((link) => (
                    <Link
                      key={`${link.sectionTitle}-${link.href}`}
                      to={link.href}
                      className="group rounded-[16px] border border-transparent px-3.5 py-3 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.055]"
                      onClick={() => setDesktopMenuLabel(null)}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <span className="block text-[0.95rem] font-semibold tracking-[-0.015em] text-white">{link.label}</span>
                          <span className="mt-1 line-clamp-1 block text-[0.78rem] leading-5 text-white/48">{link.description}</span>
                        </div>
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/54 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:border-white/16 group-hover:text-white">
                          <ArrowRight className="size-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
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
                  <img src="/brand/cogesto-logo-official.svg" alt="Cogesto Consulting" className="h-full w-full object-contain brightness-0 invert drop-shadow-[0_10px_22px_rgba(5,8,18,0.32)]" decoding="async" />
                </span>
                <p className="mt-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/42">Navigation</p>
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

            <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {siteMenuItems.map((item) =>
                item.sections ? (
                  <div key={item.label} className="overflow-hidden rounded-[22px] border border-white/8 bg-white/[0.04]">
                    <button
                      type="button"
                      aria-expanded={mobileSections.includes(item.label)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                      onClick={() => toggleMobileSection(item.label)}
                    >
                      <p className="text-[0.95rem] font-semibold text-white">{item.label}</p>
                      <ChevronDown className={cn("size-4 shrink-0 text-white/60 transition-transform duration-200", mobileSections.includes(item.label) && "rotate-180")} />
                    </button>
                    {mobileSections.includes(item.label) ? (
                      <div className="border-t border-white/8 px-4 pb-4 pt-3">
                        <Link
                          to={item.href}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/64"
                        >
                          Vue d’ensemble
                          <ArrowRight className="size-3.5" />
                        </Link>
                        <div className="mt-3 space-y-3">
                          {item.sections.map((section) => (
                            <article key={section.title}>
                              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/42">{section.title}</p>
                              <div className="mt-2 space-y-1.5">
                                {section.links.map((link) => (
                                  <Link
                                    key={`${section.title}-${link.label}`}
                                    to={link.href}
                                    className="flex items-center justify-between rounded-2xl border border-transparent px-3 py-2.5 text-white transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                                  >
                                    <span className="block text-sm font-semibold text-white">{link.label}</span>
                                    <ArrowRight className="size-4 shrink-0 text-white/42" />
                                  </Link>
                                ))}
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
                    to={item.href}
                    className="flex items-center justify-between rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-[0.95rem] font-semibold text-white"
                  >
                    {item.label}
                    <ArrowRight className="size-4 text-white/50" />
                  </Link>
                ),
              )}
            </div>

            <div className="mt-3 shrink-0 rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/38">Contact</p>
                  <p className="mt-1 truncate text-xs text-white/58">{contact.email}</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 transition-transform hover:-translate-y-0.5"
                  aria-label="Contacter le cabinet"
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
