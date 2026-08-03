import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/rapport-studio")({
  head: () => ({
    meta: [
      { title: "Rapport Studio | Cogesto Consulting" },
      {
        name: "description",
        content:
          "Générateur interne de rapports Cogesto Consulting avec exports PDF et Word éditable.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: RapportStudioPage,
})

function RapportStudioPage() {
  return (
    <main className="h-svh min-h-[720px] overflow-hidden bg-[#eef1f5]">
      <iframe
        className="h-full w-full border-0"
        src="/rapport-studio-app/index.html"
        title="Générateur de rapports Cogesto Consulting"
      />
    </main>
  )
}
