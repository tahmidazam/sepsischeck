import { CheckSchema } from "@/interfaces/check";
import { Parameter } from "@/interfaces/parameter";
import { z } from "zod";

export default function computeVasoactiveMedicineCountSubcomponent(
  vasoactiveMedicines: z.infer<typeof CheckSchema>["vasoactiveMedicationCount"],
  omittedParameters: Parameter[]
): number | null {
  if (omittedParameters.includes("vasoactiveMedicationCount")) return 0;

  return Math.min(vasoactiveMedicines, 2);
}
