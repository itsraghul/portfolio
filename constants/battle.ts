import { BattleStats, EnemyMove } from "@/types/worlds";

export const INITIAL_BATTLE_STATS: BattleStats = {
    eHp: 140,
    eMax: 140,
    hHp: 100,
    hMax: 100,
    mp: 30,
    mpMax: 30,
};

export const ENEMY_NAMEPLATE = "LEGACY CODEBASE · LV 99";
export const HERO_NAMEPLATE = "RAGHUL · LV 26";

export const ENEMY_MOVES: EnemyMove[] = [
    { name: "NULL POINTER EXCEPTION", minDmg: 12, maxDmg: 20 },
    { name: "MERGE CONFLICT", minDmg: 8, maxDmg: 16 },
    { name: "UNDOCUMENTED API", minDmg: 10, maxDmg: 18 },
    { name: "RACE CONDITION", minDmg: 14, maxDmg: 22 },
    { name: "10,000-LINE FILE", minDmg: 6, maxDmg: 26 },
];

export const HERO_MOVES = [
    { id: "refactor", label: "▶ REFACTOR", cost: "" },
    { id: "cache", label: "▶ CACHE", cost: "DEF+" },
    { id: "deploy", label: "▶ DEPLOY FRIDAY", cost: "12 MP" },
    { id: "coffee", label: "▶ COFFEE", cost: "HEAL" },
] as const;

export const DEPLOY_MP_COST = 12;
export const GUARD_MULTIPLIER = 0.35;
export const DEPLOY_FAIL_CHANCE = 0.25;

/** Damage/heal ranges for the hero's moves — all balance numbers live here. */
export const HERO_MOVE_STATS = {
    refactor: { minDmg: 18, maxDmg: 28 },
    deploy: { minDmg: 34, maxDmg: 48 },
    coffee: { minHeal: 22, maxHeal: 30, mpRegen: 6 },
} as const;

export const BATTLE_COPY = {
    intro: "A wild LEGACY CODEBASE appeared! It reeks of global variables…",
    cache: "You cached everything! Incoming damage will be served from memory. DEF up!",
    deployNoMp: "Not enough MP! Even heroes need CI minutes.",
    deployFail: "You used DEPLOY ON FRIDAY… it failed spectacularly! The pipeline is red!",
    faint: "You blacked out… git revert! (HP restored — this is a friendly portfolio.)",
    win: "LEGACY CODEBASE was refactored into oblivion! Gained 500 EXP and the title CODE SWORDSMAN.",
    winToast: "★ +500 EXP — BOSS DEFEATED ★",
    enemyTag: "© 2009",
} as const;
