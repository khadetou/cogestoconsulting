import { mkdir } from "node:fs/promises"
import path from "node:path"
import { getPayload } from "payload"

import config from "@/server/payload/payload.config"

export async function getPayloadClient() {
  if (!process.env.VERCEL) {
    await mkdir(path.resolve(process.cwd(), ".payload"), { recursive: true })
    await mkdir(path.resolve(process.cwd(), "public/uploads"), { recursive: true })
  }

  return getPayload({
    config,
    key: "cogesto-consulting",
  })
}
