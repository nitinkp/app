import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import type { WeddingConfig } from "../types";
import { getCountdown } from "../lib/date";
import { ScratchReveal } from "./ScratchReveal";

type HeroProps = {
  wedding: WeddingConfig;
};

export function Hero({ wedding }: HeroProps) {
  const [countdown, setCountdown] = useState(() => getCountdown(wedding.weddingDate));

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown(wedding.weddingDate)), 1_000);
    return () => window.clearInterval(timer);
  }, [wedding.weddingDate]);

  return (
    <section
      id="home"
      className={`hero hero-${wedding.slug}`}
      style={
        {
          "--hero-image": `url(${wedding.heroImage})`,
        } as CSSProperties
      }
    >
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{wedding.invitation.greeting}</p>
          <h1>
            {wedding.couple.heroTitle || wedding.couple.displayNames}
            {wedding.couple.portmanteau && (
              <span className="hero-portmanteau">
                {wedding.couple.portmanteau.segments.map((segment, index) => (
                  <span key={index} className={`portmanteau-segment ${segment.isPrimary ? "primary" : "secondary"}`}>
                    {segment.text}
                  </span>
                ))}
              </span>
            )}
          </h1>
          <p className="hero-tagline">{wedding.couple.tagline}</p>
        </div>
        <ScratchReveal weddingDate={wedding.weddingDate} countdown={countdown} timeZone={wedding.timeZone} />
      </div>
      <a className="scroll-cue" href="#story">
        View invitation
      </a>
    </section>
  );
}
