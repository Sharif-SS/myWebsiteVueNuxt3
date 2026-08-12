# Changelog

## 2026-08-11 23:15 UTC — Image optimization pipeline + industry-standard lazy loading

- **Summary**: Rebuilt how gallery/hero images load. Root causes: the justified grid's `<img>` tags had no `loading="lazy"` (only the temporary placeholder grid did), `useJustifiedLayout` downloaded every full-size original just to read its dimensions, and gallery/hero pointed at full-res `/photos/...` files with no optimization, no srcset, and no placeholder — the hero visibly painted top-to-bottom (WebP has no interlacing).
- **Build-time pipeline**: New `scripts/optimize-images.mjs` (uses `sharp`, added as an explicit devDependency) scans `public/photos/<category>/` and emits optimized WebP variants + a dimensions manifest into `public/gallery/` (gitignored). Per image: `@placeholder` (~0.2KB blurred, LQIP), `@thumb` (~1200px), `@full` (~2000px). Manifest written to `assets/gallery/manifest.json` (gitignored). Runs via `npm run optimize` and wired as `predev`/`prebuild`/`pregenerate` hooks plus `postinstall`.
- **Composables**: `useGallery.ts` and `useLandingSlideshow.ts` now read the manifest via shared `utils/galleryCatalog.ts` instead of `import.meta.glob`; images carry `thumb`/`full`/`placeholder`/`width`/`height`. `useJustifiedLayout.ts` no longer downloads images to measure — dimensions come from the manifest; only videos still fetch metadata at runtime (`loadVideoDimensions`).
- **Gallery grid** (`GalleryGrid.vue`): justified-layout images now have `loading="lazy" decoding="async" fetchpriority="low"`, LQIP blurred placeholder background, `srcset`/`sizes`, and manifest aspect-ratio (no CLS). Grid videos use `preload="metadata"` so multi-MB webm files no longer load eagerly.
- **Hero** (`HeroSlideshow.vue`, `pages/index.vue`): tiny blurred LQIP placeholder renders instantly; sharp `@full` variant fades in on load with `fetchpriority="high"`; fun-section cards and lightbox use optimized variants too.
- **Result**: Gallery category default (Events) drops from ~10.4MB of eager full-res downloads to lazily-loaded ~78KB thumbs with instant blur-up placeholders; hero paints a ~0.2KB placeholder then sharpens — restoring the old "small version first" feel.
- **Files touched**: `package.json`, `.gitignore`, `scripts/optimize-images.mjs` (new), `utils/galleryCatalog.ts` (new), `composables/useGallery.ts`, `composables/useLandingSlideshow.ts`, `composables/useJustifiedLayout.ts`, `components/gallery/GalleryGrid.vue`, `components/gallery/GalleryLightbox.vue`, `components/landing/HeroSlideshow.vue`, `pages/index.vue`, `pages/photography.vue`, `docs/changelog.md`
- **Verification**: `npm run optimize`, `npm run lint`, `npm run typecheck`, and `npm run generate` all pass (16 routes); prerendered HTML confirms gallery lazy-thumbs, hero `@full` + `fetchpriority="high"` + placeholders, zero full-res `/photos/` in hero. `npm run test` reports no test files (pre-existing).
- **Note**: Two `.webm` files under `public/photos/Miscellaneous/` (`Clip.webm`, `Story Lapse.webm`) were already deleted in the worktree (tracked as `D` in git) before this task; left untouched.

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

## 2026-07-21 06:00 UTC — Accessibility pass + header cleanup

- **Summary**: Fixed Lighthouse accessibility issues:
  - Added `lang="en"` to `<html>` element via `nuxt.config.ts` `htmlAttrs`
  - Fixed low-contrast `text-gray-400` text (2.8:1 ratio) → `text-gray-600` on white backgrounds across homepage, footer, and photography page
  - Fixed borderline `text-gray-500` (4.6:1 ratio) subtitles → `text-gray-600` on homepage, photography and contact pages
  - Removed "&amp; Event Hosting" from site header subtitle per owner request (to be revisited later)
