# TODOS

## Content

## Infrastructure

### Pin devicon CDN to an exact version

**What:** Change the devicon URLs in `constants/about/index.ts` from `devicon@latest` to a pinned version (or vendor the 14 SVGs into `public/images`).

**Why:** A mutable `@latest` tag means jsdelivr or the upstream repo can silently change image content, and every visitor's IP goes to a third-party CDN. Flagged by the v1.0.0.0 security review (pre-existing pattern, deferred).

**Context:** The inventory grid on /skills and the skill cards both resolve icons through `constants/about`. Pinning is a one-line URL change per icon; vendoring removes the CDN dependency entirely.

**Effort:** S
**Priority:** P3
**Depends on:** None

### Prune unused shadcn/ui components and their dependencies

**What:** Remove the ~46 unreferenced `components/ui/*` files and their orphaned packages (`@radix-ui/*`, `react-hook-form`, `zod`, `recharts`, `embla-carousel-react`, `cmdk`, `vaul`, `date-fns`, etc.), or document why they're kept.

**Why:** After the v1.0.0.0 redesign nothing outside `components/ui/` imports them; they add install weight and dependabot noise. Flagged by the maintainability review (kept for now since shadcn components are project tooling that may return).

**Context:** Verify with `grep -r "components/ui" app components hooks lib` before deleting. `hooks/use-toast.ts` and `hooks/use-mobile.tsx` go with them.

**Effort:** M
**Priority:** P3
**Depends on:** Decision on whether shadcn stays in the toolkit

### Add Playwright for E2E coverage of the voyage route

**What:** Add a small Playwright suite covering the one untestable-in-jsdom path: the scroll-driven ship following the SVG route on /experience, plus a smoke pass over the 7 pages.

**Why:** `VoyageRoute` uses SVG geometry APIs (`getPointAtLength`) that jsdom doesn't implement — it's the only logic path with no unit test (92% path coverage otherwise). Flagged by the v1.0.0.0 coverage audit.

**Context:** `TESTING.md` already names Playwright as the intended E2E layer. CI workflow exists at `.github/workflows/test.yml`.

**Effort:** M
**Priority:** P3
**Depends on:** None

## Completed

### Replace wanted-poster mug placeholders

**What:** The striped placeholder frames on the experience page's wanted posters were replaced with engraved straw-hat jolly-roger crew marks from the updated design handoff (`components/voyage/CrewMark.tsx`). The captain's portrait on /about uses `public/images/profile-portrait.png`.

**Completed:** v1.0.0.0 (2026-06-10)
