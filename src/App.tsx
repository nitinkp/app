import { Events } from "./components/Events";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { InvitationGate } from "./components/InvitationGate";
import { LiveStream } from "./components/LiveStream";
import { Rsvp } from "./components/Rsvp";
import { Story } from "./components/Story";
import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getThemeStyle } from "./themes";
import type { WeddingConfig } from "./types";
import {
  defaultWeddingSlug,
  getAvailableWeddings,
  getWeddingBySlug,
  hasWeddingSlug,
  normalizeWeddingSlug,
} from "./weddings";

const getRequestedWeddingSlug = (): string => {
  const [pathSlugValue] = window.location.pathname.split("/").filter(Boolean);
  const pathSlug = normalizeWeddingSlug(pathSlugValue);

  if (hasWeddingSlug(pathSlug)) {
    return pathSlug;
  }

  const envSlug =
    typeof import.meta.env.VITE_WEDDING_SLUG === "string" ? import.meta.env.VITE_WEDDING_SLUG : undefined;
  const normalizedEnvSlug = normalizeWeddingSlug(envSlug);

  if (hasWeddingSlug(normalizedEnvSlug)) {
    return normalizedEnvSlug;
  }

  if (pathSlug) {
    return pathSlug;
  }

  return defaultWeddingSlug;
};

function WeddingSite({ wedding }: { wedding: WeddingConfig }) {
  const musicRef = useRef<HTMLAudioElement>(null);
  const invitationStorageKey = `wedding-invitation-opened:${wedding.slug}`;
  const rememberForSession = wedding.entryInvitation?.rememberForSession ?? true;
  const [hasSeenInvitation] = useState(() => {
    if (!wedding.entryInvitation?.enabled) {
      return true;
    }

    return rememberForSession && window.sessionStorage.getItem(invitationStorageKey) === "true";
  });
  const [isInvitationOpen, setIsInvitationOpen] = useState(hasSeenInvitation);
  const [isInvitationVisible, setIsInvitationVisible] = useState(!hasSeenInvitation);
  const [didTransitionFromInvitation, setDidTransitionFromInvitation] = useState(false);
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    document.title = `${wedding.couple.displayNames} Wedding`;
  }, [wedding.couple.displayNames]);

  const revealInvitation = useCallback(() => {
    if (rememberForSession) {
      window.sessionStorage.setItem(invitationStorageKey, "true");
    }
    setDidTransitionFromInvitation(true);
    setIsInvitationOpen(true);
  }, [invitationStorageKey, rememberForSession]);

  const completeInvitation = useCallback(() => {
    setIsInvitationVisible(false);
  }, []);

  const playWeddingMusic = useCallback(() => {
    const audio = musicRef.current;

    if (!audio || !wedding.music) {
      return;
    }

    audio.volume = wedding.music.volume ?? 0.55;
    void audio
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false));
  }, [wedding.music]);

  const toggleWeddingMusic = useCallback(() => {
    const audio = musicRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      void audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false));
      return;
    }

    audio.pause();
    setIsMusicPlaying(false);
  }, []);

  useEffect(() => {
    if (!isInvitationOpen || isInvitationVisible || isHeaderRevealed) {
      return;
    }

    const revealHeader = () => setIsHeaderRevealed(true);
    const listenerOptions: AddEventListenerOptions = { passive: true, once: true };

    window.addEventListener("scroll", revealHeader, listenerOptions);
    window.addEventListener("pointerdown", revealHeader, listenerOptions);
    window.addEventListener("keydown", revealHeader, { once: true });

    return () => {
      window.removeEventListener("scroll", revealHeader);
      window.removeEventListener("pointerdown", revealHeader);
      window.removeEventListener("keydown", revealHeader);
    };
  }, [isHeaderRevealed, isInvitationOpen, isInvitationVisible]);

  return (
    <div
      className={[
        "wedding-app",
        `theme-${wedding.theme.name}`,
        !isInvitationOpen ? "invitation-pending" : "",
        didTransitionFromInvitation ? "invitation-complete" : "",
        isHeaderRevealed ? "header-revealed" : "",
      ].filter(Boolean).join(" ")}
      style={getThemeStyle(wedding.theme.name, wedding.theme.overrides)}
    >
      {isInvitationVisible && (
        <InvitationGate
          wedding={wedding}
          onOpenInvitation={playWeddingMusic}
          onReveal={revealInvitation}
          onComplete={completeInvitation}
        />
      )}
      <Header wedding={wedding} isVisible={isHeaderRevealed} />
      {wedding.music && (
        <>
          <audio
            ref={musicRef}
            src={wedding.music.src}
            loop={wedding.music.loop ?? true}
            preload="auto"
            onEnded={() => setIsMusicPlaying(false)}
            onPause={() => setIsMusicPlaying(false)}
            onPlay={() => setIsMusicPlaying(true)}
          />
          {isInvitationOpen && (
            <button
              className="music-control"
              type="button"
              onClick={toggleWeddingMusic}
              aria-label={isMusicPlaying ? "Pause wedding music" : "Play wedding music"}
            >
              {isMusicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          )}
        </>
      )}
      <main>
        <Hero wedding={wedding} />
        <Story wedding={wedding} />
        <Events events={wedding.events} timeZone={wedding.timeZone} />
        <Rsvp wedding={wedding} />
        <Gallery items={wedding.gallery} />
        {wedding.livestream && <LiveStream livestream={wedding.livestream} timeZone={wedding.timeZone} />}
      </main>
      <Footer wedding={wedding} />
    </div>
  );
}

function WeddingNotFound({ slug }: { slug: string }) {
  const availableWeddings = getAvailableWeddings();

  return (
    <main className="not-found">
      <section>
        <p className="eyebrow">Wedding not found</p>
        <h1>{slug}</h1>
        <p>Choose one of the configured wedding websites.</p>
        <div className="not-found-links">
          {availableWeddings.map((wedding) => (
            <a key={wedding.slug} href={`/${wedding.slug}`}>
              {wedding.couple.displayNames}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export function App() {
  const requestedSlug = getRequestedWeddingSlug();
  const wedding = getWeddingBySlug(requestedSlug);

  if (!wedding) {
    return <WeddingNotFound slug={requestedSlug} />;
  }

  return <WeddingSite wedding={wedding} />;
}
