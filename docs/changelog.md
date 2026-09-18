# Changelog

## 2026-09-08 — Site-wide floating card shadows

- **Summary**: Raised card elevation site-wide for a consistent "floating" look using two new soft shadow tokens, with a hover lift/deepen on interactive cards.
- **Changes**:
  - `tailwind.config.mjs`: added `boxShadow.float` and `boxShadow.float-lg` (soft, layered, low-alpha black).
  - `pages/index.vue`: fun cards use `shadow-float hover:shadow-float-lg` plus a scoped `:hover` `translateY(-6px)` (with `!important` to override the reveal animation's `transform` and a snappy, un-staggered transition).
  - `components/TestimonialCard.vue`: quote card `shadow-sm` → `shadow-float`.
  - `components/AboutPhoto.vue`: SCSS `box-shadow` updated to the `float` values (lighter on mobile).
  - `pages/contact.vue`: contact photo and form card `shadow-lg` → `shadow-float`.
  - `components/gallery/GalleryGrid.vue`: gallery tiles now have `shadow-float` + `hover:-translate-y-1 hover:shadow-float-lg` with a `transition-all` (both placeholder and packed tiles).
  - `docs/brand-guide.md`: documented the two shadow tokens.
- **Files touched**: `tailwind.config.mjs`, `pages/index.vue`, `components/TestimonialCard.vue`, `components/AboutPhoto.vue`, `pages/contact.vue`, `components/gallery/GalleryGrid.vue`, `docs/brand-guide.md`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (4/4), and `npm run generate` (16 routes) pass; prerendered HTML/CSS confirm `shadow-float`, `shadow-float-lg`, and the gallery `-translate-y-1` hover utilities are compiled.

## 2026-09-08 — Testimonial cards: 20px spacing + site-consistent rounding

- **Summary**: Replaced the per-slide horizontal padding with a real 20px track gap, fixed the resulting stride measurement, allowed the quote box to shrink so cards no longer overlap ("squeezed"), and rounded the cards to `rounded-xl` to match the rest of the site.
- **Changes**:
  - `components/TestimonialSection.vue`: track is now `flex gap-5` (20px between cards); slides drop `px-2.5`; `measureSlide` now derives the stride from the difference between the first two slides' `getBoundingClientRect().left` so navigation accounts for the gap and still steps one full card.
  - `components/TestimonialCard.vue`: image/quote boxes use `rounded-xl` (outer corners only — `rounded-t-xl`/`sm:rounded-l-xl` and `rounded-b-xl`/`sm:rounded-r-xl`); removed `sm:shrink-0` from the quote box so it shrinks to fit its slide instead of overflowing into the neighbouring card.
- **Files touched**: `components/TestimonialSection.vue`, `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (4/4), and `npm run generate` (16 routes) pass; prerendered HTML confirms `flex gap-5`, `rounded-xl`, and no `px-*` slide padding.

## 2026-09-08 — Testimonial section: remove intro copy, widen card gutters

- **Summary**: Removed the intro paragraph under the "What people are saying" heading and increased the per-card horizontal gutter from 8px to 10px.
- **Files touched**: `components/TestimonialSection.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (4/4), and `npm run generate` (16 routes) pass. Prerendered HTML confirms the intro copy is gone and `px-2.5` is applied to the slides.

## 2026-09-08 — Testimonial section: straddling badge, peek carousel, content-sized quote box

- **Summary**: Repositioned the section quote badge to straddle the About/testimonial boundary (removing its in-flow height), added a trailing peek to the carousel with an explicit tablet width, and made the quote box width intrinsic to content instead of a fixed 3:2 ratio.
- **Changes**:
  - `components/TestimonialSection.vue`: section is now `relative`; the 80px accent quote badge is absolutely positioned at `top-0 -translate-y-1/2` so it overlays the boundary between the About and testimonial sections (no in-flow height). Slide widths changed to `w-[85%] md:w-[90%] lg:w-[45%]` for a 10–15% peek at each breakpoint (1-up mobile/tablet, 2-up desktop); no change to `offsetX`/`measureSlide`/`itemsPerView`.
  - `components/TestimonialCard.vue`: quote box drops `aspect-[3/2]` + ratio-derived width in favor of `sm:min-w-[280px] sm:max-w-[360px]` (intrinsic, not `flex-1` per "don't stretch"), removed `flex-1` from the quote content wrapper so attribution sits directly below the text, reduced `line-clamp-5` → `line-clamp-4`, and removed `sm:justify-center` for a flush-left peek. Image box unchanged.
- **Files touched**: `components/TestimonialSection.vue`, `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (4/4), and `npm run generate` (16 routes) pass.

## 2026-09-17 — Gallery optimizer: detect newly added photos regardless of file mtime

- **Summary**: Fixed `scripts/optimize-images.mjs` so newly added photos/videos in `public/photos/<category>/` are detected even when their modification timestamps are older than the manifest (which happens when files are copied into place and keep the source file's `LastWriteTime`). The staleness check now compares the on-disk file set against the manifest instead of relying on the single newest-mtime comparison alone.
- **Changes**:
  - `scripts/optimize-images.mjs`: replaced `newestSourceMtime()` with `listSourceEntries()`; `manifestOutdated()` now reads the existing manifest, builds the recorded `src` set, and triggers a rebuild when files are added/removed or any source is newer than the manifest.
- **Files touched**: `scripts/optimize-images.mjs`, `docs/changelog.md`
- **Verification**: `npm run optimize` regenerated a full gallery (448 files across 6 categories, 154 manifest entries — including `Pets/DSC00207 - Copy.webp` and `Pets/test-2.webm`); `npx eslint scripts/optimize-images.mjs` passes.

## 2026-09-08 — Testimonial section: gray tint + section-level quote marker

- **Summary**: Added section-to-section visual separation: the testimonial section background changed from pure white to `bg-gray-50`, and a large accent-filled circular quote-mark badge (80px, `#D8FBFD`) was added above the heading as a visual entry point. No off-brand colors introduced; all other approved fixes remain unchanged.
- **Files touched**: `components/TestimonialSection.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (4/4), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial section: brand-compliant rebuild (quote dedup, layout, colors)

- **Summary**: Rebuilt the testimonial section to match `docs/brand-guide.md` and fix the readability regressions: removed doubled quotation marks, moved the heading/intro to a full-width row, dropped the navy/blue color scheme for white + brand tokens, capped the carousel at 2-up desktop, and corrected the brand-guide typography reference.
- **Changes**:
  - `components/TestimonialCard.vue`: removed inline `&ldquo;/&rdquo;` so the quote renders once (the accent quote bubble is the sole glyph); quote → `text-gray-900` `text-base` `line-clamp-5`; bubble → `bg-accent text-gray-900`; card shadow → `shadow-sm`; shared height `sm:h-[clamp(220px,20vw,250px)]` with `sm:justify-center`; read-more recolored to neutral.
  - `components/TestimonialSection.vue`: section is now white with `overflow-visible` (no navy/banner overlays); heading + intro moved to a full-width row above the carousel; inner container `max-w-7xl px-4 py-16 sm:px-8 lg:py-20`; slides `w-full lg:w-1/2`; controls recolored to `border-gray-200`/`text-gray-900` with `hover:bg-accent` and `outline-gray-900` focus rings; dots inactive `gray-300`, active `accent`.
  - `composables/useTestimonials.ts`: restored responsive `itemsPerView` (2 at `lg`, 1 below) via a `1024px` media query, with `resolveItemsPerView` re-exported and index clamping re-added.
  - `docs/brand-guide.md`: corrected the stale "Inter" typography reference to Noto Sans (the site-wide default since 2026-07-21).
  - `composables/useTestimonials.test.ts`: added `resolveItemsPerView` coverage.
- **Files touched**: `components/TestimonialCard.vue`, `components/TestimonialSection.vue`, `composables/useTestimonials.ts`, `composables/useTestimonials.test.ts`, `docs/brand-guide.md`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (4/4), and `npm run generate` (16 routes) pass. Prerendered HTML confirms no `#062f6b`/`sky-*`/`blue-*` classes, a single (non-doubled) quote, and `w-full lg:w-1/2` slides.

## 2026-09-08 — Testimonial card: fluid aspect-ratio sizing, stacked mobile

- **Summary**: Sized both card boxes purely by aspect ratio from one shared fluid height, and stacked them on mobile for readability.
- **Changes**:
  - `components/TestimonialCard.vue`: article height is now a single fluid `clamp(200px,22vw,300px)`; removed all per-breakpoint fixed heights and `flex-basis` widths. Image box is `aspect-[4/5]` and quote box is `aspect-[3/2]`, each `h-full w-auto` on `sm+` (width derived from the shared height), and full-width stacked (`flex-col`) below `sm`.
  - `composables/useTestimonials.ts`: removed responsive items-per-view logic — the card is intrinsically wide and only fits one per view, so `itemsPerView` is a constant `1`.
  - `components/TestimonialSection.vue`: slides are `w-full` (one card per view) and the mobile cue now reads "Showing testimonial X of Y".
  - `composables/useTestimonials.test.ts`: removed obsolete breakpoint tests.
- **Files touched**: `components/TestimonialCard.vue`, `composables/useTestimonials.ts`, `components/TestimonialSection.vue`, `composables/useTestimonials.test.ts`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (2/2), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial card: unified equal-height image/quote boxes

- **Summary**: Reworked `TestimonialCard.vue` so the image and quote boxes share one fixed height and read as a single fused card instead of two independently sized boxes.
- **Changes**: Removed `basis-2/5`/`basis-3/5`; the article now has a single fixed height per breakpoint (`240px`/`260px`/`280px`/`300px`), both boxes use `h-full`, the image box derives its width from `aspect-[4/5]` with `w-auto`, and the quote box fills the remaining space with `flex-1`. Removed `overflow-hidden` from the quote box and added top headroom to the carousel viewport so the `-top-4` quote bubble is no longer clipped.
- **Files touched**: `components/TestimonialCard.vue`, `components/TestimonialSection.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial carousel: wider slides for the two-box card

- **Summary**: Fixed cramped testimonial slides by widening them to `w-full sm:w-1/2 lg:w-2/5` so the image (`basis-2/5`) and quote panel (`basis-3/5`) each get comfortable readable width.
- **Changes**:
  - `components/TestimonialSection.vue`: slide width changed from `w-1/2 md:w-1/2 lg:w-1/3` to `w-full sm:w-1/2 lg:w-2/5`; slide offset now measures the first slide's real rendered width instead of `viewportWidth / itemsPerView`, so fractional layouts translate correctly.
  - `composables/useTestimonials.ts`: `resolveItemsPerView` now returns 1 on mobile and 2 on `sm`/`lg` (breakpoint `md` query changed to `640px` to match `sm`), keeping dots/arrows/aria-hidden in sync with the new widths.
  - `composables/useTestimonials.test.ts`: updated breakpoint expectations.
- **Files touched**: `components/TestimonialSection.vue`, `composables/useTestimonials.ts`, `composables/useTestimonials.test.ts`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial cards: fixed responsive heights and five-line clamp

- **Summary**: Restored uniform card heights at `280px` mobile, `300px` small tablet, `330px` medium tablet, and `360px` desktop while retaining the side-by-side image/content layout.
- **Changes**: The image remains an independent `basis-2/5` 4:5 box; the quote panel fills the card at `basis-3/5`; quote text uses `line-clamp-5`; a `ResizeObserver` only reveals Read more when the unclipped quote actually exceeds five lines.
- **Files touched**: `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial card: independent image and content boxes

- **Summary**: Rebuilt `TestimonialCard.vue` as two adjacent flex items on larger screens: an independent 4:5 image box and an independent bordered/shadowed content box. Mobile stacks the boxes without introducing fixed heights.
- **Changes**: Removed all fixed pixel heights, changed desktop sizing to `basis-2/5` and `basis-3/5`, added `items-start`, and positioned the quote bubble relative to the content box at `-top-4 left-4`.
- **Files touched**: `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial cards: vertical 4:5 stack

- **Summary**: Restructured testimonial cards into the requested vertical layout: automatic content height, full-width 4:5 photo at the top, full-width content below, and a quote bubble positioned `-top-4 left-4` over the image/content seam.
- **Preserved**: Logo conditional rendering, read-more/read-less behavior, quote content, and name/title attribution block.
- **Files touched**: `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial cards: explicit responsive dimensions

- **Summary**: Replaced fluid card aspect sizing with explicit responsive heights so every visible card has identical dimensions regardless of carousel width or quote content.
- **Dimensions**: `330px` mobile, `380px` tablet, `433px` desktop. The image remains an independent exact 4:5 box on the left.
- **Files touched**: `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial cards: fixed 2:3 boxes and concise copy

- **Summary**: Matched the supplied card reference more closely by locking every testimonial card to a 2:3 aspect ratio while keeping the photo tile at a precise 4:5 ratio on the left.
- **Changes**:
  - `components/TestimonialCard.vue`: fixed card dimensions with `aspect-[2/3]`, image-left layout at all breakpoints, exact 4:5 photo tile, and no content-dependent card height changes.
  - `composables/useTestimonials.ts`: shortened Sarah and Jenny's mock quotes to 15 words or fewer; preserved Jessica's requested quote exactly.
- **Files touched**: `components/TestimonialCard.vue`, `composables/useTestimonials.ts`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial card: compact 4:5 editorial treatment

- **Summary**: Tuned testimonial cards toward the supplied reference: exact 4:5 photo tile, compact white quote panel, small overlapping quote badge, square corners, and crisp navy right/bottom edge.
- **Files touched**: `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial section recreated as editorial dark carousel

- **Summary**: Recreated the testimonial section around the supplied reference composition: dark blue photographic backdrop, editorial intro panel with oversized quote mark, white testimonial cards, left-side 4:5 hero image, and compact carousel controls.
- **Changes**:
  - `components/TestimonialSection.vue`: added layered `/banner.webp` backdrop, navy overlay, left intro panel, sky-blue quote mark, high-contrast controls, and preserved ARIA carousel/keyboard/swipe behavior.
  - `components/TestimonialCard.vue`: changed cards to the reference-inspired white treatment with a left-side image, 4:5 image box, circular quote marker, and tighter content hierarchy.
  - Mobile continues to show two cards simultaneously with an explicit swipe cue; desktop shows three cards.
- **Files touched**: `components/TestimonialSection.vue`, `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial carousel: two-up mobile and locked image boxes

- **Summary**: Updated the responsive testimonial layout so mobile shows two cards simultaneously, with an explicit swipe/arrows guidance cue. Hero imagery now uses a true 4:5 wrapper with an absolutely fitted `object-cover` image, making the aspect ratio part of the component's layout language and eliminating stretched backdrops.
- **Changes**:
  - `composables/useTestimonials.ts`: mobile visible count changed from 1 to 2; desktop remains 3-up and tablet remains 2-up.
  - `components/TestimonialCard.vue`: 4:5 aspect ratio moved from the image element to the wrapper; image now fills that exact box with `absolute inset-0`, independent of card/text height.
  - `components/TestimonialSection.vue`: mobile slides are 50% width and now show a live “Showing X–Y of Z · Swipe or use the arrows for more” cue.
  - `composables/useTestimonials.test.ts`: updated responsive breakpoint expectations.
- **Files touched**: `composables/useTestimonials.ts`, `components/TestimonialCard.vue`, `components/TestimonialSection.vue`, `composables/useTestimonials.test.ts`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), and `npm run generate` (16 routes) pass.

## 2026-09-08 — Testimonial section visual redesign

- **Summary**: Refined the testimonial section using editorial portfolio patterns: accent-tinted section backdrop, tighter card proportions, fixed 4:5 hero image boxes aligned to the top, wider copy column, deterministic quote truncation, and improved outcome-led testimonial copy.
- **Changes**:
  - `components/TestimonialCard.vue`: removed vertical centering that created excessive blank space, reduced the image column to 38% / expanded copy to 62%, added a compact minimum card height, preserved the 4:5 image box, and made read-more behavior data-driven for quotes longer than 180 characters.
  - `components/TestimonialSection.vue`: added concise supporting context and singular, descriptive navigation labels while retaining the required carousel semantics and accent backdrop.
  - `composables/useTestimonials.ts`: refined mock copy to specific outcomes and kept each quote within the 20–50 word target, including Jessica's Keyin College result.
- **Files touched**: `components/TestimonialCard.vue`, `components/TestimonialSection.vue`, `composables/useTestimonials.ts`, `docs/changelog.md`

## 2026-09-08 — Testimonial card: hero image left, text right (split layout)

- **Summary**: Restructured `TestimonialCard.vue` from a full-bleed top-image stack into a split layout: hero image on the left, logo + quote + attribution stacked on the right. Image occupies half the card on `sm:`+ (matches the half-width industry convention for testimonial cards), stacking vertically on mobile. Logo slot (conditional `logoUrl`) sits at the top of the text column, before the quote — as designed.
- **Files touched**: `components/TestimonialCard.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run test` (5/5), `npm run generate` all pass.

## 2026-09-08 00:58 UTC — Homepage testimonial section (responsive carousel)

- **Summary**: Added a responsive "What people are saying" testimonial section to the homepage, placed after the About section and before the "Outside of Events and Portraits" photo grid. Built as a WAI-ARIA carousel: 3 cards side-by-side on desktop (≥1024px), 2 on tablet (768–1023px), 1 swipeable on mobile (<768px). Manual navigation only (arrow buttons + dot indicators + swipe + keyboard) — no autoplay per owner decision.
- **Changes**:
  - `types/testimonial.ts` (new): `Testimonial` interface (`id`, nullable `logoUrl`, `quote`, `name`, `title`, `heroImageUrl`, `heroImageAlt`).
  - `composables/useTestimonials.ts` (new): typed mock array (3 entries, structured for a later `useFetch`/`useAsyncData` swap) plus carousel state — `itemsPerView` (via `matchMedia`), `currentIndex`, `maxIndex`, `next`/`prev`/`goTo`, index clamping on breakpoint change, and a `prefers-reduced-motion` flag.
  - `components/TestimonialCard.vue` (new): logo (conditional, no reserved space), quote, attribution, and a full-width `NuxtImg` hero image in a fixed `aspect-[4/3]` container; `h-full` flex column for equal row heights.
  - `components/TestimonialSection.vue` (new): heading, `role="region"`/`aria-roledescription="carousel"` region, translateX track (measured via `ResizeObserver`), per-slide `aria-roledescription="slide"` + `aria-hidden`, arrow/dot controls with `aria-current`, keyboard nav (arrows/Home/End), pointer-based swipe, and reduced-motion handling.
  - `pages/index.vue`: inserted `<TestimonialSection />`.
- **Files touched**: `types/testimonial.ts`, `composables/useTestimonials.ts`, `components/TestimonialCard.vue`, `components/TestimonialSection.vue`, `pages/index.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run generate` all pass (16 routes). Controls render only when testimonials exceed the visible count (desktop 3-up hides them; tablet/mobile show them). Hero images reuse existing `public/gallery/<category>/…@full.webp` assets with `loading="lazy"`.

## 2026-08-24 01:39 UTC — Hero "Next" control navigated instead of advancing on mobile

- **Summary**: On mobile the hero's "Next" pill (bottom-right, vertically centered) was a decorative `pointer-events-none` element. In portrait pair-mode the two panels stack vertically, so the pill overlapped the top panel's category `NuxtLink` (its bottom gradient band), and a tap fell through to that link and navigated to `/photography` instead of advancing. Also, the pill was hover-only (`opacity-0 group-hover:opacity-100`), so it was invisible on touch devices.
- **Changes**:
  - `components/landing/HeroSlideshow.vue`: turned the "Next" pill into a real `<button type="button" aria-label="Next photo">` with `pointer-events-auto` + `@click.stop="emit('next')"` so it advances and stops the tap from reaching the underlying category link. Added `pointer-coarse:opacity-100` to the hint wrapper so it's always visible on touch devices (still hover-only on desktop).
  - `tailwind.config.mjs`: added a tiny plugin registering `pointer-coarse` / `pointer-fine` variants (`@media (pointer: coarse/fine)`), since Tailwind 3.4 doesn't ship them natively.
- **Files touched**: `components/landing/HeroSlideshow.vue`, `tailwind.config.mjs`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run generate` all pass (16 routes); confirmed `@media(pointer:coarse){.pointer-coarse\:opacity-100{opacity:1}}` compiled into the inlined CSS. Headless-Chrome mobile emulation (390×844, touch/coarse): "Next" button visible, tapping it changes the hero image and keeps `location.pathname === '/'`, while tapping the category label still navigates to `/photography`.

## 2026-08-13 12:30 UTC — Hero slideshow: no repeats within last 3 images

- **Summary**: Replaced the per-category cycle model in `useLandingSlideshow.ts` with a shuffled queue + "last 3 played" memory. Previously the only guard was that a freshly reshuffled cycle couldn't *start* on the single last-emitted image — so an image from the end of one cycle could still repeat within a few slides at the start of the next (back-and-forth repeats). Now, if the next queued image matches any of the last 3 emitted for that category, it is pushed to the back of the queue and the next candidate is tried. Each queue is still a full shuffle of the category's images, so the slideshow plays through the entire list before any image can come back, and any repeat is spaced at least 3 other slides apart (except for pools smaller than the 3-image window, which doesn't apply to any current category — smallest is Pets at 8).
- **Changes**: `composables/useLandingSlideshow.ts` — removed `interface Cycle` + `newCycle`; added `RECENT_LIMIT = 3`; `nextAsset` now holds a `queues` map and a `recent` map per category, defers recent images to the tail, and tracks the last 3 emitted. Public API unchanged (`heroPair`, `heroMode`, `funSlides`, `advanceHero`, `advanceFun`).
- **Files touched**: `composables/useLandingSlideshow.ts`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run generate` all pass (16 routes). Isolated algorithm test (5000 draws) shows zero repeats within the last 3 for pool sizes ≥ 4 and full-list coverage. Headless-Chrome test drove 45 hero advances (crossing the 31-image Portraits cycle boundary twice): Portraits 45 emissions / 0 violations, Events 24 emissions / 0 violations, webm clips still appear in rotation.

## 2026-08-13 11:50 UTC — Restore webm autoplay on home + photography

- **Summary**: WebM clips (hero, fun slideshow, photography grid, lightbox) had stopped appearing/autoplaying. Two root causes: (1) `useLandingSlideshow.ts` filtered `.isVideo` assets out of the hero/fun slideshow pool, so home never showed videos; (2) photography grid `<video>` tiles were missing the `autoplay` attribute (only played on hover). Additionally the generated manifest was stale — `keyinbatch1.webm`/`keyinbatch2.webm` were added after the last `optimize` run, so they weren't in the catalog.
- **Changes**:
  - `composables/useLandingSlideshow.ts`: removed `.filter(a => !a.isVideo)` from `nextAsset` — hero and fun slideshows can now select videos again.
  - `components/gallery/GalleryGrid.vue`: added `autoplay` to both grid `<video>` elements (skeleton + packed rows); kept hover play/pause, `muted loop playsinline preload="metadata"`.
  - Regenerated `assets/gallery/manifest.json` via `npm run optimize` (128 entries, 6 categories) — Portraits now includes all 3 webm entries (`MCE Headshot - 2024.webm`, `keyinbatch1.webm`, `keyinbatch2.webm`) as `isVideo: true`.
- **Files touched**: `composables/useLandingSlideshow.ts`, `components/gallery/GalleryGrid.vue`, `assets/gallery/manifest.json` (gitignored, regenerated), `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run generate` all pass (16 routes). CDP browser check: photography → Portraits grid shows all 3 webm autoplaying (paused:false, looping, time advancing, zero console errors); home hero cycled `keyinbatch2.webm` into a panel playing within ~40s.

## 2026-08-12 01:50 UTC — Increase LQIP backdrop blur to 30px

- **Summary**: User requested stronger blur on the LQIP backdrops. Bumped all backdrop CSS `filter: blur` from `16px` to `30px` (still `brightness(0.5)`; hero/fun-card keep `scale(1.25)`). Pure CSS — no placeholder regeneration.
- **Files touched**: `components/landing/HeroSlideshow.vue`, `pages/index.vue`, `components/gallery/GalleryLightbox.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run generate` all pass (16 routes).

## 2026-08-12 01:45 UTC — Slightly increase LQIP backdrop blur

- **Summary**: Asked for a touch more blur on the LQIP backdrops (between the pre-pipeline heavy smudge and the current 12px soft-focus). Bumped all backdrop CSS `filter: blur` from `12px` to `16px` (still `brightness(0.5)`; hero/fun-card keep `scale(1.25)`). No placeholder regeneration needed — this is pure CSS.
- **Files touched**: `components/landing/HeroSlideshow.vue`, `pages/index.vue`, `components/gallery/GalleryLightbox.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run generate` all pass (16 routes).

## 2026-08-11 23:45 UTC — Soften LQIP backdrop blur to match old site

- **Summary**: The LQIP backdrop blurred far harder than the previous site. The old look (pre-optimization, commit `8dcce16`) was Tailwind `blur-lg` (16px CSS blur) + `brightness-50` + `scale-125` applied to a sharp full-res image; the new backdrop compounded a 64px placeholder (upscaled ~20×) + sharp's baked-in `.blur(8)` + another CSS `blur(8px)` → a heavy smudge. Fixed by increasing the generated placeholder to 192px and removing the generation-time sharp blur, then matching the old CSS recipe on all backdrops.
- **Changes**:
  - `scripts/optimize-images.mjs`: `PLACEHOLDER_WIDTH` 64→192; removed `.blur(8)` from both placeholder generations (animated-GIF + normal). Placeholders now ~3.9KB each (~438KB total for 117 images).
  - `components/landing/HeroSlideshow.vue`: backdrop filter `blur(8px)` → `blur(12px) brightness(0.5)` + `transform: scale(1.25)` (replicates old `scale-125`).
  - `pages/index.vue`: same fun-card backdrop change.
  - `components/gallery/GalleryLightbox.vue`: placeholder backdrop `blur(24px) brightness(0.4)` → `blur(12px) brightness(0.5)`.
- **Files touched**: `scripts/optimize-images.mjs`, `components/landing/HeroSlideshow.vue`, `pages/index.vue`, `components/gallery/GalleryLightbox.vue`, `docs/changelog.md`
- **Verification**: `npm run lint`, `npm run typecheck`, `npm run generate` all pass (16 routes). Prerendered HTML shows `blur(12px)` backdrops with `scale(1.25)`, and 117 placeholder files (~3.9KB each) deployed.

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
