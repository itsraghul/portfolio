import { Quest, QuestCategory } from "@/types/worlds";
import { PROJECTS } from "@/constants/projects";

export const QUESTS_HEAD = {
    title: "QUEST LOG",
    sub: "All side quests completed. Main quest: ongoing at Velt.",
} as const;

// PLAYER_INFO is defined below QUESTS so the clear-count derives from real data

export const CAT_BADGES: Record<QuestCategory, { label: string; className: string }> = {
    web: { label: "WEB", className: "bg-[#1d4ed8]" },
    chain: { label: "CHAIN", className: "bg-[#7c3aed]" },
    tool: { label: "TOOL", className: "bg-[#0f766e]" },
    game: { label: "GAME", className: "bg-[#b91c1c]" },
};

/** Themed quest entries over the real PROJECTS data (matched by name prefix). */
const QUEST_THEMES: Array<{
    match: string;
    fullTitle: string;
    stars: number;
    category: QuestCategory;
    desc: string;
}> = [
    {
        match: "Mock Data",
        fullTitle: "MOCK DATA — REALISTIC FAKE DATA FORGE",
        stars: 4,
        category: "web",
        desc: "A platform that simplifies designing and generating mock data for developers, testers and teams. Supports 26 data categories, nearly 200+ unique data types, and fake data generation in 43 different languages.",
    },
    {
        match: "DataForge",
        fullTitle: "DATAFORGE — WEB-SCRAPE WORKFLOW SMITHY",
        stars: 5,
        category: "web",
        desc: "A dataset creator for ML models through web-scrape workflows. Configure scraping workflows, let AI extract the right selectors, schedule runs with cron, and ship data through webhooks. Dataset marketplace planned.",
    },
    {
        match: "Hearty-Foods",
        fullTitle: "HEARTY FOODS — FOOD DELIVERY TAVERN",
        stars: 3,
        category: "web",
        desc: "A food order and delivery site. Users order food, track order history, and pay with cash or PayPal. The tavern keeper (admin) creates new dishes, administers orders and watches the total collection grow.",
    },
    {
        match: "MediNet",
        fullTitle: "MEDINET — DECENTRALIZED MEDICAL NETWORK",
        stars: 4,
        category: "chain",
        desc: "A decentralized platform for patient record management and a medical community network for doctors. Patients control their own records; doctors form networks for better diagnosis. Files travel via IPFS.",
    },
    {
        match: "CampFund",
        fullTitle: "CAMPFUND — DECENTRALIZED FUNDING GUILD",
        stars: 4,
        category: "chain",
        desc: "An open public fundraising site on Ethereum. Anyone can deploy their own project-fund smart contract; managers raise spending requests that contributors must approve — embezzlement-proof by design. Azure chat bot included.",
    },
    {
        match: "RS Blockchain",
        fullTitle: "RS BLOCKCHAIN — A MINIATURE CHAIN",
        stars: 3,
        category: "tool",
        desc: "A miniature blockchain built in JavaScript. Uses the Redis pub-sub model for blockchain transactions and mining. Small chain, real lessons.",
    },
    {
        match: "TriviaWebApp",
        fullTitle: "TRIVIA — THE RIDDLE GAUNTLET",
        stars: 1,
        category: "web",
        desc: "A simple trivia app that serves random questions. High scores persist in browser storage. The first quest — every adventurer starts somewhere.",
    },
    {
        match: "Cosmic Breakout",
        fullTitle: "COSMIC BREAKOUT — ENDLESS RUNNER",
        stars: 2,
        category: "game",
        desc: "An endless runner mobile game developed with GDevelop5. Dodge, run, repeat — built for Android.",
    },
];

export const QUESTS: Quest[] = QUEST_THEMES.flatMap((theme) => {
    const project = PROJECTS.find((p) => p.name.startsWith(theme.match));
    if (!project) {
        if (process.env.NODE_ENV !== "production") {
            console.warn(`constants/quests: no project matches theme "${theme.match}" — quest dropped`);
        }
        return [];
    }
    return [
        {
            projectName: project.name,
            fullTitle: theme.fullTitle,
            stars: theme.stars,
            category: theme.category,
            desc: theme.desc,
            rewards: Object.entries(project.techDescriptions ?? {}).map(([name, desc]) => ({ name, desc })),
            site: project.websiteLink || undefined,
            git: project.githubLink || undefined,
        },
    ];
});

export const PLAYER_INFO = [
    { k: "PLAYER", v: "RAGHUL S", gold: false },
    { k: "CLASS", v: "Full-Stack Engineer", gold: false },
    { k: "QUESTS CLEAR", v: `${QUESTS.length} / ${QUESTS.length}`, gold: true },
] as const;

export const HINTBAR_ITEMS = [
    { key: "↑/↓", text: "select quest" },
    { key: "ENTER", text: "open world map" },
    { key: "B", text: "boss battle" },
    { key: "", text: "A hidden boss lurks below…" },
] as const;

export const BATTLE_BUTTON_LABEL = "⚔ BOSS BATTLE: THE LEGACY CODEBASE";
