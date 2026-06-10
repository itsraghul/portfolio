import { ReactNode } from "react";
import { World } from "@/types/worlds";
import { cn } from "@/lib/utils";

interface WorldShellProps {
    world: World;
    children: ReactNode;
    className?: string;
}

/** Roots a page in one of the themed worlds — sets the CSS variable scope. */
export default function WorldShell({ world, children, className }: WorldShellProps) {
    return (
        <div data-world={world} className={cn("min-h-screen", className)}>
            {children}
        </div>
    );
}
