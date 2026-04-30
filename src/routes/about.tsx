import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Check, Leaf, ShieldCheck } from "lucide-react"

import { CtaSection } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import {
  aboutApproach,
  aboutBoardMembers,
  aboutExecutiveCommittee,
  aboutPresidentMessage,
  commitments,
  leaders,
  socialCommitments,
  values,
} from "@/lib/site-data"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos | Cogesto Consulting" },
      {
        name: "description",
        content:
          "Mission, valeurs, proposition de valeur, équipe dirigeante et engagements de Cogesto Consulting.",
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <PageLayout>
      <section className="inner-hero text-white">
        <div className="site-container py-20 sm:py-28">
          <p className="eyebrow text-white/70 before:bg-white/20">À propos</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Mission, valeurs, équipe et engagements.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Cogesto Consulting contribue au développement de l’Afrique à travers la consultance et la formation, avec la conviction que la performance durable passe par l’émergence d’entreprises championnes, créatrices de valeur et capables de grandir dans leur écosystème.
          </p>
        </div>
      </section>

      <section id="president" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
              <img src="/media/cogesto/president.jpg" alt="Babacar Sow" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="eyebrow">Le mot du Président</span>
              <h2 className="section-title mt-6 max-w-[12ch]">
                Une vision tournée vers <span className="accent-text">le développement de l’Afrique.</span>
              </h2>
              <div className="mt-6 space-y-4">
                {aboutPresidentMessage.map((paragraph) => (
                  <p key={paragraph} className="section-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-6 font-heading text-[1.4rem] leading-tight tracking-[-0.04em] text-primary">
                Ensemble, nous pouvons relever les défis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <span className="eyebrow before:hidden">Notre mission</span>
              <h2 className="section-title mt-5 max-w-[14ch]">Mettre l’expertise au service de la performance.</h2>
              <p className="section-copy mt-5">
                Mettre notre expertise au service de la performance des organisations en favorisant le développement de leur capital humain et la création de valeur.
              </p>
              <p className="section-copy mt-4">
                Cogesto Consulting aide les clients à résoudre des problèmes importants afin d’assurer le développement durable de leur entreprise. Créer de la valeur en apportant aux entreprises un savoir-faire éprouvé est notre credo.
              </p>
            </article>

            <article id="valeurs" className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <span className="eyebrow before:hidden">Nos valeurs</span>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {values.map((value) => (
                  <div key={value} className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-800">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                      <Check className="size-4" />
                    </span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="proposition" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="eyebrow">Notre proposition de valeur</span>
              <h2 className="section-title mt-6 max-w-[12ch]">
                Une approche <span className="accent-text">ancrée dans l’analyse et l’action.</span>
              </h2>
            </div>
            <div className="grid gap-4">
              {aboutApproach.map((item) => (
                <article key={item} className="rounded-[24px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_14px_36px_rgba(15,23,42,0.04)]">
                  <p className="text-[1rem] leading-7 text-slate-700">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="equipe" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center before:hidden">Notre équipe</span>
            <h2 className="section-title mt-6">
              Une équipe de direction <span className="accent-text">à forte expérience.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {leaders.map((leader) => (
              <ProfileCard key={leader.name} {...leader} />
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <PeopleList eyebrow="Conseil d’administration" people={aboutBoardMembers} />
            <PeopleList eyebrow="Comité exécutif" people={aboutExecutiveCommittee} />
          </div>
        </div>
      </section>

      <section id="engagements" className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <span className="eyebrow">Nos engagements</span>
              <h2 className="section-title mt-6 max-w-[12ch]">
                Intégrité, confidentialité et <span className="accent-text">responsabilité.</span>
              </h2>
              <div className="mt-8 grid gap-3">
                {commitments.map((item) => (
                  <article key={item} className="flex items-center gap-4 rounded-[24px] border border-slate-200/80 bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.04)]">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-slate-950 text-white">
                      <ShieldCheck className="size-4" />
                    </span>
                    <span className="text-[1rem] font-medium text-slate-800">{item}</span>
                  </article>
                ))}
              </div>
            </div>

            <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Leaf className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-[1.8rem] leading-[1.08] tracking-[-0.05em] text-slate-950">
                Engagement écologique et social
              </h3>
              <div className="mt-5 grid gap-4">
                {socialCommitments.map((item) => (
                  <div key={item.title} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">{item.date}</p>
                    <h4 className="mt-2 font-heading text-[1.2rem] leading-tight tracking-[-0.04em] text-slate-950">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-bold text-primary"
                    >
                      Télécharger
                    </a>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">
                Nous contacter
                <ArrowRight className="size-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <CtaSection />
    </PageLayout>
  )
}

function ProfileCard({
  image,
  name,
  role,
  summary,
}: {
  image: string
  name: string
  role: string
  summary: string
}) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
      <img src={image} alt={name} className="aspect-[4/3] w-full object-cover object-top" />
      <div className="p-5">
        <h3 className="font-heading text-[1.45rem] leading-[1.1] tracking-[-0.04em] text-slate-950">{name}</h3>
        <p className="mt-1 text-sm font-semibold text-primary">{role}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>
      </div>
    </article>
  )
}

function PeopleList({
  eyebrow,
  people,
}: {
  eyebrow: string
  people: Array<{ name: string; role: string; summary: string }>
}) {
  return (
    <article className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <span className="eyebrow before:hidden">{eyebrow}</span>
      <div className="mt-5 grid gap-4">
        {people.map((member) => (
          <div key={`${member.name}-${member.role}`} className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-4">
            <h3 className="font-heading text-[1.25rem] leading-[1.1] tracking-[-0.03em] text-slate-950">{member.name}</h3>
            <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">{member.role}</p>
            <p className="mt-3 text-[0.98rem] leading-6 text-slate-600">{member.summary}</p>
          </div>
        ))}
      </div>
    </article>
  )
}
