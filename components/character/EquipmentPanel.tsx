import { EQUIPMENT } from "@/constants/character";

/** Equipped gear list — slots with themed stat bonuses. */
export default function EquipmentPanel() {
    return (
        <section className="ffbox px-6 py-[22px]">
            <div className="font-pixel text-[11px] text-[var(--gold)]">— EQUIPMENT —</div>
            <div className="mt-3.5 grid gap-[9px]">
                {EQUIPMENT.map((row) => (
                    <div
                        key={row.slot}
                        className="flex justify-between gap-3.5 border-b border-dashed border-[rgba(232,232,255,.18)] pb-[7px] text-[21px]"
                    >
                        <span className="whitespace-nowrap text-[var(--dim)]">{row.slot}</span>
                        <span className="text-right text-[var(--txt)]">
                            {row.item} <small className="text-[15px] text-[var(--gold)]">{row.bonus}</small>
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
