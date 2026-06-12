import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "../types";

type SlideshowProps = {
  items: MediaItem[];
  interval?: number; // ms
};

export function Slideshow({ items, interval = 3000 }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pointerStartX = useRef<number | null>(null);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => {
      if (!isPaused) setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(t);
  }, [items.length, interval, isPaused]);

  const goPrev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goNext = () => setIndex((i) => (i + 1) % items.length);

  const onPointerDown = (e: React.PointerEvent) => {
    // only enable dragging for touch/pen; ignore mouse so desktop buttons remain clickable
    if (e.pointerType === "mouse") return;
    pointerStartX.current = e.clientX;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    setIsPaused(true);
    if (trackRef.current) trackRef.current.classList.add("dragging");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerStartX.current == null || !trackRef.current) return;
    const dx = e.clientX - pointerStartX.current;
    trackRef.current.style.transform = `translate3d(calc(${-index * 100}% + ${dx}px), 0, 0)`;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current == null) return;
    const dx = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    setIsPaused(false);
    if (Math.abs(dx) > 40) {
      if (dx > 0) goPrev();
      else goNext();
    }
    // re-enable transition by removing dragging class; React will set transform
    if (trackRef.current) trackRef.current.classList.remove("dragging");
  };

  return (
    <div
      className="slideshow"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="slideshow-track"
        ref={trackRef}
        style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
      >
        {items.map((it) => (
          <div className="slide" key={it.id}>
            <img src={it.src} alt={it.title} />
            <div className="slide-caption">{it.title}</div>
          </div>
        ))}
      </div>

      <button className="slideshow-prev" type="button" onClick={goPrev} aria-label="Previous">
        ‹
      </button>
      <button className="slideshow-next" type="button" onClick={goNext} aria-label="Next">
        ›
      </button>
    </div>
  );
}

export default Slideshow;
