import { describe, expect, it, vi } from "vitest";
import { bridgeToast, onBridgeToast } from "@/lib/toast";

describe("bridge toast emitter", () => {
    it("notifies subscribers with message and default duration", () => {
        const listener = vi.fn();
        const unsubscribe = onBridgeToast(listener);
        bridgeToast("KONAMI CODE ACCEPTED");
        expect(listener).toHaveBeenCalledWith({ message: "KONAMI CODE ACCEPTED", duration: 2600 });
        unsubscribe();
    });

    it("honors a custom duration", () => {
        const listener = vi.fn();
        const unsubscribe = onBridgeToast(listener);
        bridgeToast("★ +500 EXP ★", 3200);
        expect(listener).toHaveBeenCalledWith({ message: "★ +500 EXP ★", duration: 3200 });
        unsubscribe();
    });

    it("stops notifying after unsubscribe", () => {
        const listener = vi.fn();
        const unsubscribe = onBridgeToast(listener);
        unsubscribe();
        bridgeToast("silence");
        expect(listener).not.toHaveBeenCalled();
    });
});
