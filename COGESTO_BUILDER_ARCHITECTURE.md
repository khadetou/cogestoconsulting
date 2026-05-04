# Cogesto Consulting Website And Builder Architecture

Last analyzed: 2026-05-03

This document describes the current Cogesto Consulting TanStack Start website, the hardcoded production pages, the Puck/Payload visual editing layer, the Tiptap inline text editor, the design system, installed packages, data flow, test coverage, and operational constraints.

## Executive Summary

The project is a TanStack Start website for Cogesto Consulting with a controlled visual editing system layered on top of a hardcoded, production-grade design.

The builder is intentionally not a generic page builder. Its purpose is to let the client edit Cogesto-specific copywriting directly inside the designed pages while preserving the React components, layout, spacing, responsive behavior, animations, images, navigation, SEO structure, and brand system controlled by the developer.

Current editing model:

- Public hardcoded routes remain the design and UX baseline.
- Editable pages are stored in Payload CMS as Puck JSON.
- Puck renders the same React block components used by the editable public pages.
- Tiptap powers direct inline text editing inside the canvas.
- The client can edit text and publish changes.
- Published changes are broadcast to open public pages, which refetch the latest Payload data without a manual browser reload.
- Text fields support controlled typography styles: bold, italic, underline, paragraph size, multiline alignment, theme color presets, custom color, and reset.
- The client cannot insert arbitrary blocks, drag sections, delete sections, duplicate sections, edit raw HTML, edit arbitrary Tailwind classes, or run custom JavaScript.
- The editor can navigate between all six editable pages: Accueil, À propos, Nos expertises, Business Linkage Program, Évènements, Contact.

## Project Location

```txt
/Volumes/Lexar/WORKSPACE/odoo_code/Odoo_19e/odoo_19.0/storefronts/cogesto-consulting
```

The project is a single TanStack Start app inside the larger Odoo workspace. It is not currently structured as a monorepo.

## Package Manager

The project uses Bun.

Important commands:

```bash
bun run dev
bun run build
bun run lint
bun run typecheck
bun run cms:seed
bun run cms:reset-page accueil
PW_BASE_URL=http://127.0.0.1:3011 bunx playwright test tests/editor-smoke.spec.ts
```

The `dev` and `build` scripts run through `scripts/with-esbuild.ts` to stabilize esbuild resolution on this machine.

## Main Dependencies

Declared in `package.json`.

Core app:

- `@tanstack/react-start`
- `@tanstack/react-router`
- `@tanstack/react-query`
- `react`
- `react-dom`
- `vite`
- `nitro`

CMS and builder:

- `payload`
- `@payloadcms/db-postgres`
- `@puckeditor/core`
- `@tiptap/react`
- `@tiptap/starter-kit`
- `@tiptap/extension-link`
- `@tiptap/extension-text-align`
- `@tiptap/extension-text-style`
- `@tiptap/extension-underline`

Design and UI:

- `tailwindcss`
- `@tailwindcss/vite`
- `shadcn`
- `radix-ui`
- `lucide-react`
- `@iconify/react`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `tw-animate-css`

Motion and interaction:

- `gsap`
- `framer-motion`
- `embla-carousel-react`

Testing:

- `@playwright/test`
- `vitest`
- `@testing-library/react`
- `@testing-library/dom`

## High-Level Architecture

```txt
src/
  builder/
    animation.tsx              # Safe GSAP animation wrapper and presets
    blocks.tsx                 # Puck-renderable React blocks for editable pages
    config.tsx                 # Puck config, locked components, root render
    default-page-data.ts       # Default editable content for all page slugs
    inline-editing.tsx         # Tiptap inline editor and editor navigation bridge
    live-page.tsx              # Client-side public renderer with live refetch
    live-sync.ts               # Builder-to-public tab sync events and fallbacks
    normalize.ts               # Puck data normalization and stable block IDs
    renderer.tsx               # Public Puck Render wrapper
    types.ts                   # Builder and page types

  server/payload/
    client.ts                  # Payload client factory
    pages.ts                   # Server functions: auth, read, save, publish
    payload.config.ts          # Payload collections and Postgres adapter

  routes/
    index.tsx                  # Public home route, live Payload-backed with hardcoded fallback
    about.tsx                  # Public About route, live Payload-backed with hardcoded fallback
    expertises.tsx             # Public Expertises route, live Payload-backed with hardcoded fallback
    business-linkage-program.tsx
    events.tsx
    contact.tsx
    pages.$slug.tsx            # Public editable page renderer
    admin.login.tsx            # Editor login
    admin.builder.$slug.tsx    # Puck editor route

  components/
    hero.tsx                   # Hardcoded home hero
    common-sections.tsx        # Hardcoded home sections
    site-header.tsx            # Shared header, editor navigation aware
    site-footer.tsx            # Shared footer
    layout.tsx                 # Standard public layout
    ui/                        # shadcn/ui components

  styles.css                   # Global Tailwind and brand design system
  styles/puck-editor.css       # Dark editor shell, inline editing, focus mode

scripts/
  seed-payload.ts              # Creates editor user and seeds/merges editable pages
  with-esbuild.ts              # Wrapper for Vite commands

tests/
  editor-smoke.spec.ts         # Playwright coverage for public + builder flows
```

