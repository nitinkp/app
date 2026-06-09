import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import type { WeddingConfig } from "../types";

type InvitationGateProps = {
  wedding: WeddingConfig;
  onComplete: () => void;
};

type GatePhase = "sealed" | "opening" | "exiting";

export function InvitationGate({ wedding, onComplete }: InvitationGateProps) {
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
    window.setTimeout(() => setPhase("exiting"), 1_400);
    window.setTimeout(onComplete, 2_100);
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
