# Brand Guide — Sharif Sircar Photography

> This is a living document. Update it as design decisions evolve.

## Tone

- Professional, warm, confident.
- Focus on authentic visual storytelling.
- Not corporate-boring; not juvenile/"game UI."

## Typography

- **Primary**: Inter (set in `tailwind.config.mjs` as `fontFamily.serif` — placeholder until a neutral serif is chosen).
- Applied consistently across all headings, body text, and UI elements via Tailwind.

## Colors

Warm palette defined in `tailwind.config.mjs`.

| Token | Value | Usage |
|---|---|---|
| `accent` | `#D8FBFD` (light teal) | Buttons, borders, hover states, form focus rings |
| `surface` | `#F8EDEB` (warm blush) | Legacy reference — no longer actively used |
| `warm` | 50–900 scale | Reserved for future use |
| `teal` | light / DEFAULT / dark | Reserved for future use |
| Background | `#FFFFFF` | Page background |
| Text | `#000000` (gray-900) | Primary text, headings |

## Logo

- **Primary**: `/puffin.svg` (scalable SVG in `public/`).
- **Favicon**: `/favicon.ico` (linked in `nuxt.config.ts` `app.head.link`).
- Usage: subtle identity marker in `SiteHeader.vue`. Do NOT make it a primary visual motif.

## Layout & Navigation

- **Header**: Glassmorphism bar (`bg-white/80 backdrop-blur-md`), fixed top. Contains puffin logo + two-line lockup ("Sharif Sircar" / "Photography & Hosting"), nav links, hamburger on mobile, glow secret button.
- **Nav drawer**: Mobile-only `SiteNav.vue` — teleported slide-down overlay.
- **Footer**: Static bar with copyright, LinkedIn, Instagram, easter egg button.
- **Main content**: `flex flex-col min-h-screen` with `pt-[50px]` to clear fixed header.

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

## Out of Scope

- Client portal, payment processing, booking system, IoT dashboards, authenticated sections.
