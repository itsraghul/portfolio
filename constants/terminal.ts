export const TERMINAL_PROMPT = "raghul@rs-vessel:~$";

export const BOOT_LINES: { text: string; dim?: boolean }[] = [
    { text: "RS-VESSEL TERMINAL v3.0 — secure shell to the captain's quarters" },
    { text: "boot: sound ✓   nav ✓   coffee ✓   sea-monsters: none detected", dim: true },
    { text: "" },
    { text: "Type help to see available commands." },
    { text: "" },
];

export const TERMINAL_FILES: Record<string, string> = {
    "about.txt":
        "Raghul S — Founding Software Engineer @ Velt.\nDedicated to innovation, transformation, and inspiring through\nthe boundless possibilities of technology.\nCurrently building real-time collaboration & AI workflow automation.",
    "bounty.txt":
        'CURRENT BOUNTY: ฿1,500,000,000\nEPITHET: "Surgeon of the Stack"\nLAST SEEN: shipping to production on a Friday.',
    "treasure.map": "The One Piece is the systems we shipped along the way. X marks /projects.",
};

export const HELP_ROWS: { cmd: string; desc: string }[] = [
    { cmd: "whoami", desc: "who keeps this terminal" },
    { cmd: "experience", desc: "sail to the voyage log" },
    { cmd: "projects", desc: "open the quest log" },
    { cmd: "skills", desc: "open the character sheet" },
    { cmd: "contact", desc: "open a comms channel" },
    { cmd: "socials", desc: "linkedin / github / email" },
    { cmd: "ls", desc: "list files" },
    { cmd: "cat <file>", desc: "read a file" },
    { cmd: "motd", desc: "message of the day" },
    { cmd: "sudo hire-me", desc: "privileged operation" },
    { cmd: "clear", desc: "clear the screen" },
];

export const HELP_FOOTER = "…and at least one command nobody documented.";

export const WHOAMI_TEXT =
    "Raghul S — Founding Software Engineer @ Velt.\nBuilding the future, one line of code at a time.";

export const MOTD_TEXT =
    '"When do you think people die? When they are forgotten…\n so write code people remember." — a doctor, probably';

export const PWD_TEXT = "/home/raghul/new-world";

export const LS_EXTRA = "quests/   voyage/   .secrets/";

export const NAV_COMMANDS: Record<string, string> = {
    experience: "/experience",
    voyage: "/experience",
    projects: "/projects",
    quests: "/projects",
    skills: "/skills",
    stats: "/skills",
    about: "/about",
    home: "/",
    contact: "/contact",
};
