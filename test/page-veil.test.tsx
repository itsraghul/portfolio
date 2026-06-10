import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();
vi.mock("next/navigation", () => ({
    useRouter: () => ({ push }),
    usePathname: () => "/",
}));

import PageVeil, { navigateWithVeil } from "@/components/bridge/PageVeil";

function clickLink(href: string, target?: string) {
    const a = document.createElement("a");
    a.href = href;
    a.setAttribute("href", href);
    if (target) a.target = target;
    a.addEventListener("click", (e) => e.preventDefault(), { capture: false }); // stop jsdom nav errors
    document.body.appendChild(a);
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    a.dispatchEvent(event);
    a.remove();
    return event;
}

describe("PageVeil navigation interception", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        push.mockClear();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it("intercepts internal links and routes after the wipe delay", () => {
        render(<PageVeil />);
        const event = clickLink("/projects");
        expect(event.defaultPrevented).toBe(true);
        expect(push).not.toHaveBeenCalled(); // veil covers first
        vi.advanceTimersByTime(300);
        expect(push).toHaveBeenCalledWith("/projects");
    });

    it("covers the veil during transition", () => {
        const { container } = render(<PageVeil />);
        act(() => void clickLink("/about"));
        expect(container.querySelector(".bridge-veil")?.classList.contains("cover")).toBe(true);
    });

    it("ignores external, mailto, and new-tab links", () => {
        render(<PageVeil />);
        clickLink("https://github.com/itsraghul");
        clickLink("mailto:raghul2521@gmail.com");
        clickLink("/projects", "_blank");
        vi.advanceTimersByTime(500);
        expect(push).not.toHaveBeenCalled();
    });

    it("ignores clicks on the current pathname", () => {
        render(<PageVeil />);
        clickLink("/");
        vi.advanceTimersByTime(500);
        expect(push).toHaveBeenCalledTimes(0);
    });

    it("navigateWithVeil routes imperatively through the veil", () => {
        render(<PageVeil />);
        navigateWithVeil("/skills");
        vi.advanceTimersByTime(300);
        expect(push).toHaveBeenCalledWith("/skills");
    });
});
