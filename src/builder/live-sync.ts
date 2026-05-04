export const BUILDER_SYNC_CHANNEL = "cogesto-builder-sync"
export const BUILDER_PAGE_UPDATED_EVENT = "cogesto-builder:page-updated"

export type BuilderPageUpdateStatus = "draft" | "published"

export type BuilderPageUpdateEvent = {
  slug: string
  sourceId: string
  status: BuilderPageUpdateStatus
  type: typeof BUILDER_PAGE_UPDATED_EVENT
  updatedAt?: string
}

const sourceId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`

export function broadcastBuilderPageUpdate({
  slug,
  status,
  updatedAt,
}: {
  slug: string
  status: BuilderPageUpdateStatus
  updatedAt?: string
}) {
  if (typeof window === "undefined") return

  const event: BuilderPageUpdateEvent = {
    slug,
    sourceId,
    status,
    type: BUILDER_PAGE_UPDATED_EVENT,
    updatedAt,
  }

  window.dispatchEvent(new CustomEvent(BUILDER_PAGE_UPDATED_EVENT, { detail: event }))

  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel(BUILDER_SYNC_CHANNEL)
    channel.postMessage(event)
    channel.close()
  }

  try {
    window.localStorage.setItem(BUILDER_SYNC_CHANNEL, JSON.stringify(event))
    window.localStorage.removeItem(BUILDER_SYNC_CHANNEL)
  } catch {
    // Ignore private-mode/storage failures; BroadcastChannel and polling still cover the page.
  }
}

export function subscribeToBuilderPageUpdates(handler: (event: BuilderPageUpdateEvent) => void) {
  if (typeof window === "undefined") return () => undefined

  let channel: BroadcastChannel | null = null

  function handleEvent(event: BuilderPageUpdateEvent) {
    if (event.sourceId === sourceId) return
    handler(event)
  }

  function handleWindowEvent(event: Event) {
    const customEvent = event as CustomEvent<BuilderPageUpdateEvent>
    if (isBuilderPageUpdateEvent(customEvent.detail)) handleEvent(customEvent.detail)
  }

  function handleChannelMessage(event: MessageEvent) {
    if (isBuilderPageUpdateEvent(event.data)) handleEvent(event.data)
  }

  function handleStorageEvent(event: StorageEvent) {
    if (event.key !== BUILDER_SYNC_CHANNEL || !event.newValue) return

    try {
      const data = JSON.parse(event.newValue) as unknown

      if (isBuilderPageUpdateEvent(data)) handleEvent(data)
    } catch {
      // Ignore malformed storage events from unrelated tooling.
    }
  }

  window.addEventListener(BUILDER_PAGE_UPDATED_EVENT, handleWindowEvent)
  window.addEventListener("storage", handleStorageEvent)

  if ("BroadcastChannel" in window) {
    channel = new BroadcastChannel(BUILDER_SYNC_CHANNEL)
    channel.addEventListener("message", handleChannelMessage)
  }

  return () => {
    window.removeEventListener(BUILDER_PAGE_UPDATED_EVENT, handleWindowEvent)
    window.removeEventListener("storage", handleStorageEvent)
    channel?.removeEventListener("message", handleChannelMessage)
    channel?.close()
  }
}

function isBuilderPageUpdateEvent(value: unknown): value is BuilderPageUpdateEvent {
  if (!value || typeof value !== "object") return false

  const event = value as Partial<BuilderPageUpdateEvent>

  return (
    event.type === BUILDER_PAGE_UPDATED_EVENT &&
    typeof event.slug === "string" &&
    typeof event.sourceId === "string" &&
    (event.status === "draft" || event.status === "published")
  )
}
