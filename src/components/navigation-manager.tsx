import { ArrowDown, ArrowRight, ArrowUp, ChevronDown, ListTree, Plus, Save, Trash2, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useServerFn } from "@tanstack/react-start"

import { siteNavigationUpdateEvent } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { SiteNavItem, SiteNavLink, SiteNavSection } from "@/lib/site-data"
import { siteMenuItems } from "@/lib/site-data"
import { cn } from "@/lib/utils"
import { getSiteNavigationSettings, saveSiteNavigationSettings } from "@/server/payload/pages"

type NavigationManagerProps = {
  onOpenChange: (open: boolean) => void
  open: boolean
}

const emptyLink: SiteNavLink = {
  children: [],
  description: "",
  href: "/",
  label: "Nouveau lien",
}

const emptySection: SiteNavSection = {
  description: "",
  href: "",
  links: [],
  title: "Nouveau sous-menu",
}

const emptyItem: SiteNavItem = {
  description: "",
  href: "/",
  label: "Nouveau menu",
}

function cloneNavigation(items: Array<SiteNavItem>) {
  return structuredClone(items)
}

function cloneLink(label = "Nouveau lien"): SiteNavLink {
  return {
    ...emptyLink,
    children: [],
    label,
  }
}

function countNestedLinks(links: Array<SiteNavLink>): number {
  return links.reduce((count, link) => count + 1 + countNestedLinks(link.children ?? []), 0)
}

function countLinks(item: SiteNavItem) {
  return (item.sections ?? []).reduce((count, section) => count + countNestedLinks(section.links) + (section.href ? 1 : 0), 0)
}

function updateLinkTree(
  links: Array<SiteNavLink>,
  path: Array<number>,
  update: (link: SiteNavLink) => SiteNavLink,
): Array<SiteNavLink> {
  const [index, ...rest] = path

  return links.map((link, linkIndex) => {
    if (linkIndex !== index) return link

    if (!rest.length) return update(link)

    return {
      ...link,
      children: updateLinkTree(link.children ?? [], rest, update),
    }
  })
}

function removeLinkFromTree(links: Array<SiteNavLink>, path: Array<number>): Array<SiteNavLink> {
  const [index, ...rest] = path

  if (!rest.length) {
    return links.filter((_, linkIndex) => linkIndex !== index)
  }

  return links.map((link, linkIndex) =>
    linkIndex === index
      ? {
          ...link,
          children: removeLinkFromTree(link.children ?? [], rest),
        }
      : link,
  )
}

function broadcastNavigationUpdate(items: Array<SiteNavItem>) {
  window.dispatchEvent(new CustomEvent(siteNavigationUpdateEvent, { detail: { items } }))
  document.querySelectorAll("iframe").forEach((iframe) => {
    iframe.contentWindow?.postMessage({ items, type: siteNavigationUpdateEvent }, "*")
  })
}

