import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import type { WeddingConfig } from "../types";

type InvitationGateProps = {
  wedding: WeddingConfig;
  onReveal: () => void;
  onComplete: () => void;
};

type GatePhase = "sealed" | "opening" | "unfolding" | "exiting";

export function InvitationGate({ wedding, onReveal, onComplete }: InvitationGateProps) {
  const [phase, setPhase] = useState<GatePhase>("sealed");
  const config = wedding.entryInvitation;

  useEffect(() => {
    document.body.classList.add("invitation-locked");
    return () => document.body.classList.remove("invitation-locked");
  }, []);

  const openInvitation = () => {
    if (phase !== "sealed") {
      return;
    }

    setPhase("opening");
    window.setTimeout(() => setPhase("unfolding"), 1_150);
    window.setTimeout(() => {
      setPhase("exiting");
      onReveal();
    }, 2_850);
    window.setTimeout(onComplete, 3_550);
  };

  return (
    <div
      className={`invitation-gate invitation-${phase}`}
      style={
        {
          "--invitation-image": `url(${config?.backgroundImage ?? wedding.heroImage})`,
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
            <span className="invitation-card-monogram">NT</span>
          </span>
          <span className="envelope-letter-pocket" />
          <span className="envelope-flap" />
          <span className="envelope-seal">
            <strong>NT</strong>
          </span>
        </span>
      </button>
    </div>
  );
}
