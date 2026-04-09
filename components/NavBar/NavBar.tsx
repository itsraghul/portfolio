"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MenuIcon, XIcon } from "lucide-react";
import LogoLight from "../../public/images/PortfolioLogo-transparent.png";
import LogoDark from "../../public/images/PortfolioLogoDark-transparent.png";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import MagneticWrapper from "../Cursor/MagneticWrapper";
import { TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_LINKS = ["experience", "projects", "skills", "about"] as const;

export default function NavBar() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const LOGO = mounted && theme === "dark" ? LogoDark : LogoLight;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="cursor-pointer">
          <Image src={LOGO} alt="Raghul Logo" width={30} height={30} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex flex-row gap-6 items-center">
          {PAGE_LINKS.map((link) => (
            <li key={link}>
              <MagneticWrapper strength={0.4}>
                <Link
                  href={`/${link}`}
                  className={cn(
                    "font-mono text-sm capitalize transition-colors hover:text-primary",
                    pathname === `/${link}`
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {link}
                </Link>
              </MagneticWrapper>
            </li>
          ))}
          <li>
            <MagneticWrapper strength={0.4}>
              <Link
                href="/terminal"
                title="Open terminal"
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:text-primary hover:bg-secondary/50",
                  pathname === "/terminal"
                    ? "text-primary bg-secondary/50"
                    : "text-muted-foreground"
                )}
              >
                <TerminalIcon className="w-4 h-4" />
              </Link>
            </MagneticWrapper>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {mobileOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
          <ul className="flex flex-col gap-1 p-4">
            {PAGE_LINKS.map((link) => (
              <li key={link}>
                <Link
                  href={`/${link}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-2 px-3 rounded-lg font-mono text-sm capitalize transition-colors",
                    pathname === `/${link}`
                      ? "text-primary bg-secondary/50 font-semibold"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/30"
                  )}
                >
                  {link}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/terminal"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 py-2 px-3 rounded-lg font-mono text-sm transition-colors",
                  pathname === "/terminal"
                    ? "text-primary bg-secondary/50 font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/30"
                )}
              >
                <TerminalIcon className="w-4 h-4" />
                terminal
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
