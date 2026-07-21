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

## 2026-07-21 ~01:20 UTC — Phase 5: Photography gallery

- **Summary**: Built category-first gallery page with auto-discovered images:
  - `composables/useGallery.ts` — `import.meta.glob` discovers all images under `/public/photos/<category>/`, groups by directory name, provides shuffle utility
  - `components/gallery/CategoryCarousel.vue` — Horizontal pill buttons for category switching (used as `<GalleryCategoryCarousel />` due to Nuxt directory prefixing)
  - `components/gallery/GalleryGrid.vue` — Responsive 1/2/3-column grid with hover zoom
  - `components/gallery/GalleryLightbox.vue` — Full-screen overlay with prev/next, keyboard nav (arrow keys + Escape), image counter
  - `pages/photography.vue` — Rewritten from Vuetify legacy to category-first layout with pills, grid, and lightbox
  - `components/imageGallary.vue`, `components/Portraits.vue`, `components/Events.vue`, `components/Animals.vue`, `components/Outdoors.vue`, `components/Misc.vue`, `components/Vehicles.vue` — legacy Vuetify category components left in place (not removed)
- **Fix**: CategoryCarousel component was not rendering due to Nuxt 3 directory prefix (`components/gallery/` → `<GalleryCategoryCarousel />`)
- **Files touched**: `composables/useGallery.ts` (new), `components/gallery/CategoryCarousel.vue` (new), `components/gallery/GalleryGrid.vue` (new), `components/gallery/GalleryLightbox.vue` (new), `pages/photography.vue` (rewritten)

## 2026-07-21 ~05:00 UTC — Secret button easter egg (inline modal, footer)

- **Summary**: Created `components/ui/SecretButton.vue` — self-contained component with SCSS wiggle animation on hover. On click, opens a full-screen overlay with embedded YouTube (Rick Astley) video, dismissible via Escape, click-outside, or close button. Relocated from old header position to footer. Old header button removed.
- **Files touched**: `components/ui/SecretButton.vue` (new), `components/layout/SiteFooter.vue`, `components/layout/SiteHeader.vue`

## 2026-07-21 ~04:30 UTC — Footer restructure + YouTube removal + social on contact

- **Summary**: Replaced fixed 40px footer bar with a static copyright footer at page bottom. Removed YouTube link from footer entirely. Added LinkedIn and Instagram glass buttons to contact page below form. Updated layout to use `flex flex-col min-h-screen` + `flex-1` so footer sticks to bottom on short pages. Removed `pb-[40px]` from main (no longer needed). Hero height unaffected (still `calc(100dvh - 50px)` — only accounted for header).
- **Files touched**: `components/layout/SiteFooter.vue`, `layouts/default.vue`, `pages/contact.vue`

## 2026-07-21 ~04:00 UTC — Glass button design system + animation refactor

- **Summary**: Moved float/bounce keyframes from scoped CSS to `tailwind.config.mjs` as `animate-float` / `animate-bounce-card` utilities. Standardized all buttons (hero pills, category carousel, contact submit) to consistent glass-with-accent-tint style: `bg-accent/* backdrop-blur-md border border-accent/* rounded-lg`. Hero pill text increased from `text-sm` to `text-base` (~20% larger).
- **Files touched**: `tailwind.config.mjs`, `components/landing/HeroSlideshow.vue`, `components/gallery/CategoryCarousel.vue`, `pages/contact.vue`

## 2026-07-21 ~03:30 UTC — About nuked, moved to homepage, contact animations restored

- **Summary**: Deleted `about.vue`, moved "About" section to homepage between hero and fun section. Removed About link from SiteHeader/SiteNav. Restored contact photo (`/contact.jpg`), background (`/banner.webp`), float/bounce animations, and hover effects on inputs.
- **Files touched**: `pages/about.vue` (deleted), `pages/index.vue`, `pages/contact.vue`, `components/layout/SiteHeader.vue`, `components/layout/SiteNav.vue`

## 2026-07-21 ~03:00 UTC — Phase 6: About, Contact, Thank You

- **Summary**: Built `about.vue` (brand story, placeholder text), rebuilt `contact.vue` (VeeValidate + Zod validation, Netlify native POST preserved), rebuilt `thank-you.vue` (modern success page). Added `@vee-validate/nuxt` module to `nuxt.config.ts`. Added "About" link to `SiteHeader.vue` and `SiteNav.vue`.
- **Files touched**: `pages/about.vue` (new), `pages/contact.vue` (rewrite), `pages/thank-you.vue` (rewrite), `nuxt.config.ts`, `components/layout/SiteHeader.vue`, `components/layout/SiteNav.vue`

## 2026-07-21 ~02:30 UTC — Photography page restructure + masonry grid

