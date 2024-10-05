import { z } from "zod";

export const AGE_BANDS = [
  "lessThanOneMonth",
  "oneToLessThanTwelveMonths",
  "oneToLessThanTwoYears",
  "twoToLessThanFiveYears",
  "fiveToLessThanTwelveYears",
  "twelveToLessThanEighteenYears",
] as const;
export const AgeBandEnum = z.enum(AGE_BANDS);
export type AgeBand = z.infer<typeof AgeBandEnum>;
