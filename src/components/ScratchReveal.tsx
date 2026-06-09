import { CalendarHeart } from "lucide-react";
import type { CSSProperties, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { formatDate } from "../lib/date";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type ScratchRevealProps = {
  weddingDate: string;
  countdown: Countdown;
  timeZone: string;
};

const desktopRevealThreshold = 0.42;
const touchRevealThreshold = 0.3;
const desktopScratchRadius = 28;
const touchScratchRadius = 42;

export function ScratchReveal({ weddingDate, countdown, timeZone }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [celebrationColor, setCelebrationColor] = useState("#b24b5a");

  const drawCover = useCallback(() => {
    const canvas = canvasRef.current;
    const panel = panelRef.current;

    if (!canvas || !panel || isRevealed) {
      return;
    }

    const bounds = panel.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(bounds.width * pixelRatio);
    canvas.height = Math.round(bounds.height * pixelRatio);
    canvas.style.width = `${bounds.width}px`;
    canvas.style.height = `${bounds.height}px`;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.scale(pixelRatio, pixelRatio);
    const gradient = context.createLinearGradient(0, 0, bounds.width, bounds.height);
    gradient.addColorStop(0, "#d8c5c7");
    gradient.addColorStop(0.5, "#f0e2df");
    gradient.addColorStop(1, "#c9adb1");
    context.fillStyle = gradient;
    context.fillRect(0, 0, bounds.width, bounds.height);

    context.globalAlpha = 0.22;
    context.fillStyle = "#8e5962";
    for (let y = 18; y < bounds.height; y += 30) {
      for (let x = 18; x < bounds.width; x += 30) {
        context.beginPath();
        context.arc(x + ((y / 30) % 2) * 8, y, 2, 0, Math.PI * 2);
        context.fill();
      }
    }

    context.globalAlpha = 1;
    context.fillStyle = "#6f424a";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "800 15px Inter, system-ui, sans-serif";
    context.fillText("SCRATCH HERE", bounds.width / 2, bounds.height / 2 - 9);
    context.font = "600 12px Inter, system-ui, sans-serif";
    context.fillText("to reveal the date", bounds.width / 2, bounds.height / 2 + 14);
    context.setTransform(1, 0, 0, 1, 0, 0);
  }, [isRevealed]);

  useEffect(() => {
    drawCover();
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const observer = new ResizeObserver(drawCover);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [drawCover]);

  const reveal = useCallback(() => {
    if (isRevealed) {
      return;
    }

    setIsRevealed(true);
    const themeColor = panelRef.current
      ? window.getComputedStyle(panelRef.current).getPropertyValue("--dark-accent").trim()
      : "";
    setCelebrationColor(themeColor || "#b24b5a");
    setIsCelebrating(true);
    window.setTimeout(() => setIsCelebrating(false), 3_200);
  }, [isRevealed]);

  const scratchAt = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const scaleX = canvas.width / bounds.width;
    const scaleY = canvas.height / bounds.height;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.save();
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    const scratchRadius = event.pointerType === "touch" ? touchScratchRadius : desktopScratchRadius;
    context.arc(
      (event.clientX - bounds.left) * scaleX,
      (event.clientY - bounds.top) * scaleY,
      scratchRadius * Math.max(scaleX, scaleY),
      0,
      Math.PI * 2,
    );
    context.fill();
    context.restore();
  };

  const checkRevealProgress = (pointerType = "mouse") => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || isRevealed) {
      return;
    }

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    const sampleStep = 32;

    for (let index = 3; index < pixels.length; index += sampleStep) {
      if (pixels[index] < 80) {
        transparentPixels += 1;
      }
    }

    const threshold = pointerType === "touch" ? touchRevealThreshold : desktopRevealThreshold;
    if (transparentPixels / (pixels.length / sampleStep) >= threshold) {
      reveal();
    }
  };

  return (
    <div
      ref={panelRef}
      className={`scratch-reveal ${isRevealed ? "scratch-revealed" : ""}`}
      aria-label="Scratch to reveal the wedding date and countdown"
    >
      <div className="scratch-content">
        <div className="scratch-date">
          <CalendarHeart size={18} />
          <span>{formatDate(weddingDate, { weekday: "long" }, timeZone)}</span>
        </div>
        <div className="countdown" aria-label="Countdown to wedding">
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onPointerDown={(event) => {
            isDrawingRef.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            scratchAt(event);
          }}
          onPointerMove={(event) => {
            if (isDrawingRef.current) {
              scratchAt(event);
            }
          }}
          onPointerUp={(event) => {
            isDrawingRef.current = false;
            checkRevealProgress(event.pointerType);
          }}
          onPointerCancel={() => {
            isDrawingRef.current = false;
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              reveal();
            }
          }}
          role="button"
          tabIndex={0}
        />
      )}
      {isCelebrating &&
        createPortal(
          <div
            className="scratch-celebration"
            style={{ "--celebration-accent": celebrationColor } as CSSProperties}
            aria-hidden="true"
          >
            {Array.from({ length: 72 }, (_, index) => {
              const style = {
                "--delay": `${(index % 15) * 45}ms`,
                "--drift": `${((index % 7) - 3) * 28}px`,
                "--duration": `${2_150 + (index % 7) * 110}ms`,
                "--left": `${(index * 37) % 100}%`,
                "--rotation": `${index * 31}deg`,
              } as CSSProperties;

              return <i key={index} style={style} />;
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