## Public Routes

Public routes are Payload-backed when published content exists, with the original production-quality React pages kept as the design baseline and fallback. The hardcoded pages should not be destroyed.

```txt
/
/about
/expertises
/business-linkage-program
/events
/contact
```

Files:

- `src/routes/index.tsx`
- `src/routes/about.tsx`
- `src/routes/expertises.tsx`
- `src/routes/business-linkage-program.tsx`
- `src/routes/events.tsx`
- `src/routes/contact.tsx`

Route-to-builder slug mapping:

```txt
/                         accueil
/about                    about
/expertises               expertises
/business-linkage-program business-linkage-program
/events                   events
/contact                  contact
```

Each route:

- Loads the published Payload page for its slug.
- Renders with `LiveBuilderPage` when Payload has published data.
- Falls back to the hardcoded React page when Payload is unavailable or fallback-only.
- Refetches and updates React state without a manual reload when another same-origin tab publishes that slug.

This keeps public URLs live-editable while preserving the hardcoded design as the safety base.

## Live Sync

Main files:

```txt
src/builder/live-sync.ts
src/builder/live-page.tsx
```

Sync strategy:

- Builder saves through Payload first.
- Only successful saves publish a `cogesto-builder:page-updated` event.
- Same-origin tabs receive the event through a same-window custom event, `BroadcastChannel`, and a `localStorage` storage-event fallback.
- Public pages listen for matching `published` events, refetch with `getPublishedBuilderPage`, and replace local React state only after the refetch succeeds.
- A 1-second visible-tab polling fallback catches missed broadcasts and production/session edge cases.

Failed saves do not update the public page optimistically.

### Editable Public Routes

```txt
/pages/$slug
```

File:

- `src/routes/pages.$slug.tsx`

This route loads a published Payload page using `getPublishedBuilderPage`, then renders its `puckData` through:

```tsx
<BuilderPageRenderer data={data} />
```

The editable page renderer uses Puck `Render` with the controlled `builderConfig`.

## Admin Routes

```txt
/admin/login
/admin/builder/$slug
```

Files:

- `src/routes/admin.login.tsx`
- `src/routes/admin.builder.$slug.tsx`

### Login

`src/routes/admin.login.tsx` provides a simple editor login screen.

It calls `loginEditor` from `src/server/payload/pages.ts`, which uses Payload auth and stores a JWT in an HTTP-only cookie:

```txt
cogesto-editor-token
```

Development defaults used by the seed script:

```txt
PAYLOAD_ADMIN_EMAIL    admin@cogestoconsulting.com
PAYLOAD_ADMIN_PASSWORD ChangeMeCogesto2026!
```

These are development defaults and must be changed for production.

### Builder

`src/routes/admin.builder.$slug.tsx` is the Puck editor surface.

Editable pages:

```ts
const editorPages = [
  { label: "Accueil", slug: "accueil" },
  { label: "À propos", slug: "about" },
  { label: "Nos expertises", slug: "expertises" },
  { label: "Business Linkage Program", slug: "business-linkage-program" },
  { label: "Évènements", slug: "events" },
  { label: "Contact", slug: "contact" },
]
```

The route is client-only:

```ts
ssr: false
```

This is appropriate because Puck is an editor UI and depends on browser behavior.

## Puck Builder Configuration

Main file:

```txt
src/builder/config.tsx
```

Registered Puck components:

