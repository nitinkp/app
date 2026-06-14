# Life Moments Wedding Site

A configurable wedding website package for ceremonies, RSVP, photos, videos, YouTube livestreams, and venue maps.

## Run it locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Build for production

```bash
npm run build
```

The deployable output is written to `dist/`.

## Customize a wedding

Wedding-specific content lives in separate folders under `src/weddings/`.

Current wedding:

```text
src/weddings/nithin-teju/wedding.ts
```

The older `src/config/wedding.ts` file only re-exports Nithin and Teju's config for compatibility while the project moves to the folder-based structure.

Update these fields for each marriage:

- `couple`: names, tagline, and story.
- `weddingDate`: the main date used by the countdown.
- `timeZone`: IANA timezone for all wedding times, such as `America/New_York`.
- `heroImage`: first-screen background image.
- `theme`: visual preset and optional color overrides.
- `entryInvitation`: optional animated envelope shown before the website.
- `events`: add Haldi, Engagement, Wedding, Reception, Cocktail, Sangeet, or any custom event.
- `gallery`: photos, videos, and YouTube embeds.
- `livestream`: YouTube live video id and start time.
- `rsvp`: deadline, contact details, and optional `formEndpoint`.

## Add another wedding

1. Copy `src/weddings/_template/wedding.ts` into a new folder such as `src/weddings/arya-dev/`.
2. Change `slug` to the folder name, for example `arya-dev`.
3. Update names, dates, events, gallery, livestream, RSVP, and venues.
4. Register the config in `src/weddings/index.ts`.

## Change the theme per wedding

Each wedding config has a `theme` field:

```ts
theme: {
  name: "emerald",
}
```

Available presets:

```text
rose
emerald
royal
coastal
midnight
```

For a custom look, keep a preset and override only the colors you need:

```ts
theme: {
  name: "coastal",
  overrides: {
    accent: "#0f7287",
    paper: "#fbfffd",
    band: "#e6f2f0",
    dark: "#18343b",
    darkAccent: "#c9f3f4",
  },
}
```

This keeps the components reusable while letting every wedding have its own mood.

## Animated invitation

Each wedding can show an animated envelope before the main website:

```ts
entryInvitation: {
  enabled: true,
  eyebrow: "A celebration awaits",
  message: "Together with their families, invite you to celebrate their wedding.",
  openLabel: "Open Invitation",
  backgroundImage: "/weddings/couple-slug/gallery/save-the-date.png",
  rememberForSession: true,
}
```

Set `rememberForSession` to `false` to replay the envelope after every page refresh. Set `enabled` to `false` to skip the opening entirely.

Example registry entry:

```ts
import { aryaDevWedding } from "./arya-dev/wedding";

export const weddings = {
  [nithinTejuWedding.slug]: nithinTejuWedding,
  [aryaDevWedding.slug]: aryaDevWedding,
};
```

## Vercel hosting

You have two clean options:

- One Vercel project hosting many weddings: use URLs like `/nithin-teju` and `/arya-dev`.
- One Vercel project per wedding: set `VITE_WEDDING_SLUG=nithin-teju` in that project's environment variables.

`vercel.json` rewrites all paths to the React app, so refreshing `/nithin-teju` still works.

## RSVP delivery

By default, RSVP submissions are saved in the visitor's browser with `localStorage` so the flow works without a backend.

For a free production RSVP flow, use Google Forms:

1. Go to `https://forms.google.com`.
2. Create a blank form named something like `Nithin & Tejaswini RSVP`.
3. Add fields such as name, email, phone, attendance, guest count, events attending, meal notes, and message.
4. Click **Responses** and connect it to a Google Sheet.
5. Click **Send**.
6. Copy the regular form link into `googleFormUrl`.
7. Choose the embed tab `<>`, copy the iframe `src` URL, and paste it into `googleFormEmbedUrl`.

Example:

```ts
rsvp: {
  deadline: "2026-08-15",
  contactName: "Yash",
  contactPhone: "+1 469-996-4010",
  googleFormUrl: "https://forms.gle/your-form-link",
  googleFormEmbedUrl: "https://docs.google.com/forms/d/e/your-form-id/viewform?embedded=true",
}
```

### Use the custom RSVP design with Google Forms

The site can keep its own RSVP design and still send responses into Google Forms. To enable that, add the Google Forms hidden field IDs:

```ts
googleFormFieldIds: {
  fullName: "entry.111111111",
  email: "entry.222222222", // Omit when Google Forms collects responder email.
  phone: "entry.333333333",
  attendance: "entry.444444444",
  guests: "entry.555555555",
  events: "entry.666666666",
  message: "entry.777777777",
}
```

Set `rsvp.maxGuests` to the highest value available in the Google Form guest-count question. When Google Forms uses **Collect email addresses: Responder input**, the app submits the email through Google's built-in `emailAddress` field, so a separate Email question and entry ID are not needed.

How to find the IDs:

1. Open the published Google Form.
2. Right-click the page and choose **View Page Source**.
3. Search for your question text, such as `Full name`.
4. Nearby you will see an ID like `entry.123456789`.
5. Repeat for each question and paste those IDs into the wedding config.

The choice labels in `googleFormOptionLabels` must exactly match the Google Form options.

To collect real submissions, set `rsvp.formEndpoint` in that wedding's `wedding.ts` file to a POST endpoint from Formspree, Basin, Netlify Forms, your own API, or any compatible service.

## Maps

Each event has a `venue` with a `mapQuery`. The site automatically creates:

- an embedded Google map
- a Google Maps directions link
- an Apple Maps directions link

You can override generated links with `googleMapsUrl` or `appleMapsUrl` per venue.

## Extend the package

The app is organized by reusable sections in `src/components/` and shared data types in `src/types.ts`. Add new wedding concepts by extending `WeddingConfig`, then rendering the new data in a dedicated component.
