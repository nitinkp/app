import type { WeddingConfig } from "../../types";

export const nithinTejuWedding: WeddingConfig = {
  slug: "nithin-teju",
  couple: {
    partnerOne: "Nithin",
    partnerTwo: "Tejaswini",
    displayNames: "Nithin & Tejaswini",
    tagline: "Join us as we celebrate the beginning of forever.",
    story:
      "From meeting in college nearly a decade ago to growing together through every chapter since, our story has been built on friendship, laughter, and shared dreams. This weekend is a celebration of all of it.",
    heroTitle: "#IntheLife",
    portmanteau: {
      text: "nithIN + THEjaswini",
      segments: [
        { text: "nith", isPrimary: true },
        { text: "IN", isPrimary: false },
        { text: " + ", isPrimary: true },
        { text: "THE", isPrimary: false },
        { text: "jaswini", isPrimary: true },
      ],
    },
  },
  weddingDate: "2026-08-29T09:30:00-04:00",
  timeZone: "America/New_York",
  heroImage:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
  theme: {
    name: "rose",
  },
  accent: "#b24b5a",
  invitation: {
    greeting: "Our next chapter begins.",
    message:
      "Come celebrate with us through cherished traditions, joyful moments, and unforgettable memories.",
  },
  entryInvitation: {
    enabled: true,
    eyebrow: "A celebration awaits",
    message: "Together with their families, invite you to celebrate their wedding.",
    openLabel: "Open invitation",
    backgroundImage: "/weddings/nithin-teju/gallery/save-the-date-film.png",
    rememberForSession: false,
  },
  events: [
    {
      id: "haldi",
      title: "Haldi",
      type: "Ceremony",
      date: "2026-08-27",
      startTime: "17:00",
      dressCode: "Biege, Yellow, or Florals",
      note: "Expect turmeric, games, laughter, and sunlight.",
      image: "/weddings/nithin-teju/gallery/haldi%20photo.jpg",
      venue: {
        name: "Address here",
        address: "Address here",
        city: "Cumming, GA",
        mapQuery: "Address here",
      },
    },
    {
      id: "mehendi",
      title: "Mehendi",
      type: "Celebration",
      date: "2026-08-28",
      startTime: "15:00",
      dressCode: "Colorful traditional attire, Mehendi-friendly",
      note: "Henna, music, dancing, and celebration.",
      image: "/weddings/nithin-teju/gallery/inthe_mehendi.jpeg",
      venue: {
        name: "Address here",
        address: "Address here",
        city: "Cumming, GA",
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
      dressCode: "Traditional Indian Attire",
      note: "The actual jeelakarra-bellam (Cumin-Jaggery) muhurtham is 10:01 AM.",
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
      venue: {
        name: "Reflections Event Space",
        address: "215 Advantage Dr Suite 100",
        city: "Cumming, GA",
        mapQuery: "Reflections Event Space, 215 Advantage Drive Suite 100, Cumming, GA 30040",
      },
    },
    {
      id: "reception",
      title: "Reception & Cocktail Party",
      type: "Reception & Cocktail",
      date: "2026-08-29",
      startTime: "19:00",
      endTime: "23:30",
      timeRanges: [
        { label: "Main Event", startTime: "19:00", endTime: "23:00" },
        { label: "After Party", startTime: "23:00", endTime: "01:00" },
      ],
      dressCode: "Men - Blazers / Tuxedos, Women - Sharara Suits",
      note: "Dinner, cocktails, dancing, and a few happy tears.",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      venue: {
        name: "Reflections Event Space",
        address: "215 Advantage Dr Suite 100",
        city: "Cumming, GA",
        mapQuery: "Reflections Event Space, 215 Advantage Drive Suite 100, Cumming, GA 30040",
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
    startsAt: "2026-08-29T09:30:00-04:00",
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
      guestNames: "entry.1401189441",
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
        mehendi: "Mehendi",
        wedding: "Wedding Ceremony",
        reception: "Reception & Cocktail Party",
      },
    },
  },
};
