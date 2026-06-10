import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type IOCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

let ioCallback: IOCallback | null = null;

class ControllableIO {
    constructor(callback: IOCallback) {
        ioCallback = callback;
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}

function useInViewHarness() {
    const ref = useRef<HTMLDivElement>(document.createElement("div"));
    return useInView(ref);
}

describe("useInView", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        ioCallback = null;
        vi.stubGlobal("IntersectionObserver", ControllableIO);
    });
    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it("flips to true when the element intersects", () => {
        const { result } = renderHook(() => useInViewHarness());
        expect(result.current).toBe(false);
        act(() => ioCallback?.([{ isIntersecting: true }]));
        expect(result.current).toBe(true);
    });

    it("failsafe forces visibility after 2.5s so content never stays hidden", () => {
        const { result } = renderHook(() => useInViewHarness());
        expect(result.current).toBe(false);
        act(() => void vi.advanceTimersByTime(2600));
        expect(result.current).toBe(true);
    });
});

describe("useReducedMotion", () => {
    it("reflects the media query result after mount", () => {
        const { result } = renderHook(() => useReducedMotion());
        expect(result.current).toBe(false); // setup.ts mock: matches false

        vi.stubGlobal(
            "matchMedia",
            vi.fn().mockImplementation((query: string) => ({
                matches: true,
                media: query,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            }))
        );
        const { result: reduced } = renderHook(() => useReducedMotion());
        expect(reduced.current).toBe(true);
        vi.unstubAllGlobals();
    });
});