- **Summary**: Removed the "Things I Shoot For Fun 🔫" section. Restructured category pills into two groups with a `|` separator: Events, Portraits | Landscape, Pets, Vehicles. Switched `GalleryGrid` from fixed aspect-ratio grid (cropping) to CSS columns masonry layout so images display at natural proportions.
- **Files touched**: `pages/photography.vue`, `components/gallery/CategoryCarousel.vue`, `components/gallery/GalleryGrid.vue`

## 2026-07-21 ~02:00 UTC — Outdoors → Landscape rename

- **Summary**: Renamed `public/photos/Outdoors/` → `public/photos/Landscape/` and updated all references in `useLandingSlideshow.ts` and `photography.vue` for SEO-friendly category naming.
- **Files touched**: `public/photos/Outdoors/` (renamed to Landscape), `composables/useLandingSlideshow.ts`, `pages/photography.vue`

## 2026-07-21 ~01:30 UTC — Photo cleanup + fun section

- **Summary**: Deleted `public/photos/Misc/` folder. Renamed `public/photos/Animals/` → `public/photos/Pets/`. Removed Misc and renamed Animals→Pets in `useLandingSlideshow.ts`. Added "Things I Shoot For Fun 🔫" section at bottom of photography page with Pets, Outdoors, Vehicles images grouped together. Lightbox now supports separate image sets (category vs fun).
- **Files touched**: `public/photos/Misc/` (deleted), `public/photos/Animals/` (renamed to Pets), `composables/useLandingSlideshow.ts`, `pages/photography.vue`

## 2026-07-21 ~01:30–05:00 UTC — Phase 7: Analytics, Vuetify teardown, visual polish

- **Summary**: Completed Phase 7 — analytics and legacy clean-up:
  - Installed `nuxt-gtag` v4.1.0 with `G-6VSTRJ3QLM`, removed hardcoded GA snippet
  - Removed Vuetify entirely: `plugins/vuetify.ts`, `utils/themes.ts`, `utils/defaults.ts`, `utils/customIcons.ts`, `utils/fluentIcons.ts`, legacy gallery components (`imageGallary.vue`, `Portraits.vue`, `Animals.vue`, `Events.vue`, `Outdoors.vue`, `Vehicles.vue`, `Misc.vue`) all deleted; `vuetify` and `vite-plugin-vuetify` removed from `package.json`
  - Hero CTA redesigned: pill buttons → full-width gradient caption overlay with bold text + arrow icon
  - Section-two fun cards: blurred background + object-contain + gradient strip, match hero treatment
  - Cursor follower: disabled by default, activates on interactive elements only; legacy `.global-cursor` (`cursor: url('/pointer.png')`) removed from `app.vue` and `main.scss`
  - Header lockup updated: two-line "Sharif Sircar" / "Photography & Hosting", always visible
  - Created `AboutPhoto.vue` — self-contained SCSS card with gradient overlay caption
- **Files touched**: `nuxt.config.ts`, `package.json`, `components/landing/HeroSlideshow.vue`, `components/ui/CursorFollower.vue`, `components/ui/EasterEgg.vue`, `components/layout/SiteHeader.vue`, `components/AboutPhoto.vue` (new), `app.vue`, `assets/main.scss`, `pages/index.vue`, `plugins/vuetify.ts` (deleted), `utils/themes.ts` (deleted), `utils/defaults.ts` (deleted), `utils/customIcons.ts` (deleted), `utils/fluentIcons.ts` (deleted), several `components/*.vue` (deleted)

## 2026-07-21 03:05 UTC — About photo card refinements, lint/typecheck setup

- **Summary**:
  - Updated `AboutPhoto.vue` with desktop drop-shadow, mobile 4/5 aspect-ratio, centered at 320px, refined gradient caption
  - Removed dead page `doithackathon.vue` (already gone) and `public/oldWebsite/` (already gone)
  - Installed `eslint` + `@types/node` as devDependencies
  - Removed deprecated `hid` prop from all `useHead` meta definitions across all pages and `nuxt.config.ts`
  - Removed dead `composables/rules.ts` (legacy Vuetify form rules, unused)
  - Fixed SCSS `api` type issue in `nuxt.config.ts`
  - Fixed all 33 lint errors (brace style, indent, member delimiters, trailing commas, attribute order, etc.)
  - `npm run lint`, `npm run typecheck`, and `npm run generate` all pass clean
- **Files touched**: `components/AboutPhoto.vue`, `nuxt.config.ts`, `eslint.config.mjs` (already existed), `package.json`, `pages/contact.vue`, `pages/index.vue`, `pages/photography.vue`, `pages/thank-you.vue`, `components/ui/SecretButton.vue`, `components/layout/SiteNav.vue`, `components/gallery/GalleryLightbox.vue`, `components/landing/HeroSlideshow.vue`, `components/ui/EasterEgg.vue`, `composables/useLandingSlideshow.ts`, `composables/rules.ts` (deleted), `tailwind.config.mjs`, `docs/brand-guide.md` (expanded)
