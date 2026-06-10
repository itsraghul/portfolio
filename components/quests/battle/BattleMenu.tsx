"use client";

import { HERO_MOVES } from "@/constants/battle";
import { HeroMoveId } from "@/types/worlds";

interface BattleMenuProps {
    message: string;
    onMove: (move: HeroMoveId) => void;
}

/** Battle message box + the four move buttons. */
export default function BattleMenu({ message, onMove }: BattleMenuProps) {
    return (
        <div className="grid grid-cols-[1fr_250px] max-[980px]:grid-cols-1">
            <div className="min-h-[110px] border-r-[3px] border-[var(--frame)] px-[22px] py-[18px] text-2xl leading-[1.35] text-[var(--txt)] max-[980px]:border-b-[3px] max-[980px]:border-r-0" aria-live="polite">
                {message}
            </div>
            <div className="grid grid-rows-4">
                {HERO_MOVES.map((move) => (
                    <button
                        key={move.id}
                        type="button"
                        onClick={() => onMove(move.id)}
                        className="flex min-h-[44px] cursor-pointer items-center gap-2 border-b-2 border-[rgba(232,232,255,.15)] bg-transparent px-4 text-left font-pixel text-[10px] text-[var(--txt)] last:border-b-0 hover:bg-[rgba(255,210,74,.14)] hover:text-[var(--gold)]"
                    >
                        {move.label}
                        {move.cost && <span className="ml-auto text-[8px] text-[var(--mp)]">{move.cost}</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}
