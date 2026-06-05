import type { WeddingConfig } from "../types";
import { nithinTejuWedding } from "./nithin-teju/wedding";

export const weddings = {
  [nithinTejuWedding.slug]: nithinTejuWedding,
} satisfies Record<string, WeddingConfig>;

export const defaultWeddingSlug = "nithin-teju";

export const normalizeWeddingSlug = (slug: string | undefined) => slug?.trim().toLowerCase().replace(/^\/+|\/+$/g, "");

export const getWeddingBySlug = (slug: string | undefined): WeddingConfig | undefined => {
  const normalizedSlug = normalizeWeddingSlug(slug);

  if (!normalizedSlug) {
    return weddings[defaultWeddingSlug];
  }

  return weddings[normalizedSlug];
};

export const getAvailableWeddings = () => Object.values(weddings);
