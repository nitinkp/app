import { Image, PlayCircle, X } from "lucide-react";
import { useState } from "react";
import type { MediaItem } from "../types";
import Slideshow from "./Slideshow";

type GalleryProps = {
  items: MediaItem[];
};

export function Gallery({ items }: GalleryProps) {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-heading">
        <p className="eyebrow">Photos and films</p>
        <h2>Memories before the big day.</h2>
      </div>
      {items.length === 3 && items.every((it) => it.type === "photo") ? (
        <Slideshow items={items} interval={3000} />
      ) : (
        <div className="media-grid">
          {items.map((item) => (
            <button className="media-tile" key={item.id} type="button" onClick={() => setActiveItem(item)}>
              <img src={item.poster ?? item.src} alt={item.title} />
              <span>
                {item.type === "photo" ? <Image size={18} /> : <PlayCircle size={18} />}
                {item.title}
              </span>
            </button>
          ))}
        </div>
      )}
      {activeItem && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={activeItem.title}>
          <div className="media-modal">
            <button className="icon-button" type="button" aria-label="Close media" onClick={() => setActiveItem(null)}>
              <X size={20} />
            </button>
            {activeItem.type === "photo" || activeItem.type === "film" ? (
              <img src={activeItem.src} alt={activeItem.title} />
            ) : (
              <iframe
                src={activeItem.src}
                title={activeItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
            <h3>{activeItem.title}</h3>
          </div>
        </div>
      )}
    </section>
  );
}
