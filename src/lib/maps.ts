import type { Venue } from "../types";

const isPlaceholder = (value: string | undefined) => {
  const normalizedValue = value?.trim().toLowerCase();
  return !normalizedValue || normalizedValue === "address here" || normalizedValue === "venue address";
};

export const getVenueMapQuery = (venue: Venue) => {
  if (!isPlaceholder(venue.mapQuery)) {
    return venue.mapQuery.trim();
  }

  if (isPlaceholder(venue.name) && isPlaceholder(venue.address)) {
    return undefined;
  }

  return [venue.name, venue.address, venue.city].filter((value) => !isPlaceholder(value)).join(", ");
};

export const getGoogleMapsUrl = (venue: Venue) => {
  if (venue.googleMapsUrl) {
    return venue.googleMapsUrl;
  }

  const query = getVenueMapQuery(venue);
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : undefined;
};
