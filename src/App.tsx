import { Events } from "./components/Events";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LiveStream } from "./components/LiveStream";
import { Rsvp } from "./components/Rsvp";
import { Story } from "./components/Story";
import { Venues } from "./components/Venues";
import { useEffect } from "react";
import type { WeddingConfig } from "./types";
import { defaultWeddingSlug, getAvailableWeddings, getWeddingBySlug, normalizeWeddingSlug } from "./weddings";

const getRequestedWeddingSlug = (): string => {
  const envSlug =
    typeof import.meta.env.VITE_WEDDING_SLUG === "string" ? import.meta.env.VITE_WEDDING_SLUG : undefined;

  if (envSlug) {
    return normalizeWeddingSlug(envSlug) || defaultWeddingSlug;
  }

  const [pathSlug] = window.location.pathname.split("/").filter(Boolean);
  return normalizeWeddingSlug(pathSlug) || defaultWeddingSlug;
};

function WeddingSite({ wedding }: { wedding: WeddingConfig }) {
  useEffect(() => {
    document.title = `${wedding.couple.displayNames} Wedding`;
  }, [wedding.couple.displayNames]);

  return (
    <>
      <Header wedding={wedding} />
      <main>
        <Hero wedding={wedding} />
        <Story wedding={wedding} />
        <Events events={wedding.events} />
        <Rsvp wedding={wedding} />
        <Gallery items={wedding.gallery} />
        {wedding.livestream && <LiveStream livestream={wedding.livestream} />}
        <Venues events={wedding.events} />
      </main>
      <Footer wedding={wedding} />
    </>
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
