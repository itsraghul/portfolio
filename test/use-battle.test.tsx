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

    it("ignores moves while a turn is in flight", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        const { result } = renderHook(() => useBattle(true));

        act(() => result.current.doMove("refactor"));
        act(() => result.current.doMove("refactor")); // busy — should be ignored
        act(() => void vi.advanceTimersByTime(400));
        expect(result.current.view.eHp).toBe(INITIAL_BATTLE_STATS.eMax - 18); // only one hit
    });
});
