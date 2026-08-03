import { Icon } from "@iconify/react"
import { Link } from "@tanstack/react-router"
import { Mail, MapPin, Phone } from "lucide-react"

import { contact, footerLinks, socialLinks } from "@/lib/site-data"

export function SiteFooter() {
  return (
    <footer className="bg-background pb-8 pt-12">
      <div className="page-shell">
        <div className="grid gap-5 rounded-[32px] border border-[#29456a] bg-[#142a46] px-5 py-6 shadow-[0_24px_60px_rgba(5,8,18,0.24)] lg:grid-cols-[1.1fr_0.9fr] lg:px-7">
          <div>
            <span className="inline-flex h-16 w-[178px] items-center justify-center px-1">
              <img src="/brand/cogesto-logo-official.svg" alt="Cogesto Consulting" className="h-full w-full object-contain brightness-0 invert drop-shadow-[0_10px_22px_rgba(5,8,18,0.28)]" decoding="async" />
            </span>
            <h2 className="mt-3 font-heading text-[1.85rem] leading-[1.05] tracking-[-0.05em] text-white sm:text-[2.4rem]">
              Conseil, finance et management de la performance.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[1rem] leading-7 text-[#d9e8f6]">
              Un cabinet engagé pour accompagner la croissance, la transformation et la compétitivité des organisations publiques et privées.
            </p>

            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#d6e7f8]">
              {footerLinks.map((link) => (
                <Link key={link.href} to={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="rounded-[24px] border border-white/18 bg-[#142a46] px-4 py-4 text-white shadow-[0_12px_30px_rgba(5,8,18,0.14)]">
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <a
                href={contact.mapLink}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[18px] transition-colors hover:text-white"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_8px_20px_rgba(5,8,18,0.12)]">
                  <MapPin className="size-4" />
                </span>
                <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/62">Adresse</p>
                <p className="mt-2 text-sm leading-6 text-white/86">{contact.address}</p>
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="block rounded-[18px] transition-colors hover:text-white"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_8px_20px_rgba(5,8,18,0.12)]">
                  <Mail className="size-4" />
                </span>
                <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/62">Email</p>
                <p className="mt-2 text-sm leading-6 text-white/86">{contact.email}</p>
              </a>

              <div className="sm:col-span-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="block rounded-[18px] transition-colors hover:text-white">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_8px_20px_rgba(5,8,18,0.12)]">
                    <Phone className="size-4" />
                  </span>
                  <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/62">
                    Téléphone
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/86 sm:whitespace-nowrap">{contact.phone}</p>
                </a>

                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition-colors hover:border-white/34 hover:bg-white/16"
                    >
                      <Icon icon={social.icon} className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden border-b border-slate-200 pb-6">
          <p className="font-heading text-[3rem] leading-[0.92] tracking-[-0.08em] text-[#233451] min-[440px]:text-[3.6rem] sm:whitespace-nowrap sm:text-[6.5rem] sm:tracking-[-0.1em] lg:text-[9.5rem]">
            Cogesto <span className="text-[#d8e0ea]">Consulting</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026. Tous droits réservés.</span>
          <span>Présence au Sénégal, au Maroc et au Canada.</span>
        </div>
      </div>
    </footer>
  )
}
