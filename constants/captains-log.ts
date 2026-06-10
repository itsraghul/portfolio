import { LogEntryData } from "@/types/worlds";
import { FEATURED_STATS } from "@/constants";

export const LOG_HEAD = {
    overline: "Private Journal · Do Not Read (Unless Hiring)",
    titlePre: "Captain's ",
    titleAccent: "Log",
    date: "Final entry — somewhere in the New World",
} as const;

export const LOG_PORTRAIT = {
    name: "Raghul S",
    epithet: '"Surgeon of the Stack"',
    role: "Founding Software Engineer · Velt",
} as const;

export const LOG_ENTRIES: LogEntryData[] = [
    {
        tag: "Entry No. 1 — Who keeps this log",
        segments: [
            { text: "A software engineer dedicated to " },
            { text: "innovation, transformation, and inspiring", em: true },
            {
                text: " through the boundless possibilities of technology. I set sail to build things that matter — and I haven't dropped anchor since.",
            },
        ],
    },
    {
        tag: "Entry No. 2 — Current heading",
        segments: [
            { text: "Currently navigating the New World as a founding engineer at " },
            { text: "Velt", em: true },
            {
                text: ", building real-time collaboration and AI-powered workflow automation. The seas are rough, the deploys are frequent, and the crew is small — exactly how I like it.",
            },
        ],
    },
];

export const TALLY_LABELS = ["Years at sea", "Quests completed", "Weapons mastered"] as const;

export const LOG_TALLIES = FEATURED_STATS.map((stat, i) => ({
    value: `${stat.value}${stat.suffix}`,
    label: TALLY_LABELS[i],
}));

export const TALLY_TAG = "Entry No. 3 — The tally so far";
export const REACH_TAG = "Entry No. 4 — How to reach the ship";
export const REACH_INTRO = "Message in a bottle works, but these are faster:";

export const LOG_SIGNATURE = {
    sig: "— Raghul S",
    caption: 'Captain · Full-Stack Vessel "RS"',
} as const;

export const LOG_PS = {
    pre: "P.S. — If you found this log, the treasure is real. It's in the ",
    linkLabel: "Quest Log",
    href: "/projects",
    post: ".",
} as const;
