# Changelog

All notable changes to this project will be documented in this file.

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