- `HeroBlock`
- `HomeContentBlock`
- `TextImageBlock`
- `IconCardsBlock`
- `CtaBlock`
- `ContactBlock`

All component `fields` are currently `{}`.

This is deliberate. It removes the generic side-panel editing model and pushes editing into controlled inline fields rendered in the page.

All component permissions are locked:

```ts
permissions: {
  delete: false,
  drag: false,
  duplicate: false,
  edit: true,
  insert: false,
}
```

The top-level Puck instance also applies:

```ts
permissions={{
  delete: false,
  drag: false,
  duplicate: false,
  edit: true,
  insert: false,
}}
```

Result:

- No arbitrary insertion.
- No drag-and-drop reordering.
- No section deletion.
- No duplication.
- No generic fields panel for design controls.
- Text remains editable directly in the canvas.

## Root Layout In Puck

The Puck root supports:

```ts
layout?: "home" | "standard"
```

Home layout:

- Renders `children` directly inside a public-style `<main>`.
- Adds `SiteFooter`.
- Uses the home hero block, which embeds `SiteHeader` inside the hero.

Standard layout:

- Wraps content in `PageLayout`.
- `PageLayout` includes the normal shared `SiteHeader` and `SiteFooter`.

When Puck is editing, the root passes editor-aware navigation to the header:

```tsx
<PageLayout editorNavigation={Boolean(puck?.isEditing)}>
```

## Builder Blocks

Main file:

```txt
src/builder/blocks.tsx
```

This file adapts the Cogesto-specific design sections into Puck-compatible blocks.

Important exports:

- `BuilderHeroBlock`
- `BuilderHomeContentBlock`
- `BuilderTextImageBlock`
- `BuilderIconCardsBlock`
- `BuilderCtaBlock`
- `BuilderContactBlock`
- `defaultHomeContentCopy`

The `HomeContentBlock` is a single controlled home-page body block. It contains the home sections that should remain pixel-aligned with the hardcoded landing page:

- Références et partenaires
- À propos
- Expertises preview
- Notre démarche
- Business Linkage Program showcase
- Évènements preview
- Équipe

This avoids making the homepage a loose collection of draggable blocks. The design stays structured while copy areas inside the block remain editable.

## Default Editable Page Data

Main file:

```txt
src/builder/default-page-data.ts
```

This defines default Puck JSON for all editable page slugs.

Slugs:

- `accueil`
- `about`
- `expertises`
- `business-linkage-program`
- `events`
- `contact`

Each page has:

- `content`: controlled block list
- `root.props.title`
- optionally `root.props.layout`

The home default uses:

```txt
HeroBlock
HomeContentBlock
```

Other pages use combinations of:

```txt
HeroBlock
TextImageBlock
IconCardsBlock
CtaBlock
ContactBlock
```

## Payload CMS

Payload files:

```txt
src/server/payload/client.ts
src/server/payload/pages.ts
src/server/payload/payload.config.ts
```

### Collections

Defined in `src/server/payload/payload.config.ts`.

Collections:

- `users`
- `pages`
- `media`

`users`:

- Payload auth enabled.
- Used for editor/admin login.

`pages`:

- source of truth for editable page content.
- fields:
  - `title`
  - `slug`
  - `metaTitle`
  - `metaDescription`
  - `puckData`
- versions enabled:
  - drafts enabled
  - max 30 versions

`media`:

- public read access.
- upload directory:
  ```txt
  public/uploads
  ```

### Database

Current adapter:

```ts
@payloadcms/db-postgres
```

Default local database URL:

```txt
postgres://localhost:5432/cogesto_consulting_builder
```

Payload reads `DATABASE_URL` first, then `PAYLOAD_DATABASE_URL`, then falls back to the local development URL above. Local development and production should both use Postgres so Payload auth, drafts, versions, published pages, and save/publish behavior match across environments.

### Server Functions

File:

```txt
src/server/payload/pages.ts
```

Functions:

- `getPublishedBuilderPage`
- `getEditableBuilderPage`
- `saveBuilderPage`
- `loginEditor`
- `logoutEditor`
- `getEditorSession`

Public visitors load published content only:

```ts
findPageBySlug(slug, false)
```

Editors load draft-capable content:

```ts
findPageBySlug(slug, true)
```

Saving:

