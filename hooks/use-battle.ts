"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sfx";
import { bridgeToast } from "@/lib/toast";
import {
    BATTLE_COPY,
    DEPLOY_FAIL_CHANCE,
    DEPLOY_MP_COST,
    ENEMY_MOVES,
    GUARD_MULTIPLIER,
    HERO_MOVE_STATS,
    INITIAL_BATTLE_STATS,
} from "@/constants/battle";
import { BattleStats, HeroMoveId } from "@/types/worlds";

export interface DamagePop {
    id: number;
    x: string;
    y: string;
    text: string;
    color?: string;
}

export interface BattleView extends BattleStats {
    message: string;
    enemyState: "idle" | "hurt" | "dead";
    heroState: "idle" | "attack" | "hurt";
    pops: DamagePop[];
}

let popId = 0;

const rand = (min: number, max: number) => min + Math.floor(Math.random() * (max - min));

/** Turn-based boss battle vs THE LEGACY CODEBASE. */
export function useBattle(open: boolean) {
    // live mutable state (prototype-style) mirrored into React state for rendering
    const live = useRef({ ...INITIAL_BATTLE_STATS, guard: false, busy: false });
    const [view, setView] = useState<BattleView>({
        ...INITIAL_BATTLE_STATS,
        message: BATTLE_COPY.intro,
        enemyState: "idle",
        heroState: "idle",
        pops: [],
    });
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    const later = useCallback((fn: () => void, ms: number) => {
        timers.current.push(setTimeout(fn, ms));
    }, []);

    const sync = useCallback((patch?: Partial<BattleView>) => {
        const { eHp, eMax, hHp, hMax, mp, mpMax } = live.current;
        setView((prev) => ({ ...prev, eHp, eMax, hHp, hMax, mp, mpMax, ...patch }));
    }, []);

    const say = useCallback((message: string) => sync({ message }), [sync]);

    const pop = useCallback((x: string, y: string, text: string, color?: string) => {
        const id = popId++;
        setView((prev) => ({ ...prev, pops: [...prev.pops, { id, x, y, text, color }] }));
        later(() => setView((prev) => ({ ...prev, pops: prev.pops.filter((p) => p.id !== id) })), 850);
    }, [later]);

    // reset on open
    useEffect(() => {
        if (!open) return;
        live.current = { ...INITIAL_BATTLE_STATS, guard: false, busy: false };
        setView({
            ...INITIAL_BATTLE_STATS,
            message: BATTLE_COPY.intro,
            enemyState: "idle",
            heroState: "idle",
            pops: [],
        });
        sfx.warp();
        const currentTimers = timers.current;
        return () => {
            currentTimers.forEach(clearTimeout);
            timers.current = [];
        };
    }, [open]);

    const enemyTurn = useCallback(() => {
        const S = live.current;
        if (S.eHp <= 0) return;
        const move = ENEMY_MOVES[Math.floor(Math.random() * ENEMY_MOVES.length)];
        let dmg = rand(move.minDmg, move.maxDmg);
        if (S.guard) {
            dmg = Math.floor(dmg * GUARD_MULTIPLIER);
            S.guard = false;
        }
        S.hHp -= dmg;
        sync({ message: `LEGACY CODEBASE used ${move.name}! ${dmg} damage!`, heroState: "hurt" });
        pop("22%", "44%", `-${dmg}`, "#ff7b7b");
        sfx.hit();
        later(() => sync({ heroState: "idle" }), 350);
        if (S.hHp <= 0) {
            later(() => {
                S.hHp = S.hMax;
                S.mp = S.mpMax;
                S.busy = false;
                sync({ message: BATTLE_COPY.faint });
                sfx.error();
            }, 900);
        } else {
            S.busy = false;
        }
    }, [sync, pop, later]);

    const win = useCallback(() => {
        live.current.busy = false;
        sync({ message: BATTLE_COPY.win, enemyState: "dead" });
        sfx.fanfare();
        bridgeToast(BATTLE_COPY.winToast, 3200);
    }, [sync]);

    const heroAttack = useCallback(
        (name: string, dmg: number, sound: () => void) => {
            sync({ heroState: "attack" });
            later(() => sync({ heroState: "idle" }), 380);
            later(() => {
                const S = live.current;
                S.eHp -= dmg;
                sound();
                pop("74%", "26%", `-${dmg}`);
                sync({ message: `You used ${name}! ${dmg} damage!`, enemyState: "hurt" });
                later(() => sync({ enemyState: "idle" }), 320);
                if (S.eHp <= 0) later(win, 700);
                else later(enemyTurn, 1100);
            }, 300);
        },
        [sync, pop, later, win, enemyTurn]
    );

    const doMove = useCallback(
        (move: HeroMoveId) => {
            const S = live.current;
            if (S.busy || S.eHp <= 0) return;
            S.busy = true;

            if (move === "refactor") {
                heroAttack("REFACTOR", rand(HERO_MOVE_STATS.refactor.minDmg, HERO_MOVE_STATS.refactor.maxDmg), () => sfx.slash());
            } else if (move === "cache") {
                S.guard = true;
                say(BATTLE_COPY.cache);
                sfx.confirm();
                later(enemyTurn, 1000);
            } else if (move === "deploy") {
                if (S.mp < DEPLOY_MP_COST) {
                    S.busy = false;
                    say(BATTLE_COPY.deployNoMp);
                    return;
                }
                S.mp -= DEPLOY_MP_COST;
                if (Math.random() < DEPLOY_FAIL_CHANCE) {
                    sync({ message: BATTLE_COPY.deployFail });
                    sfx.error();
                    later(enemyTurn, 1100);
                } else {
                    heroAttack("DEPLOY ON FRIDAY", rand(HERO_MOVE_STATS.deploy.minDmg, HERO_MOVE_STATS.deploy.maxDmg), () => sfx.coin());
                }
            } else if (move === "coffee") {
                const heal = rand(HERO_MOVE_STATS.coffee.minHeal, HERO_MOVE_STATS.coffee.maxHeal);
                S.hHp = Math.min(S.hMax, S.hHp + heal);
                S.mp = Math.min(S.mpMax, S.mp + HERO_MOVE_STATS.coffee.mpRegen);
                sync({ message: `You drank COFFEE! Recovered ${heal} HP. The bugs seem smaller now.` });
                pop("22%", "40%", `+${heal}`, "var(--hp)");
                sfx.heal();
                later(enemyTurn, 1000);
            }
        },
        [heroAttack, say, sync, pop, later, enemyTurn]
    );

    return { view, doMove };
}
