import { DestinationPort, StatRing } from "@/types/worlds";
import { CURRENTLY_BUILDING, FEATURED_STATS, HOMEPAGE_INFO } from "@/constants";

export const BOOT_TEXT = "RS-OS v3.0 // ALL SYSTEMS NOMINAL";

export const HERO_LABEL = "// PILOT IDENTIFICATION";

export const ROLE_PHRASES = [
    HOMEPAGE_INFO.ROLE.toUpperCase(),
    HOMEPAGE_INFO.TAGLINE.replace(/[.]$/, "").toUpperCase(),
] as const;

export const HERO_DESC = HOMEPAGE_INFO.BASIC_DESC;

export const HOME_CTAS = [
    { label: "OPEN QUEST LOG", href: "/projects", variant: "solid" },
    { label: "OPEN CHANNEL", href: "/contact", variant: "ghost" },
] as const;

export const TICKER = {
    tag: "LIVE",
    text: "Currently building real-time collaboration & AI-powered workflow automation at",
    linkLabel: "VELT ↗",
    link: CURRENTLY_BUILDING.link,
} as const;

const RING_PCTS = [0.62, 0.8, 0.9];

export const STAT_RINGS: StatRing[] = FEATURED_STATS.map((stat, i) => ({
    value: stat.value,
    suffix: stat.suffix,
    label: stat.label,
    pct: RING_PCTS[i],
}));

export const DESTINATIONS_HEAD = "// SELECT DESTINATION";

export const DESTINATIONS: DestinationPort[] = [
    {
        variant: "sea",
        tag: "WORLD 01 — THE GRAND LINE",
        title: "The Voyage",
        copy: "Three years at sea. Chart the route from East Blue to the New World — every crew, every bounty.",
        cta: "SET SAIL →",
        href: "/experience",
    },
    {
        variant: "game",
        tag: "WORLD 02 — THE OVERWORLD",
        title: "Quest Log",
        copy: "Eight quests completed. Web apps, blockchains, even a mobile game. A boss fight awaits.",
        cta: "PRESS START →",
        href: "/projects",
    },
    {
        variant: "stats",
        tag: "WORLD 02 — PARTY MENU",
        title: "Character Sheet",
        copy: "Stats, equipment and a 14-slot inventory of technologies, levelled through real battles.",
        cta: "VIEW STATS →",
        href: "/skills",
    },
];

export const MINOR_ROUTES = [
    { label: "CAPTAIN'S LOG — ABOUT", href: "/about" },
    { label: "COMMS — CONTACT", href: "/contact" },
    { label: "SHIP TERMINAL — >_", href: "/terminal" },
] as const;
