import { z } from "zod";

export const RESPIRATORY_SUPPORT_CASES = [
  "none",
  "nonInvasive",
  "invasive",
] as const;
export const RespiratorySupportEnum = z.enum(RESPIRATORY_SUPPORT_CASES);
export type RespiratorySupport = z.infer<typeof RespiratorySupportEnum>;
