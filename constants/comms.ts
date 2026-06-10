import { CommsChannel } from "@/types/worlds";
import { CONTACT_EMAIL } from "@/constants/bridge";

export const COMMS_HEAD = {
    titlePre: "Open a ",
    titleAccent: "Channel",
    sub: "COMMS ARRAY ONLINE · ",
    subStrong: "RESPONSE TIME < 24H",
} as const;

export const COMMS_CHANNELS: CommsChannel[] = [
    {
        freq: "FREQ 027.1 — PROFESSIONAL BAND",
        title: "LinkedIn",
        desc: "Recruiters and collaborators, this channel is monitored daily.",
        href: "https://www.linkedin.com/in/raghul-s25",
        external: true,
    },
    {
        freq: "FREQ 042.0 — CODE BAND",
        title: "GitHub",
        desc: "The ship's engine room. Public experiments and quest artifacts.",
        href: "https://www.github.com/itsraghul",
        external: true,
    },
    {
        freq: "FREQ 001.0 — DIRECT LINE",
        title: "Email",
        desc: `${CONTACT_EMAIL} — for everything else, old reliable.`,
        href: `mailto:${CONTACT_EMAIL}`,
        external: false,
    },
];

export const COMPOSER = {
    label: "// COMPOSE TRANSMISSION",
    namePlaceholder: "CALLSIGN (your name)",
    subjectPlaceholder: "SUBJECT",
    bodyPlaceholder: "MESSAGE BODY…",
    submitLabel: "TRANSMIT ▸",
    note: "ROUTES VIA YOUR MAIL CLIENT — NO SERVERS, NO SPYING",
    sendingNote: "CHANNEL OPEN — HANDING OFF TO MAIL CLIENT…",
    fallbackSubject: "Transmission from your portfolio",
} as const;

export const COMMS_READOUTS = [
    { label: "SIGNAL:", value: "STRONG" },
    { label: "ENCRYPTION:", value: "POLITENESS" },
    { label: "SPAM FILTER:", value: "SEA-KING GRADE" },
] as const;
