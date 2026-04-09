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
  - `landing/` — Landing page sections (HeroSection, StatsBar, FeaturedWork, QuickLinks)
  - `skills/` — 3D skills scene and fallback components
  - `experience/` — Experience timeline components
  - Custom: NavBar, Footer, ProjectCard, ResumeButton, ThemeToggle
- `constants/` — All static data (projects, experience entries, skills). No API/database.
- `types/` — TypeScript type definitions
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge) and `openLink()`
- `hooks/` — Custom React hooks
- `public/images/` — Static image assets

## Coding Standards

### SOLID Principles
- **Single Responsibility**: Each component does one thing. Pages compose components; components don't own unrelated logic.
- **Open/Closed**: Use props, composition, and render patterns to extend behavior — don't modify existing components to add unrelated features.
- **Liskov Substitution**: Shared component interfaces (e.g., card variants) must be interchangeable via consistent prop contracts.
- **Interface Segregation**: Component props should be minimal and focused. Don't pass large objects when only a few fields are needed — destructure at the boundary.
- **Dependency Inversion**: Components depend on abstractions (types, interfaces) not concrete implementations. Data flows through props/context, not direct imports of side-effectful modules.

### DRY
- Extract shared animation configs, glassmorphism styles, and scroll-triggered wrappers into reusable utilities/hooks.
- Avoid copy-pasting framer-motion boilerplate across components.
- Shared constants and types live in `constants/` and `types/` respectively.

### React Best Practices
- Server components by default; add `"use client"` only when hooks/interactivity are needed.
- Memoize expensive computations with `useMemo`; memoize callbacks with `useCallback` only when passed as props to memoized children.
- Colocate state as close to where it's used as possible.
- Prefer composition over inheritance.
- Use custom hooks to extract reusable stateful logic.
- Keep components under ~150 lines; split if larger.

### TypeScript
- All props must be typed. Prefer `interface` for component props, `type` for unions/intersections. No `any`.

### Naming
- PascalCase for components, camelCase for hooks/utils, UPPER_SNAKE for constants.

## Conventions

- **TypeScript strict mode** enabled
- **Path alias**: `@/*` maps to project root
- **Styling**: Tailwind CSS with CSS variables (HSL). Dark mode via `next-themes` (class-based).
- **Components**: Pages are server components by default; add `"use client"` only when needed
- **Shadcn/UI**: New York style, Zinc base color, RSC enabled. Config in `components.json`.
- **Icons**: Use `lucide-react`
- **Fonts**: Geist Sans (default) and Geist Mono (monospace), loaded locally in `app/fonts/`
- **Animations**: Use framer-motion for scroll/interaction animations. CSS keyframes for perpetual background effects.
- **3D**: Use @react-three/fiber + @react-three/drei for Three.js scenes. Always dynamic import with `ssr: false`.

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

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
