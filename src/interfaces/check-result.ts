import { z } from "zod";
import { CheckSchema } from "./check";
import { CheckComponentsSchema } from "./check-components";
import { DiagnosisEnum } from "./diagnosis";

export const CheckResultSchema = z.object({
  id: z.string(),
  timestamp: z.date(),
  check: CheckSchema,
  components: CheckComponentsSchema,
  score: z.number().int().nullable(),
  diagnosis: DiagnosisEnum,
});
export type CheckResult = z.infer<typeof CheckResultSchema>;
