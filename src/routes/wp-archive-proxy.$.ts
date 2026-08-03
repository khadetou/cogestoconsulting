import { createFileRoute } from "@tanstack/react-router"

import { proxyWordPressArchive } from "@/server/wordpress-archive-proxy"

export const Route = createFileRoute("/wp-archive-proxy/$")({
  server: {
    handlers: {
      GET: ({ params, request }) => proxyWordPressArchive(request, params._splat),
      HEAD: ({ params, request }) => proxyWordPressArchive(request, params._splat),
      POST: ({ params, request }) => proxyWordPressArchive(request, params._splat),
    },
  },
})
