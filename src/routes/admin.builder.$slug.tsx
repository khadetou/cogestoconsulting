import { Puck, createUsePuck } from "@puckeditor/core"
import "@puckeditor/core/puck.css"
import "@/styles/puck-editor.css"
import { Link, createFileRoute, useRouter } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { ArrowRight, CheckCircle2, ChevronDown, CircleDot, Loader2, LogOut, Maximize2, Minimize2, Save, ShieldAlert, UploadCloud } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import type { Data } from "@puckeditor/core"

import type { BuilderPageData } from "@/builder/types"
import { builderConfig } from "@/builder/config"
import {
  isBuilderNavigateMessage,
  isInlineEditMessage,
  isInlineStyleMessage,
  updateBuilderBlockProp,
  updateBuilderBlockTextStyle,
} from "@/builder/inline-editing"
import { broadcastBuilderPageUpdate } from "@/builder/live-sync"
import { normalizeBuilderPageData } from "@/builder/normalize"
import { EditorAccessShell } from "@/components/editor-access-shell"
import { Button } from "@/components/ui/button"
import {
  getEditableBuilderPage,
  getEditorSession,
  logoutEditor,
  saveBuilderPage,
} from "@/server/payload/pages"

const useBuilderPuck = createUsePuck<typeof builderConfig>()

const editorPages = [
  { label: "Accueil", slug: "accueil" },
  { label: "À propos", slug: "about" },
  { label: "Nos expertises", slug: "expertises" },
  { label: "Business Linkage Program", slug: "business-linkage-program" },
  { label: "Évènements", slug: "events" },
  { label: "Contact", slug: "contact" },
] as const

