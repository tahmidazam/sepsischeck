import { CheckSchema } from "@/interfaces/check";
import { Parameter } from "@/interfaces/parameter";
import { convertDDimerConcentrationToBaseUnit } from "@/units/d-dimer-concentration-unit";
import { z } from "zod";

export default function computeDDimerConcentrationSubcomponent(
  dDimerConcentration: z.infer<typeof CheckSchema>["dDimerConcentration"],
  omittedParameters: Parameter[]
): number | null {
  if (omittedParameters.includes("dDimerConcentration")) return 0;

  const dDimerConcentrationInBaseUnit =
    convertDDimerConcentrationToBaseUnit(dDimerConcentration);

  if (dDimerConcentrationInBaseUnit > 2) {
    return 1;
  } else {
    return 0;
  }
}
