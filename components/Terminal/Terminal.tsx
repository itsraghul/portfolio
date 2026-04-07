"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { openLink } from "@/lib/utils";
import { HOMEPAGE_INFO } from "@/constants";
import { PROJECTS } from "@/constants/projects";
import { experience } from "@/constants/experience";

interface OutputLine {
  type: "input" | "output" | "error" | "success" | "ascii";
  content: string;
}

const PROMPT = "raghul@portfolio:~$";

const ASCII_ART = `
██████╗  █████╗  ██████╗ ██╗  ██╗██╗   ██╗██╗
██╔══██╗██╔══██╗██╔════╝ ██║  ██║██║   ██║██║
██████╔╝███████║██║  ███╗███████║██║   ██║██║
██╔══██╗██╔══██║██║   ██║██╔══██║██║   ██║██║
██║  ██║██║  ██║╚██████╔╝██║  ██║╚██████╔╝███████╗
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`.trim();

const NEOFETCH_OUTPUT = [
  `                    ${HOMEPAGE_INFO.NAME_INFO}`,
  `                    ─────────────────────────`,
  `  ██████████        OS: Next.js 14 (App Router)`,
  `  ██████████        Shell: zsh + TypeScript`,
  `  ██████████        DE: React + Framer Motion`,
  `  ██████████        WM: TailwindCSS`,
  `  ██████████        Theme: Dark (default)`,
  `  ██████████        Resolution: 1920x1080`,
  `                    Uptime: 3+ years of shipping`,
  `                    CPU: Problem Solving @ 100%`,
  `                    RAM: Curiosity (unlimited)`,
].join("\n");

function processCommand(raw: string): OutputLine[] {
  const trimmed = raw.trim();
  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");

  if (!trimmed) return [];

  switch (cmd.toLowerCase()) {
    case "help":
      return [{
        type: "output",
        content: [
          "Available commands:",
          "  help              — show this list",
          "  whoami            — about me",
          "  ls                — list directories",
          "  ls projects/      — list all projects",
          "  ls skills/        — list tech skills",
          "  cat experience    — work history",
          "  open <project>    — open a project link",
          "  neofetch          — system info",
          "  clear             — clear terminal",
          "  exit              — return to portfolio",
        ].join("\n"),
      }];

    case "whoami":
      return [{
        type: "output",
        content: [
          `Name:   ${HOMEPAGE_INFO.NAME_INFO.replace("I'm ", "")}`,
          `Role:   ${HOMEPAGE_INFO.ROLE}`,
          `Bio:    ${HOMEPAGE_INFO.BASIC_DESC}`,
        ].join("\n"),
      }];

    case "ls": {
      if (!arg || arg === "./") {
        return [{
          type: "output",
          content: "\x1b[34mprojects/\x1b[0m  \x1b[34mexperience/\x1b[0m  \x1b[34mskills/\x1b[0m  README.md",
        }];
      }
      if (arg === "projects/" || arg === "projects") {
        const list = PROJECTS.map((p, i) =>
          `  [${String(i + 1).padStart(2, "0")}] ${p.name.split(" - ")[0]}  (${p.category})`
        ).join("\n");
        return [{ type: "output", content: `Projects:\n${list}` }];
      }
      if (arg === "skills/" || arg === "skills") {
        return [{
          type: "output",
          content: "Skills:\n  TypeScript  React  Next.js  Node.js  Docker  Kubernetes  GCP  Redis  Java  Angular  RxJS  Playwright  JUnit  HTML  CSS",
        }];
      }
      return [{ type: "error", content: `ls: cannot access '${arg}': No such file or directory` }];
    }

    case "cat": {
      if (arg === "experience" || arg === "experience.json" || arg === "experience/") {
        const output = experience.map((e) =>
          [
            `┌─ ${e.company} — ${e.role}`,
            `│  ${e.date}`,
            e.description.slice(0, 2).map((d) => `│  • ${d}`).join("\n"),
            "└─",
          ].join("\n")
        ).join("\n\n");
        return [{ type: "output", content: output }];
      }
      if (arg === "README.md") {
        return [{
          type: "output",
          content: `# ${HOMEPAGE_INFO.NAME_INFO.replace("I'm ", "")}\n\n${HOMEPAGE_INFO.BASIC_DESC}\n\nRun 'help' to see what you can do here.`,
        }];
      }
      return [{ type: "error", content: `cat: ${arg}: No such file or directory` }];
    }

    case "open": {
      if (!arg) return [{ type: "error", content: "Usage: open <project-name>" }];
      const match = PROJECTS.find(
        (p) => p.name.toLowerCase().includes(arg.toLowerCase())
      );
      if (!match) {
        return [{ type: "error", content: `open: no project matching '${arg}'. Try 'ls projects/' first.` }];
      }
      const url = match.websiteLink || match.githubLink;
      if (!url) {
        return [{ type: "error", content: `'${match.name.split(" - ")[0]}' has no public link.` }];
      }
      openLink(url);
      return [{ type: "success", content: `Opening ${match.name.split(" - ")[0]}…` }];
    }

    case "neofetch":
      return [{ type: "ascii", content: NEOFETCH_OUTPUT }];

    case "clear":
      return [{ type: "output", content: "__CLEAR__" }];

    case "exit":
      if (typeof window !== "undefined") window.history.back();
      return [{ type: "output", content: "Returning to portfolio…" }];

    case "cd":
      return [{ type: "output", content: "" }];

    default:
      return [{ type: "error", content: `command not found: ${cmd}. Type 'help' for available commands.` }];
  }
}

export default function Terminal() {
  const [history, setHistory] = useState<OutputLine[]>([
    {
      type: "ascii",
      content: ASCII_ART,
    },
    {
      type: "output",
      content: `Welcome! Type 'help' to see available commands.\n`,
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = useCallback((raw: string) => {
    const results = processCommand(raw);

    if (results.length === 1 && results[0].content === "__CLEAR__") {
      setHistory([]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", content: raw },
      ...results,
    ]);
    if (raw.trim()) {
      setCmdHistory((prev) => [raw, ...prev]);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
  }, [input, runCommand, historyIndex, cmdHistory]);

  return (
    <div
      className="w-full h-full bg-[#0a0a0a] text-[#e2e8f0] font-mono text-sm flex flex-col rounded-xl overflow-hidden border border-white/10"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-white/10 shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-xs text-white/30">raghul@portfolio — terminal</span>
      </div>

      {/* Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        {history.map((line, i) => (
          <div key={i}>
            {line.type === "input" && (
              <div className="flex gap-2">
                <span className="text-emerald-400 shrink-0">{PROMPT}</span>
                <span className="text-white/90">{line.content}</span>
              </div>
            )}
            {line.type === "output" && (
              <pre className="text-[#94a3b8] whitespace-pre-wrap break-words leading-relaxed pl-2">
                {line.content}
              </pre>
            )}
            {line.type === "success" && (
              <pre className="text-emerald-400 whitespace-pre-wrap pl-2">{line.content}</pre>
            )}
            {line.type === "error" && (
              <pre className="text-red-400 whitespace-pre-wrap pl-2">{line.content}</pre>
            )}
            {line.type === "ascii" && (
              <pre className="text-emerald-400/80 whitespace-pre text-[10px] sm:text-xs leading-tight overflow-x-auto">
                {line.content}
              </pre>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 shrink-0 bg-[#0d0d0d]">
        <span className="text-emerald-400 shrink-0">{PROMPT}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white/90 caret-emerald-400 placeholder:text-white/20"
          placeholder="type a command…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <span className="animate-cursor-blink text-emerald-400 font-bold">█</span>
      </div>
    </div>
  );
}
