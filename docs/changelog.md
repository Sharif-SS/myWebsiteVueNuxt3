# Changelog

## 2026-07-20 22:50 UTC — Migration kickoff

- **Summary**: Created `personal-site-v3.0` branch; documented full legacy inventory; drafted 7-phase migration plan (Tailwind CSS v4 + SCSS, no Vuetify, drag-and-drop gallery, Netlify forms preserved).
- **Files touched**: `AGENTS.md`, `docs/changelog.md`, `docs/brand-guide.md`, `docs/roadmap.md`, `docs/` (new directory)

## 2026-07-20 22:52 UTC — Phase 1: Tooling + cleanup

- **Summary**: Installed ESLint, vue-tsc, vitest, @vue/test-utils. Added lint/typecheck/test scripts to package.json. Added @nuxt/eslint module to nuxt.config.ts and created eslint.config.mjs + vitest.config.ts. Removed approved legacy files: pages/portfolio.vue, pages/doithackathon.vue, components/portfolio.vue, public/oldWebsite/.
- **Files touched**: `package.json`, `nuxt.config.ts`, `eslint.config.mjs`, `vitest.config.ts` (new), `pages/portfolio.vue` (deleted), `pages/doithackathon.vue` (deleted), `components/portfolio.vue` (deleted), `public/oldWebsite/` (deleted)
- **Verification**: `npm run generate` builds and prerenders successfully (/, /photography, /contact, /thank-you).
