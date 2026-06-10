import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HudPanelProps {
    children: ReactNode;
    className?: string;
    as?: ElementType;
    [key: string]: unknown;
}

/** Glassmorphic HUD panel with four cyan corner brackets (ship world). */
export default function HudPanel({ children, className, as: Tag = "div", ...rest }: HudPanelProps) {
    return (
        <Tag className={cn("hud", className)} {...rest}>
            <span className="hud-c3" aria-hidden="true" />
            <span className="hud-c4" aria-hidden="true" />
            {children}
        </Tag>
    );
}
