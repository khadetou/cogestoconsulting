import { next, rewrite } from "@vercel/functions"

const ARCHIVE_HOST = "archive.cogestoconsulting.com"
const INTERNAL_PROXY_PREFIX = "/wp-archive-proxy"

export default function middleware(request: Request) {
  const url = new URL(request.url)
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host")

  if (host !== ARCHIVE_HOST) {
    return next()
  }

  const proxyUrl = new URL(request.url)
  proxyUrl.pathname =
    url.pathname === INTERNAL_PROXY_PREFIX || url.pathname.startsWith(`${INTERNAL_PROXY_PREFIX}/`)
      ? url.pathname
      : `${INTERNAL_PROXY_PREFIX}${url.pathname === "/" ? "" : url.pathname}`

  return rewrite(proxyUrl)
}

export const config = {
  matcher: "/:path*",
}
