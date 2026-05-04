import path from "node:path"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { buildConfig } from "payload"
import type { CollectionConfig } from "payload"

const projectRoot = process.cwd()
const isVercel = Boolean(process.env.VERCEL)
const configuredDatabaseUrl = process.env.DATABASE_URL ?? process.env.PAYLOAD_DATABASE_URL
const databaseUrl = configuredDatabaseUrl ?? "postgres://localhost:5432/cogesto_consulting_builder"
const payloadSecret = process.env.PAYLOAD_SECRET

if (isVercel && !configuredDatabaseUrl) {
  throw new Error("DATABASE_URL or PAYLOAD_DATABASE_URL is required for Payload on Vercel.")
}

if (isVercel && !payloadSecret) {
  throw new Error("PAYLOAD_SECRET is required for Payload on Vercel.")
}

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [],
}

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
  },
  fields: [
    {
      name: "alt",
      required: true,
      type: "text",
    },
  ],
  upload: {
    staticDir: path.resolve(projectRoot, "public/uploads"),
  },
}

const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      required: true,
      type: "text",
    },
    {
      name: "slug",
      index: true,
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "metaTitle",
      type: "text",
    },
    {
      name: "metaDescription",
      type: "textarea",
    },
    {
      name: "puckData",
      required: true,
      type: "json",
    },
  ],
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 30,
  },
}

export default buildConfig({
  collections: [Users, Pages, Media],
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
  }),
  secret: payloadSecret ?? "development-only-cogesto-payload-secret-change-before-production",
  typescript: {
    outputFile: path.resolve(projectRoot, "src/server/payload/payload-types.ts"),
  },
})
