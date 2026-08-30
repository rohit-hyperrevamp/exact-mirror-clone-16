/** Slug used by the bookable catalog (matches the `lab_tests.slug` values). */
export const testSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const bookingUrl = (name: string) => `/book/${testSlug(name)}`;
