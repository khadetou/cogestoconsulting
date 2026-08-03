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

## Pulling Live Editorial Changes

Online page edits live in Payload as `pages.puckData`. Before changing code, pull the published live pages into the local baseline:

```bash
bun run cms:pull-live
```

That updates `src/builder/live-page-snapshots.ts`, which is what `bun run dev` uses for public pages by default. To also write the pulled pages into a local Payload database, run:

```bash
bun run cms:pull-live:local-db
bun run dev:payload:local
```

`cms:pull-live:local-db` uses `postgres://<your-mac-user>@localhost:5432/cogesto_consulting_builder` unless `COGESTO_LOCAL_DATABASE_URL` is set. It also forces the app to ignore remote Neon URLs loaded from `.env.local`. The generic `cms:pull-live:db` command refuses to write to a remote database unless `COGESTO_ALLOW_REMOTE_PAYLOAD_WRITE=true` is set. Keep that override for intentional staging/production maintenance only.

Production keeps using the hosted Payload database through the production `DATABASE_URL`. Deploy code changes normally; do not set `COGESTO_USE_PAYLOAD_PUBLIC` in production unless you are intentionally changing the content source behavior.

Useful checks:

```bash
bun run lint
bun run typecheck
PW_BASE_URL=http://127.0.0.1:3011 bunx playwright test tests/editor-smoke.spec.ts
bun run build
```
