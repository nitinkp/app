# Wedding Folders

Each wedding should live in its own folder:

```text
src/weddings/
  nithin-teju/
    wedding.ts
  another-couple/
    wedding.ts
```

The shared website engine reads a `WeddingConfig` object from each folder. To add a new wedding:

1. Copy `src/weddings/_template/wedding.ts` into a new slug folder.
2. Rename the exported constant.
3. Set a unique `slug`.
4. Set the wedding's IANA `timeZone`, such as `America/New_York`.
5. Choose a `theme.name` or add `theme.overrides`.
6. Register it in `src/weddings/index.ts`.

The slug is the public URL segment when hosting multiple weddings from one Vercel project, for example `/nithin-teju`.

For a dedicated Vercel project per wedding, set this environment variable:

```text
VITE_WEDDING_SLUG=nithin-teju
```

## Themes

Available theme presets:

- `rose`
- `emerald`
- `royal`
- `coastal`
- `midnight`

Use a preset for each wedding:

```ts
theme: {
  name: "royal",
}
```

Or override specific tokens:

```ts
theme: {
  name: "midnight",
  overrides: {
    accent: "#c9973d",
    dark: "#151821",
  },
}
```

Theme definitions live in `src/themes.ts`.

## Entry invitation

The optional `entryInvitation` config controls the animated envelope shown before the website:

```ts
entryInvitation: {
  enabled: true,
  eyebrow: "You are invited",
  message: "Together with their families, invite you to celebrate their wedding.",
  openLabel: "Open Invitation",
  backgroundImage: "/weddings/couple-slug/invitation.png",
  rememberForSession: true,
}
```

## RSVP

For free RSVP collection, use Google Forms. Add the public link and optional embed link to the wedding config:

```ts
rsvp: {
  deadline: "2026-08-15",
  contactName: "Yash",
  contactPhone: "+1 469-996-4010",
  googleFormUrl: "https://forms.gle/your-form-link",
  googleFormEmbedUrl: "https://docs.google.com/forms/d/e/your-form-id/viewform?embedded=true",
}
```

Leave both fields empty only for local demo RSVP behavior.

To use the site's custom RSVP form instead of embedding Google Forms, also add:

```ts
googleFormFieldIds: {
  fullName: "entry.111111111",
  email: "entry.222222222", // Omit when Google Forms collects responder email.
  phone: "entry.333333333",
  attendance: "entry.444444444",
  guests: "entry.555555555",
  guestNames: "entry.888888888",
  events: "entry.666666666",
  message: "entry.777777777",
}
```

Add the new optional guest names field to your Google Form and update the matching `guestNames` entry ID here. The app will not require this field to submit.

Set `rsvp.maxGuests` to match the highest guest-count choice in Google Forms. When email collection uses **Responder input**, no custom Email question or entry ID is required.

Find these by opening the published Google Form, choosing **View Page Source**, and searching for each question label.
