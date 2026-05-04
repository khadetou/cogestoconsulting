import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { ArrowRight, Eye, EyeOff, KeyRound, LockKeyhole, Mail } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { EditorAccessShell } from "@/components/editor-access-shell"
import { Input } from "@/components/ui/input"
import { loginEditor } from "@/server/payload/pages"

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Connexion éditeur | Cogesto Consulting" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLoginPage,
})

function AdminLoginPage() {
  const login = useServerFn(loginEditor)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function submitLogin() {
    setError("")
    setSubmitting(true)

    try {
      await login({ data: { email, password } })
      await navigate({ to: "/admin/builder/$slug", params: { slug: "accueil" } })
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Connexion impossible")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <EditorAccessShell
      description="Accès réservé aux utilisateurs autorisés à modifier les pages Cogesto."
      eyebrow="Cogesto CMS"
      icon={LockKeyhole}
      title="Connexion éditeur"
    >
      <form
        className="grid gap-4"
        method="post"
        onSubmit={(event) => {
          event.preventDefault()
          void submitLogin()
        }}
      >
        <label className="grid gap-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">Email</span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#978360]" />
            <Input
              autoComplete="email"
              className="h-12 rounded-2xl border-[#e6e0d4] bg-[#fbfbf8] pl-10 pr-4 text-[0.82rem] font-semibold shadow-none focus-visible:ring-[#978360]/28 sm:pl-11 sm:text-[0.95rem]"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@cogestoconsulting.com"
              type="email"
              value={email}
            />
          </span>
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">Mot de passe</span>
          <span className="relative block">
            <KeyRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#978360]" />
            <Input
              autoComplete="current-password"
              className="h-12 rounded-2xl border-[#e6e0d4] bg-[#fbfbf8] pl-10 pr-12 text-[0.9rem] font-semibold shadow-none focus-visible:ring-[#978360]/28 sm:pl-11 sm:text-[0.95rem]"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe"
              type={passwordVisible ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              aria-pressed={passwordVisible}
              className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-[#e6e0d4]/55 hover:text-[#152036] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#978360]/32"
              onClick={() => setPasswordVisible((visible) => !visible)}
              type="button"
            >
              {passwordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </span>
        </label>

        {error ? (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <Button
          className="mt-2 h-12 w-full rounded-2xl bg-[#152036] text-[0.95rem] font-extrabold text-white shadow-[0_16px_30px_rgba(21,32,54,0.18)] hover:bg-[#243653]"
          disabled={submitting}
          onClick={() => void submitLogin()}
          type="button"
        >
          {submitting ? "Connexion..." : "Se connecter"}
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </EditorAccessShell>
  )
}