- **Files touched**: `nuxt.config.ts`, `pages/index.vue`, `pages/photography.vue`, `pages/contact.vue`, `components/layout/SiteFooter.vue`, `components/layout/SiteHeader.vue`

## 2026-07-21 06:15 UTC — Noto Sans site-wide font

- **Summary**: Applied Noto Sans as the site-wide default font. Added Google Fonts preconnect + stylesheet links in `nuxt.config.ts` head. Updated `tailwind.config.mjs` — replaced the legacy `fontFamily.serif` (Inter) with `fontFamily.sans` using Noto Sans. Updated `AGENTS.md` typography docs accordingly.
- **Files touched**: `tailwind.config.mjs`, `nuxt.config.ts`, `AGENTS.md`

## 2026-07-21 06:30 UTC — Mobile category pills: removed `|` separator, horizontal scroll

- **Summary**: Replaced the wrapping pill layout with `|` separator on `/photography` with a horizontally scrollable pill strip (hidden scrollbar). Pills now overflow-scroll on mobile (swipe gesture) and wrap naturally on desktop. Removed `groups` prop in favor of flat `categories` array.
- **Files touched**: `components/gallery/CategoryCarousel.vue`, `pages/photography.vue`

## 2026-07-21 06:45 UTC — SEO metadata overhaul

- **Summary**: Updated all SEO meta tags to reflect the photography portfolio (not the old tech/dev site). Homepage description rewritten to describe photography services. Consistent page title format (`"Page — Sharif Sircar"`) across all pages. Added `og:image` + `twitter:image` to photography and contact subpages. Removed emoji from global `og:title`. Updated `og-image.svg` to use Noto Sans font and removed "&amp; Hosting". Added `noindex` to thank-you page. Cleared Nuxt/Vite cache to fix `#app-manifest` error.
- **Files touched**: `pages/index.vue`, `pages/photography.vue`, `pages/contact.vue`, `pages/thank-you.vue`, `nuxt.config.ts`, `public/og-image.svg`

## 2026-07-22 — Scroll-reveal animations (v-reveal directive)

- **Summary**: Added fade-in-up scroll-reveal animations using a custom `v-reveal` directive and IntersectionObserver. Created `plugins/reveal.ts` (no `.client` suffix — registered on both server/client for SSR compatibility; `mounted` hook only fires on client). Added `.reveal` / `.revealed` CSS in `assets/main.scss` with a 0.7s cubic-bezier transition. Applied to homepage About section, "Outside of Events" section heading/paragraph, fun cards (staggered by index via `transitionDelay`), and photography page heading/subtitle/grid. `npm run generate` passes clean.
- **Files touched**: `plugins/reveal.ts` (new), `assets/main.scss`, `pages/index.vue`, `pages/photography.vue`

## 2026-07-29 — Added "Mixed Category" as 4th gallery category

- **Summary**: Added `'Mixed Category'` to the `FUN` array in `useLandingSlideshow.ts` so the homepage shows a 4th image block pulling from `public/photos/Mixed Category/`. Added `['Mixed Category']` as a third group in `photography.vue` so it appears as a selectable category in the carousel. No other changes needed — the existing `import.meta.glob` patterns already discover images in this folder automatically.
- **Files touched**: `composables/useLandingSlideshow.ts`, `pages/photography.vue`

## 2026-07-29 — Added Services nav + Final Fantasy themed under-construction pages

- **Summary**: Added "Services" as a 4th navigation category with dropdown sub-items "Event MC for Hire" and "Web Development". Desktop header now has a hover/click dropdown menu; mobile nav has an expandable section. Both service pages use a shared `UiFinalFantasyConstruction` component with animated starfield, floating orbs, scanline overlay, pulsing crystal, golden glow typography, FF-style battle message box, and a moogle "Kupo!" easter egg. Routes: `/services/event-mc` and `/services/web-development`.
- **Files touched**: `components/ui/FinalFantasyConstruction.vue` (new), `pages/services/event-mc.vue` (new), `pages/services/web-development.vue` (new), `components/layout/SiteHeader.vue`, `components/layout/SiteNav.vue`

