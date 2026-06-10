import { describe, expect, it, vi } from "vitest";
import { sfx } from "@/lib/sfx";

describe("sfx mute state", () => {
    it("toggleMuted flips state and persists to localStorage", () => {
        const initial = sfx.muted;
        const flipped = sfx.toggleMuted();
        expect(flipped).toBe(!initial);
        expect(localStorage.getItem("rs-sound-muted")).toBe(flipped ? "1" : "0");
        sfx.toggleMuted(); // restore
    });

    it("notifies mute listeners and supports unsubscribe", () => {
        const listener = vi.fn();
        const unsubscribe = sfx.onMuteChange(listener);
        const state = sfx.toggleMuted();
        expect(listener).toHaveBeenCalledWith(state);
        unsubscribe();
        sfx.toggleMuted(); // restore
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("playback methods never throw without an AudioContext (jsdom)", () => {
        expect(() => {
            sfx.hover();
            sfx.blip();
            sfx.fanfare();
            sfx.warp();
        }).not.toThrow();
    });
});
