export const i18n = {
  defaultLocale: "en-GB",
  locales: ["en-GB", "es"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
