import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"

import appCss from "../styles.css?url"
import { QueryProvider } from "@/lib/query-client"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Cogesto Consulting | Conseil, finance et performance",
      },
      {
        name: "description",
        content:
          "Cogesto Consulting accompagne les entreprises publiques et privées en stratégie, finance, organisation et management de la performance.",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        name: "theme-color",
        content: "#152036",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: "Cogesto Consulting",
      },
      {
        property: "og:title",
        content: "Cogesto Consulting | Conseil, finance et performance",
      },
      {
        property: "og:description",
        content:
          "Conseil, finance et management de la performance pour les organisations publiques et privées.",
      },
      {
        property: "og:url",
        content: "https://cogestoconsulting.vercel.app/",
      },
      {
        property: "og:image",
        content: "https://cogestoconsulting.vercel.app/og-image.png",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Cogesto Consulting | Conseil, finance et performance",
      },
      {
        name: "twitter:description",
        content:
          "Conseil, finance et management de la performance pour les organisations publiques et privées.",
      },
      {
        name: "twitter:image",
        content: "https://cogestoconsulting.vercel.app/og-image.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "any",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/icon-192.png",
        sizes: "192x192",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
    ],
  }),
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
