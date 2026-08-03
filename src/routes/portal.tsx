import { createFileRoute } from "@tanstack/react-router"
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import { useEffect, useState } from "react"

import { PageLayout } from "@/components/layout"
import type { OdooSessionProfile } from "@/lib/odoo-session-profile"
import {
  getOdooAvatarUrl,
  getOdooProfileInitials,
  logoutFromOdoo,
  readOdooSessionProfile,
} from "@/lib/odoo-session-profile"

const internalActions = [
  {
    title: "Back-office",
    description: "Accédez à l’ensemble de vos applications et outils Odoo.",
    href: "https://erp.cogestoconsulting.com/odoo",
    icon: LayoutDashboard,
    primary: true,
  },
  {
    title: "Mes projets",
    description:
      "Consultez les missions, tâches et sous-tâches qui vous concernent.",
    href: "https://erp.cogestoconsulting.com/odoo/action-562",
    icon: FolderKanban,
  },
  {
    title: "Feuilles de temps",
    description:
      "Saisissez et contrôlez le temps consacré à chaque intervention.",
    href: "https://erp.cogestoconsulting.com/odoo/timesheets",
    icon: Clock3,
  },
  {
    title: "Documents",
    description:
      "Retrouvez les documents partagés et les livrables de vos missions.",
    href: "https://erp.cogestoconsulting.com/odoo/documents",
    icon: FileText,
  },
]

const portalActions = [
  {
    title: "Mon espace Odoo",
    description:
      "Consultez les informations et documents mis à votre disposition.",
    href: "https://erp.cogestoconsulting.com/my/home",
    icon: BriefcaseBusiness,
    primary: true,
  },
  {
    title: "Mes informations",
    description: "Vérifiez et mettez à jour les informations de votre compte.",
    href: "https://erp.cogestoconsulting.com/my/account",
    icon: UserRound,
  },
]

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Mon portail | Cogesto Consulting" },
      {
        name: "description",
        content:
          "Accédez à votre espace professionnel sécurisé Cogesto Consulting.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PortalPage,
})

