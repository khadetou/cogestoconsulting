import https from "node:https"
import type { IncomingHttpHeaders } from "node:http"

const OLD_WORDPRESS_HOST = "www.cogestoconsulting.com"
const OLD_WORDPRESS_IP = "77.111.240.238"
const ARCHIVE_HOST = "archive.cogestoconsulting.com"
const INTERNAL_PROXY_PREFIX = "/wp-archive-proxy"

const hopByHopHeaders = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
])

type UpstreamResponse = {
  body: Buffer
  headers: IncomingHttpHeaders
  status: number
}

function getRequestHost(request: Request) {
  return request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host
}

function getPublicBase(request: Request) {
  const host = getRequestHost(request)
  const protocol = request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "")

  return host === ARCHIVE_HOST ? `${protocol}://${host}` : `${protocol}://${host}${INTERNAL_PROXY_PREFIX}`
}

function rewriteArchiveText(input: string, request: Request) {
  const publicBase = getPublicBase(request).replace(/\/$/, "")
  const host = getRequestHost(request)
  const shouldPrefixRootPaths = host !== ARCHIVE_HOST
  let output = input
    .replaceAll(`https://${OLD_WORDPRESS_HOST}`, publicBase)
    .replaceAll(`http://${OLD_WORDPRESS_HOST}`, publicBase)
    .replaceAll(`//${OLD_WORDPRESS_HOST}`, `//${publicBase.replace(/^https?:\/\//, "")}`)
    .replaceAll(`https:\\/\\/${OLD_WORDPRESS_HOST}`, publicBase.replaceAll("/", "\\/"))
    .replaceAll(`http:\\/\\/${OLD_WORDPRESS_HOST}`, publicBase.replaceAll("/", "\\/"))

  if (shouldPrefixRootPaths) {
    output = output
      .replace(
        /((?:href|src|action)=["'])\/(?!\/|wp-archive-proxy\/)/gi,
        `$1${INTERNAL_PROXY_PREFIX}/`,
      )
      .replace(/(url\(["']?)\/(?!\/|wp-archive-proxy\/)/gi, `$1${INTERNAL_PROXY_PREFIX}/`)
  }

  return output
}

function rewriteSetCookie(cookie: string) {
  return cookie.replace(/;\s*domain=[^;]+/gi, "")
}

function buildUpstreamHeaders(request: Request, body?: Buffer) {
  const headers: Record<string, string> = {
    accept: request.headers.get("accept") ?? "*/*",
    "accept-language": request.headers.get("accept-language") ?? "fr-FR,fr;q=0.9,en;q=0.8",
    host: OLD_WORDPRESS_HOST,
    "user-agent":
      request.headers.get("user-agent") ??
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari",
  }

  const cookie = request.headers.get("cookie")
  if (cookie) headers.cookie = cookie

  const contentType = request.headers.get("content-type")
  if (contentType) headers["content-type"] = contentType

  const origin = request.headers.get("origin")
  if (origin) headers.origin = `https://${OLD_WORDPRESS_HOST}`

  const referer = request.headers.get("referer")
  if (referer) headers.referer = referer.replace(getPublicBase(request), `https://${OLD_WORDPRESS_HOST}`)

  if (body) headers["content-length"] = String(body.length)

  return headers
}

async function readRequestBody(request: Request) {
  if (request.method === "GET" || request.method === "HEAD") {
    return undefined
  }

  return Buffer.from(await request.arrayBuffer())
}

async function fetchOldWordPress(pathname: string, request: Request): Promise<UpstreamResponse> {
  const body = await readRequestBody(request)

  return new Promise((resolve, reject) => {
    const upstreamRequest = https.request(
      {
        headers: buildUpstreamHeaders(request, body),
        hostname: OLD_WORDPRESS_IP,
        method: request.method,
        path: pathname,
        port: 443,
        servername: OLD_WORDPRESS_HOST,
      },
      (upstreamResponse) => {
        const chunks: Array<Buffer> = []

        upstreamResponse.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
        upstreamResponse.on("end", () => {
          resolve({
            body: Buffer.concat(chunks),
            headers: upstreamResponse.headers,
            status: upstreamResponse.statusCode ?? 502,
          })
        })
      },
    )

    upstreamRequest.on("error", reject)
    if (body) upstreamRequest.write(body)
    upstreamRequest.end()
  })
}

function buildResponseHeaders(upstream: UpstreamResponse, request: Request, body?: Buffer) {
  const headers = new Headers()

  for (const [name, value] of Object.entries(upstream.headers)) {
    const lowerName = name.toLowerCase()
    if (!value || hopByHopHeaders.has(lowerName)) continue

    if (lowerName === "location" && typeof value === "string") {
      headers.set(name, rewriteArchiveText(value, request))
      continue
    }

    if (lowerName === "set-cookie") {
      const cookies = Array.isArray(value) ? value : [String(value)]
      for (const cookie of cookies) {
        headers.append("set-cookie", rewriteSetCookie(cookie))
      }
      continue
    }

    headers.set(name, Array.isArray(value) ? value.join(", ") : String(value))
  }

  headers.set("cache-control", "no-store, max-age=0")
  headers.set("x-robots-tag", "noindex, nofollow, noarchive")
  headers.delete("content-security-policy")

  if (body) headers.set("content-length", String(body.byteLength))

  return headers
}

function isTextResponse(contentType: string) {
  return (
    contentType.includes("text/") ||
    contentType.includes("application/javascript") ||
    contentType.includes("application/json") ||
    contentType.includes("application/xml") ||
    contentType.includes("image/svg+xml")
  )
}

function normalizeArchivePath(splat: string | undefined, request: Request) {
  const incomingUrl = new URL(request.url)
  let upstreamPath = incomingUrl.pathname

  if (upstreamPath === INTERNAL_PROXY_PREFIX || upstreamPath === `${INTERNAL_PROXY_PREFIX}/`) {
    upstreamPath = "/"
  } else if (upstreamPath.startsWith(`${INTERNAL_PROXY_PREFIX}/`)) {
    upstreamPath = upstreamPath.replace(INTERNAL_PROXY_PREFIX, "")
  } else if (splat) {
    upstreamPath = `/${splat.replace(/^\/+/, "")}`
  }

  return `${upstreamPath}${incomingUrl.search}`
}

export async function proxyWordPressArchive(request: Request, splat?: string) {
  const upstream = await fetchOldWordPress(normalizeArchivePath(splat, request), request)
  const contentType = String(upstream.headers["content-type"] ?? "")
  let body = upstream.body

  if (isTextResponse(contentType)) {
    let text = rewriteArchiveText(body.toString("utf8"), request)

    if (contentType.includes("text/html")) {
      text = text.replace(
        /<head([^>]*)>/i,
        `<head$1><meta name="robots" content="noindex,nofollow,noarchive"><base href="${getPublicBase(request).replace(/\/$/, "")}/">`,
      )
    }

    body = Buffer.from(text, "utf8")
  }

  const responseBody = request.method === "HEAD" ? null : Uint8Array.from(body).buffer

  return new Response(responseBody, {
    headers: buildResponseHeaders(upstream, request, body),
    status: upstream.status,
  })
}
