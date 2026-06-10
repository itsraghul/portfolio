import { Attribute, EquipmentRow, InventoryItem, Rarity, RarityStyle } from "@/types/worlds";
import { skills } from "@/constants/about";

export const SHEET_HEAD = {
    title: "CHARACTER SHEET",
    sub: "Party of one. Carries the whole stack.",
} as const;

export const HERO_CARD = {
    label: "— HERO —",
    name: "RAGHUL S",
    epithet: "Code Swordsman of the New World",
    level: 26,
    xpPct: 72,
    xpCaption: "XP 7,200 / 10,000 — next level: Staff Engineer",
} as const;

export const EQUIPMENT: EquipmentRow[] = [
    { slot: "MAIN HAND", item: "TypeScript", bonus: "+12 SAFETY" },
    { slot: "OFF HAND", item: "React", bonus: "+10 UI" },
    { slot: "ARMOR", item: "Node.js", bonus: "+9 THROUGHPUT" },
    { slot: "ACCESSORY", item: "GCP / Firebase", bonus: "+11 SCALE" },
    { slot: "RELIC", item: "Redis", bonus: "+80% CACHE" },
];

export const ATTRIBUTES: Attribute[] = [
    { name: "FRONTEND", value: 88, color: "#5fb0ff" },
    { name: "BACKEND", value: 84, color: "#58e08c" },
    { name: "CLOUD / DEVOPS", value: 78, color: "#ffd24a" },
    { name: "TESTING", value: 75, color: "#c08aff" },
    { name: "DATA & CACHING", value: 80, color: "#ff8a8a" },
];

export const RARITY_STYLES: Record<Rarity, RarityStyle> = {
    legendary: { label: "LEGENDARY", fg: "#ffd24a", bg: "#3d2f00" },
    epic: { label: "EPIC", fg: "#c08aff", bg: "#2a0d4d" },
    rare: { label: "RARE", fg: "#5fb0ff", bg: "#0a2647" },
    common: { label: "COMMON", fg: "#9b9bd6", bg: "#1d1d3d" },
};

/** Devicon URL from the existing skills cards (case-insensitive name match). */
function icon(name: string): string {
    const card = skills.find((s) => s.name.toLowerCase() === name.toLowerCase());
    if (!card && process.env.NODE_ENV !== "production") {
        console.warn(`constants/character: no skill card matches "${name}" — inventory icon will be blank`);
    }
    return card?.logo ?? "";
}

export const INVENTORY: InventoryItem[] = [
    { name: "TypeScript", icon: icon("Typescript"), rarity: "legendary", flavor: "Blade of static typing. Crits on any `any`." },
    { name: "React", icon: icon("React"), rarity: "legendary", flavor: "Shield of components. Re-renders only when provoked." },
    { name: "Node.js", icon: icon("Node.js"), rarity: "epic", flavor: "Armor of the event loop. Non-blocking by nature." },
    { name: "Java", icon: icon("Java"), rarity: "epic", flavor: "Ancient greatsword. Heavy, verbose, reliable." },
    { name: "GCP", icon: icon("GCP"), rarity: "epic", flavor: "Summons Cloud Functions, Cloud Run and Cloud Tasks." },
    { name: "Redis", icon: icon("Redis"), rarity: "epic", flavor: "Relic of caching. Once cut a server's load by 80%." },
    { name: "Angular", icon: icon("Angular"), rarity: "rare", flavor: "Framework halberd. Opinionated, battle-tested." },
    { name: "RxJS", icon: icon("RxJS"), rarity: "rare", flavor: "Stream whip. Handle with care — it observes you back." },
    { name: "Docker", icon: icon("Docker"), rarity: "rare", flavor: "Container crate. Works on every machine, honest." },
    { name: "Kubernetes", icon: icon("Kubernetes"), rarity: "rare", flavor: "Fleet commander's horn. Orchestrates the pods." },
    { name: "Playwright", icon: icon("Playwright"), rarity: "rare", flavor: "Phantom actor. Tests the UI while you sleep." },
    { name: "JUnit", icon: icon("Junit"), rarity: "common", flavor: "Trusty test hammer for the Java forge." },
    { name: "HTML", icon: icon("HTML"), rarity: "common", flavor: "The first spell every adventurer learns." },
    { name: "CSS", icon: icon("CSS"), rarity: "common", flavor: "Glamour charm. Centers divs (most of the time)." },
];

export const EMPTY_SLOTS = 6;

export const INVENTORY_LABEL = `— INVENTORY · ${INVENTORY.length} / ${INVENTORY.length + EMPTY_SLOTS} SLOTS —`;
export const INVENTORY_HINT = "Select an item to inspect it…";
