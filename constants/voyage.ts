import { SeaNote, VoyageChapter } from "@/types/worlds";

export const VOYAGE_HEAD = {
    overline: "Sea Chart · Recovered from the Captain's Quarters",
    titlePre: "The ",
    titleAccent: "Voyage",
    sub: "Three years on the Grand Line — every sea, every crew, every bounty.",
} as const;

/** Career entries themed as Grand Line chapters (chronological order).
    experienceId references constants/experience. */
export const VOYAGE_CHAPTERS: VoyageChapter[] = [
    {
        experienceId: 4,
        ribbon: "CHAPTER I · THE FIRST SEA",
        seaName: "East Blue",
        aliveLine: "CURIOUS & LEARNING",
        crewMark: "navigator",
        markCaption: "CREW MARK · APPRENTICE NAVIGATOR",
        epithet: '"The Rookie of East Blue"',
        bounty: 30000000,
        crew: "Crew · Microsoft — FutureReadyTalent",
        stamp: "FIRST VOYAGE",
        roleLine: "Position aboard · Apprentice Navigator",
        extraDeeds: ["First taste of the open sea — charted a course toward cloud waters that would matter later."],
    },
    {
        experienceId: 3,
        ribbon: "CHAPTER II · ENTERING THE GRAND LINE",
        seaName: "Reverse Mountain",
        aliveLine: "SHIPPING DAILY",
        crewMark: "slayer",
        markCaption: "CREW MARK · LEGACY-CODE SLAYER",
        epithet: '"Slayer of Legacy Code"',
        bounty: 120000000,
        crew: "Crew · ZOHO Corporation — Desk Division",
        stamp: "BOUNTY RISING",
        roleLine: "Position aboard · Deckhand, fast learner",
    },
    {
        experienceId: 2,
        ribbon: "CHAPTER III · THE GRAND LINE PROPER",
        seaName: "Water Seven",
        aliveLine: "FULL STACK · FULL SAIL",
        crewMark: "swordsman",
        markCaption: "CREW MARK · THREE-STACK SWORDSMAN",
        epithet: '"The Three-Stack Swordsman"',
        bounty: 320000000,
        crew: "Crew · ZOHO Corporation — Desk Division",
        stamp: "SUPERNOVA",
        roleLine: "Position aboard · Swordsman of the front line",
    },
    {
        experienceId: 0,
        ribbon: "CHAPTER IV · THE NEW WORLD",
        seaName: "The New World",
        aliveLine: "EXTREMELY PRODUCTIVE",
        crewMark: "emperor",
        markCaption: "CREW MARK · EMPEROR OF THE STACK",
        epithet: '"Surgeon of the Stack"',
        bounty: 1500000000,
        crew: "Crew · Velt — Founding Crew",
        stamp: "EMPEROR CLASS",
        roleLine: "Position aboard · First mate of the founding crew",
    },
];

export const SEA_NOTES: SeaNote[] = [
    { text: "Here be sea kings", position: { top: "6%", left: "2%" } },
    { text: "Calm belt — no wind", position: { top: "36%", right: "1%" } },
    { text: "Storm survived, twice", position: { top: "64%", left: "1%" } },
];

export const HORIZON = {
    title: "The voyage continues…",
    sub: "The One Piece is real — it was the systems we shipped along the way.",
    cta: "NEXT ISLAND · THE QUEST LOG →",
    href: "/projects",
} as const;
