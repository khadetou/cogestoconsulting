import { Icon } from "@iconify/react"
import { Link } from "@tanstack/react-router"
import { Mail, MapPin, Phone } from "lucide-react"

import { contact, footerLinks, socialLinks } from "@/lib/site-data"

export function SiteFooter() {
  return (
    <footer className="bg-background pb-8 pt-12">
      <div className="page-shell">
        <div className="grid gap-5 rounded-[32px] border border-slate-200/80 bg-white px-5 py-6 shadow-[0_20px_55px_rgba(15,23,42,0.05)] lg:grid-cols-[1.1fr_0.9fr] lg:px-7">
          <div>
            <span className="inline-flex h-16 w-[178px] items-center justify-center overflow-hidden rounded-[18px] border border-slate-200 bg-white px-2.5 py-2 shadow-[0_12px_30px_rgba(21,32,54,0.08)]">
              <img src="/brand/cogesto-logo-official.svg" alt="Cogesto Consulting" className="h-full w-full object-contain" decoding="async" />
            </span>
            <h2 className="mt-3 font-heading text-[1.85rem] leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-[2.4rem]">
              Conseil, finance et management de la performance.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[1rem] leading-7 text-slate-600">
              Un cabinet engagé pour accompagner la croissance, la transformation et la compétitivité des organisations publiques et privées.
            </p>

            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
              {footerLinks.map((link) => (
                <Link key={link.href} to={link.href} className="transition-colors hover:text-slate-950">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={contact.mapLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                <MapPin className="size-4" />
              </span>
              <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Adresse</p>
              <p className="mt-2 text-sm leading-6">{contact.address}</p>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                <Mail className="size-4" />
              </span>
              <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">Email</p>
              <p className="mt-2 text-sm leading-6">{contact.email}</p>
            </a>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700 transition-colors hover:border-slate-300 hover:bg-white sm:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="block">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                    <Phone className="size-4" />
                  </span>
                  <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Téléphone
                  </p>
                  <p className="mt-2 text-sm leading-6">{contact.phone}</p>
                </a>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950"
                    >
                      <Icon icon={social.icon} className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden border-b border-slate-200 pb-6">
          <p className="font-heading text-[3rem] leading-[0.92] tracking-[-0.08em] text-slate-900 min-[440px]:text-[3.6rem] sm:whitespace-nowrap sm:text-[6.5rem] sm:tracking-[-0.1em] lg:text-[9.5rem]">
            Cogesto <span className="text-slate-300">Consulting</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026. Tous droits réservés.</span>
          <span>Présence au Sénégal, au Maroc et au Canada.</span>
        </div>
      </div>
    </footer>
  )
}
