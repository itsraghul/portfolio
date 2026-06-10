import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useKonami } from "@/hooks/use-konami";
import { useCountUp } from "@/hooks/use-count-up";
import { useClock } from "@/hooks/use-clock";
import { useTypedLoop } from "@/hooks/use-typed-loop";
import { onBridgeToast } from "@/lib/toast";

const KONAMI_KEYS = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function pressKeys(keys: string[]) {
    keys.forEach((key) => document.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true })));
}

describe("useKonami", () => {
    afterEach(() => {
        document.documentElement.classList.remove("konami-mode");
        document.body.classList.remove("konami-mode");
    });

    it("toggles konami-mode on the full sequence and toasts", () => {
        const toasts: string[] = [];
        const unsubscribe = onBridgeToast(({ message }) => toasts.push(message));
        renderHook(() => useKonami());

        act(() => pressKeys(KONAMI_KEYS));
        expect(document.documentElement.classList.contains("konami-mode")).toBe(true);
        expect(document.body.classList.contains("konami-mode")).toBe(true);
        expect(toasts[0]).toContain("KONAMI CODE ACCEPTED");

        act(() => pressKeys(KONAMI_KEYS));
        expect(document.documentElement.classList.contains("konami-mode")).toBe(false);
        expect(toasts[1]).toBe("REALITY RESTORED");
        unsubscribe();
    });

    it("resets progress on a wrong key", () => {
        renderHook(() => useKonami());
        act(() => pressKeys([...KONAMI_KEYS.slice(0, 8), "x", "b", "a"]));
        expect(document.documentElement.classList.contains("konami-mode")).toBe(false);
    });

    it("dispatches the rs-konami event", () => {
        const listener = vi.fn();
        window.addEventListener("rs-konami", listener);
        renderHook(() => useKonami());
        act(() => pressKeys(KONAMI_KEYS));
        expect(listener).toHaveBeenCalledTimes(1);
        window.removeEventListener("rs-konami", listener);
        act(() => pressKeys(KONAMI_KEYS)); // toggle back off
    });
});

describe("useCountUp", () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ["setTimeout", "setInterval", "requestAnimationFrame", "performance", "Date"] });
    });
    afterEach(() => vi.useRealTimers());

    it("stays at 0 until started", () => {
        const { result } = renderHook(() => useCountUp(100, false));
        act(() => void vi.advanceTimersByTime(2000));
        expect(result.current).toBe(0);
    });

    it("reaches the target after the duration with cubic-out easing", () => {
        const { result } = renderHook(() => useCountUp(100, true, 1000));
        act(() => void vi.advanceTimersByTime(500));
        expect(result.current).toBeGreaterThan(50); // cubic-out front-loads progress
        expect(result.current).toBeLessThan(100);
        act(() => void vi.advanceTimersByTime(700));
        expect(result.current).toBe(100);
    });
});

describe("reduced motion branches", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.stubGlobal(
            "matchMedia",
            vi.fn().mockImplementation((query: string) => ({
                matches: true,
                media: query,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            }))
        );
    });
    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it("useCountUp jumps straight to the target", () => {
        const { result } = renderHook(() => useCountUp(100, true));
        act(() => void vi.advanceTimersByTime(50));
        expect(result.current).toBe(100);
    });

    it("useTypedLoop renders the first phrase statically", () => {
        const { result } = renderHook(() => useTypedLoop(SINGLE_PHRASE));
        act(() => void vi.advanceTimersByTime(50));
        expect(result.current).toBe("ABC");
        act(() => void vi.advanceTimersByTime(5000)); // no typing loop scheduled
        expect(result.current).toBe("ABC");
    });
});

describe("useClock", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("shows a real HH:MM:SS time once mounted and ticks", () => {
        const { result } = renderHook(() => useClock());
        expect(result.current).toMatch(/^\d{2}:\d{2}:\d{2}$/);
        const first = result.current;
        act(() => void vi.advanceTimersByTime(1000));
        expect(result.current).not.toBe(first);
    });
});

// Module-level consts: the hook's effect depends on the phrases reference,
// matching real usage (ROLE_PHRASES is a module const)
const SINGLE_PHRASE = ["ABC"];
const TWO_PHRASES = ["AB", "XY"];

describe("useTypedLoop", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("types the first phrase character by character", () => {
        const { result } = renderHook(() => useTypedLoop(SINGLE_PHRASE));
        expect(result.current).toBe("");
        act(() => void vi.advanceTimersByTime(500)); // start delay → first char
        expect(result.current).toBe("A");
        act(() => void vi.advanceTimersByTime(62 * 2));
        expect(result.current).toBe("ABC");
    });

    it("pauses when complete, then deletes and advances to the next phrase", () => {
        const { result } = renderHook(() => useTypedLoop(TWO_PHRASES));
        act(() => void vi.advanceTimersByTime(500 + 62)); // typed "AB"
        expect(result.current).toBe("AB");
        act(() => void vi.advanceTimersByTime(2600)); // pause elapses, first delete fires
        act(() => void vi.advanceTimersByTime(26 * 2 + 62 * 2 + 50)); // finish delete + type "XY"
        expect(result.current).toBe("XY");
    });
});