- Draft save sets `_status: "draft"`.
- Publish sets `_status: "published"`.
- Existing pages update by ID.
- Missing pages are created.
- All saved Puck data is normalized first.

## Seeding

Seed script:

```txt
scripts/seed-payload.ts
```

Command:

```bash
bun run cms:seed
```

Responsibilities:

- Create the default editor user if missing.
- Create all six editable pages if missing.
- Merge newer default blocks into existing pages without wiping client copy edits.
- Preserve existing editable data where possible.
- Remove older legacy home block IDs from the homepage merge.

This script is important after structural builder changes because it can align stored Payload JSON with the latest hardcoded builder structure.

## Data Normalization

File:

```txt
src/builder/normalize.ts
```

Purpose:

- Ensure Puck `content` is always an array.
- Ensure each block has a stable `props.id`.
- Avoid duplicate IDs.
- Normalize zones if present.
- Ensure `root.props.title` exists.

Stable block IDs matter because inline editing updates a field by:

```txt
blockId + path
```

Example:

```txt
blockId: cogesto-home-hero
path: titleLine1
```

## Inline Editing With Tiptap

Main file:

```txt
src/builder/inline-editing.tsx
```

The inline editing system is built around `InlineText`.

When not editing:

```tsx
<Component className={className}>{text}</Component>
```

When editing:

```tsx
<InlineRichTextEditor ... />
```

The rich text editor uses:

- `@tiptap/react`
- `@tiptap/starter-kit`
- `@tiptap/extension-link`
- `@tiptap/extension-text-align`
- `@tiptap/extension-text-style`
- `@tiptap/extension-underline`

The editor remains design-safe. The original text prop is still stored as a plain-string fallback for every editable field, while richer formatting is stored next to it as sanitized Tiptap JSON:

```txt
props.titleLine1
props.richText["titleLine1"]

props.body
props.richText["body"]

props.copy.about.body
props.richText["copy.about.body"]
```

This lets the public site render styled text after publish and still fall back to safe plain text if rich text is missing, invalid, or intentionally reset.

Supported controlled rich text features:

- `bold`
- `italic`
- `underline`
- paragraph
- `Titre 1`
- `Titre 2`
- `Titre 3`
- blockquote
- bullet lists
- numbered lists
- horizontal rule for multiline fields
- links with normalized safe URLs
- text alignment for multiline fields
- font size using controlled pixel presets
- theme-token text colors
- validated custom hex colors

Theme color presets are exposed before custom colors:

- Texte principal
- Texte discret
- Accent or
- Blanc
- Bleu nuit

The compact toolbar uses a small contextual inline surface rendered into the editor iframe body. It includes field identity, custom iframe-local format and size menus, B/I/U controls, alignment for multiline fields, a compact theme-color menu, a native custom color input, link editing, and a more-options menu.

Toolbar state is derived from the active TipTap editor via `useEditorState`, not stale React props. The toolbar updates on selection changes and transactions, so it reflects the current field, format, size, color, marks, alignment, and link state.

The toolbar is treated as part of the active editing surface. Toolbar buttons and menu items preserve the current TipTap selection before running commands, then restore focus and toolbar position after the Puck parent state update. Outside-click handling listens in the iframe document and the same-origin parent document, but ignores the active editor, toolbar, slash menu, editor popovers, and the active editor iframe itself. This iframe check is important because a click inside Puck can appear as a click on the iframe element to the parent document. This keeps the toolbar stable while typing, selecting text, opening menus, changing colors, editing links, and using the more menu.

The previous large floating typography blocks were removed. Color selection intentionally uses a compact dropdown plus a color input rather than a large color panel, because this is more reliable inside Puck's iframe and still keeps the editing interaction light and Odoo-like.

### Why Tiptap Was Added

The previous direct editing behavior had two UX problems:

- Removing a character could accidentally trigger Puck-level selection/deletion behavior.
- Text edits could disturb layout because raw browser editing did not preserve controlled inline boundaries well enough.

Tiptap now:

- isolates text editing events from Puck.
- stops propagation for click, input, keydown, paste, pointerdown, etc.
- preserves native browser text selection by not preventing default pointer/mouse behavior inside the editor.
- makes Cmd/Ctrl+A select the current TipTap field instead of the whole builder page.
- prevents parent link or button navigation while editing inline text.
- commits sanitized plain text and sanitized Tiptap JSON through a deferred `onUpdate`.
- prevents Enter in single-line fields.
- supports multiline fields with paragraph separation.
- supports `/` slash commands for headings, paragraph text, quote, lists, link, and separator.

