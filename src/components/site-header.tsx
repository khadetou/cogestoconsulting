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
  "À propos": Users,
  "Nos expertises": BriefcaseBusiness,
  Program: Handshake,
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
        if (link.href === activeDesktopItem.href || seen.has(link.href)) return false
        seen.add(link.href)
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
      <header className="flex items-center justify-between gap-4 rounded-full border border-white/12 bg-white/6 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-6 lg:px-7">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-sm font-semibold tracking-tight text-white">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/10">
            <span className="size-3 rounded-full bg-[#b8d8f2] shadow-[0_0_18px_rgba(184,216,242,0.58)]" />
          </span>
          <span className="truncate text-[0.98rem] sm:text-sm">Cogesto Consulting</span>
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
                      ? "bg-white/10 text-white"
                      : "text-white/74 hover:bg-white/8 hover:text-white",
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
                className={cn(
                  "inline-flex items-center rounded-full px-4 py-2.5 text-[0.92rem] font-medium transition-colors duration-200",
                  isItemActive(item) ? "bg-white/10 text-white" : "text-white/74 hover:bg-white/8 hover:text-white",
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
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/14 bg-white/7 text-white/78 transition-colors hover:bg-white/12 hover:text-white"
            aria-label="Envoyer un email à Cogesto Consulting"
          >
            <Mail className="size-4" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/14"
          >
            Contactez-nous
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition-colors hover:bg-white/14 xl:hidden"
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
        <button
          type="button"
          className="fixed inset-0 z-30 hidden bg-[rgba(8,10,22,0.34)] xl:block"
          aria-label="Fermer le mega menu"
          onClick={() => setDesktopMenuLabel(null)}
        />
      ) : null}

      {activeDesktopItem ? (
        <div
          className="absolute left-1/2 top-[calc(100%+18px)] z-50 hidden w-[min(1060px,calc(100vw-56px))] -translate-x-1/2 xl:block"
          onMouseLeave={() => setDesktopMenuLabel(null)}
        >
          <div className="rounded-[28px] border border-white/12 bg-[#06182f] p-4 shadow-[0_34px_90px_rgba(4,16,31,0.48)] xl:p-5">
            <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)_260px]">
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-white/54">
                    Navigation
                  </span>
                  <span className="inline-flex size-9 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.05] text-[#d9ecff]">
                    <ActiveIcon className="size-4" />
                  </span>
                </div>
                <h3 className="mt-6 max-w-[10ch] font-heading text-[1.8rem] leading-[1.02] tracking-[-0.06em] text-white">
                  {activeDesktopItem.label}
                </h3>
                <p className="mt-4 max-w-[22ch] text-[0.88rem] leading-6 text-white/60">
                  {activeDesktopItem.description}
                </p>
                <Link
                  to={activeDesktopItem.href}
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_18px_35px_rgba(255,255,255,0.14)] transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={() => setDesktopMenuLabel(null)}
                >
                  Vue d’ensemble
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-slate-900 text-white">
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>

              <div className="rounded-[24px] border border-white/8 bg-white/[0.025] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/44">Autres pages</p>
                  <span className="text-[0.74rem] font-medium text-white/32">{activeDesktopLinks.length} liens</span>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {activeDesktopLinks.map((link) => (
                    <Link
                      key={`${link.sectionTitle}-${link.href}`}
                      to={link.href}
                      className="group rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3.5 transition-colors duration-200 hover:border-white/14 hover:bg-white/[0.06]"
                      onClick={() => setDesktopMenuLabel(null)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/34">{link.sectionTitle}</p>
                          <span className="mt-1.5 block text-[0.98rem] font-semibold tracking-[-0.02em] text-white">{link.label}</span>
                          <span className="mt-1.5 line-clamp-2 block max-w-[22ch] text-[0.84rem] leading-5 text-white/48">{link.description}</span>
                        </div>
                        <span className="inline-flex size-7.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/54 transition-transform duration-200 group-hover:translate-x-0.5">
                          <ArrowRight className="size-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {activeDesktopItem.card ? (
                <article className="flex h-full flex-col rounded-[24px] border border-[#9cb7cf]/20 bg-[linear-gradient(180deg,rgba(79,111,142,0.2),rgba(255,255,255,0.03))] p-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/54">
                    <Globe2 className="size-3" />
                    {activeDesktopItem.card.eyebrow}
                  </span>
                  <h4 className="mt-5 max-w-[13ch] font-heading text-[1.34rem] leading-[1.08] tracking-[-0.05em] text-white">
                    {activeDesktopItem.card.title}
                  </h4>
                  <p className="mt-4 max-w-[22ch] text-[0.86rem] leading-6 text-white/56">{activeDesktopItem.card.text}</p>
                  <div className="mt-auto pt-8">
                    <Link
                      to={activeDesktopItem.card.href}
                      className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12"
                      onClick={() => setDesktopMenuLabel(null)}
                    >
                      {activeDesktopItem.card.cta}
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              ) : null}
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
          <aside className="absolute inset-y-0 right-0 flex min-h-0 w-full max-w-[390px] flex-col border-l border-white/10 bg-[#06182f]/96 px-3 py-3 shadow-[-24px_0_60px_rgba(4,16,31,0.28)] backdrop-blur-2xl sm:px-4">
            <div className="flex shrink-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-heading text-[1.22rem] tracking-[-0.045em] text-white">Cogesto Consulting</p>
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
