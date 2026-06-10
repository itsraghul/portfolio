"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navigateWithVeil } from "@/components/bridge/PageVeil";
import { sfx } from "@/lib/sfx";
import { bridgeToast } from "@/lib/toast";
import {
    BOOT_LINES,
    HELP_FOOTER,
    HELP_ROWS,
    LS_EXTRA,
    MOTD_TEXT,
    NAV_COMMANDS,
    PWD_TEXT,
    TERMINAL_FILES,
    TERMINAL_PROMPT,
    WHOAMI_TEXT,
} from "@/constants/terminal";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/constants/bridge";

export interface TermSegment {
    text: string;
    style?: "dim" | "amber";
    href?: string;
}

export interface TermLine {
    id: number;
    segments: TermSegment[];
}

let nextId = 0;

const seg = (text: string, style?: "dim" | "amber", href?: string): TermSegment => ({ text, style, href });

export function useTerminal() {
    const [lines, setLines] = useState<TermLine[]>([]);
    const history = useRef<string[]>([]);
    const historyPos = useRef(-1);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    const print = useCallback((...segments: TermSegment[]) => {
        setLines((prev) => [...prev, { id: nextId++, segments }]);
    }, []);

    const later = useCallback((fn: () => void, ms: number) => {
        timers.current.push(setTimeout(fn, ms));
    }, []);

    // boot sequence
    useEffect(() => {
        let cancelled = false;
        BOOT_LINES.forEach((line, i) => {
            timers.current.push(
                setTimeout(() => {
                    if (cancelled) return;
                    if (line.text.startsWith("Type help")) {
                        print(seg("Type "), seg("help", "amber"), seg(" to see available commands."));
                    } else {
                        print(seg(line.text, line.dim ? "dim" : undefined));
                    }
                }, i * 120)
            );
        });
        const currentTimers = timers.current;
        return () => {
            cancelled = true;
            currentTimers.forEach(clearTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const go = useCallback(
        (href: string) => {
            print(seg("Setting sail → "), seg(href, "amber"));
            sfx.warp();
            later(() => navigateWithVeil(href), 600);
        },
        [print, later]
    );

    const run = useCallback(
        (raw: string) => {
            const line = raw.trim();
            print(seg(`${TERMINAL_PROMPT} `, "dim"), seg(raw));
            if (!line) return;
            history.current.unshift(line);
            historyPos.current = -1;

            const parts = line.split(/\s+/);
            const cmd = parts[0].toLowerCase();

            if (cmd === "sudo") {
                if (parts[1] === "hire-me") {
                    print(seg("[sudo] password for recruiter: ********"));
                    print(seg("Permission granted. Opening direct line…"));
                    sfx.success();
                    later(() => {
                        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's talk — found you via the terminal")}`;
                    }, 1100);
                } else {
                    print(seg("sudo: only one privileged operation exists here: sudo hire-me"));
                }
                return;
            }
            if (cmd === "cat") {
                const file = parts[1];
                // Object.hasOwn: bare object lookup would resolve prototype members
                // for input like "cat constructor" and crash the render
                if (file && Object.hasOwn(TERMINAL_FILES, file)) {
                    TERMINAL_FILES[file].split("\n").forEach((row) => print(seg(row)));
                } else {
                    print(seg(`cat: ${file ?? ""}: No such file. Try ls.`));
                }
                return;
            }
            if (cmd === "echo") {
                print(seg(parts.slice(1).join(" ")));
                return;
            }
            if (Object.hasOwn(NAV_COMMANDS, cmd)) {
                go(NAV_COMMANDS[cmd]);
                return;
            }

            switch (cmd) {
                case "help":
                    print(seg("Available commands:"));
                    HELP_ROWS.forEach((row) => print(seg("  "), seg(row.cmd.padEnd(14), "amber"), seg(row.desc)));
                    print(seg(`  ${HELP_FOOTER}`, "dim"));
                    break;
                case "whoami":
                    WHOAMI_TEXT.split("\n").forEach((row) => print(seg(row)));
                    break;
                case "socials":
                    SOCIAL_LINKS.forEach((social) =>
                        print(
                            seg(`${social.label.toLowerCase().padEnd(9)} → `),
                            seg(social.href.replace(/^(https:\/\/www\.|mailto:)/, ""), "amber", social.href)
                        )
                    );
                    break;
                case "ls":
                    print(seg(Object.keys(TERMINAL_FILES).join("   ") + "   "), seg(LS_EXTRA, "dim"));
                    break;
                case "motd":
                    MOTD_TEXT.split("\n").forEach((row) => print(seg(row)));
                    break;
                case "pwd":
                    print(seg(PWD_TEXT));
                    break;
                case "date":
                    print(seg(new Date().toString()));
                    break;
                case "clear":
                    setLines([]);
                    break;
                case "exit":
                    print(seg("There is no exit. Only "), seg("deploy", "amber"), seg("."));
                    break;
                case "deploy":
                    print(seg("Deploying to production… "), seg("on a Friday?!", "amber"));
                    later(() => {
                        print(seg("✓ Deploy successful. You absolute menace. (+100 courage)"));
                        sfx.fanfare();
                    }, 900);
                    break;
                case "treasure":
                    print(seg("You found the hidden command! The treasure was inside "), seg("/projects", "amber"), seg(" all along."));
                    sfx.coin();
                    bridgeToast("★ HIDDEN COMMAND FOUND — +100 PTS ★");
                    break;
                case "konami":
                    print(seg("Wrong place. Try the actual keys: "), seg("↑↑↓↓←→←→ B A", "amber"), seg(" (works on every page)."));
                    break;
                case "gomugomu":
                    print(seg("Gear Five engaged. The terminal refuses to take anything seriously now."));
                    document.documentElement.classList.add("konami-mode");
                    document.body.classList.add("konami-mode");
                    sfx.fanfare();
                    break;
                default:
                    print(seg(`command not found: ${cmd} — type `), seg("help", "amber"));
                    sfx.error();
            }
        },
        [print, go, later]
    );

    const historyUp = useCallback((): string | null => {
        if (historyPos.current < history.current.length - 1) {
            historyPos.current++;
            return history.current[historyPos.current];
        }
        return null;
    }, []);

    const historyDown = useCallback((): string | null => {
        if (historyPos.current > 0) {
            historyPos.current--;
            return history.current[historyPos.current];
        }
        historyPos.current = -1;
        return "";
    }, []);

    return { lines, run, historyUp, historyDown };
}