### Message Flow

Inline editor commits a change by posting a parent-window message:

```ts
{
  type: "cogesto-builder:inline-edit",
  blockId,
  path,
  richText,
  value,
}
```

The admin builder route receives the message and dispatches a Puck data update:

```ts
dispatch({
  type: "setData",
  recordHistory: true,
  data: (previous) => updateBuilderBlockProp(previous, blockId, path, value, richText),
})
```

Then the header shows:

```txt
Modification directe en attente de sauvegarde.
```

The editor must still click `Brouillon` or `Publier`.

Legacy `textStyles` are still normalized and rendered for older saved data, but the active editing path stores new typography in `props.richText`.

### Backspace Safety

The Playwright tests verify that pressing Backspace inside inline text:

- edits only the text.
- does not delete the selected Puck section.
- leaves the hero block present.

This is covered by:

```txt
tests/editor-smoke.spec.ts
```

Test name:

```txt
backspace inside inline text edits text without deleting the selected section
```

## Editor Navigation

There are two editor navigation mechanisms.

### Header Page Selector

In `src/routes/admin.builder.$slug.tsx`, `BuilderHeaderActions` includes:

```txt
Changer de page à éditer
```

This selector navigates to:

```txt
/admin/builder/$slug
```

This is the most reliable editor page navigation path.

### Canvas Navigation

The site header can run in editor-aware mode.

Files:

- `src/components/site-header.tsx`
- `src/components/layout.tsx`
- `src/builder/config.tsx`
- `src/builder/blocks.tsx`
- `src/styles/puck-editor.css`

When `editorNavigation` is true:

- normal public links are converted to builder links.
- `/` becomes `/admin/builder/accueil`.
- `/events` becomes `/admin/builder/events`.
- `/contact` becomes `/admin/builder/contact`.
- links open in `_top` so the whole editor route changes, not only the iframe.

The editor canvas also includes `EditorNavigationBridge`, which:

- rewrites eligible internal links to `/admin/builder/...`.
- observes DOM mutations to re-apply link rewrites.
- posts controlled navigation messages for internal page links.

The CSS rule:

```css
[data-puck-component] .puck-editor-site-nav,
[data-puck-component] .puck-editor-site-nav * {
  pointer-events: auto !important;
}
```

ensures Puck's disabled component wrapper does not block header navigation.

## Design System

Main file:

```txt
src/styles.css
```

The brand system is defined with CSS variables and Tailwind theme tokens.

Primary palette:

```txt
--background: #fbfbf8
--foreground: #152036
--primary: #152036
--accent: #978360
--border: #e6e0d4
--navy: #152036
--gold: #978360
--gold-dark: #776747
--ivory: #fbfbf8
--brand-deep: #0c1422
--brand-night: #050812
--brand-mid: #243653
--brand-soft: #978360
--brand-mist: #f5f2ec
```

Typography:

```css
--font-sans: 'Manrope', sans-serif;
--font-heading: 'Sora', 'Manrope', sans-serif;
```

Core component classes:

- `.page-shell`
- `.site-container`
- `.section-pad`
- `.eyebrow`
- `.section-title`
- `.section-copy`
- `.accent-text`
- `.inner-hero`
- `.partners-section`
- `.hero-section`
- `.hero-shell`
- `.hero-banner__background`
- `.hero-banner__wash`
- `.hero-banner__left-fade`
- `.hero-banner__bottom-fade`

The design is light, corporate, premium, and based on Cogesto's navy/gold colorimetry. It avoids purple.

## Editor Design System

Main file:

```txt
src/styles/puck-editor.css
```

This file restyles Puck into a Cogesto dark editor shell.

It controls:

- Puck color variables.
- dark editor header/sidebar styling.
- canvas background and shadow.
- inline text editable outlines.
- Tiptap inline typography inheritance.
- Puck focus/page mode.
- hidden sidebars in focus mode.
- pointer-event restoration for inline text and editor navigation.
- Puck hover/selection overlays reduced to a transparent, non-blocking outline so the hero and content are not washed out while editing.

Important focus mode behavior:

