import { z } from "zod";

export const PARAMETER_TYPES = [
  "respiratory",
  "cardiovascular",
  "coagulation",
  "neurological",
  "other",
] as const;
export const ParameterTypeEnum = z.enum(PARAMETER_TYPES);
export type ParameterType = z.infer<typeof ParameterTypeEnum>;
