import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../lib/date";
import type { WeddingConfig } from "../types";

type InvitationGateProps = {
  wedding: WeddingConfig;
  onOpenInvitation?: () => void;
  onReveal: () => void;
  onComplete: () => void;
};

type GatePhase = "sealed" | "opening" | "unfolding" | "expanding" | "exiting";

export function InvitationGate({ wedding, onOpenInvitation, onReveal, onComplete }: InvitationGateProps) {
  const [phase, setPhase] = useState<GatePhase>("sealed");
  const timersRef = useRef<number[]>([]);
  const config = wedding.entryInvitation;

  useEffect(() => {
    document.body.classList.add("invitation-locked");
    return () => {
      document.body.classList.remove("invitation-locked");
      timersRef.current.forEach(window.clearTimeout);
    };
  }, []);

  const openInvitation = () => {
    if (phase !== "sealed") {
      return;
    }

    setPhase("opening");
    onOpenInvitation?.();
    timersRef.current = [
      window.setTimeout(() => setPhase("unfolding"), 620),
      window.setTimeout(() => setPhase("expanding"), 1_280),
      window.setTimeout(onReveal, 1_520),
      window.setTimeout(() => setPhase("exiting"), 2_180),
      window.setTimeout(onComplete, 2_820),
    ];
  };

  return (
    <div
      className={`invitation-gate invitation-${phase}`}
      style={
        {
          "--invitation-image": `url(${config?.backgroundImage ?? wedding.heroImage})`,
          "--invitation-site-image": `url(${wedding.heroImage})`,
        } as CSSProperties
      }
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
    >
      <div className="invitation-backdrop" />

      <button className="envelope-button" type="button" onClick={openInvitation} aria-label="Open wedding invitation">
        <span className="envelope-scene" aria-hidden="true">
          <span className="envelope-back" />
          <span className="invitation-card">
            <span className="invitation-card-panel invitation-card-panel-left" />
            <span className="invitation-card-panel invitation-card-panel-right" />
            <span className="invitation-card-surface" />
            <span className="invitation-card-preview">
              <span className="invitation-card-preview-header">
                <span>NT</span>
                <i />
                <i />
                <i />
              </span>
              <span className="invitation-card-preview-content">
                <small>{wedding.invitation.greeting}</small>
                <strong>{wedding.couple.displayNames}</strong>
                <time dateTime={wedding.weddingDate}>
                  {formatDate(wedding.weddingDate, { weekday: "long" }, wedding.timeZone)}
                </time>
              </span>
            </span>
          </span>
          <span className="envelope-letter-pocket" />
          <span className="envelope-flap" />
          <span className="envelope-seal">
            <strong>NT</strong>
          </span>
        </span>
        <span className="envelope-action">{config?.openLabel ?? "Open Invitation"}</span>
      </button>
    </div>
  );
}
