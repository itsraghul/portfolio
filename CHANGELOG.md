# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0.1] - 2026-07-05

### Added
- **New quest: lockwarden** — the npm supply-chain security CLI joins the projects world as a 5-star TOOL quest ("LOCKWARDEN — THE SUPPLY-CHAIN WARD"), with GitHub and website links and four tech rewards.

## [1.0.0.0] - 2026-06-10

### Added
- **Three themed worlds** — every page is now its own universe, with the navigation bar re-skinning itself as you travel between them:
  - **Ship's bridge (sci-fi HUD):** the home page is a starship console — drifting starfield, live ship clock, typed pilot identification, animated stat rings, and three glowing destination portals previewing the other worlds.
  - **The Grand Line (pirate parchment):** the experience page charts a career voyage across four seas, each chapter a WANTED poster with a rising bounty (฿30M → ฿1.5B) and a ship that sails the dotted route as you scroll. The about page is the matching captain's log with journal entries and wax-seal contact buttons.
  - **Classic RPG (pixel menus):** projects are a keyboard-navigable quest log (↑/↓/Enter, all 8 quests cleared) with a playable boss battle against THE LEGACY CODEBASE — REFACTOR, CACHE, DEPLOY FRIDAY, and COFFEE moves with HP/MP bars. Skills are a character sheet with equipment, attribute bars, and a 14-slot rarity-tiered inventory.
- **Comms page** (`/contact`) — radar sweep, three channel cards with animated EQ bars, and a transmission composer that hands off to your mail client.
- **Ship terminal** rebuilt — boot sequence, command history, `sudo hire-me`, `cat bounty.txt`, and a couple of undocumented commands for explorers.
- **Synthesized sound effects** — hover blips, page-warp sweeps, battle hits, and victory fanfares, generated in the browser with a mute toggle that remembers your choice.
- **Page transitions** — navigation wipes to each world's signature color.
- **Konami code** works on every page (↑↑↓↓←→←→BA — reality may destabilize).
- **Test suite** — Vitest + Testing Library, 53 tests covering the battle engine, terminal commands, navigation veil, and all animation hooks, with CI on every pull request.

### Changed
- Navigation, footer, and page layouts fully rebuilt around the three-world design; each page owns its theme, typography (6 new typefaces), and motion.
- All animations honor `prefers-reduced-motion`, and the quest log, inventory, and battle dialog are fully keyboard-accessible.

### Removed
- The previous home-page mini-games (puzzle, hop, dodge), the 3D skills globe, the light/dark theme toggle, and the custom cursor — replaced by the new worlds.

## [0.1.0.1] - 2026-04-10

### Fixed
- **Production crash** — `TypeError: (0, s.use) is not a function` caused by framer-motion's `useReducedMotion()` calling `React.use()` (a React 19 API) at runtime on React 18. Replaced with native `window.matchMedia("(prefers-reduced-motion: reduce)")` in all three affected components: `DodgeGame`, `ChapterSection`, and `ClosingSection`.

## [0.1.0.0] - 2026-04-09

### Added
- **Cinematic scroll experience** on `/experience` — full-viewport scroll-driven timeline with chapter-by-chapter reveals, spring animations, and sticky chapter navigation dots. Each company gets its own branded section with parallax text, skill tags, and project links.
- **Dodge the Stack game mode** — bullet hell arcade game on the home page. Move your cursor to dodge incoming tech stack icons (React, TypeScript, Python, Node, Rust, Docker, Next.js, Swift) rendered as glowing canvas bullets across 5 waves of increasing difficulty. Player is your profile photo (same avatar as Hop mode).
- `ScrollProgress` component — reading progress indicator for the experience page.
- `lib/scrollUtils.ts` — `computeRevealThresholds` utility for scroll-driven content reveals.
- `prefers-reduced-motion` support in both the scroll experience and the dodge game (static fallback shown when motion is disabled).

### Changed
- Experience page replaces static timeline with the new cinematic scroll layout.
- `NavBar` and `ThemeToggle` now use a `mounted` guard to eliminate hydration mismatches on the logo/theme icon.
- `GameModeBar` gains a Dodge mode button (Zap icon).
- Next.js upgraded from 14 to 15.5.15.