```css
.cogesto-puck-editor--focus ...
```

Focus mode hides:

- Puck left sidebar
- Puck right sidebar
- side nav
- resize handles
- canvas controls

The header remains visible so editors can:

- switch pages.
- save draft.
- publish.
- logout.
- show panels again.

## Hardcoded Site Components

These remain the source of visual truth.

Home:

- `src/components/hero.tsx`
- `src/components/common-sections.tsx`

Shared:

- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/components/layout.tsx`
- `src/components/team-portrait.tsx`
- `src/components/cards.tsx`
- `src/components/section-heading.tsx`
- `src/components/reveal.tsx`

Data:

- `src/lib/site-data.ts`

The builder should continue to adapt to this site, not the other way around.

## Images And Brand Assets

Important public assets:

```txt
public/brand/cogesto-logo-official.svg
public/brand/cogesto-logo-remastered.svg
public/brand/cogesto-official-logo.png
public/media/cogesto/
```

Key image groups:

- `public/media/cogesto/hero-candidates/`
- `public/media/cogesto/services/`
- `public/media/cogesto/events/`
- `public/media/cogesto/blp/`
- `public/media/cogesto/team/`
- `public/media/cogesto/references/`
- `public/media/cogesto/ai/`

The logo colorimetry source file exists at:

```txt
LOGO COGESTO Colorimétrie.pdf
```

The current website uses a white version of the logo on dark navy header backgrounds.

## GSAP Usage

Main builder file:

```txt
src/builder/animation.tsx
```

Only safe predefined animation presets are exposed:

```ts
type AnimationPreset = "none" | "fade-up" | "fade-in" | "scale-soft"
```

`AnimatedBlock` runs GSAP only through this preset map.

When Puck is editing:

```tsx
<AnimatedBlock disabled={isEditing}>
```

This prevents editor canvas animations from interfering with direct editing.

The hardcoded `expertises.tsx` page also uses GSAP for controlled reveal animation.

## Icon System

Two icon systems are used:

- `lucide-react` for interface icons and common UI controls.
- `@iconify/react` for content/domain icons, especially expertise cards and sector icons.

The editable data stores Iconify names such as:

```txt
mdi:target-variant
mdi:account-group-outline
mdi:chart-line
```

For the current client-safe editor, icon names are not exposed in side-panel fields. They are controlled by the developer/default data.

## shadcn/ui

shadcn components live in:

```txt
src/components/ui/
```

Installed/available components include:

- accordion
- badge
- button
- card
- carousel
- dialog
- dropdown-menu
- input
- navigation-menu
- separator
- sheet
- tabs
- textarea

These are used as the base UI primitives but the Cogesto look is mostly defined by `src/styles.css` and component-level Tailwind classes.

## Payload And Vercel Notes

Current setup uses Postgres:

```txt
@payloadcms/db-postgres
postgres://localhost:5432/cogesto_consulting_builder
```

Use a hosted Postgres database for production Payload content and set `DATABASE_URL` in the deployment environment.

Production requirements:

- Set `PAYLOAD_SECRET`.
- Set production admin email/password securely.
- Ensure upload storage is durable. Local `public/uploads` is not enough for Vercel serverless production if editors upload assets.
- Decide whether media should go to Vercel Blob, S3, UploadThing, or another object storage.

## Tests

Main test file:

```txt
tests/editor-smoke.spec.ts
```

Current test coverage:

1. Public editable page renders real Cogesto design.
2. All public pages load without route or design-system failures.
3. Editor canvas uses the same design tokens as public render.
4. Accueil editor preview uses the same immersive hero structure as public editable page.
5. All editable page slugs open in builder canvas.
6. Editor page switcher navigates between all editable pages.
7. Editor canvas navigation keeps editors inside builder pages.
8. Editor is locked to Cogesto copy editing and saves drafts.
9. Editor focus mode hides panels and supports direct canvas editing.
10. Backspace edits inline text without deleting selected section.
11. Inline rich text editor keeps focus, supports selection, and avoids intrusive overlays.
12. Editor edits content, publishes it, and public navigation reflects the result.
13. Builder publish live-syncs non-home public routes, such as `/about`, without manual reload.
14. Builder publish live-syncs edited text, button text, hero stats, paragraph size, and theme color to an already-open public home page.

Latest verified result:

```txt
19 passed
```

Validation commands used:

```bash
bun run lint
bun run typecheck
PW_BASE_URL=http://127.0.0.1:3011 bunx playwright test tests/editor-smoke.spec.ts
bun run build
```

Build passes. Vite reports large chunk warnings due to Payload, Puck, Tiptap, and related editor/server libraries. This is not currently fatal, but production optimization should consider code-splitting/admin-only loading if bundle size becomes a concern.

## Current Behavior Matrix

| Feature | Current behavior |
| --- | --- |
| Public pages | Public routes render published Payload content with hardcoded React fallbacks |
| Editable public pages | `/pages/$slug` renders published Payload Puck JSON |
| Home route | Uses Payload published `accueil` when available, hardcoded fallback otherwise |
| Non-home public routes | Use matching published Payload slugs when available, hardcoded fallback otherwise |
| Editor auth | Payload user auth with HTTP-only JWT cookie |
| Draft editing | Supported |
| Publishing | Supported |
| Rollback/versioning | Payload versions are enabled |
| Page switching in editor | Supported with header selector |
| Canvas navigation in editor | Supported for header links |
| Direct text editing | Supported through Tiptap inline editors |
| Arbitrary HTML | Not allowed |
| Arbitrary Tailwind | Not allowed |
| Arbitrary JS | Not allowed |
| Drag/drop sections | Disabled |
| Delete sections | Disabled |
| Insert sections | Disabled |
| Duplicate sections | Disabled |
| Image upload in editor UI | Payload media collection exists, but no editor image picker is wired yet |
| Database | Postgres locally and in production |

## Important Constraints

1. Do not turn this into a generic builder.

   The client asked for copywriting control, not design control. Keep `fields: {}` unless a field is safe and truly needed.

2. Keep hardcoded pages.

   The hardcoded site is the design baseline and fallback. Do not delete it.

3. Keep Puck JSON normalized.

   Inline editing depends on stable block IDs. Always normalize before render/save.

4. Keep Tiptap event isolation.

   Backspace and typing must stay inside text fields and never bubble into Puck section operations.

5. Keep editor navigation inside the editor.

   Header links in the canvas should route to `/admin/builder/$slug`, not public pages.

6. Keep GSAP behind presets.

   No client-editable animation code.

7. Keep production storage in mind.

   Local uploads are a local-development choice, not Vercel production infrastructure.

## Suggested Next Improvements

These are not required for the current MVP but are sensible next steps.

1. Add durable media storage for Vercel.

2. Add a controlled image picker for safe image replacement only where approved.

3. Add a small page list/dashboard at `/admin/builder` that redirects to `accueil` or lists editable pages.

4. Add role-based access if multiple editor roles are required.

5. Add production error handling around `saveBuilderPage` so failed saves show a clear editor message.

6. Consider admin/editor code-splitting to reduce public bundle size warnings.

7. Add a migration/seed policy before production launch so existing Payload copy is not accidentally overwritten.

## File Path Index

Builder:

```txt
src/builder/animation.tsx
src/builder/blocks.tsx
src/builder/config.tsx
src/builder/default-page-data.ts
src/builder/inline-editing.tsx
src/builder/live-page.tsx
src/builder/live-sync.ts
src/builder/normalize.ts
src/builder/renderer.tsx
src/builder/types.ts
```

Payload:

```txt
src/server/payload/client.ts
src/server/payload/pages.ts
src/server/payload/payload.config.ts
```

Admin routes:

```txt
src/routes/admin.login.tsx
src/routes/admin.builder.$slug.tsx
```

Public editable route:

```txt
src/routes/pages.$slug.tsx
```

Hardcoded public pages:

```txt
src/routes/index.tsx
src/routes/about.tsx
src/routes/expertises.tsx
src/routes/business-linkage-program.tsx
src/routes/events.tsx
src/routes/contact.tsx
```

Shared site:

```txt
src/components/site-header.tsx
src/components/site-footer.tsx
src/components/layout.tsx
src/components/hero.tsx
src/components/common-sections.tsx
src/lib/site-data.ts
```

Styles:

```txt
src/styles.css
src/styles/puck-editor.css
```

Scripts:

```txt
scripts/seed-payload.ts
scripts/reset-builder-page.ts
scripts/with-esbuild.ts
```

Tests:

```txt
tests/editor-smoke.spec.ts
```
