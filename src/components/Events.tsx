import { CalendarDays, Clock, MapPin, Shirt } from "lucide-react";
import { useMemo, useState } from "react";
import type { WeddingEvent } from "../types";
import { formatDate, formatTime, getTimeZoneAbbreviation, sortByDateTime } from "../lib/date";

type EventsProps = {
  events: WeddingEvent[];
  timeZone: string;
};

export function Events({ events, timeZone }: EventsProps) {
  const [activeType, setActiveType] = useState("All");
  const eventTypes = useMemo(() => ["All", ...Array.from(new Set(events.map((event) => event.type)))], [events]);
  const visibleEvents = sortByDateTime(
    activeType === "All" ? events : events.filter((event) => event.type === activeType),
  );

  return (
    <section id="events" className="section events-section">
      <div className="section-heading">
        <p className="eyebrow">Schedule</p>
        <h2>Every ceremony and celebration in one place.</h2>
      </div>
      <div className="segment-control" role="tablist" aria-label="Filter events">
        {eventTypes.map((type) => (
          <button
            key={type}
            className={activeType === type ? "active" : ""}
            onClick={() => setActiveType(type)}
            type="button"
          >
            {type}
          </button>
        ))}
      </div>
      <div className="event-grid">
        {visibleEvents.map((event) => (
          <article className={`event-card event-card-${event.id}`} key={event.id}>
            <img src={event.image} alt={`${event.title} celebration`} />
            <div className="event-body">
              <div>
                <p className="event-type">{event.type}</p>
                <h3>{event.title}</h3>
              </div>
              <ul>
                <li>
                  <CalendarDays size={18} />
                  <span>{formatDate(event.date)}</span>
                </li>
                <li>
                  <Clock size={18} />
                  <span>
                    {formatTime(event.date, event.startTime)}
                    {event.endTime ? ` - ${formatTime(event.date, event.endTime)}` : ""}
                    {` ${getTimeZoneAbbreviation(event.date, timeZone)}`}
                  </span>
                </li>
                <li>
                  <MapPin size={18} />
                  <span>
                    {event.venue.name}, {event.venue.city}
                  </span>
                </li>
                {event.dressCode && (
                  <li>
                    <Shirt size={18} />
                    <span>{event.dressCode}</span>
                  </li>
                )}
              </ul>
              {event.note && <p className="event-note">{event.note}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
