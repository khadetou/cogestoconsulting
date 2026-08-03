import { createServerFn } from "@tanstack/react-start"
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server"
import type { Data } from "@puckeditor/core"

import type { BuilderPage, BuilderPageData } from "@/builder/types"
import { getDefaultBuilderPageData } from "@/builder/default-page-data"
import { normalizeBuilderPageData } from "@/builder/normalize"
import type { SiteNavItem, SiteNavLink } from "@/lib/site-data"
import { siteMenuItems } from "@/lib/site-data"
import { getPayloadClient } from "@/server/payload/client"

const editorTokenCookie = "cogesto-editor-token"
const navigationSettingsKey = "site-navigation"
const parcoursEntrepreneurNavItem: SiteNavItem = {
  description: "Parcours d’accompagnement pour renforcer la posture entrepreneuriale.",
  href: "/business-linkage-program/parcours-entrepreneur",
  label: "Parcours de l’entrepreneur",
}
const formationNavItem: SiteNavItem = {
  description: "Formation, séminaires, coaching et renforcement de capacités.",
  href: "/expertises#formation",
  label: "Formation",
}
const usePayloadPublicPages =
  process.env.NODE_ENV === "production" || process.env.COGESTO_USE_PAYLOAD_PUBLIC === "true"

type LoginInput = {
  data?: {
    email?: string
    password?: string
  }
  email?: string
  password?: string
}

type ServerFnWrappedInput<T> = T | { data: T }

type SavePageInput = {
  metaDescription?: string
  metaTitle?: string
  puckData: BuilderPageData
  slug: string
  status: "draft" | "published"
  title: string
}

type SaveSiteNavigationInput = {
  items: Array<SiteNavItem>
}

function normalizeSlug(slug: string) {
  return slug
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase()
}

function fallbackPage(slug: string): BuilderPage {
  const normalizedSlug = normalizeSlug(slug) || "accueil"

  return {
    slug: normalizedSlug,
    source: "fallback",
    status: "draft",
    title: `Page ${normalizedSlug}`,
    puckData: normalizeBuilderPageData(getDefaultBuilderPageData(normalizedSlug)),
  }
}

function normalizeLoginInput(input?: LoginInput) {
  if (!input) {
    return {
      email: "",
      password: "",
    }
  }

  const email = input.email ?? input.data?.email ?? ""
  const password = input.password ?? input.data?.password ?? ""

  return {
    email: email.trim(),
    password,
  }
}

function stringOrEmpty(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function sanitizeNavigationLink(value: unknown): SiteNavLink | null {
  const link = value && typeof value === "object" ? (value as Record<string, unknown>) : {}
  const label = stringOrEmpty(link.label)
  const href = stringOrEmpty(link.href)

  if (!label || !href) return null

  const children: Array<SiteNavLink> = Array.isArray(link.children)
    ? link.children
        .map(sanitizeNavigationLink)
        .filter((child): child is NonNullable<typeof child> => Boolean(child))
    : []

  return {
    ...(children.length ? { children } : {}),
    description: stringOrEmpty(link.description),
    href,
    label,
  }
}

function sanitizeNavigationSection(value: unknown) {
  const section = value && typeof value === "object" ? (value as Record<string, unknown>) : {}
  const title = stringOrEmpty(section.title)

  if (!title) return null

  return {
    description: stringOrEmpty(section.description),
    href: stringOrEmpty(section.href) || undefined,
    links: Array.isArray(section.links)
      ? section.links.map(sanitizeNavigationLink).filter((link): link is NonNullable<typeof link> => Boolean(link))
      : [],
    title,
  }
}

function sanitizeNavigationItem(value: unknown) {
  const item = value && typeof value === "object" ? (value as Record<string, unknown>) : {}
  const label = stringOrEmpty(item.label)
  const href = stringOrEmpty(item.href)

  if (!label || !href) return null

  const sections = Array.isArray(item.sections)
    ? item.sections
        .map(sanitizeNavigationSection)
        .filter((section): section is NonNullable<typeof section> => Boolean(section))
    : []

  const card = item.card && typeof item.card === "object" ? (item.card as Record<string, unknown>) : null

  return {
    ...(card
      ? {
          card: {
            cta: stringOrEmpty(card.cta),
            eyebrow: stringOrEmpty(card.eyebrow),
            href: stringOrEmpty(card.href) || href,
            text: stringOrEmpty(card.text),
            title: stringOrEmpty(card.title),
          },
        }
      : {}),
    description: stringOrEmpty(item.description),
    href,
    label,
    menuTitle: stringOrEmpty(item.menuTitle) || undefined,
    sections: sections.length ? sections : undefined,
  } satisfies SiteNavItem
}

function sanitizeNavigationItems(value: unknown): Array<SiteNavItem> {
  const items = Array.isArray(value) ? value : []
  const sanitized = items
    .map(sanitizeNavigationItem)
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return ensurePrimaryProgramNavigation(sanitized.length ? sanitized : siteMenuItems)
}

function ensurePrimaryProgramNavigation(items: Array<SiteNavItem>): Array<SiteNavItem> {
  const next = items
    .map((item) => {
      if (item.label !== "Programmes" || !item.sections?.length) return item

      return {
        ...item,
        sections: item.sections.filter((section) => section.href !== parcoursEntrepreneurNavItem.href),
      }
    })
    .filter((item) => {
      return ![
        parcoursEntrepreneurNavItem.href,
        formationNavItem.href,
      ].includes(item.href)
    })

  const insertAfterProgrammes = next.findIndex((item) => item.label === "Programmes")
  const insertAt = insertAfterProgrammes >= 0 ? insertAfterProgrammes + 1 : next.length

  next.splice(insertAt, 0, parcoursEntrepreneurNavItem, formationNavItem)

  return next
}

function toBuilderPage(doc: Record<string, unknown>): BuilderPage {
  return {
    id: doc.id as number | string | undefined,
    metaDescription: doc.metaDescription as string | undefined,
    metaTitle: doc.metaTitle as string | undefined,
    puckData: normalizeBuilderPageData((doc.puckData as Data | undefined) ?? getDefaultBuilderPageData(String(doc.slug ?? ""))),
    slug: String(doc.slug ?? ""),
    source: "payload",
    status: doc._status === "published" ? "published" : "draft",
    title: String(doc.title ?? "Page sans titre"),
    updatedAt: doc.updatedAt as string | undefined,
  }
}

async function findPageBySlug(slug: string, draft: boolean) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: "pages",
    depth: 0,
    draft,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: normalizeSlug(slug),
      },
    },
  })

  return result.docs[0] ? toBuilderPage(result.docs[0]) : null
}

