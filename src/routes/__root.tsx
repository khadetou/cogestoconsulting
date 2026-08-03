import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"

import appCss from "../styles.css?url"
import { QueryProvider } from "@/lib/query-client"
import { buildRootSeoHead } from "@/lib/seo"

export const Route = createRootRoute({
  head: () => buildRootSeoHead(appCss),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
  component: () => <Outlet />,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Scripts />
      </body>
    </html>
  )
}