export const Route = createFileRoute("/admin/builder/$slug")({
  head: () => ({
    meta: [
      { title: "Visual Builder | Cogesto Consulting" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  loader: async ({ params }) => {
    const session = await getEditorSession()

    if (!session.authenticated) {
      return {
        page: null,
        session,
        slug: params.slug,
      }
    }

    return {
      page: await getEditableBuilderPage({ data: { slug: params.slug } }),
      session,
      slug: params.slug,
    }
  },
  ssr: false,
  component: AdminBuilderPage,
})

function AdminBuilderPage() {
  const router = useRouter()
  const savePage = useServerFn(saveBuilderPage)
  const logout = useServerFn(logoutEditor)
  const { page, session, slug } = Route.useLoaderData()
  const [currentPageState, setCurrentPageState] = useState<{
    data: BuilderPageData
    slug: string
  } | null>(
    page?.puckData
      ? {
          data: normalizeBuilderPageData(page.puckData),
          slug: page.slug,
        }
      : null,
  )
  const [focusMode, setFocusMode] = useState(true)
  const [saving, setSaving] = useState<"draft" | "published" | null>(null)
  const [statusMessage, setStatusMessage] = useState("")

  const title = useMemo(() => page?.title ?? `Page ${slug}`, [page?.title, slug])

  useEffect(() => {
    setCurrentPageState(
      page?.puckData
        ? {
            data: normalizeBuilderPageData(page.puckData),
            slug: page.slug,
          }
        : null,
    )
  }, [page?.puckData, page?.slug])

  useEffect(() => {
    setStatusMessage("")
  }, [slug])

  if (!session.authenticated || !page || !currentPageState || currentPageState.slug !== slug) {
    const needsSession = !session.authenticated || !page

    return needsSession ? (
      <EditorAccessShell
        description="Votre session éditeur est nécessaire pour accéder au builder et publier les pages Cogesto."
        eyebrow="Session requise"
        icon={ShieldAlert}
        title="Connectez-vous pour éditer cette page."
      >
        <Button
          asChild
          className="h-12 rounded-2xl bg-[#152036] px-5 text-[0.95rem] font-extrabold text-white shadow-[0_16px_30px_rgba(21,32,54,0.18)] hover:bg-[#243653]"
        >
          <Link to="/admin/login">
            Aller à la connexion
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </EditorAccessShell>
    ) : (
      <EditorAccessShell
        description="La page éditable est en cours de préparation. Le canvas s’ouvrira automatiquement dans un instant."
        eyebrow="Chargement"
        icon={Loader2}
        title="Préparation de la page éditable."
      >
        <div className="flex items-center gap-3 rounded-2xl border border-[#e6e0d4] bg-[#fbfbf8] px-4 py-3 text-sm font-semibold text-slate-600">
          <Loader2 className="size-4 animate-spin text-[#978360]" />
          <span>Chargement du canvas</span>
        </div>
      </EditorAccessShell>
    )
  }

  async function persist(status: "draft" | "published", data: Data) {
    setSaving(status)
    setStatusMessage("")

    try {
      const saved = await savePage({
        data: {
          metaDescription: page?.metaDescription,
          metaTitle: page?.metaTitle,
          puckData: normalizeBuilderPageData(data),
          slug,
          status,
          title,
        },
      })

      setCurrentPageState({
        data: saved.puckData,
        slug: saved.slug,
      })
      setStatusMessage(status === "published" ? "Page publiée." : "Brouillon sauvegardé.")
      broadcastBuilderPageUpdate({
        slug: saved.slug,
        status,
        updatedAt: saved.updatedAt,
      })
      await router.invalidate()
    } catch {
      setStatusMessage("Échec de la sauvegarde. Vérifiez la connexion puis réessayez.")
    } finally {
      setSaving(null)
    }
  }

  return (
    <div className={`cogesto-puck-editor min-h-svh bg-[#eef2f7] ${focusMode ? "cogesto-puck-editor--focus" : ""}`}>
      <Puck
        key={slug}
        config={builderConfig}
        data={currentPageState.data}
        headerPath={`/pages/${slug}`}
        headerTitle={`Cogesto Consulting / ${title}`}
        onChange={(data) =>
          setCurrentPageState({
            data: normalizeBuilderPageData(data),
            slug,
          })
        }
        onPublish={(data) => void persist("published", data)}
        permissions={{
          delete: false,
          drag: false,
          duplicate: false,
          edit: true,
          insert: false,
        }}
        overrides={{
          headerActions: () => (
            <BuilderHeaderActions
              logout={async () => {
                await logout()
                await router.invalidate()
              }}
              onInlineEdit={() => setStatusMessage("Modification directe en attente de sauvegarde.")}
              currentSlug={slug}
              focusMode={focusMode}
              persist={persist}
              navigateToPage={async (nextSlug) => {
                await router.navigate({
                  params: { slug: nextSlug },
                  to: "/admin/builder/$slug",
                })
              }}
              saving={saving}
              statusMessage={statusMessage}
              toggleFocusMode={() => setFocusMode((value) => !value)}
            />
          ),
        }}
      />
    </div>
  )
}

function BuilderHeaderActions({
  currentSlug,
  focusMode,
  logout,
  navigateToPage,
  onInlineEdit,
  persist,
  saving,
  statusMessage,
  toggleFocusMode,
}: {
  currentSlug: string
  focusMode: boolean
  logout: () => Promise<void>
  navigateToPage: (slug: string) => Promise<void>
  onInlineEdit: () => void
  persist: (status: "draft" | "published", data: Data) => Promise<void>
  saving: "draft" | "published" | null
  statusMessage: string
  toggleFocusMode: () => void
}) {
  const data = useBuilderPuck((state) => state.appState.data)
  const dispatch = useBuilderPuck((state) => state.dispatch)

  useEffect(() => {
    function handleBuilderMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin && event.origin !== "null") return

      if (isBuilderNavigateMessage(event.data)) {
        const nextSlug = getEditorSlugFromHref(event.data.href)

        if (nextSlug && nextSlug !== currentSlug) {
          void navigateToPage(nextSlug)
        }

        return
      }

      if (isInlineStyleMessage(event.data)) {
        const message = event.data

        dispatch({
          data: (previous) => updateBuilderBlockTextStyle(previous, message.blockId, message.path, message.style),
          recordHistory: true,
          type: "setData",
        })
        onInlineEdit()
        return
      }

      if (!isInlineEditMessage(event.data)) return

      const message = event.data

      dispatch({
        data: (previous) => updateBuilderBlockProp(previous, message.blockId, message.path, message.value, message.richText),
        recordHistory: true,
        type: "setData",
      })
      onInlineEdit()
    }

    window.addEventListener("message", handleBuilderMessage)
    return () => window.removeEventListener("message", handleBuilderMessage)
  }, [currentSlug, dispatch, navigateToPage, onInlineEdit])

  const currentPage = editorPages.find((page) => page.slug === currentSlug) ?? editorPages[0]
  const isPublishedMessage = statusMessage.toLowerCase().includes("publi")
  const isErrorMessage = statusMessage.toLowerCase().includes("échec")
  const statusLabel = statusMessage || "Prêt"

  return (
    <div className="builder-editor-actions">
      <div
        className="builder-editor-status"
        data-state={isErrorMessage ? "error" : isPublishedMessage ? "published" : statusMessage ? "pending" : "idle"}
      >
        {isPublishedMessage ? <CheckCircle2 className="size-4" /> : <CircleDot className="size-4" />}
        <span>{statusLabel}</span>
      </div>

      <label className="builder-editor-page-picker">
        <span className="sr-only">Changer de page à éditer</span>
        <span className="builder-editor-page-picker__label">Page</span>
        <select
          aria-label="Changer de page à éditer"
          className="builder-editor-page-picker__select"
          onChange={(event) => void navigateToPage(event.target.value)}
          value={currentPage.slug}
        >
          {editorPages.map((page) => (
            <option key={page.slug} value={page.slug}>
              {page.label}
            </option>
          ))}
        </select>
        <ChevronDown className="builder-editor-page-picker__icon" />
      </label>

      <div className="builder-editor-action-group">
        <Button
          aria-pressed={focusMode}
          className="builder-editor-button builder-editor-button--quiet"
          onClick={toggleFocusMode}
          type="button"
          variant="outline"
        >
          {focusMode ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          <span>{focusMode ? "Afficher panneaux" : "Mode page"}</span>
        </Button>
        <Button
          className="builder-editor-button builder-editor-button--draft"
          disabled={saving !== null}
          onClick={() => void persist("draft", data)}
          type="button"
        >
          <Save className="size-4" />
          <span>{saving === "draft" ? "Sauvegarde..." : "Brouillon"}</span>
        </Button>
        <Button
          className="builder-editor-button builder-editor-button--publish"
          disabled={saving !== null}
          onClick={() => void persist("published", data)}
          type="button"
        >
          <UploadCloud className="size-4" />
          <span>{saving === "published" ? "Publication..." : "Publier"}</span>
        </Button>
        <Button
          className="builder-editor-button builder-editor-button--exit"
          onClick={() => void logout()}
          type="button"
          variant="outline"
        >
          <LogOut className="size-4" />
          <span>Sortir</span>
        </Button>
      </div>
    </div>
  )
}

function getEditorSlugFromHref(href: string) {
  const [pathname] = href.split("#")
  const cleanPathname = pathname.replace(/\/+$/g, "") || "/"

  if (cleanPathname === "/" || cleanPathname === "/pages/accueil") return "accueil"

  const pagesPath = cleanPathname.match(/^\/pages\/([^/]+)$/)
  if (pagesPath?.[1]) return pagesPath[1]

  const directPath = cleanPathname.replace(/^\//, "")
  const match = editorPages.find((page) => page.slug === directPath)

  return match?.slug ?? null
}
