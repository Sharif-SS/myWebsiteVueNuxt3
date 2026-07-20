# Brand Guide — Sharif Sircar Photography

> This is a living document. Update it as design decisions are finalized during the migration.

## Tone

- Professional, warm, confident.
- Focus on authentic visual storytelling.
- Not corporate-boring; not juvenile/"game UI."

## Typography

- **Placeholder font**: Inter (currently set in legacy `assets/main.scss`).
- **Target**: Neutral serif (to be chosen later).
- Keep consistent across all headings, body text, and UI elements.

## Colors

Warm palette derived from legacy `utils/tw-colors.ts` and `utils/themes.ts`. To be finalized during rebuild.

| Token | Legacy Value | Notes |
|---|---|---|
| Primary accent | `#D8FBFD` (light teal) | Used for buttons, borders, hover states |
| Background | `#FFFFFF` | Page background |
| Surface | `#F8EDEB` (warm blush) | Cards, sheets, app bar |
| Text | `#000000` | Primary text |
| Error | Red (from Tailwind `red.500`) | Validation, dividers |

## Puffin Logo

- **Usage**: Subtle identity marker. Used as site logo and favicon.
- **Do NOT** make it a primary visual motif or repeat it excessively.
- **Files**: `/puffin.png`, `/puffin.svg`, `/puffinS.png`, `/puffinv2.png` (in `public/`).
- The SVG variant is preferred for the rebuild (scalable, smaller).

## Custom Cursor

- **Asset**: `/pointer.png`.
- Applied via `.global-cursor` class on `#app`.
- **Kept in rebuild.** Re-implement with GPU-accelerated CSS if a clear improvement exists; confirm visual match before finalizing.

## Glow Animation

- Defined in legacy `assets/main.scss`.
- Used on mobile nav toggle button.
- **Kept in rebuild.** Ported to new SCSS file alongside Tailwind.
