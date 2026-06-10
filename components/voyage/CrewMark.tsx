import { CrewMarkId } from "@/types/worlds";

/* Engraved jolly-roger "crew marks" for the wanted posters — original
   pirate-dev emblems from the design handoff. All four share the straw-hatted
   skull skeleton (shifted vertically per mark); each chapter keeps its own
   identity through the hat band and surrounding emblems. */

const INK = "#3a2a16";
const BONE = "#efe1c2";
const STRAW = "#dcbb62";
const STRAW_SHADE = "#b08a3e";
const RUST = "#a5552e";
const SEA = "#2e5f6e";

function Ring({ cy }: { cy: number }) {
    return <circle cx="100" cy={cy} r="74" stroke="#9c7c45" strokeWidth="2" strokeDasharray="4 6" />;
}

/** Skull + jaw, vertically shifted by dy from the base layout. */
function Skull({ dy = 0, teeth = true }: { dy?: number; teeth?: boolean }) {
    return (
        <g transform={`translate(0 ${dy})`}>
            <ellipse cx="100" cy="76" rx="38" ry="35" fill={BONE} stroke={INK} strokeWidth="3" />
            <rect x="84" y="100" width="32" height="16" rx="7" fill={BONE} stroke={INK} strokeWidth="3" />
            {teeth && (
                <>
                    <line x1="94" y1="102" x2="94" y2="112" stroke={INK} strokeWidth="2" />
                    <line x1="100" y1="102" x2="100" y2="112" stroke={INK} strokeWidth="2" />
                    <line x1="106" y1="102" x2="106" y2="112" stroke={INK} strokeWidth="2" />
                </>
            )}
            <circle cx="86" cy="76" r="8" fill={INK} />
            <circle cx="114" cy="76" r="8" fill={INK} />
            <polygon points="100,86 95,95 105,95" fill={INK} />
        </g>
    );
}

/** Woven straw hat with stitch detailing; band color/badge varies per chapter. */
function StrawHat({ dy = 0, band = RUST, children }: { dy?: number; band?: string; children?: React.ReactNode }) {
    return (
        <g transform={`translate(0 ${dy})`}>
            <ellipse cx="100" cy="52" rx="55" ry="11" fill={STRAW} stroke={INK} strokeWidth="2.5" />
            <ellipse cx="100" cy="52" rx="44" ry="8" stroke={STRAW_SHADE} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <path d="M70 52 Q70 20 100 20 Q130 20 130 52 Z" fill={STRAW} stroke={INK} strokeWidth="2.5" />
            <path d="M73 32 Q100 24 127 32" stroke={STRAW_SHADE} strokeWidth="1.5" fill="none" />
            <path d="M71 51 Q100 43 129 51 L129 42 Q100 34 71 42 Z" fill={band} stroke={INK} strokeWidth="2" />
            {children}
        </g>
    );
}

function NavigatorMark() {
    return (
        <svg viewBox="0 0 200 170" fill="none" className="h-full w-full" aria-label="Crew mark — the apprentice navigator" role="img">
            <Ring cy={82} />
            {/* crossed bones */}
            <line x1="42" y1="50" x2="158" y2="118" stroke={INK} strokeWidth="8" strokeLinecap="round" />
            <line x1="158" y1="50" x2="42" y2="118" stroke={INK} strokeWidth="8" strokeLinecap="round" />
            <Skull />
            <StrawHat>
                {/* cloud badge on band (azure days) */}
                <circle cx="95" cy="44" r="3.5" fill={BONE} />
                <circle cx="100" cy="42" r="4" fill={BONE} />
                <circle cx="105" cy="44" r="3" fill={BONE} />
                <rect x="92" y="43" width="16" height="4" rx="2" fill={BONE} />
            </StrawHat>
            {/* compass needle below */}
            <circle cx="100" cy="142" r="13" fill={BONE} stroke={INK} strokeWidth="2.5" />
            <polygon points="100,132 104,142 100,152 96,142" fill={RUST} stroke={INK} strokeWidth="1.5" />
        </svg>
    );
}

