export type World = "ship" | "crt" | "sea" | "game";

/* ---------- bridge (shared nav) ---------- */

export interface BridgeLink {
    href: string;
    label: string;
}

export interface SocialLink {
    label: string;
    href: string;
}

/* ---------- home (ship HUD) ---------- */

export interface StatRing {
    value: number;
    suffix: string;
    label: string;
    pct: number;
}

export type PortVariant = "sea" | "game" | "stats";

export interface DestinationPort {
    variant: PortVariant;
    tag: string;
    title: string;
    copy: string;
    cta: string;
    href: string;
}

/* ---------- voyage (experience) ---------- */

export interface VoyageChapter {
    experienceId: number;
    ribbon: string;
    seaName: string;
    aliveLine: string;
    mugLabel: string;
    epithet: string;
    bounty: number;
    crew: string;
    stamp: string;
    roleLine: string;
    extraDeeds?: string[];
}

export interface SeaNote {
    text: string;
    position: { top: string; left?: string; right?: string };
}

/* ---------- quests (projects) ---------- */

export type QuestCategory = "web" | "chain" | "tool" | "game";

export interface QuestReward {
    name: string;
    desc: string;
}

export interface Quest {
    projectName: string;
    fullTitle: string;
    stars: number;
    category: QuestCategory;
    desc: string;
    rewards: QuestReward[];
    site?: string;
    git?: string;
}

/* ---------- battle ---------- */

export type HeroMoveId = "refactor" | "cache" | "deploy" | "coffee";

export interface EnemyMove {
    name: string;
    minDmg: number;
    maxDmg: number;
}

export interface BattleStats {
    eHp: number;
    eMax: number;
    hHp: number;
    hMax: number;
    mp: number;
    mpMax: number;
}

/* ---------- character (skills) ---------- */

export type Rarity = "legendary" | "epic" | "rare" | "common";

export interface RarityStyle {
    label: string;
    fg: string;
    bg: string;
}

export interface InventoryItem {
    name: string;
    icon: string;
    rarity: Rarity;
    flavor: string;
}

export interface EquipmentRow {
    slot: string;
    item: string;
    bonus: string;
}

export interface Attribute {
    name: string;
    value: number;
    color: string;
}

/* ---------- captain's log (about) ---------- */

export interface LogSegment {
    text: string;
    em?: boolean;
}

export interface LogEntryData {
    tag: string;
    segments?: LogSegment[];
}

/* ---------- comms (contact) ---------- */

export interface CommsChannel {
    freq: string;
    title: string;
    desc: string;
    href: string;
    external: boolean;
}
