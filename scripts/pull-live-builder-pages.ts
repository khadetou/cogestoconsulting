import { writeFile } from "node:fs/promises"
import vm from "node:vm"

import { normalizeBuilderPageData } from "../src/builder/normalize"
import type { BuilderPage, BuilderPageData } from "../src/builder/types"

const liveOrigin = (process.env.COGESTO_LIVE_ORIGIN ?? "https://cogestoconsulting.vercel.app").replace(/\/+$/, "")
const shouldWriteDatabase = process.argv.includes("--db")
const shouldUseLocalDatabase = process.argv.includes("--local-db")
const shouldSkipSnapshot = process.argv.includes("--db-only")
const localDatabaseUrl =
  process.env.COGESTO_LOCAL_DATABASE_URL ??
  `postgres://${encodeURIComponent(process.env.USER ?? "postgres")}@localhost:5432/cogesto_consulting_builder`
const routePathsBySlug: Record<string, string> = {
  accueil: "/",
  about: "/about",
  expertises: "/expertises",
  "business-linkage-program": "/business-linkage-program",
  events: "/events",
  contact: "/contact",
}

type PulledPage = BuilderPage & {
  puckData: BuilderPageData
}

function extractTsrScript(html: string) {
  const script = html
    .match(/<script class="\$tsr"[\s\S]*?<\/script>/)?.[0]
    ?.replace(/^<script[^>]*>/, "")
    ?.replace(/<\/script>$/, "")

  if (!script) {
    throw new Error("Could not find the TanStack Start SSR payload script in the live HTML.")
  }

  return script
}

function extractPageFromHtml(html: string): PulledPage {
  const sandbox: Record<string, any> = {
    console,
    document: {
      currentScript: {
        remove() {},
      },
    },
  }
  sandbox.self = sandbox

  vm.createContext(sandbox)
  vm.runInContext(extractTsrScript(html), sandbox)

  const page = sandbox.$_TSR?.router?.matches?.find((match: any) => match?.l)?.l

  if (!page?.slug || !page?.puckData) {
    throw new Error("The live SSR payload did not include a builder page.")
  }

  return page as PulledPage
}

async function fetchLivePage(slug: string, path: string) {
  const url = `${liveOrigin}${path}`
  const response = await fetch(url, {
    headers: {
      "accept": "text/html",
      "user-agent": "cogesto-builder-sync/1.0",
    },
  })

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}: ${response.status} ${response.statusText}`)
  }

  const page = extractPageFromHtml(await response.text())

  if (page.slug !== slug) {
    throw new Error(`Expected live slug "${slug}" from ${url}, received "${page.slug}".`)
  }

  return page
}

function getTargetDatabaseUrl() {
  return shouldUseLocalDatabase
    ? localDatabaseUrl
    : (process.env.DATABASE_URL ?? process.env.PAYLOAD_DATABASE_URL)
}

function assertDatabaseWriteIsSafe() {
  if (!shouldWriteDatabase) return

  const databaseUrl = getTargetDatabaseUrl()
  if (!databaseUrl) return

  const host = new URL(databaseUrl).hostname
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(host)
  const isExplicitlyAllowed = process.env.COGESTO_ALLOW_REMOTE_PAYLOAD_WRITE === "true"

  if (!isLocalHost && !isExplicitlyAllowed) {
    throw new Error(
      [
        `Refusing to write pulled pages to remote Payload database host "${host}".`,
        "Point DATABASE_URL to a local/staging database, or set COGESTO_ALLOW_REMOTE_PAYLOAD_WRITE=true if this is intentional.",
      ].join(" "),
    )
  }
}

async function writeSnapshot(pagesBySlug: Record<string, PulledPage>) {
  const pageDataBySlug = Object.fromEntries(
    Object.entries(pagesBySlug).map(([slug, page]) => [slug, normalizeBuilderPageData(page.puckData)]),
  )
  const snapshot = `import type { BuilderPageData } from "@/builder/types"\n\n// Snapshot extracted from ${liveOrigin} on ${new Date().toISOString()}.\n// It mirrors the published Payload builder records so local installs and fallbacks\n// render the same editorial changes without requiring the production database.\nexport const liveBuilderPageDataBySlug = ${JSON.stringify(pageDataBySlug, null, 2)} satisfies Record<string, BuilderPageData>\n`

  await writeFile("src/builder/live-page-snapshots.ts", snapshot)
  console.log("Updated src/builder/live-page-snapshots.ts")
}

async function upsertPayloadPages(pagesBySlug: Record<string, PulledPage>) {
  assertDatabaseWriteIsSafe()

  const targetDatabaseUrl = getTargetDatabaseUrl()

  if (targetDatabaseUrl) {
    process.env.DATABASE_URL = targetDatabaseUrl
    process.env.PAYLOAD_DATABASE_URL = targetDatabaseUrl
  }

  if (shouldUseLocalDatabase) {
    process.env.COGESTO_USE_LOCAL_PAYLOAD_DB = "true"
  }

  const { getPayloadClient } = await import("../src/server/payload/client")
  const payload = await getPayloadClient()

  try {
    for (const [slug, page] of Object.entries(pagesBySlug)) {
      const existing = await payload.find({
        collection: "pages",
        draft: true,
        limit: 1,
        overrideAccess: true,
        pagination: false,
        where: {
          slug: {
            equals: slug,
          },
        },
      })
      const data = {
        _status: "published" as const,
        metaDescription: page.metaDescription,
        metaTitle: page.metaTitle,
        puckData: normalizeBuilderPageData(page.puckData),
        slug,
        title: page.title,
      }

      if (existing.docs[0]?.id) {
        await payload.update({
          collection: "pages",
          data,
          id: existing.docs[0].id,
          overrideAccess: true,
        })
        console.log(`Updated Payload page: ${slug}`)
      } else {
        await payload.create({
          collection: "pages",
          data,
          overrideAccess: true,
        })
        console.log(`Created Payload page: ${slug}`)
      }
    }
  } finally {
    await payload.destroy()
  }
}

const pagesBySlug: Record<string, PulledPage> = {}

assertDatabaseWriteIsSafe()

for (const [slug, path] of Object.entries(routePathsBySlug)) {
  pagesBySlug[slug] = await fetchLivePage(slug, path)
  console.log(`Pulled ${slug} from ${liveOrigin}${path}`)
}

if (!shouldSkipSnapshot) {
  await writeSnapshot(pagesBySlug)
}

if (shouldWriteDatabase) {
  await upsertPayloadPages(pagesBySlug)
}

process.exit(0)
