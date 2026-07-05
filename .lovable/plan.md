## Mobile responsiveness fixes

### Issues seen in screenshots
1. **Popular Diagnostic Tests carousel (Home)** — cards render extremely narrow on mobile with text cropped ("P H O P", "Fas..BC Blood..&Suga..ESR"). Root cause: slide track uses `translateX(-${testSlide * (100/3)}%)` regardless of viewport, but child slides are `w-full sm:w-1/2 lg:w-1/3`. On mobile each slide is 100% wide, so a 33% translate squeezes 3 cards into the viewport with clipped content.
2. **Hero title (Home)** — "Diagnostic Centre in Gurgaon You Can Trust" breaks awkwardly across 3 lines on mobile because of a hard `<br/>` / flex layout not intended for narrow widths.
3. **General polish** — verify padding, section spacing, and card content on small screens across all pages.

### Fixes

**A. Diagnostic Tests carousel — `src/pages/Index.tsx`**
- Make `testSlide` step responsive: compute per-view count (1 mobile / 2 tablet / 3 desktop) via a `useEffect` + `matchMedia` (or a `visibleCount` state driven by `window.innerWidth`).
- Translate by `100 / visibleCount` and set each slide width to `100 / visibleCount %` inline, replacing the fixed `w-full sm:w-1/2 lg:w-1/3`.
- Clamp `testSlide` when viewport changes so we never scroll past the last group.
- Same fix pattern applied to any other identical carousel on the page if present (testimonials/tests).

**B. Homepage hero title — `src/pages/Index.tsx`**
- Adjust the hero H1/H2 stack so on mobile it reads as a single clean block: reduce font size at `<sm` (`text-3xl` instead of `text-4xl`), remove forced line breaks on mobile (`<br className="hidden md:block" />`), tighten `leading` and allow natural wrap.

**C. Sweep other pages for the same class of issue**
- Re-check `HealthCheckups.tsx`, `Pathology.tsx`, `Radiology.tsx`, `Corporate.tsx`, `AboutUs.tsx`, `ContactUs.tsx` for:
  - Fixed-percent translate carousels → apply same responsive fix.
  - Multi-column grids that stay multi-col on mobile → ensure `grid-cols-1` base.
  - Cards with `min-w`/fixed widths clipping text → switch to `w-full` on mobile.
  - Horizontal flex rows without `flex-wrap` that overflow.

**D. Verification**
- After edits, run a Playwright pass at 390×844 (iPhone) and 768×1024 (tablet), screenshot Home, Health Checkups, Pathology, Radiology, About, Contact, Corporate. Confirm no text clipping, no horizontal scroll, hero readable.

### Out of scope
- No content/copy changes, no redesigns, no desktop layout changes beyond what's needed to keep parity.