function SlayerMark() {
    return (
        <svg viewBox="0 0 200 170" fill="none" className="h-full w-full" aria-label="Crew mark — slayer of legacy code" role="img">
            <Ring cy={82} />
            {/* crossed wrench + cutlass */}
            <line x1="46" y1="122" x2="148" y2="44" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            <circle cx="152" cy="41" r="10" fill="none" stroke={INK} strokeWidth="6" />
            <line x1="154" y1="122" x2="58" y2="48" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            <polygon points="58,48 44,38 52,54" fill={INK} />
            <line x1="144" y1="108" x2="160" y2="130" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <Skull />
            <StrawHat />
            {/* slain bug below */}
            <ellipse cx="100" cy="144" rx="11" ry="8" fill={BONE} stroke={INK} strokeWidth="2.5" />
            <line x1="89" y1="138" x2="82" y2="133" stroke={INK} strokeWidth="2" />
            <line x1="89" y1="148" x2="82" y2="153" stroke={INK} strokeWidth="2" />
            <line x1="111" y1="138" x2="118" y2="133" stroke={INK} strokeWidth="2" />
            <line x1="111" y1="148" x2="118" y2="153" stroke={INK} strokeWidth="2" />
            <line x1="86" y1="131" x2="114" y2="157" stroke={RUST} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="114" y1="131" x2="86" y2="157" stroke={RUST} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
    );
}

function SwordsmanMark() {
    return (
        <svg viewBox="0 0 200 170" fill="none" className="h-full w-full" aria-label="Crew mark — the three-stack swordsman" role="img">
            <Ring cy={82} />
            {/* two crossed blades behind */}
            <line x1="48" y1="126" x2="144" y2="40" stroke={INK} strokeWidth="6" strokeLinecap="round" />
            <polygon points="144,40 156,30 150,46" fill={INK} />
            <line x1="152" y1="126" x2="56" y2="40" stroke={INK} strokeWidth="6" strokeLinecap="round" />
            <polygon points="56,40 44,30 50,46" fill={INK} />
            <line x1="56" y1="112" x2="40" y2="126" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="144" y1="112" x2="160" y2="126" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
            <Skull dy={-2} teeth={false} />
            <StrawHat dy={-2} band={SEA} />
            {/* third blade clenched in jaw */}
            <line x1="58" y1="106" x2="142" y2="106" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <polygon points="142,106 156,102 148,111" fill={INK} />
            <rect x="52" y="100" width="7" height="13" rx="2" fill={RUST} stroke={INK} strokeWidth="2" />
            {/* code brackets flanking */}
            <text x="26" y="90" fontFamily="var(--font-share-tech), monospace" fontSize="30" fontWeight="700" fill={INK}>
                {"{"}
            </text>
            <text x="160" y="90" fontFamily="var(--font-share-tech), monospace" fontSize="30" fontWeight="700" fill={INK}>
                {"}"}
            </text>
            {/* stack of three plates below */}
            <rect x="82" y="130" width="36" height="7" rx="3" fill={SEA} stroke={INK} strokeWidth="1.5" />
            <rect x="82" y="140" width="36" height="7" rx="3" fill={RUST} stroke={INK} strokeWidth="1.5" />
            <rect x="82" y="150" width="36" height="7" rx="3" fill={STRAW_SHADE} stroke={INK} strokeWidth="1.5" />
        </svg>
    );
}

function EmperorMark() {
    return (
        <svg viewBox="0 0 200 170" fill="none" className="h-full w-full" aria-label="Crew mark — emperor of the new world stack" role="img">
            <Ring cy={84} />
            {/* crossed lightning bolts */}
            <polygon points="50,46 78,72 70,74 96,98 88,100 116,126 100,96 108,94 84,70 92,68" fill={INK} />
            <polygon points="150,46 122,72 130,74 104,98 112,100 84,126 100,96 92,94 116,70 108,68" fill={INK} />
            <Skull dy={8} />
            <StrawHat dy={8}>
                {/* crown badge on band (emperor-class) */}
                <polygon points="92,46 95,38 100,42 105,38 108,46" fill={STRAW_SHADE} stroke={INK} strokeWidth="1.5" />
            </StrawHat>
            {/* terminal sigil below */}
            <rect x="78" y="134" width="44" height="24" rx="4" fill={INK} />
            <text x="86" y="151" fontFamily="var(--font-share-tech), monospace" fontSize="15" fontWeight="700" fill={BONE}>
                {">_"}
            </text>
        </svg>
    );
}

const MARKS: Record<CrewMarkId, () => React.ReactNode> = {
    navigator: NavigatorMark,
    slayer: SlayerMark,
    swordsman: SwordsmanMark,
    emperor: EmperorMark,
};

/** The chapter's jolly-roger emblem, sized by the parent mug frame. */
export default function CrewMark({ id }: { id: CrewMarkId }) {
    const Mark = MARKS[id];
    return <Mark />;
}
