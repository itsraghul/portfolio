# Testing

100% test coverage is the key to great vibe coding. Tests let you move fast, trust your instincts, and ship with confidence — without them, vibe coding is just yolo coding. With tests, it's a superpower.

## Framework

- **Vitest 4** with the jsdom environment
- **@testing-library/react** for hook and component tests
- Setup file: [test/setup.ts](test/setup.ts) (mocks `matchMedia` and `IntersectionObserver`, cleans up after each test)

## Running tests

```bash
npm test          # run the suite once
npm run test:watch  # watch mode
```

## Test layers

- **Unit tests** (`test/*.test.ts`) — pure logic: data derivation in `constants/`, event emitters in `lib/`. No DOM needed.
- **Hook tests** (`test/*.test.tsx`) — stateful hooks via `renderHook` with fake timers (`vi.useFakeTimers()`): battle state machine, terminal command loop.
- **Integration/E2E** — not set up yet. If a flow spans multiple pages (e.g., terminal nav command → veil → route change), prefer adding Playwright rather than over-mocking.

## Conventions

- Test files live in `test/`, named `<subject>.test.ts(x)`.
- Use the `@/` path alias, same as app code.
- Mock time with `vi.useFakeTimers()`; mock randomness with `vi.spyOn(Math, "random")`.
- Mock modules that import `next/navigation` (e.g., `@/components/bridge/PageVeil`) at the top of the file with `vi.mock`.
- Test what the code DOES — real assertions on behavior, never `expect(x).toBeDefined()` smoke checks.
- When fixing a bug, write a regression test in the same commit.
