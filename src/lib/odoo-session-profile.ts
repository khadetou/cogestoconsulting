export const odooProfileCookieName = "cogesto_odoo_profile"
export const odooLogoutUrl =
  "https://erp.cogestoconsulting.com/web/session/logout?redirect=%2Fweb%2Flogin%3Fstorefront_logout%3D1"

const odooProfileMaxAgeMs = 8 * 60 * 60 * 1000

export interface OdooSessionProfile {
  uid: number
  name: string
  login: string
  isInternal: boolean
  updatedAt: number
}

export function readOdooSessionProfile(): OdooSessionProfile | null {
  if (typeof document === "undefined") return null

  const encodedProfile = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${odooProfileCookieName}=`))
    ?.slice(odooProfileCookieName.length + 1)

  if (!encodedProfile) return null

  try {
    const profile = JSON.parse(
      decodeURIComponent(encodedProfile)
    ) as Partial<OdooSessionProfile>
    const isFresh =
      typeof profile.updatedAt === "number" &&
      Date.now() - profile.updatedAt >= 0 &&
      Date.now() - profile.updatedAt < odooProfileMaxAgeMs

    if (
      typeof profile.uid !== "number" ||
      !Number.isInteger(profile.uid) ||
      profile.uid <= 0 ||
      typeof profile.name !== "string" ||
      !profile.name.trim() ||
      typeof profile.login !== "string" ||
      typeof profile.isInternal !== "boolean" ||
      typeof profile.updatedAt !== "number" ||
      !isFresh
    ) {
      clearOdooSessionProfile()
      return null
    }

    return {
      uid: profile.uid,
      name: profile.name.trim(),
      login: profile.login.trim(),
      isInternal: profile.isInternal,
      updatedAt: profile.updatedAt,
    }
  } catch {
    clearOdooSessionProfile()
    return null
  }
}

export function clearOdooSessionProfile() {
  if (typeof document === "undefined") return

  document.cookie = `${odooProfileCookieName}=; Domain=.cogestoconsulting.com; Path=/; Max-Age=0; Secure; SameSite=Lax`
}

export function logoutFromOdoo() {
  if (typeof window === "undefined") return

  clearOdooSessionProfile()

  if (window.top && window.top !== window.self) {
    window.top.location.href = odooLogoutUrl
    return
  }

  window.location.assign(odooLogoutUrl)
}

export function getOdooProfileInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("")
}

export function getOdooAvatarUrl(uid: number) {
  return `https://erp.cogestoconsulting.com/web/image/res.users/${uid}/avatar_128`
}
