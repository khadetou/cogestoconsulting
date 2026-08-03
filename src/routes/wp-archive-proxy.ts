import { createFileRoute } from "@tanstack/react-router"

import { proxyWordPressArchive } from "@/server/wordpress-archive-proxy"

export const Route = createFileRoute("/wp-archive-proxy")({
  server: {
    handlers: {
      GET: ({ request }) => proxyWordPressArchive(request),
      HEAD: ({ request }) => proxyWordPressArchive(request),
      POST: ({ request }) => proxyWordPressArchive(request),
    },
  },
})
