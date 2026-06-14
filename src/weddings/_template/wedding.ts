import type { WeddingConfig } from "../../types";

export const templateWedding: WeddingConfig = {
  slug: "couple-slug",
  couple: {
    partnerOne: "Partner One",
    partnerTwo: "Partner Two",
    displayNames: "Partner One & Partner Two",
    tagline: "A celebration of love, family, and new beginnings.",
    story: "Add the couple's story here.",
  },
  weddingDate: "2026-08-29T09:30:00-04:00",
  timeZone: "America/New_York",
  heroImage:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
  theme: {
    name: "emerald",
  },
  accent: "#b24b5a",
  invitation: {
    greeting: "With full hearts, we invite you",
    message: "Join us for the wedding celebrations.",
  },
  entryInvitation: {
    enabled: true,
    eyebrow: "You are invited",
    message: "Together with their families, invite you to celebrate their wedding.",
    openLabel: "Open Invitation",
    rememberForSession: true,
  },
  events: [
    {
      id: "wedding",
      title: "Wedding Ceremony",
      type: "Wedding",
      date: "2026-08-29",
      startTime: "09:30",
      endTime: "12:30",
      dressCode: "Traditional or formal",
      note: "Please arrive early for seating.",
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
      venue: {
        name: "Venue Name",
        address: "Venue Address",
        city: "City, State",
        mapQuery: "Venue Name City State",
      },
    },
  ],
  gallery: [],
  rsvp: {
    deadline: "2026-08-01",
    contactName: "Contact Name",
    contactPhone: "+1 555-010-0000",
    googleFormUrl: "",
    googleFormEmbedUrl: "",
  },
};
