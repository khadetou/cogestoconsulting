import { createFileRoute } from "@tanstack/react-router"
import { Mail, MapPin, Phone } from "lucide-react"
import type { ReactNode } from "react"

import { PartnerLogoCarousel } from "@/components/common-sections"
import { PageLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contact } from "@/lib/site-data"

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Cogesto Consulting" },
      {
        name: "description",
        content:
          "Contactez Cogesto Consulting : adresse, email, téléphone et coordonnées.",
      },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <PageLayout>
      <section className="inner-hero text-white">
        <div className="site-container py-20 sm:py-28">
          <p className="eyebrow text-white/70 before:bg-white/20">Contact</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Notre équipe reste disponible pour vous.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Soyez libre de nous contacter. Notre équipe reste disponible pour échanger sur vos besoins en stratégie, organisation, finance, performance et renforcement de capacités, et vous répondre dans les meilleurs délais.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            <ContactCard
              href={contact.mapLink}
              icon={<MapPin className="size-5" />}
              title="Adresse"
              value={`9, Imm Saliou Ndione Fenêtre Mermoz, Dakar Sénégal. ${contact.address}`}
            />
            <ContactCard
              href={`mailto:${contact.email}`}
              icon={<Mail className="size-5" />}
              title="Nous écrire par mail"
              value={contact.email}
            />
            <ContactCard
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              icon={<Phone className="size-5" />}
              title="Où nous appeler ?"
              value={contact.phone}
            />
          </div>

          <div className="mt-12 grid gap-8 rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.05)] lg:grid-cols-[0.85fr_1fr]">
            <div>
              <span className="eyebrow before:hidden">Soyez libre de nous contacter</span>
              <h2 className="section-title mt-5 max-w-[13ch]">Veuillez remplir le formulaire ci-dessous.</h2>
              <p className="section-copy mt-5">
                Notre équipe vous répond pour qualifier vos besoins et structurer une démarche d’accompagnement adaptée à vos enjeux.
              </p>
            </div>
            <form className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input className="h-12 bg-white" placeholder="Prénom et Nom" />
                <Input className="h-12 bg-white" placeholder="Email" type="email" />
              </div>
              <Textarea className="mt-4 min-h-40 bg-white" placeholder="Message" />
              <Button className="mt-5 h-12 w-full rounded-full bg-primary px-6 text-white hover:bg-primary/90 sm:w-auto">
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="partners-section py-16 sm:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center before:hidden">Faites comme nos partenaires</span>
            <h2 className="section-title mt-6">
              Rejoignez <span className="accent-text">l’aventure.</span>
            </h2>
          </div>

          <PartnerLogoCarousel />
        </div>
      </section>
    </PageLayout>
  )
}

function ContactCard({
  href,
  icon,
  title,
  value,
}: {
  href: string
  icon: ReactNode
  title: string
  value: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">{icon}</span>
      <h2 className="mt-5 font-heading text-[1.55rem] tracking-[-0.04em] text-slate-950">{title}</h2>
      <p className="mt-3 text-[1rem] leading-7 text-slate-600">{value}</p>
    </a>
  )
}