## 2026-07-29 — Chocobo wander + footer contrast fix

- **Summary**: Added a CSS-only chocobo that wanders horizontally across the bottom of the FF construction pages with full walk cycle (legs, wing flap, tail wag, crest wobble, eye blink, body bob). The chocobo walks left-to-right, reverses direction at edges, and loops continuously. Fixed footer social link buttons contrast by bumping `bg-accent/30` → `/60` and `text-gray-700` → `text-gray-800`.
- **Files touched**: `components/ui/FinalFantasyConstruction.vue`, `components/layout/SiteFooter.vue`

## 2026-07-29 — Realistic chocobo feathers + cursor/tap follow

- **Summary**: Replaced the simple chocobo with a highly detailed CSS version featuring layered feather textures via `repeating-linear-gradient` on body, wing, tail, and neck. Wing has 3 feather layers with individual strand detail. Tail has a 3-feather plume. Added belly patch, eye pupil/shine, head fluff, 3-crest feather set (main/side/back), beak line, and feet. All animations preserved (bob, flap, tail-wag, crest-wobble, blink). Changed from keyframe walk to JS-driven cursor following using `mousemove`/`touchmove` with smooth lerp interpolation — chocobo smoothly follows mouse or finger position horizontally, and flips direction to face the cursor.
- **Files touched**: `components/ui/FinalFantasyConstruction.vue`

## 2026-08-09 — Hero slideshow: shuffle-through-all, crossfade, tap feedback

- **Summary**:
  - Fixed hero slideshow repeating images / not cycling all photos. `useLandingSlideshow.ts` now uses per-category Fisher–Yates cycles: every Portraits (21) and Events (44) image plays before any repeats, and the same image never plays twice in a row (last ≠ first guard on reshuffle).
  - Applied the same no-repeat cycle treatment to the "fun" category cards (Pets, Landscape, Vehicles, Mixed Category).
  - Decoupled timing: hero auto-advances every 10s (was 30s), fun cards keep a 30s cadence; click/tap only advances the hero pair.
  - Crossfade between transitions: `HeroSlideshow.vue` now wraps each pair render in a `<Transition>` keyed on `category:src`, 700ms opacity crossfade, works for both auto-advance and click/tap. Incoming images are pre-warmed in the browser cache before the swap.
  - Tap/click feedback: pressed state (scale-down + brightness dim) via pointer events, plus a "Next ▸" pill that appears on hover and pulses while pressed.
- **Files touched**: `composables/useLandingSlideshow.ts`, `components/landing/HeroSlideshow.vue`, `pages/index.vue`
- **Verification**: `npm run generate` builds and prerenders successfully.

## 2026-08-09 — Homepage About section: mobile text wrap-around (zoom-aware container queries)

- **Summary**:
  - Replaced the viewport-based `sm:flex-row` 2-column switch (which jumped to image-left/text-right at any zoom whose effective CSS-px viewport crossed 640px, e.g. 75% zoom) with **CSS container queries** on the about block. Layout now follows the width actually available to the section, so any user zoom/scale is respected automatically.
  - Narrow (`< 768px` available): `AboutPhoto` floats left inside the text flow and the paragraphs wrap around it; image width is `min(56%, 260px)`.
  - Wide (`≥ 768px` available): unchanged desktop look — ~340px image column left, text column right.
  - `AboutPhoto.vue` now fills its wrapper (`width: 100%`) and uses container queries (4/5 aspect on narrow, 3/4 on wide) instead of hardcoded `max-width: 340px` / viewport `@media (max-width: 640px)`.
- **Files touched**: `pages/index.vue`, `components/AboutPhoto.vue`
- **Verification**: `npm run generate` builds and prerenders successfully; lint + typecheck clean for both files.

## 2026-08-09 — About section fixes + consistent homepage section spacing

