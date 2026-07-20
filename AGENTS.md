# AGENTS.md — Sharif's Personal Photography Website

## ⚠️ MIGRATION STATUS — READ THIS FIRST

This repository is undergoing a **complete overhaul**, not an incremental update.

- Current branch: `personal-site-v3.0` (created 2026-07-20 from `origin`).
- The "Legacy Stack" section below describes the **old** site as it exists in this branch right now. It is provided for **reference only** — to understand what content/assets/routes existed before, and to help migrate photos, copy, and page structure.
- **Do not preserve, refactor, or extend the legacy stack** (Vuetify 3, manual `vite-plugin-vuetify` wiring, hardcoded GA snippet, Iconify custom icons) unless explicitly told to.
- The "Target Stack" section is what you should actually build toward. Choose **best-in-class modern tooling** compatible with Nuxt 3 and Netlify static generation — don't artificially limit to custom-components-only. Great UI/UX is the goal.
- If a legacy file conflicts with the target architecture, replace it. Do not try to make old and new code coexist unless explicitly asked.
- When in doubt about whether something is legacy or target, ask before writing code.

---

## Legacy Stack (reference only — being replaced)

- **Nuxt 3** (SSR enabled via `ssr: true`)
- **Vuetify 3** — wired manually, NOT via Nuxt module (`vite-plugin-vuetify` injected via `vite:extendConfig` hook in `nuxt.config.ts`, plus `plugins/vuetify.ts` calling `createVuetify`)
- **Sass/SCSS** — global styles in `assets/main.scss`
- **Iconify** (`@iconify/vue`) with custom aliases in `utils/customIcons.ts`
- **Google Analytics** — hardcoded gtag snippet in `nuxt.config.ts` (`G-6VSTRJ3QLM`)
- **@nuxt/image** — configured for WebP output only
- No lint/typecheck/test scripts exist; Prettier config present but unused

Legacy structure (for migration reference):

| Path | Purpose |
|---|---|
| `app.vue` | Root — `<NuxtLayout>` > `<NuxtPage>` |
| `layouts/default.vue` | App bar, nav drawer, footer |
| `pages/` | `index.vue`, `photography.vue`, `portfolio.vue`, `contact.vue`, `doithackathon.vue`, `thank-you.vue` |
| `components/` | Photography category components (`Animals.vue`, `Portraits.vue`, etc.), `imageGallary.vue`, `portfolio.vue` |
| `composables/rules.ts` | Form validation helpers |
| `plugins/vuetify.ts` | Vuetify bootstrap |
| `utils/` | `defaults.ts`, `themes.ts`, `customIcons.ts`, `fluentIcons.ts`, `tw-colors.ts` |
| `assets/main.scss` | Custom cursor, glow animations, font overrides |
| `public/` | Images, favicon, `oldWebsite/` archive, `robots.txt`, `sitemap.xml` |

Legacy quirks worth knowing during migration:

- Custom cursor is a PNG sprite (`/pointer.png`) applied via `.global-cursor` on `#app` — decide if this survives the rebuild.
- Theme colors pull from Tailwind values in `utils/tw-colors.ts` via `utils/themes.ts`.
- `doithackathon.vue` and `thank-you.vue` may be dead pages — confirm before deleting.
- `public/oldWebsite/` is an archive folder — do not touch without asking.

---

## Target Stack (what to actually build)

- **Nuxt 3, Vue 3, TypeScript** — Composition API only (`<script setup lang="ts">`). Strict mode preferred if compatible.
- **Vuetify is out.** Choose the best modern tools for the job that are compatible with Nuxt 3 + Netlify static generation. Great options to consider:
  - **Styling**: Tailwind CSS v4, UnoCSS, or plain SCSS — propose your pick with rationale
  - **UI primitives**: Radix Vue, Reka UI, Shadcn Vue, PrimeVue (headless), or build custom — choose what delivers the best UX without fighting the framework
  - **Animations**: Motion (Framer Motion for Vue), GSAP, or CSS-first approach
  - **Icons**: Nuxt Icon module (auto-loads Iconify sets) — much cleaner than the legacy manual wiring
  - **Forms**: VeeValidate + Zod, or built-in Nuxt approach
- **Photo catalog**: folder-scanning via `import.meta.glob` on `assets/photos/<category>/` — no manual registration
- **Static generation**: `npm run generate` → deploy to Netlify

**Action item for agent:** propose and set up lint (ESLint with `@nuxt/eslint`), typecheck (`vue-tsc`), and a minimal test script early in the rebuild — these do not exist yet in `package.json`. Ask before choosing tooling versions.

## Commands

