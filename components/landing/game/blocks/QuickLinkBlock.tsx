import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface QuickLinkBlockProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export default function QuickLinkBlock({ title, description, href, icon: Icon }: QuickLinkBlockProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center h-full p-4 text-center group"
    >
      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
      <h3 className="text-sm font-bold font-mono mb-0.5">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Link>
  );
}
