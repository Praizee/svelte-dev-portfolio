# Stephen Adeniji — Developer Portfolio

A production-grade, immersive developer portfolio built with SvelteKit. Deployed at [stephena.dev](https://stephena.dev).

---

## Setup

```bash
pnpm install
pnpm run dev        # http://localhost:5173
pnpm run build      # static output → build/
pnpm run preview    # preview the build locally
```

**Requirements:** Node 22+, pnpm 11+

---

## Architecture

```
src/
├── routes/
│   ├── +layout.svelte      # Root layout: Navbar, Footer, Terminal, OG meta, page transitions
│   ├── +layout.ts          # prerender = true, trailingSlash = never
│   ├── +page.svelte        # Homepage: Hero + Featured Projects + Skills + Contact
│   ├── +error.svelte       # 404 / error page
│   └── projects/
│       ├── +page.svelte    # /projects — filterable full grid
│       └── [slug]/
│           ├── +page.ts    # EntryGenerator (5 slugs) + load()
│           └── +page.svelte
└── lib/
    ├── data/projects.ts    # Single source of truth — Project type + 5 projects
    ├── stores/
    │   ├── theme.ts        # Dark/light toggle with localStorage + FOUC prevention
    │   └── terminal.ts     # Terminal open/history/navigation store
    ├── utils/
    │   ├── animations.ts   # GSAP helpers: revealFrom, animateBar, staggerReveal
    │   └── slugify.ts      # URL slug utility
    └── components/
        ├── layout/         # Navbar (scroll-aware), Footer, ThemeToggle
        ├── hero/           # Hero, HeroTitle (GSAP letters + typewriter), HeroBackground
        ├── projects/       # ProjectCard, ProjectGrid, ProjectFilter
        ├── skills/         # SkillsSection (tabbed + GSAP bars)
        ├── contact/        # ContactSection, ContactForm (Netlify Forms)
        ├── terminal/       # Terminal, TerminalLine, TerminalInput
        └── ui/             # SkipLink, ScrollReveal, SectionHeader, Badge, ImageLazy
```

All project detail pages (`/projects/[slug]`) are **statically prerendered** at build time via `EntryGenerator`. Slugs are authored directly in `projects.ts` — no runtime slug computation.

---

## Animation decisions

| Location | Tool | Rationale |
|---|---|---|
| Hero name letters | GSAP stagger + back.out ease | Per-character entrance feels premium without a library |
| Hero subtitle | setInterval typewriter | Pure JS, zero deps, readable delay model |
| Hero background | CSS @keyframes | No JS needed; GPU-composited transform only |
| Section reveals | GSAP + IntersectionObserver | ScrollReveal.svelte fires once on intersection, then unobserves |
| Skill bars | GSAP fromTo + ScrollTrigger | Width animation tied to scroll position, re-fires on tab switch |
| Project cards | CSS fadeSlideUp + stagger | Lightweight, degrades gracefully without JS |
| Page transitions | Svelte fly transition (keyed on pathname) | Native, no extra dep |
| Terminal open | Svelte fly + fade | Matches macOS window behaviour |
| Navbar hide/show | CSS transition-transform on scroll delta | Passive scroll listener, no layout thrash |

All GSAP code is **dynamically imported** (`await import('gsap')`) so it ships in its own chunk and does not block initial parse.

---

## Performance optimisation

- **adapter-static** — fully prerendered HTML, zero server cold starts
- **GSAP code-split** — `manualChunks` isolates GSAP into its own chunk via `vite.config.ts`
- **Native lazy loading** — `ImageLazy.svelte` uses `loading="lazy"` + `decoding="async"` with shimmer placeholder
- **prefers-reduced-motion** — all GSAP animations gated; CSS animations disabled globally via media query
- **Google Fonts** — loaded with `display=swap` and `<link rel="preconnect">` to minimise render blocking
- **Cache headers** — immutable hashed assets cached for 1 year in `netlify.toml`; images for 1 week
- **Passive scroll listeners** — Navbar scroll handler registered with `{ passive: true }`

---

## Accessibility considerations

- `SkipLink` is the first focusable element in the DOM, linking to `#main-content`
- All interactive elements use `focus-visible:outline` with `var(--color-accent)` ring
- `ProjectCard` anchor has descriptive `aria-label="View {title} project details"`
- `ProjectFilter` uses `role="group"`, `aria-label`, and `aria-pressed` per button
- Terminal overlay: `role="dialog"`, `aria-modal="true"`, `aria-label`, focus trapped
- Skill section: `role="tablist"` / `role="tab"` / `role="tabpanel"` with `aria-selected`
- Skill bars: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `ContactForm`: every field has `<label>`, `aria-required`, `aria-invalid`, `aria-describedby` pointing to inline error
- Background decorations are `aria-hidden="true"`
- `prefers-reduced-motion` disables all animations while keeping elements visible

---

## Trade-offs

**No SSR / serverless functions** — `adapter-static` means pure HTML/CSS/JS. The contact form uses Netlify Forms (detected at build time from the `data-netlify` attribute) so no API route is needed. Simple deployment, but no server-side validation.

**CSS custom properties over Tailwind tokens** — colours live in `--color-*` CSS variables so the dark-mode swap is instant (a single class toggle on `<html>`) with no hydration flash. Tailwind utilities reference these vars via the `@theme` block.

**Static slugs** — project slugs are hand-authored in `projects.ts` rather than computed from titles. URLs are stable across renames and the terminal `open <slug>` command maps 1:1 without any lookup logic.

**GSAP free tier** — ScrollTrigger is included in the free build. No paid plugins used.

---

## Before deploying

Add your real assets to `static/`:

- `resume-stephen-adeniji.pdf` — linked from the hero Resume button
- `images/projects/lloyd-autos/hero.webp`
- `images/projects/nomad-fitness/hero.webp`
- `images/projects/pursfi/hero.webp`
- `images/projects/ezzymeans/hero.webp`
- `images/projects/gradific/hero.webp`
- `og-image.png` — 1200×630 OG image for social sharing

---

## Deployment (Netlify)

1. Push to GitHub
2. Connect repo in the Netlify dashboard — `netlify.toml` handles build config automatically
3. Build command: `pnpm run build` · Publish directory: `build`
