import { createFileRoute } from "@tanstack/react-router"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react"
import { useEffect, useState } from "react"

import { PageLayout } from "@/components/layout"
import { Input } from "@/components/ui/input"

const odooLoginUrl = "https://erp.cogestoconsulting.com/web/login"

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion au back-office | Cogesto Consulting" },
      {
        name: "description",
        content:
          "Accédez de manière sécurisée à votre espace de travail Cogesto Consulting.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
})

function LoginPage() {
  const [csrfToken, setCsrfToken] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [redirectTarget, setRedirectTarget] = useState("/odoo")
  const [notice, setNotice] = useState("")

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1))
    const search = new URLSearchParams(window.location.search)
    const token = hash.get("odoo_csrf")
    const destination = getLoginDestination(search)
    const loggedOut = search.get("logged_out") === "1"

    setRedirectTarget(destination)
    if (loggedOut) {
      setNotice(
        "Votre session a été fermée. Vous pouvez vous reconnecter en toute sécurité."
      )
    }

    if (token) {
      setCsrfToken(token)
      setLoading(false)
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`
      )
      return
    }

    window.location.replace(getOdooLoginBootstrapUrl(destination, loggedOut))
  }, [])

  return (
    <PageLayout showFooter={false}>
      <main className="relative isolate min-h-[calc(100svh-7rem)] overflow-hidden bg-[#f4f7fb]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_20%_10%,rgba(83,213,190,0.2),transparent_45%),linear-gradient(145deg,#152036_0%,#1d2c49_70%,#223454_100%)]"
        />

        <div className="site-container relative py-12 sm:py-16 lg:py-20">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Retour au site
          </a>

          <section className="mx-auto mt-9 grid max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-[#152036] p-7 text-white sm:p-10 lg:p-12">
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[#53d5be]/15 text-[#65e4cc]">
                <ShieldCheck className="size-7" />
              </div>

              <p className="mt-8 text-xs font-semibold tracking-[0.24em] text-[#65e4cc] uppercase">
                Espace professionnel
              </p>
              <h1 className="mt-4 max-w-md font-heading text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                Retrouvez votre environnement de travail Cogesto.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/68">
                Un accès unique à vos projets, feuilles de temps, activités CRM
                et outils de gestion.
              </p>

              <ul className="mt-9 space-y-4 text-sm text-white/80">
                {[
                  "Connexion protégée par le serveur ERP Cogesto",
                  "Accès direct au back-office selon vos droits",
                  "Session conservée sur vos appareils autorisés",
                ].map((item) => (
                  <li className="flex items-start gap-3" key={item}>
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#65e4cc]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#152036]">
                <LockKeyhole className="size-5" />
              </div>
              <p className="mt-7 text-sm font-semibold tracking-[0.18em] text-[#667085] uppercase">
                Connexion
              </p>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#101828]">
                Connectez-vous
              </h2>
              <p className="mt-4 text-base leading-7 text-[#667085]">
                Saisissez vos identifiants Odoo pour accéder directement à votre
                back-office Cogesto.
              </p>

              <form
                action={odooLoginUrl}
                className="mt-7 grid gap-4"
                method="post"
                onSubmit={(event) => {
                  if (!csrfToken || loading) {
                    event.preventDefault()
                    setError("La connexion sécurisée n’est pas encore prête.")
                    window.location.replace(
                      getOdooLoginBootstrapUrl(redirectTarget, Boolean(notice))
                    )
                    return
                  }

                  setSubmitting(true)
                }}
              >
                <input name="csrf_token" type="hidden" value={csrfToken} />
                <input name="redirect" type="hidden" value={redirectTarget} />
                <input name="type" type="hidden" value="password" />

                <label className="grid gap-2">
                  <span className="text-xs font-semibold tracking-[0.15em] text-[#667085] uppercase">
                    Adresse e-mail
                  </span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#98a2b3]" />
                    <Input
                      autoComplete="username"
                      autoFocus
                      className="h-13 rounded-2xl border-[#d0d5dd] bg-white pl-11 text-sm shadow-none focus-visible:border-[#152036] focus-visible:ring-[#152036]/15"
                      disabled={loading}
                      name="login"
                      placeholder="email@cogestoconsulting.com"
                      required
                      type="email"
                    />
                  </span>
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-semibold tracking-[0.15em] text-[#667085] uppercase">
                    Mot de passe
                  </span>
                  <span className="relative block">
                    <KeyRound className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#98a2b3]" />
                    <Input
                      autoComplete="current-password"
                      className="h-13 rounded-2xl border-[#d0d5dd] bg-white pr-12 pl-11 text-sm shadow-none focus-visible:border-[#152036] focus-visible:ring-[#152036]/15"
                      disabled={loading}
                      name="password"
                      placeholder="Votre mot de passe"
                      required
                      type={passwordVisible ? "text" : "password"}
                    />
                    <button
                      aria-label={
                        passwordVisible
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                      className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-[#667085] transition hover:bg-[#f2f4f7] hover:text-[#152036] focus-visible:ring-2 focus-visible:ring-[#53d5be]/40 focus-visible:outline-none"
                      onClick={() => setPasswordVisible((visible) => !visible)}
                      type="button"
                    >
                      {passwordVisible ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </span>
                </label>

                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    <p>{error}</p>
                    <button
                      className="mt-1 font-semibold underline underline-offset-4"
                      onClick={() =>
                        window.location.replace(
                          getOdooLoginBootstrapUrl(
                            redirectTarget,
                            Boolean(notice)
                          )
                        )
                      }
                      type="button"
                    >
                      Réessayer
                    </button>
                  </div>
                ) : null}

                {notice && !error ? (
                  <div
                    aria-live="polite"
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800"
                  >
                    {notice}
                  </div>
                ) : null}

                <button
                  className="mt-2 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#152036] px-6 text-center text-sm font-semibold text-white shadow-[0_14px_30px_rgba(21,32,54,0.2)] transition hover:-translate-y-0.5 hover:bg-[#20304f] focus-visible:ring-4 focus-visible:ring-[#53d5be]/35 focus-visible:outline-none disabled:cursor-wait disabled:opacity-65 disabled:hover:translate-y-0"
                  disabled={loading || submitting || !csrfToken}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Préparation sécurisée…
                    </>
                  ) : submitting ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Connexion…
                    </>
                  ) : (
                    <>
                      Se connecter
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs leading-5 text-[#98a2b3]">
                Le formulaire est transmis directement au serveur ERP sécurisé
                de Cogesto.
              </p>
            </div>
          </section>
        </div>
      </main>
    </PageLayout>
  )
}

function getLoginDestination(search: URLSearchParams) {
  if (search.get("return") === "/portal") {
    return "/?storefront_target=portal"
  }

  const redirect = search.get("redirect")

  if (
    !redirect ||
    !redirect.startsWith("/") ||
    redirect.startsWith("//") ||
    /[\r\n]/.test(redirect)
  ) {
    return "/odoo"
  }

  return redirect
}

function getOdooLoginBootstrapUrl(redirect: string, loggedOut: boolean) {
  const url = new URL(odooLoginUrl)

  url.searchParams.set("redirect", redirect)
  url.searchParams.set("storefront_init", "1")

  if (loggedOut) {
    url.searchParams.set("storefront_notice", "logged_out")
  }

  return url.toString()
}
