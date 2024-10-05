import { z } from "zod";

export const DIAGNOSES = [
  "noDiagnosis",
  "noSepsis",
  "sepsis",
  "septicShock",
] as const;
export const DiagnosisEnum = z.enum(DIAGNOSES);
export type Diagnosis = z.infer<typeof DiagnosisEnum>;
