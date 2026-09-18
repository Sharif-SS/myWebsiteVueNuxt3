# Brand Guide — Sharif Sircar Photography

> This is a living document. Update it as design decisions evolve.

## Tone

- Professional, warm, confident.
- Focus on authentic visual storytelling.
- Not corporate-boring; not juvenile/"game UI."

## Typography

- **Primary**: Noto Sans (set in `tailwind.config.mjs` as `fontFamily.sans`, loaded via Google Fonts in `nuxt.config.ts`). This is the site-wide default and was intentionally adopted over the earlier Inter placeholder (see changelog 2026-07-21).
- Applied consistently across all headings, body text, and UI elements via Tailwind.
- **Scale**: use Tailwind's default type scale (`text-sm`/`text-base`/`text-lg`/`text-xl`/`text-2xl`+) — no arbitrary pixel font sizes.
- **Line length**: body copy wraps at roughly 60–75 characters per line (`max-w-prose`, `max-w-md`, or `max-w-lg`).

## Colors

Warm palette defined in `tailwind.config.mjs`.

| Token | Value | Usage |
|---|---|---|
| `accent` | `#D8FBFD` (light teal) | Buttons, borders, hover states, form focus rings — decorative/interactive only, not text |
| `surface` | `#F8EDEB` (warm blush) | Legacy reference — no longer actively used |
| `warm` | 50–900 scale | Reserved for future use — no hex values defined; do not invent values |
| `teal` | light / DEFAULT / dark | Reserved for future use — no hex values defined beyond `accent`; do not invent values |
| Background | `#FFFFFF` | Page background |
| Text | `#000000` (gray-900) | Primary text, headings |

**Contrast (WCAG 2.1 AA)**: text needs a minimum 4.5:1 ratio against its background (3:1 for large text). `accent` measures ~1.1:1 on white and must never be used as a text color at any size. `gray-900`/black on white measures ~17.7–21:1 and is the safe default for all text.

**Distribution (60-30-10 rule)**: 60% white background, 30% gray-900/black text and neutral grays (borders, dividers), 10% `accent` for buttons, active states, focus rings, and small interactive icons only — never a large fill or section background.

### Shadows

Soft, low-opacity black shadows for a floating card feel (defined in `tailwind.config.mjs`):

| Token | Value |
|---|---|
| `float` | `0 12px 32px -8px rgb(0 0 0 / 0.12), 0 4px 12px -4px rgb(0 0 0 / 0.06)` |
| `float-lg` | `0 24px 48px -12px rgb(0 0 0 / 0.16), 0 8px 20px -8px rgb(0 0 0 / 0.08)` |

- `float` is the resting card shadow (testimonials, gallery tiles, about photo, contact cards, fun cards).
- `float-lg` is the hover/deeper elevation for interactive cards (paired with a gentle `-translate-y-1` lift).

## Logo

- **Primary**: `/puffin.svg` (scalable SVG in `public/`).
- **Favicon**: `/favicon.ico` (linked in `nuxt.config.ts` `app.head.link`).
- Usage: subtle identity marker in `SiteHeader.vue`. Do NOT make it a primary visual motif.

## Layout & Navigation

- **Header**: Glassmorphism bar (`bg-white/80 backdrop-blur-md`), fixed top. Contains puffin logo + two-line lockup ("Sharif Sircar" / "Photography & Hosting"), nav links, hamburger on mobile, glow secret button.
- **Nav drawer**: Mobile-only `SiteNav.vue` — teleported slide-down overlay.
- **Footer**: Static bar with copyright, LinkedIn, Instagram, easter egg button.
- **Main content**: `flex flex-col min-h-screen` with `pt-[50px]` to clear fixed header.
- **Section rhythm**: consistent vertical padding per section (`py-16` to `py-20`) regardless of internal content height.
- **Content width**: cap section content at `max-w-7xl` with responsive horizontal padding (`px-4 sm:px-8`).

## Page Structure

| Route | Component | Purpose |
|---|---|---|
| `/` | `pages/index.vue` | Hero slideshow + about section + fun cards grid |
| `/photography` | `pages/photography.vue` | Category carousel + gallery grid + lightbox |
| `/contact` | `pages/contact.vue` | Netlify form (native HTML POST, honeypot) + social links |
| `/thank-you` | `pages/thank-you.vue` | Form success confirmation |

## Custom Cursor

- **Asset**: `/pointer.png` exists in `public/` but no longer applied globally.
- **Implementation**: `UiCursorFollower.vue` — lerped dot + ring, hidden by default (`opacity: 0`), activates on `a, button, [data-cursor-hover]` via `isHovering` ref. Disabled on touch devices (`(pointer: coarse)` media query).

## Animations

- **Glow animation**: Ported from legacy `assets/main.scss`. Applied to the header secret button via `.glow-effect` class.
- **Easter egg**: CSS-only egg cycle (breathe → crack → chip → glow) in `EasterEgg.vue`. Touch-only gold ripple pulse on mobile.
- **Lightbox**: `GalleryLightbox.vue` — teleported overlay, keyboard nav (Escape, ArrowLeft/Right), image counter.
- **Landing slideshow**: Auto-advances every 30s. Orientation-aware layout (split or single). Gradient caption overlays on hover.
- **About photo**: Subtle `box-shadow` (desktop `0 4px 20px`, mobile `0 3px 14px`).
- **Reduced motion**: all non-essential animation (carousels, glow, hover transitions) respects `prefers-reduced-motion` and falls back to instant state changes.

## Component Patterns

- **Cards** (testimonials, gallery items, etc.): white background, `border-gray-200` and subtle `shadow` for separation — no color-block backgrounds or borders outside the neutral/accent palette.
- **Interactive states**: hover, focus-visible, and active states use `accent` for rings/borders/low-opacity backgrounds — never as a solid large-area fill.
- **Aspect-ratio media**: components pairing a photo with a fixed-ratio content box (e.g., image + quote card) size both from one shared height or container, not independent fixed heights per side.

## Gallery Behavior

- **Category-first UI**: categories visible without opening a menu.
- **Image discovery**: `import.meta.glob` on `/public/photos/*/*.{jpg,jpeg,png,webp,gif}` — drag-and-drop, no manual registration.
- **Responsive grid**: CSS Grid with aspect-ratio handling, smooth breakpoints.
- **Lightbox**: Click opens large view with prev/next navigation.

## Tools & Conventions

- **CSS**: Tailwind CSS v3 (primary) + SCSS (cursor follower, glow effects, easter egg, about photo card).
- **Icons**: `@nuxt/icon` module (Iconify sets), `mdi:` prefix.
- **Forms**: VeeValidate + Zod for validation, native HTML POST for Netlify.
- **Analytics**: `nuxt-gtag` with ID `G-6VSTRJ3QLM`.
- **Lint**: ESLint via `@nuxt/eslint-config/flat` with stylistic and tooling rules.
- **Typecheck**: `vue-tsc --noEmit`.
- **Color additions**: any new color token is added to `tailwind.config.mjs` with an explicit hex value and documented usage rule (including a contrast check) before use — no inline arbitrary hex values (e.g., `bg-[#062f6b]`) in component files.

## Out of Scope

- Client portal, payment processing, booking system, IoT dashboards, authenticated sections.
