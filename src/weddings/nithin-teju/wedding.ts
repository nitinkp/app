import type { WeddingConfig } from "../../types";

export const nithinTejuWedding: WeddingConfig = {
  slug: "nithin-teju",
  couple: {
    partnerOne: "Nithin",
    partnerTwo: "Tejaswini",
    displayNames: "Nithin & Tejaswini",
    tagline: "Two families, one unforgettable weekend.",
    story:
      "From a coffee that became a tradition to a promise surrounded by the people they love, this celebration is built around warmth, color, music, and every tiny moment in between.",
  },
  weddingDate: "2026-08-29T09:30:00-07:00",
  heroImage:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
  theme: {
    name: "rose",
  },
  accent: "#b24b5a",
  invitation: {
    greeting: "With full hearts, we invite you",
    message:
      "Join us for ceremonies, music, food, dancing, blessings, and the people who make this new beginning feel like home.",
  },
  events: [
    {
      id: "haldi",
      title: "Haldi",
      type: "Ceremony",
      date: "2026-08-27",
      startTime: "17:00",
      endTime: "20:00",
      dressCode: "Biege, yellow, or florals",
      note: "Expect turmeric, games, laughter, and sunlight.",
      image:
        "https://images.unsplash.com/photo-1609151162377-794faf68b02f?auto=format&fit=crop&w=1200&q=80",
      venue: {
        name: "Address here",
        address: "Address here",
        city: "Atlanta, GA",
        mapQuery: "Address here",
      },
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      type: "Wedding",
      date: "2026-08-29",
      startTime: "09:30",
      endTime: "12:30",
      dressCode: "Traditional Indian attire",
      note: "The actual jeelakarra-bellam (Cumin-Jaggery) muhurtham is 10:01 AM.",
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
      venue: {
        name: "Reflections Event Space",
        address: "215 Advantage Dr Suite 100",
        city: "Cumming, GA",
        mapQuery: "Address here",
      },
    },
    {
      id: "reception",
      title: "Reception & Cocktail Party",
      type: "Reception & Cocktail",
      date: "2026-08-29",
      startTime: "19:00",
      endTime: "23:30",
      dressCode: "Men - Blazers / tuxedos, Women - Sharara suits",
      note: "Dinner, cocktails, dancing, and a few happy tears.",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      venue: {
        name: "Reflections Event Space",
        address: "215 Advantage Dr Suite 100",
        city: "Cumming, GA",
        mapQuery: "Address here",
      },
    },
  ],
  gallery: [
    {
      id: "engagement-portrait",
      type: "photo",
      title: "Memories",
      src: "/weddings/nithin-teju/gallery/engagement-portrait.jpeg",
    },
    {
      id: "proposal",
      type: "photo",
      title: "Moments",
      src: "/weddings/nithin-teju/gallery/the-proposal.jpeg",
    },
    {
      id: "save-the-date",
      type: "photo",
      title: "Save the Date - August 29, 2026",
      src: "/weddings/nithin-teju/gallery/save-the-date-film.jpeg",
    },
  ],
  livestream: {
    title: "Wedding Ceremony Live",
    youtubeVideoId: "jfKfPfyJRdk",
    startsAt: "2026-08-29T09:30:00-07:00",
  },
  rsvp: {
    deadline: "2026-08-15",
    contactName: "Yash",
    contactPhone: "+1 469-996-4010",
    googleFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSftaxwdHRtQc6H5BRk2DT9zWrbzeaowBzrMR6XAbpknZPauzA/viewform?usp=publish-editor",
    googleFormEmbedUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSftaxwdHRtQc6H5BRk2DT9zWrbzeaowBzrMR6XAbpknZPauzA/viewform?embedded=true",
    googleFormFieldIds: {
      fullName: "entry.280492329",
      email: "entry.508149769",
      phone: "entry.968995082",
      attendance: "entry.716561151",
      guests: "entry.625161931",
      events: "entry.801008396",
    },
    googleFormOptionLabels: {
      attendance: {
        yes: "Yes, I will attend",
        maybe: "Maybe",
        no: "Sorry, I cannot attend",
      },
      events: {
        haldi: "Haldi",
        wedding: "Wedding Ceremony",
        reception: "Reception & Cocktail Party",
      },
    },
  },
};
