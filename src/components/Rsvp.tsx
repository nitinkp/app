import { CheckCircle2, ExternalLink, Mail, Minus, Plus, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { Attendance, RsvpSubmission, WeddingConfig } from "../types";
import { formatDate } from "../lib/date";

type RsvpProps = {
  wedding: WeddingConfig;
};

const emptySubmission = (eventIds: string[]): RsvpSubmission => ({
  name: "",
  email: "",
  phone: "",
  attendance: "yes",
  guests: 1,
  selectedEvents: eventIds,
  message: "",
});

const getGoogleFormActionUrl = (formUrl: string) => formUrl.split("/viewform")[0] + "/formResponse";

const appendIfPresent = (data: URLSearchParams, key: string | undefined, value: string | number | undefined) => {
  if (key && value !== undefined && String(value).trim()) {
    data.append(key, String(value));
  }
};

const hasRequiredGoogleFormFields = (rsvp: WeddingConfig["rsvp"]) =>
  Boolean(
    rsvp.googleFormUrl &&
      rsvp.googleFormFieldIds?.fullName &&
      rsvp.googleFormFieldIds.email &&
      rsvp.googleFormFieldIds.attendance &&
      rsvp.googleFormFieldIds.guests &&
      rsvp.googleFormFieldIds.events,
  );

export function Rsvp({ wedding }: RsvpProps) {
  const hasGoogleFormDirectSubmit = hasRequiredGoogleFormFields(wedding.rsvp);
  const isGoogleFormRsvp = !hasGoogleFormDirectSubmit && Boolean(wedding.rsvp.googleFormUrl || wedding.rsvp.googleFormEmbedUrl);
  const googleFormUrl = wedding.rsvp.googleFormUrl ?? wedding.rsvp.googleFormEmbedUrl;
  const eventIds = useMemo(() => wedding.events.map((event) => event.id), [wedding.events]);
  const storageKey = `wedding-rsvp:${wedding.slug}`;
  const [submission, setSubmission] = useState<RsvpSubmission>(() => {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : emptySubmission(eventIds);
  });
  const [status, setStatus] = useState<"idle" | "saved" | "sending" | "sent" | "error">("idle");

  const update = <K extends keyof RsvpSubmission>(key: K, value: RsvpSubmission[K]) => {
    setSubmission((current) => ({ ...current, [key]: value }));
  };

  const toggleEvent = (eventId: string) => {
    setSubmission((current) => {
      const selectedEvents = current.selectedEvents.includes(eventId)
        ? current.selectedEvents.filter((id) => id !== eventId)
        : [...current.selectedEvents, eventId];
      return { ...current, selectedEvents };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(wedding.rsvp.formEndpoint || hasGoogleFormDirectSubmit ? "sending" : "saved");
    window.localStorage.setItem(storageKey, JSON.stringify(submission));

    if (wedding.rsvp.googleFormUrl && wedding.rsvp.googleFormFieldIds) {
      const fieldIds = wedding.rsvp.googleFormFieldIds;
      const optionLabels = wedding.rsvp.googleFormOptionLabels;
      const formData = new URLSearchParams();

      appendIfPresent(formData, "emailAddress", submission.email);
      appendIfPresent(formData, fieldIds.fullName, submission.name);
      appendIfPresent(formData, fieldIds.email, submission.email);
      appendIfPresent(formData, fieldIds.phone, submission.phone);
      appendIfPresent(
        formData,
        fieldIds.attendance,
        optionLabels?.attendance?.[submission.attendance] ?? submission.attendance,
      );
      appendIfPresent(formData, fieldIds.guests, submission.guests);
      appendIfPresent(formData, fieldIds.message, submission.message);

      submission.selectedEvents.forEach((eventId) => {
        appendIfPresent(formData, fieldIds.events, optionLabels?.events?.[eventId] ?? eventId);
      });

      formData.append("fvv", "1");
      formData.append("pageHistory", "0");
      formData.append("submit", "Submit");

      try {
        await fetch(getGoogleFormActionUrl(wedding.rsvp.googleFormUrl), {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        });
        setStatus("sent");
      } catch {
        setStatus("error");
      }

      return;
    }

    if (!wedding.rsvp.formEndpoint) {
      return;
    }

    try {
      const response = await fetch(wedding.rsvp.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="section rsvp-section">
      <div className="section-heading">
        <p className="eyebrow">RSVP</p>
        <h2>Save your seat by {formatDate(wedding.rsvp.deadline)}.</h2>
      </div>
      {isGoogleFormRsvp && googleFormUrl ? (
        <div className="google-rsvp">
          <div className="google-rsvp-copy">
            <h3>RSVP through Google Forms</h3>
            <p>
              Your response will be collected securely in the wedding RSVP spreadsheet. Please submit one response per
              household.
            </p>
            <a className="primary-button" href={googleFormUrl} target="_blank" rel="noreferrer">
              <Send size={18} />
              Open RSVP Form
              <ExternalLink size={16} />
            </a>
          </div>
          {wedding.rsvp.googleFormEmbedUrl && (
            <div className="google-form-frame">
              <iframe src={wedding.rsvp.googleFormEmbedUrl} title={`${wedding.couple.displayNames} RSVP form`}>
                Loading...
              </iframe>
            </div>
          )}
        </div>
      ) : (
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Full name
            <input
              required
              value={submission.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={submission.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Phone
            <input
              value={submission.phone}
              onChange={(event) => update("phone", event.target.value)}
              placeholder="+1 555 000 0000"
            />
          </label>
          <label>
            Guests
            <div className="stepper">
              <button type="button" aria-label="Decrease guests" onClick={() => update("guests", Math.max(1, submission.guests - 1))}>
                <Minus size={16} />
              </button>
              <output>{submission.guests}</output>
              <button type="button" aria-label="Increase guests" onClick={() => update("guests", submission.guests + 1)}>
                <Plus size={16} />
              </button>
            </div>
          </label>
        </div>
        <fieldset className="attendance">
          <legend>Can you attend?</legend>
          {(["yes", "maybe", "no"] as Attendance[]).map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="attendance"
                checked={submission.attendance === option}
                onChange={() => update("attendance", option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="event-picker">
          <legend>Events you plan to attend</legend>
          {wedding.events.map((event) => (
            <label key={event.id}>
              <input
                type="checkbox"
                checked={submission.selectedEvents.includes(event.id)}
                onChange={() => toggleEvent(event.id)}
              />
              <span>{event.title}</span>
            </label>
          ))}
        </fieldset>
        <label>
          Message
          <textarea
            value={submission.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Meal notes, blessings, song requests..."
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="primary-button">
            <Send size={18} />
            Submit RSVP
          </button>
          <a href={`mailto:${submission.email || ""}`} className="secondary-link" aria-label="Email RSVP copy">
            <Mail size={18} />
          </a>
          {status !== "idle" && (
            <p className={`form-status ${status}`}>
              <CheckCircle2 size={18} />
              {status === "saved" && "RSVP saved locally. Add a formEndpoint in the config to send responses."}
              {status === "sending" && "Sending RSVP..."}
              {status === "sent" && "RSVP sent."}
              {status === "error" && `Saved locally. Please contact ${wedding.rsvp.contactName} at ${wedding.rsvp.contactPhone}.`}
            </p>
          )}
        </div>
      </form>
      )}
    </section>
  );
}
