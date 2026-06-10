import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useBattle } from "@/hooks/use-battle";
import { INITIAL_BATTLE_STATS } from "@/constants/battle";

describe("useBattle", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it("starts with the intro message and full stats", () => {
        const { result } = renderHook(() => useBattle(true));
        expect(result.current.view.eHp).toBe(INITIAL_BATTLE_STATS.eMax);
        expect(result.current.view.hHp).toBe(INITIAL_BATTLE_STATS.hMax);
        expect(result.current.view.message).toContain("LEGACY CODEBASE appeared");
    });

    it("REFACTOR damages the enemy, then the enemy counterattacks", () => {
        vi.spyOn(Math, "random").mockReturnValue(0); // rand(min,max) -> min, enemy move -> first
        const { result } = renderHook(() => useBattle(true));

        act(() => result.current.doMove("refactor"));
        act(() => void vi.advanceTimersByTime(400)); // hero attack lands at 300ms
        expect(result.current.view.eHp).toBe(INITIAL_BATTLE_STATS.eMax - 18);
        expect(result.current.view.message).toContain("REFACTOR");

        act(() => void vi.advanceTimersByTime(1200)); // enemy turn at +1100ms
        expect(result.current.view.message).toContain("NULL POINTER EXCEPTION");
        expect(result.current.view.hHp).toBe(INITIAL_BATTLE_STATS.hMax - 12);
    });

    it("DEPLOY FRIDAY costs 12 MP and can fail spectacularly", () => {
        vi.spyOn(Math, "random").mockReturnValue(0); // 0 < 0.25 -> deploy fails
        const { result } = renderHook(() => useBattle(true));

        act(() => result.current.doMove("deploy"));
        expect(result.current.view.mp).toBe(INITIAL_BATTLE_STATS.mpMax - 12);
        expect(result.current.view.message).toContain("pipeline is red");
    });

    it("COFFEE heals but never exceeds max HP", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        const { result } = renderHook(() => useBattle(true));

        act(() => result.current.doMove("coffee"));
        expect(result.current.view.message).toContain("COFFEE");
        expect(result.current.view.hHp).toBe(INITIAL_BATTLE_STATS.hMax); // already full, capped
        expect(result.current.view.mp).toBe(INITIAL_BATTLE_STATS.mpMax); // +6 capped at max
    });

    it("CACHE guards the next enemy hit at 35% damage", () => {
        vi.spyOn(Math, "random").mockReturnValue(0); // enemy: NULL POINTER, 12 dmg -> guarded 4
        const { result } = renderHook(() => useBattle(true));

        act(() => result.current.doMove("cache"));
        expect(result.current.view.message).toContain("cached everything");
        act(() => void vi.advanceTimersByTime(1100));
        expect(result.current.view.hHp).toBe(INITIAL_BATTLE_STATS.hMax - Math.floor(12 * 0.35));
    });

    it("defeats the enemy after enough REFACTORs and fanfares the win", () => {
        vi.spyOn(Math, "random").mockReturnValue(0); // 18 dmg per hit, enemy hits 12
        const { result } = renderHook(() => useBattle(true));

        const hitsToWin = Math.ceil(INITIAL_BATTLE_STATS.eMax / 18); // 8
        for (let i = 0; i < hitsToWin; i++) {
            act(() => result.current.doMove("refactor"));
            act(() => void vi.advanceTimersByTime(1600)); // hit + enemy turn / win delay
        }
        expect(result.current.view.eHp).toBeLessThanOrEqual(0);
        expect(result.current.view.enemyState).toBe("dead");
        expect(result.current.view.message).toContain("refactored into oblivion");
    });

    it("DEPLOY without MP refuses, keeps MP, and does not soft-lock", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.99); // deploys succeed (0.99 > fail chance)
        const { result } = renderHook(() => useBattle(true));

        act(() => result.current.doMove("deploy")); // 30 -> 18 MP
        act(() => void vi.advanceTimersByTime(2000));
        act(() => result.current.doMove("deploy")); // 18 -> 6 MP
        act(() => void vi.advanceTimersByTime(2000));
        act(() => result.current.doMove("deploy")); // 6 < 12 — refused
        expect(result.current.view.message).toContain("Not enough MP");
        expect(result.current.view.mp).toBe(6);

        act(() => result.current.doMove("refactor")); // busy must have been released
        act(() => void vi.advanceTimersByTime(400));
        expect(result.current.view.message).toContain("REFACTOR");
    });

    it("hero faint restores HP/MP via git revert and battle continues", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.99); // enemy: 10,000-LINE FILE, 25 dmg -> guarded 8
        const { result } = renderHook(() => useBattle(true));

        // guarded chip damage: 8 HP per round, hero faints on round 13
        for (let i = 0; i < 13; i++) {
            act(() => result.current.doMove("cache"));
            act(() => void vi.advanceTimersByTime(1500));
        }
        act(() => void vi.advanceTimersByTime(1000)); // respawn fires 900ms after the fatal hit
        expect(result.current.view.message).toContain("git revert");
        expect(result.current.view.hHp).toBe(INITIAL_BATTLE_STATS.hMax);
        expect(result.current.view.mp).toBe(INITIAL_BATTLE_STATS.mpMax);

        act(() => result.current.doMove("refactor")); // busy released after respawn
        act(() => void vi.advanceTimersByTime(400));
        expect(result.current.view.message).toContain("REFACTOR");
    });

    it("ignores moves while a turn is in flight", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        const { result } = renderHook(() => useBattle(true));

        act(() => result.current.doMove("refactor"));
        act(() => result.current.doMove("refactor")); // busy — should be ignored
        act(() => void vi.advanceTimersByTime(400));
        expect(result.current.view.eHp).toBe(INITIAL_BATTLE_STATS.eMax - 18); // only one hit
    });
});