- **Summary**:
  - **Fixed desktop at 100% scale**: the previous `@container` rule applied `display:flex` to the element that was *itself* the size container (self-referential container query — ignored by browsers). Restructured to `.about-container` (container only) wrapping `.about-row` (which receives the query styles), so `display:flex`/gap now actually apply on wide containers.
  - **Smaller mobile image / legible wrap**: narrow containers now use `width: min(40%, 140px)` (was `min(56%, 260px)` → 183px leaving ~121px orphan columns). Added a tablet tier (`min(48%, 230px)` for 512–768px containers). Measured via headless CDP: 375px viewport → 131px image with ~177px wrap column; 1440px → proper 340px image + 612px right column.
  - **Section spacing**: standardized homepage sections from `py-20` (80px ×2 → 161px gaps) to consistent `py-12 md:py-14` (48/56px); About→Outside gap now 112px with the divider. Verified computed paddings via headless Edge.
- **Files touched**: `pages/index.vue`, `components/AboutPhoto.vue`
- **Verification**: `npm run generate`, lint, and typecheck pass (only pre-existing `SiteHeader.vue` lint + `GalleryGrid.vue` typecheck noise remains).

## 2026-08-10 01:08 UTC — Scroll-reveal hardening: pages can never load blank

- **Summary**:
  - **Root cause**: every `.reveal` element shipped with `opacity: 0` baked into the SSR'd HTML (`assets/main.scss`), so the photography page (and any section using `v-reveal`) was fully invisible until client hydration completed and IntersectionObserver fired. On a heavy page (photography: 45 images + carousel + lightbox) hydration lag or a missed observer callback could leave the page visually blank ("it comes back blank").
  - **Fix**: content is now **visible by default**. `.reveal` no longer hides anything; the client plugin (`plugins/reveal.ts`) adds `.reveal-ready` *after* hydration succeeds, then animates to `.revealed` via IntersectionObserver. If JS is slow, missing, or IO breaks, the page simply stays visible — no blank, ever.
  - Added a `window` `load` safety net: if the observer never fires, elements reveal on load.
  - Verified generated SSR: elements carry only `class="reveal"`, CSS bundle contains the new `.reveal.reveal-ready` / `.reveal.reveal-ready.revealed` rules, and the photography page prerenders its full 45-image grid.
- **Files touched**: `assets/main.scss`, `plugins/reveal.ts`
- **Verification**: `npm run generate` passes (16 routes); `eslint plugins/reveal.ts` clean; `vue-tsc` clean for touched files (only pre-existing `GalleryGrid.vue` TS7006 noise remains).
- **Note**: Extensive headless-Edge CDP debugging this session (dumppage/probe scripts in `%TEMP%\opencode`) confirmed the static output and dev server render `/photography` fully (h1 + 45 imgs + grid); the blank was purely client-side reveal timing, not content generation.

## 2026-08-10 01:40 UTC — REAL root cause of "blank until scroll/category click": reveal observer threshold

- **Summary**: Chrome CDP measurements showed the photography grid (`.reveal` element, ~7,200px tall for 45 images) **never revealed even when scrolled into view**. The `v-reveal` IntersectionObserver used `{ threshold: 0.1 }`, which requires 10% of the *element* to be visible. For a grid that tall that ratio can sit just under 0.1 (measured 0.067 / 0.097 / 0.04) at any realistic scroll position — within a 485px-tall viewport a 6,600px grid rarely exposes ≥10% — so the callback never fired and the grid stayed `opacity: 0` ("loads the moment I scroll to a good spot / click a category and the grid shrinks/re-mounts").
- **Fix**: `plugins/reveal.ts` — changed the observer to `{ threshold: 0 }`, i.e. reveal as soon as **any pixel** of the element enters the viewport. Verified in headless Chrome on both dev (`:3000`) and the static build (`:10002`): h1/p reveal instantly; the 45-image grid reveals on load; scrolling the homepage progressively reveals all 8 `.reveal` elements.
- **Files touched**: `plugins/reveal.ts`
- **Verification**: `npm run generate` passes; `eslint plugins/reveal.ts` clean; `vue-tsc` passes with zero errors.
- **Also fixed during debugging**: the temporary local static servers (`%TEMP%\opencode\serve*.mjs`) were sending `application/octet-stream` for extensionless routes (`/photography`, `/contact`) because MIME was derived from the URL path instead of the resolved file — a real MIME bug worth avoiding in any Netlify/static tooling, and why headless browsers refused to commit those navigations.

