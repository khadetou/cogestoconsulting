import { createServerFn } from "@tanstack/react-start"
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server"
import type { Data } from "@puckeditor/core"

import type { BuilderPage, BuilderPageData } from "@/builder/types"
import { getDefaultBuilderPageData } from "@/builder/default-page-data"
import { normalizeBuilderPageData } from "@/builder/normalize"
import { getPayloadClient } from "@/server/payload/client"

const editorTokenCookie = "cogesto-editor-token"

type LoginInput = {
  email: string
  password: string
}

type SavePageInput = {
  metaDescription?: string
  metaTitle?: string
  puckData: BuilderPageData
  slug: string
  status: "draft" | "published"
  title: string
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
  .inputValidator((data: LoginInput) => data)
  .handler(async ({ data }) => {
    const payload = await getPayloadClient()
    const result = await payload.login({
      collection: "users",
      data,
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
