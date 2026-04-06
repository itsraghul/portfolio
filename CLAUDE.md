# Portfolio — Conakry

Personal portfolio site for Raghul S. Built with Next.js 14, TypeScript, Tailwind CSS, and Shadcn/UI.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint (next/core-web-vitals + next/typescript)

## Project Structure

- `app/` — Next.js App Router pages (home, experience, projects, about, others)
- `components/` — React components
  - `ui/` — Shadcn/UI components (do not edit manually; use `npx shadcn@latest add <component>`)
  - Custom: NavBar, HomeIntro, Footer, ProjectCard, ResumeButton, ThemeToggle
- `constants/` — All static data (projects, experience entries, skills). No API/database.
- `types/` — TypeScript type definitions
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge) and `openLink()`
- `hooks/` — Custom React hooks
- `public/images/` — Static image assets

## Conventions

- **TypeScript strict mode** enabled
- **Path alias**: `@/*` maps to project root
- **Styling**: Tailwind CSS with CSS variables (HSL). Dark mode via `next-themes` (class-based).
- **Components**: Pages are server components by default; add `"use client"` only when needed
- **Shadcn/UI**: New York style, Zinc base color, RSC enabled. Config in `components.json`.
- **Icons**: Use `lucide-react`
- **Fonts**: Geist Sans (default) and Geist Mono (monospace), loaded locally in `app/fonts/`

## Adding Content

All portfolio data lives in `constants/`:
- `constants/index.ts` — Homepage info
- `constants/projects/index.ts` — Project entries
- `constants/experience/index.ts` — Work experience
- `constants/about/index.ts` — Skill cards

## Environment Variables

- `RESUME_LINK` — Path to resume file (used in about page)

## Deployment

Deployed on Vercel. Vercel Speed Insights integrated.