## 2026-08-10 02:05 UTC — Gallery: justified "Tetris" packed layout (no crop, no empty spots)

- **Summary**: Replaced the old variable-span CSS grid (`col-span-1`/`col-span-2`, which left empty cells when a landscape couldn't fit a 1-cell gap and pushed it to the next row) with a **justified / packed layout**:
  - `composables/useJustifiedLayout.ts` (new): loads natural dimensions of every image+video (cached per `src`), then packs them into rows that each fill the container width end-to-end. Aspect ratios are preserved exactly (nothing cropped/stretched). Wide panoramas get their own full-width row; the final short row is centered and capped at a normal tile height.
  - `components/gallery/GalleryGrid.vue` (rewritten): container width measured via `ResizeObserver` (rAF-throttled) and recomputed on resize/`images` change; renders packed rows as flex rows with exact pixel widths/heights. Emits the **original array index** per tile, so the lightbox still opens the right photo regardless of visual reordering. While dimensions/width are still unknown (SSR + first client frame), renders a clean uniform `aspect-[3/2]` placeholder grid so the static page still shows every image.
  - Deleted the old `span()`/`orientations`/`preload()` orientation machinery.
- **Files touched**: `composables/useJustifiedLayout.ts` (new), `components/gallery/GalleryGrid.vue`
- **Verification**: `npm run generate`, lint, and `vue-tsc` all pass. Headless Chrome (CDP) confirmed at 717px desktop: all 15/15 rows fill the container exactly (sub-pixel error ≤ 0.05px) with rendered ratio == natural ratio on every tile (no crop); mobile 390px and tablet 768px repack to the viewport with centered final rows; zero console errors. Note the Gallery previously needed image orientation → that whole `preload()`/`orientations` path is now gone, simplifying the component.

## 2026-08-11 01:41 UTC — Rename "Mixed Category" → "Miscellaneous" + tiered category weighting

- **Summary**: Renamed the fourth gallery category from `'Mixed Category'` to `Miscellaneous` for consistency: `public/photos/Mixed Category/` → `public/photos/Miscellaneous/` (git-detected rename, drag-and-drop catalog picks it up automatically), updated the `FUN` array in `useLandingSlideshow.ts` and the third group in `pages/photography.vue`.
- **Redesign**: Rebuilt `CategoryCarousel.vue` as a weighted two-tier chip menu with no visible labels, based on design theory — **Gestalt similarity** (primary chips share the mint accent family, secondary are neutral white → they read as one family), **proximity** (extra whitespace, no divider line, separates the secondary tier), **serial-position/primacy** (Events, Portraits first), **Fitts's law** (primary targets larger), and **figure-ground contrast** (size, weight, fill saturation, shadow). Active states stay unambiguous in both tiers: primary = solid accent fill, secondary = accent-tinted outline. `photography.vue` now derives `categoryOptions` marking group 0 (Events, Portraits) as `primary: true`.
- **Files touched**: `public/photos/Mixed Category/` (renamed → `Miscellaneous`), `composables/useLandingSlideshow.ts`, `pages/photography.vue`, `components/gallery/CategoryCarousel.vue`
- **Verification**: `npm run generate` passes (16 routes prerendered) — static output contains zero `"Mixed Category"` references and renders `Miscellaneous` in the SSR'd photography nav; `npm run typecheck` clean; eslint clean on all touched files (pre-existing SiteHeader indent errors untouched).

## 2026-08-10 02:15 UTC — Gallery: scale justified tiles +30% on tablet/desktop

- **Summary**: Increased the justified-layout target row height from `260px` to `338px` (`260 × 1.3`) for viewports ≥ 640px; mobile stays at `180px`. Because rows always stretch to fill the container width, every tile is ~30% larger with identical packing — no code-path changes, scales linearly.
- **Files touched**: `components/gallery/GalleryGrid.vue`
- **Verification**: `npm run generate`, lint, and `vue-tsc` pass. Headless Chrome at 1440/1024/768px: rows pack exactly (only the intentionally centered last row is short), row heights ~340–400px, rendered ratios still equal natural ratios, no console errors.

## 2026-08-10 01:15 UTC — Clear pre-existing GalleryGrid typecheck noise

- **Summary**: Explicitly typed the `watch` callback params in `GalleryGrid.vue` (`imgs: GalleryImage[]`, `img: GalleryImage`), eliminating the two pre-existing `TS7006` "implicitly any" errors that have been carried in `npm run typecheck` since the gallery rebuild.
- **Files touched**: `components/gallery/GalleryGrid.vue`
- **Verification**: `npm run typecheck` now passes with zero errors; `eslint` clean; `npm run generate` passes.

## 2026-07-29 — Chocobo pointer tracking fix + WebM support

- **Summary**: Rewrote chocobo cursor following to use `pointermove` (unified mouse+touch API) with direct DOM style updates via template ref — bypasses Vue reactivity entirely for smooth, reliable tracking. No more RAF lerp or CSS transition. Chocobo now follows cursor/tap exactly. Added `webm` to glob patterns in `useGallery.ts` and `useLandingSlideshow.ts`. Updated `GalleryGrid.vue`, `GalleryLightbox.vue`, `HeroSlideshow.vue`, and `pages/index.vue` to detect `.webm` files and render `<video>` elements (with autoplay/loop/muted/controls) instead of `<img>`. Videos in grid play on hover, in lightbox show controls.
- **Files touched**: `components/ui/FinalFantasyConstruction.vue`, `composables/useGallery.ts`, `composables/useLandingSlideshow.ts`, `components/gallery/GalleryGrid.vue`, `components/gallery/GalleryLightbox.vue`, `components/landing/HeroSlideshow.vue`, `pages/index.vue`

## 2026-07-29 — Wandering chocobo + puffin (replaced cursor tracking)

- **Summary**: Removed pointer tracking code entirely. Chocobo and a new puffin now wander autonomously using RAF-driven random target selection with pause behavior. Completely redesigned chocobo CSS for authentic Final Fantasy look: larger 80×65 body, 3 red crest plumes, bigger beak, wider legs, improved proportions. Added puffin with black body, white belly, colorful orange/yellow/blue triangular beak, orange feet. Both birds wander independently with random targets, pauses, and direction changes.
- **Files touched**: `components/ui/FinalFantasyConstruction.vue`

## 2026-08-12 00:37 UTC — Hero alternates solo/pair modes on every cycle

- **Summary**: The landing hero now deliberately alternates between its two views on every `advanceHero()` (10s timer and click) on both desktop and mobile, instead of deriving the view from the randomly picked images' orientations — which is why mobile almost always fell back to solo Portraits.
  - `useLandingSlideshow.ts`: added `heroMode` (`'solo' | 'pair'`), toggled inside `advanceHero()`. Starts on **pair** (init value is `'solo'` so the synchronous first `advanceHero()` flip yields `'pair'`), then alternates pair → solo → pair.
  - `HeroSlideshow.vue`: new `mode` prop. `solo` renders `pair[0]` (Portraits) full-screen; `pair` always renders both images, arranged viewport-based — `flex-row` (side-by-side) on landscape viewports, `flex-col` (stacked) on portrait. Removed the old orientation-gating `layout` computed and its per-image `preload`/orientation machinery (image cache-warming already lives in the composable).
  - `pages/index.vue`: passes `:mode="heroMode"`.
- **Files touched**: `composables/useLandingSlideshow.ts`, `components/landing/HeroSlideshow.vue`, `pages/index.vue`
- **Verification**: `npm run lint`, `npm run typecheck`, and `npm run generate` pass. Headless Chrome (CDP) over the generated static output sampled three consecutive states: desktop 1440px → `pair(2 panels,row) → solo(1 panel) → pair(2 panels,row)`; mobile 390px → `pair(2 panels,column) → solo → pair(2 panels,column)`. Categories shown: `[Portraits, Events]` in pair, `[Portraits]` in solo.

## 2026-08-11 22:58 UTC — Banner date converted to Newfoundland time

- **Summary**: The dynamic site-update banner date now renders in **Newfoundland time** (`America/St_Johns`) instead of raw UTC, since Sharif is in the Newfoundland timezone (UTC−2:30 during 2026 summer / NDT). `useSiteUpdate.ts` now parses each changelog heading's UTC timestamp into a real `Date`, converts via `Intl.DateTimeFormat` with `timeZone: 'America/St_Johns'`, then formats the month/ordinal day/year from the converted parts. Date-only headings (no `HH:mm`) are treated as noon UTC so they never shift to the previous day. The banner therefore matches Sharif's local date (e.g. the `2026-08-12 00:37 UTC` entry renders as *August 11th* in Newfoundland).
- **Files touched**: `composables/useSiteUpdate.ts`
- **Verification**: `npm run lint`, `npm run typecheck`, and `npm run generate` pass; prerendered HTML shows `Site Update (August 11th, 2026)`.

## 2026-08-11 22:53 UTC — Remove header easter egg (secret button)

- **Summary**: Removed the `UiSecretButton variant="header"` from `SiteHeader.vue` — the egg (`mdi:egg-easter`) secret button that opened a Rick Astley overlay is gone from the header. The footer's separate easter egg button is untouched.
- **Files touched**: `components/layout/SiteHeader.vue`
- **Verification**: `npm run generate` passes (16 routes).

## 2026-08-11 02:12 UTC — Fix lightbox videos not auto-playing

- **Summary**: Gallery lightbox videos stopped auto-playing because the `<video>` element in `GalleryLightbox.vue` had `autoplay` but no `muted` — browsers block unmuted autoplay. Added `muted loop` alongside the existing `controls autoplay playsinline`. (The `></video>` → `/>` change was a harmless `eslint --fix` self-closing reformat; Vue compiles `<video />` identically to `<video></video>` and was not the cause.) Grid hover-play videos already had `muted loop` and were unaffected.
- **Files touched**: `components/gallery/GalleryLightbox.vue`
- **Verification**: `npm run lint`, `npm run typecheck`, and `npm run generate` all pass.

## 2026-08-11 02:05 UTC — Lint cleanup + dynamic site-update banner date

- **Summary**: Ran `npm run lint:fix` to clear all pre-existing ESLint failures (SiteHeader `vue/html-indent`, GalleryLightbox self-closing `<video>`, FinalFantasyConstruction attribute linebreaks, photography `attributes-order`). `npm run lint` and `npm run typecheck` now pass with zero errors.
- **Banner**: Replaced the hardcoded `Site Update (July 29th, 2026)` text in `components/layout/SiteHeader.vue` with a dynamic date from `composables/useSiteUpdate.ts`, which reads `docs/changelog.md` raw at build time and extracts the date of the most recent `##` entry (chronologically latest across all entries, not merely the last line). Banner renders as `Site Update (August 11th, 2026): Under construction. Thank you. — Sharif`. Every future changelog append + `npm run generate` updates the banner automatically.
- **Files touched**: `components/layout/SiteHeader.vue`, `composables/useSiteUpdate.ts` (new), plus lint-fix reformats in `components/gallery/GalleryGrid.vue`, `components/gallery/GalleryLightbox.vue`, `components/ui/FinalFantasyConstruction.vue`, `pages/photography.vue`.
- **Verification**: `npm run lint` and `npm run typecheck` clean; `npm run generate` passes (16 routes); prerendered HTML contains the dynamic `August 11th, 2026` banner date. Note: `public/photos/Vehicles/DSC00349.webp` appears moved to `public/photos/Portraits/DSC00349.webp` (untracked) in the worktree — not caused by this task, left untouched.
