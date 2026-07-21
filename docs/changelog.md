# Changelog

## 2026-07-20 22:50 UTC — Migration kickoff

- **Summary**: Created `personal-site-v3.0` branch; documented full legacy inventory; drafted 7-phase migration plan (Tailwind CSS v4 + SCSS, no Vuetify, drag-and-drop gallery, Netlify forms preserved).
- **Files touched**: `AGENTS.md`, `docs/changelog.md`, `docs/brand-guide.md`, `docs/roadmap.md`, `docs/` (new directory)

## 2026-07-20 22:52 UTC — Phase 1: Tooling + cleanup

- **Summary**: Installed ESLint, vue-tsc, vitest, @vue/test-utils. Added lint/typecheck/test scripts to package.json. Added @nuxt/eslint module to nuxt.config.ts and created eslint.config.mjs + vitest.config.ts. Removed approved legacy files: pages/portfolio.vue, pages/doithackathon.vue, components/portfolio.vue, public/oldWebsite/.
- **Files touched**: `package.json`, `nuxt.config.ts`, `eslint.config.mjs`, `vitest.config.ts` (new), `pages/portfolio.vue` (deleted), `pages/doithackathon.vue` (deleted), `components/portfolio.vue` (deleted), `public/oldWebsite/` (deleted)
- **Verification**: `npm run generate` builds and prerenders successfully (/, /photography, /contact, /thank-you).
- **Note**: Switched from `@nuxt/eslint` Nuxt module (ESM conflict on Node 24) to standalone `@nuxt/eslint-config` config package in `eslint.config.mjs`. Module removed from `nuxt.config.ts` modules array.

## 2026-07-20 22:55 UTC — Phase 2: Tailwind CSS v3 + SCSS setup

- **Summary**: Installed Tailwind CSS v3 via `@nuxtjs/tailwindcss` module (Tailwind v4 incompatible with Nuxt 3.13.2's Vite 4.5.5 — `@tailwindcss/vite` plugin requires Vite >=5.2). Installed `@nuxt/icon@1` for icon auto-loading. Updated `@iconify/vue` to latest for compatibility. Created `tailwind.config.mjs` with warm color palette from legacy theme. Stripped Vuetify-specific SCSS from `assets/main.scss`, kept custom cursor + glow animations. Added `Tailwind directives + `compatibilityDate` to `nuxt.config.ts`.
- **Files touched**: `package.json`, `nuxt.config.ts`, `assets/main.scss`, `tailwind.config.mjs` (new)
- **Note**: Tailwind v4 blocked by Vite version constraint — using v3 via `@nuxtjs/tailwindcss` module, which is the stable supported path.

## 2026-07-20 23:45 UTC — Phase 3: Layout shell rebuild (header, footer, nav)

- **Summary**: Replaced the Vuetify-based layout shell with pure Tailwind CSS components:
  - `components/layout/SiteHeader.vue` — Fixed top bar with Old Website button, Secret button (desktop), and hamburger menu with glow effect (mobile)
  - `components/layout/SiteFooter.vue` — Fixed bottom bar with copyright and social links (LinkedIn, Instagram, YouTube) via `@nuxt/icon`
  - `components/layout/SiteNav.vue` — Desktop expand-on-hover rail (68px→240px, puffin + Photography + Contact Me) and mobile slide-down drawer with `v-model` binding
  - `layouts/default.vue` — Orchestrates layout components, keeps `<v-app>` for Vuetify legacy page compatibility, adds `pt-[50px] pb-[40px] lg:pl-[68px]` for header/footer/nav offsets
  - `app.vue` — Simplified to minimal `<NuxtLayout>` + `<NuxtPage>` wrapper
- **Fix**: `nuxt.config.ts` — Added Node 24 prerender workaround. Nitro's `importMeta` rollup plugin hardcodes `file:///_entry.js` as `globalThis._importMeta_.url` for non-Node targets (static builds). Node 24's `createRequire` rejects this as an invalid path. Fixed via `nitro:build:before` → `prerender:init` → `compiled` hook that patches the generated `nitro.mjs` file with the correct absolute path URL.
  - Updated `nitropack` from 2.9.7 to 2.13.4 (latest) for general compatibility
- **Files touched**: `components/layout/SiteHeader.vue` (new), `components/layout/SiteFooter.vue` (new), `components/layout/SiteNav.vue` (new), `layouts/default.vue` (rewritten), `app.vue` (simplified), `nuxt.config.ts` (added hooks + imports), `package.json` (nitropack updated)

## 2026-07-21 00:16 UTC — Phase 4: Landing page hero redesign

- **Summary**: Rewrote landing page per specs:
  - Split photography categories into **featured** (Portraits, Events) for hero slideshow and **fun** (Animals, Outdoors, Vehicles, Misc) for a consolidated "Other Things I Do (For Fun)" section below.
  - Created `components/landing/HeroSlideshow.vue` — full-viewport 2-image hero that:
    - Displays one random image from each featured category, rotating every 30s
    - Detects viewport orientation via `ResizeObserver` and image orientation via `onload` (`naturalWidth`/`naturalHeight`)
    - When image orientation matches viewport → standard 2-up layout (`object-cover` in flex row/column)
    - When orientation mismatches → blurred zoomed background (`scale-125 blur-lg brightness-50`) with `object-contain` foreground
    - Smooth crossfade on pair swap via Vue `<Transition>`
  - Rewrote `pages/index.vue` — hero with name/tagline/description overlaid, "View photography" glow button, then "Other Things I Do (For Fun)" section below with the 4 fun categories in a 2-column grid
  - Refactored `composables/useLandingSlideshow.ts` — split into `heroPair` and `funSlides`; added `FEATURED`/`FUN` constants
  - `npm run generate` passes clean (10 prerendered routes)
- **Files touched**: `composables/useLandingSlideshow.ts` (refactored), `components/landing/HeroSlideshow.vue` (new), `pages/index.vue` (rewritten)

## 2026-07-21 ~01:00 UTC — Phase 4: Landing page hero refinements

- **Summary**: Removed overlay text (name, tagline, description) from hero per request. Converted category labels into clickable glassmorphism pill buttons with arrow icon — navigates to `/photography` on click. Applied `@click.stop` so clicking the label doesn't also advance the slideshow.
- **Files touched**: `pages/index.vue`, `components/landing/HeroSlideshow.vue`

## 2026-07-21 ~01:10 UTC — Phase 4: Hero fit + button visibility

- **Summary**: Fixed hero height from `100vh` to `calc(100dvh - 50px)` so it fits within viewport accounting for the 50px fixed header. Made category buttons more visible: `bg-black/60` with `border-white/40` replaces the too-subtle `bg-white/15 backdrop-blur-md` glassmorphism style.
- **Files touched**: `components/landing/HeroSlideshow.vue`
