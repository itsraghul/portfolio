# Portfolio — Conakry

Personal portfolio site for Raghul S. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The site is three themed "worlds": a sci-fi ship HUD (home, contact, terminal), a One Piece-style parchment world (experience, about), and a classic RPG world (projects, skills). A shared "bridge" nav re-skins itself per world.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint (next/core-web-vitals + next/typescript)
- `npm test` — Run Vitest suite (`npm run test:watch` for watch mode)

## Project Structure

- `app/` — Next.js App Router pages (home, experience, projects, skills, about, contact, terminal, others)
- `components/` — React components, one directory per world/page
  - `bridge/` — Cross-world chrome: BridgeNav (re-skinning nav), PageVeil (wipe transitions + `navigateWithVeil`), BridgeToaster, BridgeEffects (konami + hover sfx), WorldShell (`data-world` scope), HudPanel
  - `home/` — Ship HUD landing (Starfield, HeroPanel, StatRings, DestinationPorts)
  - `comms/` — Contact page (RadarHeader, ChannelCards, Composer)
  - `terminal/` — CRT shell (TerminalShell)
  - `voyage/` — Experience page (VoyageRoute ship-on-path, ChapterSection, WantedPoster)
  - `captains-log/` — About page (LogEntry)
  - `quests/` — Projects page (QuestLog, QuestList, QuestDetail, battle/)
  - `character/` — Skills page (HeroCard, AttributeBars, InventoryGrid)
  - `ui/` — Shadcn/UI components (do not edit manually; use `npx shadcn@latest add <component>`; currently unreferenced — see TODOS.md)
- `constants/` — All static data, including per-world themed copy. No API/database.
- `types/` — TypeScript type definitions (`worlds.ts` holds the world/quest/battle/inventory types)
- `lib/` — `utils.ts` (`cn()`, `starRating()`), `sfx.ts` (WebAudio synth singleton), `toast.ts` (bridge toast emitter)
- `hooks/` — Custom React hooks (use-battle, use-terminal, use-konami, use-in-view, use-count-up, use-typed-loop, use-clock, use-reduced-motion)
- `test/` — Vitest suite
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
- **Theming**: Per-world CSS variable blocks in `app/globals.css`, scoped by `[data-world]` on the page wrapper and `body:has([data-world])` for the fixed chrome. Each page roots itself in a `WorldShell`. The `--bridge-*` variables drive the nav/veil/toast skin. No light/dark toggle — worlds own their palettes.
- **Components**: Pages are server components by default; add `"use client"` only when needed
- **Shadcn/UI**: New York style, Zinc base color, RSC enabled. Config in `components.json`.
- **Icons**: Use `lucide-react`
- **Fonts**: Six Google fonts via `next/font/google` in `app/fonts.ts` (Rajdhani, Share Tech Mono, Pirata One, Crimson Pro, Press Start 2P, VT323), exposed as CSS variables and Tailwind families (`font-rajdhani`, `font-mono-tech`, `font-pirata`, `font-crimson`, `font-pixel`, `font-vt`). World-specific fonts have `preload: false`.
- **Animations**: CSS keyframes (in `globals.css`) + small hooks (`use-in-view`, `use-count-up`, `use-typed-loop`). Always pair with `motion-reduce:` handling — every animation must respect `prefers-reduced-motion`.
- **Sound**: `lib/sfx.ts` WebAudio synth — no audio files. Add hover sounds to any element via the `data-sfx-hover` attribute (handled globally by BridgeEffects).
- **Navigation**: Internal links get the wipe transition automatically via PageVeil's capture-phase interception; imperative navigation goes through `navigateWithVeil(href)`.

## Adding Content

Real data lives in `constants/` and themed copy derives from it:
- `constants/index.ts` — Homepage info, featured stats
- `constants/projects/index.ts` — Project entries (quests derive from these by name in `constants/quests.ts`)
- `constants/experience/index.ts` — Work experience (voyage chapters reference entries by id in `constants/voyage.ts`)
- `constants/about/index.ts` — Skill cards (inventory derives devicon URLs in `constants/character.ts`)
- Per-world copy: `constants/{home,comms,terminal,voyage,captains-log,quests,battle,character,bridge}.ts`

## Deployment

Deployed on Vercel. Vercel Speed Insights integrated.

## Testing

- **Vitest 4** + @testing-library/react (jsdom). Tests live in `test/`, run with `npm test`. See [TESTING.md](TESTING.md) for conventions.
- 100% test coverage is the goal — tests make vibe coding safe.
- When writing a new function, write a corresponding test. When fixing a bug, write a regression test.
- When adding error handling, write a test that triggers the error. When adding a conditional, test BOTH paths.
- Never commit code that makes existing tests fail.

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
