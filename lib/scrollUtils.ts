/**
 * Computes scroll progress thresholds for reveal animations.
 *
 * Each "reveal unit" (company, role, date, description bullets) gets a
 * scroll-progress value at which it becomes visible. All thresholds stay
 * between FADE_IN_END (0.1) and FADE_OUT_START (0.8) so text is fully
 * readable before the section starts fading out.
 */

const FADE_IN_END = 0.1;
const FADE_OUT_START = 0.8;
const HEADER_GAP = 0.05;
const MIN_GAP = 0.02;

export interface RevealThresholds {
  company: number;
  role: number;
  date: number;
  bullets: number[];
}

export function computeRevealThresholds(bulletCount: number): RevealThresholds {
  const company = FADE_IN_END;
  const role = company + HEADER_GAP;
  const date = role + HEADER_GAP;

  const bulletStart = date + HEADER_GAP;
  const bulletEnd = FADE_OUT_START - 0.05; // small buffer before fade-out
  const availableRange = bulletEnd - bulletStart;

  const gap = bulletCount > 0
    ? Math.max(availableRange / bulletCount, MIN_GAP)
    : 0;

  const bullets = Array.from({ length: bulletCount }, (_, i) => {
    const threshold = bulletStart + i * gap;
    // Invariant: every threshold must be < FADE_OUT_START
    if (process.env.NODE_ENV === "development" && threshold >= FADE_OUT_START) {
      console.warn(
        `[scrollUtils] Bullet ${i} threshold ${threshold.toFixed(3)} exceeds fade-out start ${FADE_OUT_START}. ` +
        `Consider capping description bullets at ${Math.floor(availableRange / MIN_GAP)}.`
      );
    }
    return Math.min(threshold, FADE_OUT_START - MIN_GAP);
  });

  return { company, role, date, bullets };
}
