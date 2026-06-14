export type Attendance = "yes" | "maybe" | "no";

export type Venue = {
  name: string;
  address: string;
  city: string;
  mapQuery: string;
  googleMapsUrl?: string;
  appleMapsUrl?: string;
};

export type WeddingEvent = {
  id: string;
  title: string;
  type: string;
  date: string;
  startTime?: string;
  endTime?: string;
  /** Optional multiple time ranges (label, start, end) to display for events like Reception */
  timeRanges?: Array<{
    label?: string;
    startTime: string;
    endTime?: string;
  }>;
  dressCode?: string;
  note?: string;
  venue: Venue;
  image: string;
};

export type MediaItem = {
  id: string;
  type: "photo" | "film" | "video" | "youtube";
  title: string;
  src: string;
  poster?: string;
};

export type WeddingThemeName = "rose" | "emerald" | "royal" | "coastal" | "midnight";

export type WeddingThemeOverrides = {
  accent?: string;
  ink?: string;
  muted?: string;
  paper?: string;
  page?: string;
  band?: string;
  dark?: string;
  darkAccent?: string;
  heroOverlay?: string;
};

export type WeddingThemeConfig = {
  name: WeddingThemeName;
  overrides?: WeddingThemeOverrides;
};

export type GoogleFormFieldIds = {
  fullName: string;
  email?: string;
  phone?: string;
  attendance: string;
  guests: string;
  events: string;
  guestNames?: string;
  message?: string;
};

export type GoogleFormOptionLabels = {
  attendance?: Partial<Record<Attendance, string>>;
  events?: Record<string, string>;
};

export type WeddingConfig = {
  slug: string;
  couple: {
    partnerOne: string;
    partnerTwo: string;
    displayNames: string;
    tagline: string;
    story: string;
    heroTitle?: string;
    portmanteau?: {
      text: string;
      segments: Array<{
        text: string;
        isPrimary: boolean;
      }>;
    };
  };
  weddingDate: string;
  timeZone: string;
  heroImage: string;
  theme: WeddingThemeConfig;
  /**
   * @deprecated Use theme.overrides.accent for new weddings.
   */
  accent: string;
  invitation: {
    greeting: string;
    message: string;
  };
  entryInvitation?: {
    enabled: boolean;
    eyebrow?: string;
    message?: string;
    openLabel?: string;
    backgroundImage?: string;
    rememberForSession?: boolean;
  };
  music?: {
    src: string;
    title?: string;
    loop?: boolean;
    volume?: number;
  };
  events: WeddingEvent[];
  gallery: MediaItem[];
  livestream?: {
    title: string;
    youtubeVideoId: string;
    startsAt: string;
  };
  rsvp: {
    deadline: string;
    contactName: string;
    contactPhone: string;
    googleFormUrl?: string;
    googleFormEmbedUrl?: string;
    googleFormFieldIds?: GoogleFormFieldIds;
    googleFormOptionLabels?: GoogleFormOptionLabels;
    maxGuests?: number;
    formEndpoint?: string;
  };
};

export type RsvpSubmission = {
  name: string;
  email: string;
  phone: string;
  attendance: Attendance;
  guests: number;
  selectedEvents: string[];
  guestNames?: string;
  message: string;
};
