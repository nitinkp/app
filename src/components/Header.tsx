import { CalendarDays, Heart, PlayCircle, Send, Sparkles } from "lucide-react";
import type { WeddingConfig } from "../types";

type HeaderProps = {
  wedding: WeddingConfig;
  isVisible?: boolean;
};

const links = [
  { href: "#events", label: "Events", icon: CalendarDays },
  { href: "#rsvp", label: "RSVP", icon: Send },
  { href: "#gallery", label: "Media", icon: Sparkles },
  { href: "#live", label: "Live", icon: PlayCircle },
];

export function Header({ wedding, isVisible = true }: HeaderProps) {
  return (
    <header className={`site-header ${isVisible ? "" : "header-hidden"}`.trim()}>
      <a className="brand" href="#home" aria-label="Go to top">
        <Heart size={18} fill="currentColor" />
        <span>{wedding.couple.displayNames}</span>
      </a>
      <nav aria-label="Primary navigation">
        {links.map(({ href, label, icon: Icon }) => (
          <a key={href} href={href}>
            <Icon size={17} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
