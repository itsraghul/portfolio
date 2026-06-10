import { SEA_NOTES } from "@/constants/voyage";

function Squiggle() {
    return (
        <svg className="mt-1.5 block" width="70" height="10" viewBox="0 0 70 10" aria-hidden="true">
            <path d="M0 5 Q9 0 17 5 T35 5 T52 5 T70 5" stroke="#6b5536" fill="none" strokeWidth="1.4" />
        </svg>
    );
}

/** Hand-written margin notes scattered around the sea chart (desktop only). */
export default function SeaNotes() {
    return (
        <>
            {SEA_NOTES.map((note) => (
                <span
                    key={note.text}
                    className="absolute z-[2] font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-[rgba(107,85,54,.75)] max-[900px]:hidden"
                    style={note.position}
                    aria-hidden="true"
                >
                    {note.text}
                    <Squiggle />
                </span>
            ))}
        </>
    );
}
