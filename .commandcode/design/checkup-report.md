# ChronoShow Design Checkup

**Date:** 2026-06-30 · **Score:** 45/60 · **Status:** Watch

---

## Vitals

| Vital          | Status  | Score |
| -------------- | ------- | ----- |
| Intentionality | Watch   | 5/10  |
| Readability    | Healthy | 10/10 |
| Usability      | Watch   | 5/10  |
| Responsiveness | Healthy | 10/10 |
| Speed          | Healthy | 10/10 |
| Accessibility  | Watch   | 5/10  |

---

## Intentionality — Watch (5/10)

**What works:** Dark header/footer framing, serif headings, gold accent on hero, font-mono for prices, rounded-xl product cards. The premium boutique direction is clear.

**What needs work:**

- Inconsistent accent labels — "Collection" and "Just Landed" use `text-gold` but "Curated" under Featured Products uses `text-primary` (navy). Pick gold for all section eyebrow labels or navy — not a mix.
- Category cards use `group-hover:text-primary` (blue navy) instead of gold. This is a shadcn leftover.
- "View All" links are generic ghost buttons. They don't feel authored.
- The homepage hero hardcodes "Timeless Elegance on Your Wrist" — the `siteConfig.tagline` is ignored when the catalog has products. Design.md calls for the hero to use the real tagline.

---

## Readability — Healthy (10/10)

**Solid.** Playfair Display headings with proper weight contrast. Inter body at comfortable sizes. JetBrains Mono for all price displays — consistent throughout product cards, cart, and product detail. Line heights and measure look correct. Dark header/footer contrasts are strong. The typography system is coherent from a single source of truth.

---

## Usability — Watch (5/10)

**What works:** WhatsApp CTA is prominent. Navigation is clear. Mobile nav bar has proper touch targets. Cart icon and search are reachable.

**Issues:**

- Theme toggle shows an empty `<span>` during SSR hydration because of the `mounted` check. Users see a blank button briefly.
- Hamburger menu trigger (`<SheetTrigger>`) has no `aria-label`. It renders as a plain `<button>` with only an SVG inside.
- Search input in header overlay mode has no visible `<label>`. The placeholder "Search watches..." is the only visual cue.
- The header search icon color (`text-slate-300` on `bg-slate-900`) passes contrast at ~3.5:1 for large icons but is borderline for the 5px stroke width.

---

## Responsiveness — Healthy (10/10)

**Solid execution.** Mobile-first grids throughout. Header: hamburger on mobile, horizontal nav at lg. Product grids: 2→3→4 columns. Footer: 2→4 columns. Mobile bottom nav only appears below md. Touch targets ≥44px (h-16 header, h-14 mobile nav, h-12 buttons). `section-padding` utility adjusts by breakpoint.

---

## Speed — Healthy (10/10)

**Strong.** `next build` completes 32 routes in ~10s. Proper Suspense boundaries with `ProductCardSkeleton`. Images use Next.js `Image` with `sizes` attribute. No layout shift observed in rendered HTML. Lazy loading on below-fold content.

---

## Accessibility — Watch (5/10)

**What works:** Reduced motion media query respects `prefers-reduced-motion`. Focus rings via `--ring` token are configured. Proper alt text on product images. ARIA live region for cart count updates.

**What needs work:**

- No skip-to-content link. Keyboard users must tab through the entire header on every page.
- Hamburger menu trigger has no `aria-label`. Screen readers get "button" with no context.
- Theme toggle SSR hydration causes visible flash of unstyled content (empty span).
- Search input in overlay mode has no associated `<label>` — only placeholder text.
- Footer headings are `<h4>` without preceding `<h2>`/`<h3>`. This is a heading-level skip.

---

## Prescriptions

1. **Add aria-label to hamburger**, e.g. `aria-label="Open navigation menu"`
2. **Fix theme toggle SSR flash** — render a `<Sun>` or `<Moon>` icon by default instead of empty `<span>`
3. **Make section eyebrow labels consistent** — all gold or all navy, not a mix
4. **Add skip-to-content link** — standard pattern: visually hidden link at top of layout, becomes visible on focus
5. **Add label to search input** — `aria-label` or `<VisuallyHidden>` label

---

**Next:** Run `/design deslop` to remove generic shadcn leftovers, or `/design finish` for a pre-ship polish pass.