```bash
npm run dev        # nuxt dev --host
npm run build      # nuxt build
npm run generate   # nuxt generate (static export) — primary Netlify target
npm run preview    # nuxt preview
npm run lint        # TO BE ADDED — do not assume it exists yet
npm run typecheck    # TO BE ADDED — do not assume it exists yet
npm run test        # TO BE ADDED — do not assume it exists yet
```

`postinstall` runs `nuxt prepare` automatically.

## Target Project Structure

```
pages/
  index.vue            # Landing page: responsive slideshow, one image per category
  photography.vue      # Category-first gallery
  about.vue            # Brand story (lorem ipsum placeholder for now)
  contact.vue          # Contact section

components/
  layout/              # Header, footer, nav
  gallery/
    GalleryGrid.vue
    GalleryItem.vue
    GalleryLightbox.vue
    CategoryCarousel.vue
  ui/                  # Reusable UI primitives (buttons, cards, headings)

assets/
  photos/<category>/   # Drag-and-drop source of truth for images — portraits/, events/, personal/ etc.
  styles/

composables/
  useGallery.ts        # Discovers + shuffles images per category
  useBreakpoint.ts     # Responsive layout logic

docs/
  brand-guide.md       # Colors, fonts, tone, puffin usage rules
  roadmap.md           # Future features and notes
  changelog.md         # Single running changelog — append every change

public/
  logo-puffin.svg
  favicon.ico
```

## Code Style

- TypeScript everywhere — no new `.js` files under `pages/`, `components/`, `composables/`.
- Composition API only (`<script setup lang="ts">`).
- Component names: `PascalCase.vue`. Composables: `useX.ts`.
- Keep dependencies minimal but don't sacrifice UX — a well-chosen library beats a buggy hand-rolled solution.

## Gallery Behavior

- **Category-first UI**: categories (portraits, events, personal) visible without opening a menu.
- **Drag-and-drop updates**: any new image in `assets/photos/<category>/` is auto-discovered via `import.meta.glob` — no manual JSON, no naming rituals.
- **Responsive grid**: CSS Grid/Flexbox, aspect-ratio handling, smooth breakpoints.
- **Lightbox**: click/tap opens large view with related images from same category.
- **Shuffle**: periodic rotation, no jarring reorder on every load.
- **Landing slideshow**: one image per category. Portrait viewport stacks landscape images vertically; landscape viewport places portrait images side-by-side with category labels.

## Testing & Changelog

- Testing scripts do not exist yet — set them up early in the rebuild, then always run them before considering work done.
- Every meaningful change gets appended to `docs/changelog.md`: date/time (UTC), summary, files touched. Never rewrite past entries.

## Git Workflow

- Current active branch: `personal-site-v3.0`. Treat `main`/`master` as the old live site — do not merge back until the overhaul is validated.
- Branch naming for sub-work: `feat/<desc>`, `fix/<desc>`, `chore/<desc>`.
- Commit messages must describe the actual change, not "misc updates".
- Agent may commit locally; pushing to `origin` requires explicit confirmation each time.

## Boundaries

### Always
- Treat the Legacy Stack section as read-only reference, never as the target architecture.
- Keep photo catalog drag-and-drop compatible (folder scan via `import.meta.glob`, no manual registration).
- Append to `docs/changelog.md` for every meaningful change.
- Run `npm run generate` (or `build`) to verify no errors before finishing a task.

### Ask First
- Ask before deleting any legacy page, component, or the `oldWebsite/` archive.
- Ask before adding any npm dependency — justify why it's the best choice for Nuxt 3 + Netlify.
- Ask before changing `nuxt.config.ts` rendering mode or Netlify-relevant settings.
- Ask before removing Google Analytics or the custom cursor/glow animation — they may be intentionally kept.

### Never
- Never reintroduce Vuetify.
- Never commit secrets or `.env` files.
- Never touch `netlify.toml` without approval.
- Never silently delete `public/oldWebsite/`.

## Brand & UX Summary

- **Tone**: Professional, warm, confident — focused on visual storytelling.
- **Typography**: Neutral serif placeholder (Inter currently set in legacy SCSS — swap when ready).
- **Color**: Warm palette — to be defined in `docs/brand-guide.md`. Pull from legacy `utils/tw-colors.ts` as a starting reference.
- **Puffin logo**: subtle identity marker, not a primary motif.
- **Custom cursor**: `/pointer.png` — allowed, already implemented. Decide during rebuild if it stays.
- **Glow animations**: defined in legacy `assets/main.scss` — decide during rebuild if they survive.

## Explicitly Out of Scope (For Now)

- Client portal, payment processing, booking system, IoT dashboards, authenticated sections.
- Keep architecture modular for future expansion (roadmap in `docs/roadmap.md`), but no implementation now.
