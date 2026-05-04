import type { BuilderPageData } from "@/builder/types"

type EditableItem = {
  props?: Record<string, unknown>
  type?: string
  [key: string]: unknown
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function uniqueId(base: string, used: Set<string>) {
  let id = base
  let index = 2

  while (used.has(id)) {
    id = `${base}-${index}`
    index += 1
  }

  used.add(id)
  return id
}

function normalizeContent(content: unknown, zone: string, used: Set<string>) {
  if (!Array.isArray(content)) return []

  return content
    .filter((item): item is EditableItem => Boolean(item) && typeof item === "object")
    .map((item, index) => {
      const props = item.props && typeof item.props === "object" ? item.props : {}
      const type = typeof item.type === "string" ? item.type : "Block"
      const existingId = typeof props.id === "string" && props.id.trim() ? props.id.trim() : ""
      const fallbackId = `cogesto-${toSlug(zone)}-${toSlug(type)}-${index + 1}`
      const id = uniqueId(existingId || fallbackId, used)

      return {
        ...item,
        props: {
          ...props,
          id,
        },
        type,
      }
    })
}

export function normalizeBuilderPageData(data: BuilderPageData | null | undefined): BuilderPageData {
  const used = new Set<string>()
  const root = data?.root
  const rootProps = root && typeof root.props === "object" ? root.props : {}
  const zones = data?.zones && typeof data.zones === "object" ? data.zones : {}

  return {
    content: normalizeContent(data?.content, "default-zone", used),
    root: {
      ...root,
      props: {
        title: "Page Cogesto Consulting",
        ...rootProps,
      },
    },
    zones: Object.fromEntries(
      Object.entries(zones).map(([zone, content]) => [zone, normalizeContent(content, zone, used)]),
    ),
  }
}
