# Green Generation Marketing Site

A bilingual (Arabic/English) marketing experience for **Green Generation (الجيل الأخضر)** built with Next.js 14, the App Router, Tailwind CSS, and `next-intl`. The site highlights the investment opportunity, founders, and impact pillars while respecting accessibility and performance best practices.

## Features

- 🇸🇦 **Route-based locales** (`/ar`, `/en`) powered by `next-intl`, with RTL direction handling
- 🎨 Custom Tailwind design system with brand tokens, glassmorphism cards, and dark mode support
- 🧭 Sticky navigation with language + theme toggles, animated hero, KPI counters, and interactive timeline
- 🧩 Five expansion pillars with shadcn/ui dialogs and bespoke SVG iconography
- 📊 Interactive "Use of Proceeds" table/chart (Recharts) with legend toggles + ROI mini-calculator
- ✉️ Accessible contact form validated with React Hook Form + Zod and EmailJS integration stub
- ✅ Unit tests (Jest + Testing Library) covering Use of Proceeds totals and key UI components
- 🚀 Ready for Vercel deployment, including OpenGraph images, sitemap, and robots.txt

## Getting started

```bash
npm install
npm run prepare # sets up Husky
```

Create a `.env.local` based on `.env.example` if you intend to connect to EmailJS.

### Development

```bash
npm run dev
```

The app starts at `http://localhost:3000`. Visit `/ar` (default, RTL) or `/en` (LTR).

### Type checking & linting

```bash
npm run type-check
npm run lint
```

### Tests

```bash
npm test
```

### Formatting

```bash
npm run format:write
```

### Seed validation

```bash
npm run seed
```

Validates that the "Use of Proceeds" dataset totals 100% for both locales.

### Production build

```bash
npm run build
npm start
```

## Deployment

The project is configured for Vercel:

- App Router + edge-ready middleware for locale detection
- Route-based metadata with OpenGraph images under `/public/og/`
- `sitemap.ts` and `robots.txt` route for SEO
- Environment variables declared via `.env.example`

After pushing to a Git repository connected to Vercel, the default build command (`npm run build`) and output should deploy without extra steps.

## Project structure

```
app/                 # App Router routes per locale
components/          # Layout, UI, and section components
content/             # Localized JSON content
icons/               # SVG iconography for pillars
lib/                 # Utilities, fonts, email stub, i18n helpers
public/              # Logo + OpenGraph assets
scripts/             # Seed validation script
styles/              # Global Tailwind styles
tests/               # Jest + Testing Library specs
```

## Accessibility & performance

- Semantic landmarks, skip-to-content link, and focus-visible styling
- WCAG AA color contrast via curated palette
- Animations honor `prefers-reduced-motion`
- Lazy-loaded charts and Framer Motion transitions with gentle spring parameters
- RTL-aware styling using CSS logical properties via `tailwindcss-rtl`

---

© 2025 Green Generation. All rights reserved.
