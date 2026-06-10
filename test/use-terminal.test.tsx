import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigateWithVeil = vi.fn();
vi.mock("@/components/bridge/PageVeil", () => ({
    navigateWithVeil: (href: string) => navigateWithVeil(href),
    default: () => null,
}));

import { TermLine, useTerminal } from "@/hooks/use-terminal";

const textOf = (line: TermLine) => line.segments.map((s) => s.text).join("");
const allText = (lines: TermLine[]) => lines.map(textOf).join("\n");

describe("useTerminal", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        navigateWithVeil.mockClear();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    function boot() {
        const hook = renderHook(() => useTerminal());
        act(() => void vi.advanceTimersByTime(1000)); // boot lines print at 120ms intervals
        return hook;
    }

    it("prints the boot sequence", () => {
        const { result } = boot();
        expect(allText(result.current.lines)).toContain("RS-VESSEL TERMINAL v3.0");
        expect(allText(result.current.lines)).toContain("Type help");
    });

    it("whoami prints the identity", () => {
        const { result } = boot();
        act(() => result.current.run("whoami"));
        expect(allText(result.current.lines)).toContain("Founding Software Engineer @ Velt");
    });

    it("cat reads files and rejects unknown ones", () => {
        const { result } = boot();
        act(() => result.current.run("cat bounty.txt"));
        expect(allText(result.current.lines)).toContain("฿1,500,000,000");
        act(() => result.current.run("cat nope.txt"));
        expect(allText(result.current.lines)).toContain("No such file");
    });

    it("unknown commands suggest help", () => {
        const { result } = boot();
        act(() => result.current.run("rm -rf /"));
        expect(allText(result.current.lines)).toContain("command not found: rm");
    });

    it("nav commands set sail via the veil after 600ms", () => {
        const { result } = boot();
        act(() => result.current.run("quests"));
        expect(allText(result.current.lines)).toContain("Setting sail");
        expect(navigateWithVeil).not.toHaveBeenCalled();
        act(() => void vi.advanceTimersByTime(700));
        expect(navigateWithVeil).toHaveBeenCalledWith("/projects");
    });

    it("clear empties the screen", () => {
        const { result } = boot();
        act(() => result.current.run("clear"));
        expect(result.current.lines).toHaveLength(0);
    });

    it("arrow history recalls previous commands", () => {
        const { result } = boot();
        act(() => result.current.run("whoami"));
        act(() => result.current.run("pwd"));
        expect(result.current.historyUp()).toBe("pwd");
        expect(result.current.historyUp()).toBe("whoami");
        expect(result.current.historyDown()).toBe("pwd");
    });
});