function PortalPage() {
  const [profile, setProfile] = useState<OdooSessionProfile | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const activeProfile = readOdooSessionProfile()

    if (!activeProfile) {
      window.location.replace("/login?return=%2Fportal")
      return
    }

    setProfile(activeProfile)
    setReady(true)
  }, [])

  if (!ready || !profile) {
    return (
      <PageLayout showFooter={false}>
        <main className="grid min-h-[60svh] place-items-center bg-[#f4f7fb] px-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#475467]">
            <span className="size-5 animate-spin rounded-full border-2 border-[#152036]/20 border-t-[#152036]" />
            Vérification de votre session…
          </div>
        </main>
      </PageLayout>
    )
  }

  const actions = profile.isInternal ? internalActions : portalActions

  return (
    <PageLayout showFooter={false}>
      <main className="relative isolate min-h-[calc(100svh-7rem)] overflow-hidden bg-[#f4f7fb]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_18%_12%,rgba(83,213,190,0.19),transparent_38%),linear-gradient(145deg,#152036_0%,#1d2c49_68%,#223454_100%)]"
        />

        <div className="site-container relative py-10 sm:py-14 lg:py-16">
          <section className="flex flex-col justify-between gap-7 text-white lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#65e4cc] uppercase">
                <ShieldCheck className="size-4" />
                Espace sécurisé
              </div>
              <h1 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                Bonjour {profile.name.split(/\s+/)[0]},
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                Retrouvez vos accès professionnels Cogesto depuis un espace
                unique, selon les droits associés à votre compte Odoo.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-[22px] border border-white/12 bg-white/7 p-3 pr-5 backdrop-blur-xl">
              <ProfileImage profile={profile} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{profile.name}</p>
                <p className="mt-0.5 truncate text-xs text-white/52">
                  {profile.login}
                </p>
              </div>
              <CheckCircle2
                className="ml-2 size-5 shrink-0 text-[#65e4cc]"
                aria-label="Session active"
              />
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[28px] border border-[#dce3ed] bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.11)] sm:p-7">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#978360] uppercase">
                    Accès rapides
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[#101828]">
                    Votre environnement de travail
                  </h2>
                </div>
                <p className="text-sm text-[#667085]">
                  {profile.isInternal
                    ? "Compte interne Cogesto"
                    : "Compte portail Cogesto"}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {actions.map((action) => {
                  const Icon = action.icon

                  return (
                    <a
                      key={action.title}
                      href={action.href}
                      className={
                        action.primary
                          ? "group flex min-h-48 flex-col rounded-[24px] bg-[#152036] p-5 text-white shadow-[0_16px_32px_rgba(21,32,54,0.2)] transition duration-200 hover:-translate-y-1 hover:bg-[#20304f] focus-visible:ring-4 focus-visible:ring-[#53d5be]/35 focus-visible:outline-none"
                          : "group flex min-h-48 flex-col rounded-[24px] border border-[#dce3ed] bg-[#f8fafc] p-5 text-[#152036] transition duration-200 hover:-translate-y-1 hover:border-[#b9c6d8] hover:bg-white hover:shadow-[0_14px_34px_rgba(15,23,42,0.09)] focus-visible:ring-4 focus-visible:ring-[#53d5be]/25 focus-visible:outline-none"
                      }
                    >
                      <span
                        className={
                          action.primary
                            ? "inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[#65e4cc]"
                            : "inline-flex size-11 items-center justify-center rounded-2xl bg-[#eaf0f8] text-[#152036]"
                        }
                      >
                        <Icon className="size-5" />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold">
                        {action.title}
                      </h3>
                      <p
                        className={
                          action.primary
                            ? "mt-2 text-sm leading-6 text-white/62"
                            : "mt-2 text-sm leading-6 text-[#667085]"
                        }
                      >
                        {action.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold">
                        Ouvrir
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>

            <aside className="h-fit rounded-[28px] border border-[#dce3ed] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#978360] uppercase">
                Votre session
              </p>
              <div className="mt-5 flex items-center gap-3">
                <ProfileImage profile={profile} large />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#101828]">
                    {profile.name}
                  </p>
                  <p className="mt-1 truncate text-sm text-[#667085]">
                    {profile.login}
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid gap-3 border-y border-[#e4e9f0] py-5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#667085]">Statut</dt>
                  <dd className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Connecté
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#667085]">Type d’accès</dt>
                  <dd className="font-semibold text-[#344054]">
                    {profile.isInternal ? "Interne" : "Portail"}
                  </dd>
                </div>
              </dl>

              <a
                href={
                  profile.isInternal
                    ? "https://erp.cogestoconsulting.com/odoo"
                    : "https://erp.cogestoconsulting.com/my/home"
                }
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#152036] px-4 text-sm font-semibold text-white transition hover:bg-[#20304f] focus-visible:ring-4 focus-visible:ring-[#53d5be]/30 focus-visible:outline-none"
              >
                Accéder à Odoo
                <ExternalLink className="size-4" />
              </a>
              <button
                type="button"
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100 focus-visible:ring-4 focus-visible:ring-red-200 focus-visible:outline-none"
                onClick={logoutFromOdoo}
              >
                <LogOut className="size-4" />
                Se déconnecter
              </button>
            </aside>
          </section>
        </div>
      </main>
    </PageLayout>
  )
}

function ProfileImage({
  large = false,
  profile,
}: {
  large?: boolean
  profile: OdooSessionProfile
}) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/14 bg-[#978360]/24 font-bold text-white ${
        large ? "size-14 text-sm" : "size-11 text-xs"
      }`}
      aria-hidden="true"
    >
      <span>{getOdooProfileInitials(profile.name)}</span>
      <img
        src={getOdooAvatarUrl(profile.uid)}
        alt=""
        className="absolute inset-0 size-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none"
        }}
      />
    </span>
  )
}