export function NavigationManager({ onOpenChange, open }: NavigationManagerProps) {
  const getNavigation = useServerFn(getSiteNavigationSettings)
  const saveNavigation = useServerFn(saveSiteNavigationSettings)
  const contentRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<Array<SiteNavItem>>(() => cloneNavigation(siteMenuItems))
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [message, setMessage] = useState("")

  const selectedItem = items[selectedIndex] ?? items[0]
  const totalLinks = useMemo(() => items.reduce((count, item) => count + 1 + countLinks(item), 0), [items])

  useEffect(() => {
    if (!open) return

    let active = true

    async function loadNavigation() {
      setLoading(true)
      setMessage("")

      try {
        const settings = await getNavigation()
        if (!active) return

        setItems(settings.items.length ? cloneNavigation(settings.items) : cloneNavigation(siteMenuItems))
        setSelectedIndex(0)
        requestAnimationFrame(() => contentRef.current?.scrollTo({ top: 0 }))
      } catch {
        if (!active) return

        setItems(cloneNavigation(siteMenuItems))
        setSelectedIndex(0)
        setMessage("Navigation par défaut chargée.")
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadNavigation()

    return () => {
      active = false
    }
  }, [getNavigation, open])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false)
    }

    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.documentElement.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [onOpenChange, open])

  if (!open) return null

  async function persistNavigation() {
    setSaving(true)
    setMessage("")

    try {
      const saved = await saveNavigation({ data: { items } })
      setItems(cloneNavigation(saved.items))
      setSelectedIndex((index) => Math.min(index, Math.max(saved.items.length - 1, 0)))
      broadcastNavigationUpdate(saved.items)
      setMessage("Menu sauvegardé.")
    } catch {
      setMessage("Impossible de sauvegarder le menu.")
    } finally {
      setSaving(false)
    }
  }

  function updateItem(index: number, patch: Partial<SiteNavItem>) {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)))
  }

  function updateSection(itemIndex: number, sectionIndex: number, patch: Partial<SiteNavSection>) {
    setItems((current) =>
      current.map((item, currentItemIndex) => {
        if (currentItemIndex !== itemIndex) return item

        return {
          ...item,
          sections: (item.sections ?? []).map((section, currentSectionIndex) =>
            currentSectionIndex === sectionIndex ? { ...section, ...patch } : section,
          ),
        }
      }),
    )
  }

  function updateLink(itemIndex: number, sectionIndex: number, path: Array<number>, patch: Partial<SiteNavLink>) {
    setItems((current) =>
      current.map((item, currentItemIndex) => {
        if (currentItemIndex !== itemIndex) return item

        return {
          ...item,
          sections: (item.sections ?? []).map((section, currentSectionIndex) => {
            if (currentSectionIndex !== sectionIndex) return section

            return {
              ...section,
              links: updateLinkTree(section.links, path, (link) => ({ ...link, ...patch })),
            }
          }),
        }
      }),
    )
  }

  function addItem() {
    setItems((current) => {
      const next = [...current, { ...emptyItem }]
      setSelectedIndex(next.length - 1)
      requestAnimationFrame(() => contentRef.current?.scrollTo({ top: 0, behavior: "smooth" }))
      return next
    })
  }

  function addSection(itemIndex: number) {
    setItems((current) =>
      current.map((item, currentItemIndex) =>
        currentItemIndex === itemIndex
          ? {
              ...item,
              sections: [{ ...emptySection }, ...(item.sections ?? [])],
            }
          : item,
      ),
    )
  }

  function addLink(itemIndex: number, sectionIndex: number) {
    setItems((current) =>
      current.map((item, currentItemIndex) => {
        if (currentItemIndex !== itemIndex) return item

        return {
          ...item,
          sections: (item.sections ?? []).map((section, currentSectionIndex) =>
            currentSectionIndex === sectionIndex
              ? {
                  ...section,
                  links: [...section.links, cloneLink()],
                }
              : section,
          ),
        }
      }),
    )
  }

  function addChildLink(itemIndex: number, sectionIndex: number, path: Array<number>) {
    setItems((current) =>
      current.map((item, currentItemIndex) => {
        if (currentItemIndex !== itemIndex) return item

        return {
          ...item,
          sections: (item.sections ?? []).map((section, currentSectionIndex) => {
            if (currentSectionIndex !== sectionIndex) return section

            return {
              ...section,
              links: updateLinkTree(section.links, path, (link) => ({
                ...link,
                children: [...(link.children ?? []), cloneLink("Nouveau sous-lien")],
              })),
            }
          }),
        }
      }),
    )
  }

  function removeItem(itemIndex: number) {
    setItems((current) => {
      const next = current.filter((_, index) => index !== itemIndex)
      setSelectedIndex((index) => Math.min(index, Math.max(next.length - 1, 0)))
      return next
    })
  }

  function removeSection(itemIndex: number, sectionIndex: number) {
    setItems((current) =>
      current.map((item, currentItemIndex) =>
        currentItemIndex === itemIndex
          ? {
              ...item,
              sections: (item.sections ?? []).filter((_, index) => index !== sectionIndex),
            }
          : item,
      ),
    )
  }

  function removeLink(itemIndex: number, sectionIndex: number, path: Array<number>) {
    setItems((current) =>
      current.map((item, currentItemIndex) => {
        if (currentItemIndex !== itemIndex) return item

        return {
          ...item,
          sections: (item.sections ?? []).map((section, currentSectionIndex) =>
            currentSectionIndex === sectionIndex
              ? {
                  ...section,
                  links: removeLinkFromTree(section.links, path),
                }
              : section,
          ),
        }
      }),
    )
  }

  function moveItem(itemIndex: number, direction: -1 | 1) {
    setItems((current) => {
      const nextIndex = itemIndex + direction
      if (nextIndex < 0 || nextIndex >= current.length) return current

      const next = [...current]
      const [item] = next.splice(itemIndex, 1)
      next.splice(nextIndex, 0, item)
      setSelectedIndex(nextIndex)

      return next
    })
  }

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden p-0 sm:p-3 lg:p-5">
      <button
        aria-label="Fermer l’éditeur de menus"
        className="absolute inset-0 bg-slate-950/62 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        type="button"
      />

      <section
        className="relative mx-auto grid h-[100svh] w-full max-w-[1320px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-slate-200 bg-white shadow-[0_32px_100px_rgba(5,8,18,0.42)] sm:h-[min(920px,calc(100svh-24px))] sm:rounded-[28px] lg:h-[min(920px,calc(100svh-40px))]"
        data-navigation-manager-panel
      >
        <header className="grid shrink-0 gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-5 sm:py-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[#978360]">Navigation globale</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="font-heading text-[1.7rem] font-semibold leading-none tracking-[-0.05em] text-[#152036] sm:text-2xl">
                Menus et méga menu
              </h2>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500">
                {items.length} menus principaux · {totalLinks} liens
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 lg:justify-end">
            {message ? (
              <span
                className={cn(
                  "order-3 w-full rounded-full border px-3 py-2 text-xs font-bold sm:order-none sm:w-auto",
                  message.includes("Impossible")
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-[#d7e8f8] bg-[#ecf7ff] text-[#154a77]",
                )}
              >
                {message}
              </span>
            ) : null}
            <Button
              className="h-10 flex-1 rounded-2xl bg-[#152036] px-4 text-white hover:bg-[#243653] sm:flex-none"
              disabled={saving || loading}
              onClick={() => void persistNavigation()}
              type="button"
            >
              <Save className="size-4" />
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
            <Button
              aria-label="Fermer l’éditeur de menus"
              className="h-10 rounded-2xl border-slate-300 px-3 text-[#152036]"
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              <X className="size-4" />
              <span className="hidden sm:inline">Fermer</span>
            </Button>
          </div>
        </header>

        <div ref={contentRef} className="grid min-h-0 overflow-hidden bg-[#f7f9fc] lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="shrink-0 border-b border-slate-200 bg-white p-4 lg:min-h-0 lg:border-b-0 lg:border-r lg:p-4">
            <div className="hidden items-center justify-between gap-3 lg:flex">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">Menus principaux</p>
                <p className="mt-1 text-sm text-slate-500">Choisissez un menu ou ajoutez-en un.</p>
              </div>
              <Button className="h-10 rounded-2xl" onClick={addItem} type="button" variant="outline">
                <Plus className="size-4" />
                Ajouter
              </Button>
            </div>

            <div className="lg:hidden">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">Menu à éditer</p>
                  <p className="mt-1 truncate text-sm text-slate-500">Sélectionnez un menu principal.</p>
                </div>
                <Button className="h-10 shrink-0 rounded-2xl border-[#d7e8f8] bg-[#ecf7ff] text-[#1769a8] hover:bg-[#dff1ff]" onClick={addItem} type="button" variant="outline">
                  <Plus className="size-4" />
                  Ajouter
                </Button>
              </div>

              <select
                aria-label="Choisir le menu à éditer"
                className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-[#152036] shadow-sm outline-none focus:border-[#1769a8] focus:ring-4 focus:ring-[#1769a8]/10"
                onChange={(event) => {
                  setSelectedIndex(Number(event.target.value))
                  requestAnimationFrame(() => contentRef.current?.scrollTo({ top: 0, behavior: "smooth" }))
                }}
                value={selectedIndex}
              >
                {items.map((item, itemIndex) => (
                  <option key={`${item.href}-${itemIndex}`} value={itemIndex}>
                    {item.label || "Menu sans libellé"} · {item.href || "/"}
                  </option>
                ))}
              </select>

              {selectedItem ? (
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                  <span className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                    {selectedItem.sections?.length ?? 0} sous-menu{(selectedItem.sections?.length ?? 0) > 1 ? "s" : ""}
                  </span>
                  <span className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                    {countLinks(selectedItem)} lien{countLinks(selectedItem) > 1 ? "s" : ""}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="mt-4 hidden min-h-0 space-y-2 overflow-y-auto pr-1 lg:block lg:max-h-[calc(100svh-230px)]">
              {items.map((item, itemIndex) => {
                const selected = itemIndex === selectedIndex
                const sections = item.sections?.length ?? 0
                const links = countLinks(item)

                return (
                  <button
                    key={`${item.href}-${itemIndex}`}
                    className={cn(
                      "group flex w-full items-start gap-3 rounded-[18px] border p-3 text-left transition-colors",
                      selected
                        ? "border-[#152036] bg-[#152036] text-white shadow-[0_14px_34px_rgba(21,32,54,0.18)]"
                        : "border-slate-200 bg-slate-50 text-[#152036] hover:border-[#b7cde0] hover:bg-white",
                    )}
                    onClick={() => {
                      setSelectedIndex(itemIndex)
                      requestAnimationFrame(() => contentRef.current?.scrollTo({ top: 0, behavior: "smooth" }))
                    }}
                    type="button"
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-2xl border",
                        selected ? "border-white/14 bg-white/10 text-white" : "border-[#d7e8f8] bg-[#ecf7ff] text-[#1769a8]",
                      )}
                    >
                      <ListTree className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-extrabold">{item.label || "Menu sans libellé"}</span>
                      <span className={cn("mt-1 block truncate text-xs", selected ? "text-white/64" : "text-slate-500")}>
                        {item.href || "/"}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        <span className={cn("rounded-full px-2 py-0.5 text-[0.68rem] font-bold", selected ? "bg-white/10 text-white/74" : "bg-white text-slate-500")}>
                          {sections} sous-menu{sections > 1 ? "s" : ""}
                        </span>
                        <span className={cn("rounded-full px-2 py-0.5 text-[0.68rem] font-bold", selected ? "bg-white/10 text-white/74" : "bg-white text-slate-500")}>
                          {links} lien{links > 1 ? "s" : ""}
                        </span>
                      </span>
                    </span>
                    <ArrowRight className={cn("mt-2 size-4 shrink-0", selected ? "text-white" : "text-slate-400 group-hover:text-[#1769a8]")} />
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="min-h-0 overflow-x-hidden overflow-y-auto p-3 sm:p-4 lg:p-6">
            {!selectedItem ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center">
                <h3 className="font-heading text-2xl font-semibold text-[#152036]">Aucun menu</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Ajoutez un menu principal pour construire la navigation du site.
                </p>
                <Button className="mt-5 rounded-2xl bg-[#152036] text-white hover:bg-[#243653]" onClick={addItem} type="button">
                  <Plus className="size-4" />
                  Ajouter un menu
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#978360]">Menu principal</p>
                      <h3 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.05em] text-[#152036]">
                        {selectedItem.label || "Menu sans libellé"}
                      </h3>
                    </div>
                    <div className="flex gap-1.5">
                      <Button
                        aria-label="Déplacer le menu vers le haut"
                        className="rounded-2xl"
                        disabled={selectedIndex === 0}
                        onClick={() => moveItem(selectedIndex, -1)}
                        type="button"
                        variant="outline"
                      >
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button
                        aria-label="Déplacer le menu vers le bas"
                        className="rounded-2xl"
                        disabled={selectedIndex === items.length - 1}
                        onClick={() => moveItem(selectedIndex, 1)}
                        type="button"
                        variant="outline"
                      >
                        <ArrowDown className="size-4" />
                      </Button>
                      <Button
                        className="rounded-2xl border-red-200 text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(selectedIndex)}
                        type="button"
                        variant="outline"
                      >
                        <Trash2 className="size-4" />
                        Supprimer
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-2">
                    <LabeledInput
                      label="Libellé"
                      onChange={(label) => updateItem(selectedIndex, { label })}
                      value={selectedItem.label}
                    />
                    <LabeledInput
                      label="Lien principal"
                      onChange={(href) => updateItem(selectedIndex, { href })}
                      value={selectedItem.href}
                    />
                    <label className="grid gap-1.5 lg:col-span-2">
                      <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-slate-500">Description</span>
                      <Textarea
                        className="min-h-20 rounded-xl border-slate-200 bg-white text-sm text-[#152036] placeholder:text-slate-400 focus-visible:ring-[#1769a8]/24"
                        onChange={(event) => updateItem(selectedIndex, { description: event.target.value })}
                        value={selectedItem.description ?? ""}
                      />
                    </label>
                  </div>
                </section>

                <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#978360]">Méga menu</p>
                      <h3 className="mt-1 font-heading text-xl font-semibold tracking-[-0.04em] text-[#152036]">
                        Sous-menus déroulants
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Un sous-menu peut être une page directe, puis contenir des liens internes ou des sous-pages.
                      </p>
                    </div>
                    <Button className="rounded-2xl bg-[#152036] text-white hover:bg-[#243653]" onClick={() => addSection(selectedIndex)} type="button">
                      <Plus className="size-4" />
                      Ajouter un sous-menu
                    </Button>
                  </div>

                  {(selectedItem.sections ?? []).length ? (
                    <div className="mt-4 grid gap-3">
                      {(selectedItem.sections ?? []).map((section, sectionIndex) => (
                        <details key={`${section.title}-${sectionIndex}`} className="group rounded-[20px] border border-slate-200 bg-[#f8fafc] p-3" open={sectionIndex === 0}>
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-1 py-1">
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-extrabold text-[#152036]">{section.title || "Section sans titre"}</span>
                              <span className="mt-1 block truncate text-xs text-slate-500">
                                {section.href || "Sous-menu de groupe"} · {countNestedLinks(section.links)} lien{countNestedLinks(section.links) > 1 ? "s" : ""}
                              </span>
                            </span>
                            <ChevronDown className="size-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
                          </summary>

                          <div className="mt-3 rounded-[18px] border border-slate-200 bg-white p-3">
                            <div className="grid gap-3 lg:grid-cols-2">
                              <LabeledInput
                                label="Titre du sous-menu"
                                onChange={(title) => updateSection(selectedIndex, sectionIndex, { title })}
                                value={section.title}
                              />
                              <LabeledInput
                                label="Lien du sous-menu"
                                onChange={(href) => updateSection(selectedIndex, sectionIndex, { href })}
                                value={section.href ?? ""}
                              />
                              <label className="grid gap-1.5 lg:col-span-2">
                                <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-slate-500">Description du sous-menu</span>
                                <Textarea
                                  className="min-h-16 rounded-xl border-slate-200 bg-white text-sm text-[#152036] placeholder:text-slate-400 focus-visible:ring-[#1769a8]/24"
                                  onChange={(event) => updateSection(selectedIndex, sectionIndex, { description: event.target.value })}
                                  value={section.description ?? ""}
                                />
                              </label>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">Liens du sous-menu</p>
                              <div className="flex gap-2">
                                <Button className="h-9 rounded-xl" onClick={() => addLink(selectedIndex, sectionIndex)} type="button" variant="outline">
                                  <Plus className="size-4" />
                                  Ajouter un lien
                                </Button>
                                <Button
                                  className="h-9 rounded-xl border-red-200 text-red-700 hover:bg-red-50"
                                  onClick={() => removeSection(selectedIndex, sectionIndex)}
                                  type="button"
                                  variant="outline"
                                >
                                  <Trash2 className="size-4" />
                                  Sous-menu
                                </Button>
                              </div>
                            </div>

                            {section.links.length ? (
                              <div className="mt-3 grid gap-2">
                                <MenuLinkTreeEditor
                                  links={section.links}
                                  onAddChild={(path) => addChildLink(selectedIndex, sectionIndex, path)}
                                  onRemove={(path) => removeLink(selectedIndex, sectionIndex, path)}
                                  onUpdate={(path, patch) => updateLink(selectedIndex, sectionIndex, path, patch)}
                                />
                              </div>
                            ) : (
                              <div className="mt-3 rounded-[16px] border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">
                                Ce sous-menu n’a pas encore de liens.
                              </div>
                            )}
                          </div>
                        </details>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-[20px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                      <p className="font-semibold text-[#152036]">Ce menu n’a pas encore de sous-menu.</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Ajoutez un sous-menu seulement si ce menu doit ouvrir un panneau déroulant.
                      </p>
                      <Button className="mt-4 rounded-2xl bg-[#152036] text-white hover:bg-[#243653]" onClick={() => addSection(selectedIndex)} type="button">
                        <Plus className="size-4" />
                        Ajouter un sous-menu
                      </Button>
                    </div>
                  )}
                </section>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  )
}

function MenuLinkTreeEditor({
  level = 0,
  links,
  onAddChild,
  onRemove,
  onUpdate,
  parentPath = [],
}: {
  level?: number
  links: Array<SiteNavLink>
  onAddChild: (path: Array<number>) => void
  onRemove: (path: Array<number>) => void
  onUpdate: (path: Array<number>, patch: Partial<SiteNavLink>) => void
  parentPath?: Array<number>
}) {
  return (
    <div className="grid gap-2">
      {links.map((link, linkIndex) => {
        const path = [...parentPath, linkIndex]
        const children = link.children ?? []
        const childCount = countNestedLinks(children)

        return (
          <details
            key={`${path.join(".")}-${link.label}`}
            className={cn(
              "group/link rounded-[16px] border bg-[#f8fafc] p-2",
              level === 0 ? "border-slate-100" : "border-[#d7e8f8] bg-[#fbfdff]",
            )}
            open={level === 0 && linkIndex === 0}
          >
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2 rounded-[14px] px-2 py-2 hover:bg-white">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <ChevronDown className="size-4 shrink-0 text-slate-400 transition-transform group-open/link:rotate-180" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-[#152036]">{link.label || "Lien sans libellé"}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {level === 0 ? "Lien" : `Sous-lien niveau ${level + 1}`} · {link.href || "/"} · {childCount} enfant{childCount > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  className="h-9 rounded-xl border-[#d7e8f8] text-[#1769a8] hover:bg-[#ecf7ff]"
                  onClick={(event) => {
                    event.preventDefault()
                    onAddChild(path)
                  }}
                  type="button"
                  variant="outline"
                >
                  <Plus className="size-4" />
                  Sous-lien
                </Button>
                <Button
                  className="h-9 rounded-xl border-red-200 text-red-700 hover:bg-red-50"
                  onClick={(event) => {
                    event.preventDefault()
                    onRemove(path)
                  }}
                  type="button"
                  variant="outline"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </summary>

            <div className="mt-2 rounded-[14px] border border-slate-100 bg-white p-3">
              <div className="grid gap-2 lg:grid-cols-2">
                <LabeledInput label="Libellé" onChange={(label) => onUpdate(path, { label })} value={link.label} />
                <LabeledInput label="Lien" onChange={(href) => onUpdate(path, { href })} value={link.href} />
                <label className="grid gap-1.5 lg:col-span-2">
                  <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-slate-500">Description</span>
                  <Textarea
                    className="min-h-16 rounded-xl border-slate-200 bg-white text-sm text-[#152036] placeholder:text-slate-400 focus-visible:ring-[#1769a8]/24"
                    onChange={(event) => onUpdate(path, { description: event.target.value })}
                    value={link.description}
                  />
                </label>
              </div>

              {children.length ? (
                <div className="mt-3 border-l-2 border-[#d7e8f8] pl-3">
                  <MenuLinkTreeEditor
                    level={level + 1}
                    links={children}
                    onAddChild={onAddChild}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    parentPath={path}
                  />
                </div>
              ) : null}
            </div>
          </details>
        )
      })}
    </div>
  )
}

function LabeledInput({
  label,
  onChange,
  value,
}: {
  label: string
  onChange: (value: string) => void
  value: string
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-slate-500">{label}</span>
      <Input
        className="h-11 rounded-xl border-slate-200 bg-white text-sm text-[#152036] shadow-none focus-visible:ring-[#1769a8]/24"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  )
}
