import { Link } from "@tanstack/react-router"

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" aria-label="Cogesto Consulting, accueil" className="group inline-flex items-center gap-3">
      <img
        src="/brand/cogesto-logo-official.svg"
        alt="Cogesto consulting"
        className={compact ? "h-12 w-auto" : "h-14 w-auto sm:h-16"}
      />
    </Link>
  )
}