async function requireEditor() {
  const token = getCookie(editorTokenCookie)

  if (!token) {
    throw new Error("Authentification requise")
  }

  const payload = await getPayloadClient()
  const auth = await payload.auth({
    headers: new Headers({
      authorization: `JWT ${token}`,
    }),
  })

  if (!auth.user) {
    throw new Error("Session éditeur invalide")
  }

  return auth.user
}

export const getPublishedBuilderPage = createServerFn({ method: "POST" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    if (!usePayloadPublicPages) {
      return fallbackPage(data.slug)
    }

    const page = await findPageBySlug(data.slug, false)

    return page ?? fallbackPage(data.slug)
  })

export const getEditableBuilderPage = createServerFn({ method: "POST" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    await requireEditor()

    const page = await findPageBySlug(data.slug, true)

    return page ?? fallbackPage(data.slug)
  })

export const saveBuilderPage = createServerFn({ method: "POST" })
  .inputValidator((data: SavePageInput) => data)
  .handler(async ({ data }) => {
    await requireEditor()

    const payload = await getPayloadClient()
    const slug = normalizeSlug(data.slug)
    const existing = await findPageBySlug(slug, true)
    const pageData = {
      _status: data.status,
      metaDescription: data.metaDescription,
      metaTitle: data.metaTitle,
      puckData: normalizeBuilderPageData(data.puckData),
      slug,
      title: data.title,
    }

    const saved = existing?.id
      ? await payload.update({
          collection: "pages",
          data: pageData,
          draft: data.status === "draft",
          id: existing.id,
          overrideAccess: true,
        })
      : await payload.create({
          collection: "pages",
          data: pageData,
          draft: data.status === "draft",
          overrideAccess: true,
        })

    return toBuilderPage(saved)
  })

export const loginEditor = createServerFn({ method: "POST" })
  .inputValidator((data: ServerFnWrappedInput<LoginInput>) => {
    if (data && typeof data === "object" && "data" in data) {
      return data.data
    }

    return data
  })
  .handler(async ({ data }) => {
    const payload = await getPayloadClient()
    const credentials = normalizeLoginInput(data)

    const result = await payload.login({
      collection: "users",
      data: credentials,
      overrideAccess: true,
    })

    if (!result.token || !result.user) {
      throw new Error("Identifiants invalides")
    }

    setCookie(editorTokenCookie, result.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 8,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return {
      email: "email" in result.user ? String(result.user.email) : "",
    }
  })

export const logoutEditor = createServerFn({ method: "POST" }).handler(() => {
  deleteCookie(editorTokenCookie, {
    path: "/",
  })

  return { ok: true }
})

export const getSiteNavigationSettings = createServerFn({ method: "GET" }).handler(async () => {
  if (!usePayloadPublicPages) {
    return { items: siteMenuItems }
  }

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: "site-settings",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      key: {
        equals: navigationSettingsKey,
      },
    },
  })

  const settings = result.docs[0] as Record<string, unknown> | undefined

  return {
    items: sanitizeNavigationItems(settings?.value),
  }
})

export const saveSiteNavigationSettings = createServerFn({ method: "POST" })
  .inputValidator((data: ServerFnWrappedInput<SaveSiteNavigationInput>) => {
    if (data && typeof data === "object" && "data" in data) {
      return data.data
    }

    return data
  })
  .handler(async ({ data }) => {
    await requireEditor()

    const payload = await getPayloadClient()
    const items = sanitizeNavigationItems(data?.items)
    const existing = await payload.find({
      collection: "site-settings",
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: {
        key: {
          equals: navigationSettingsKey,
        },
      },
    })
    const existingId = existing.docs[0]?.id
    const saved = existingId
      ? await payload.update({
          collection: "site-settings",
          data: {
            key: navigationSettingsKey,
            value: items,
          },
          id: existingId,
          overrideAccess: true,
        })
      : await payload.create({
          collection: "site-settings",
          data: {
            key: navigationSettingsKey,
            value: items,
          },
          overrideAccess: true,
        })

    return {
      items: sanitizeNavigationItems((saved as Record<string, unknown>).value),
    }
  })

export const getEditorSession = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const user = await requireEditor()

    return {
      authenticated: true,
      email: "email" in user ? String(user.email) : "",
    }
  } catch {
    return {
      authenticated: false,
      email: "",
    }
  }
})
