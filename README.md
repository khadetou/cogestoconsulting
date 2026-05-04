# Cogesto Consulting

TanStack Start website with a controlled Payload/Puck inline copy editor.

## Local Database

Payload uses Postgres.

Default local URL:

```bash
DATABASE_URL=postgres://localhost:5432/cogesto_consulting_builder
```

Create and seed the local database:

```bash
createdb cogesto_consulting_builder
bun run cms:seed
```

## Vercel + Neon

Production should use a hosted Postgres database, such as Neon. Set these Vercel environment variables before deploying:

```bash
DATABASE_URL=postgres://...
PAYLOAD_SECRET=<long random secret>
PAYLOAD_ADMIN_EMAIL=admin@cogestoconsulting.com
PAYLOAD_ADMIN_PASSWORD=<strong password>
```

After the Neon connection string is set, seed the production database once from a trusted terminal:

```bash
DATABASE_URL="postgres://..." \
PAYLOAD_SECRET="..." \
PAYLOAD_ADMIN_EMAIL="admin@cogestoconsulting.com" \
PAYLOAD_ADMIN_PASSWORD="..." \
bun run cms:seed
```

Local uploads are intentionally not durable on Vercel. Keep client-facing editable media on static assets or add object storage before exposing image uploads in the editor.

## Development

```bash
bun install
bun run dev
```

Useful checks:

```bash
bun run lint
bun run typecheck
PW_BASE_URL=http://127.0.0.1:3011 bunx playwright test tests/editor-smoke.spec.ts
bun run build
```
