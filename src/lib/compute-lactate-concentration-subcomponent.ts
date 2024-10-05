import { CheckSchema } from "@/interfaces/check";
import { convertLactateConcentrationToBaseUnit } from "@/units/lactate-concentration-unit";
import { z } from "zod";

export default function computeLactateConcentrationSubcomponent(
  lactateConcentration: z.infer<typeof CheckSchema>["lactateConcentration"],
  omittedParameters: string[]
) {
  if (omittedParameters.includes("lactateConcentration")) return null;

  const lactateConcentrationInBaseUnit =
    convertLactateConcentrationToBaseUnit(lactateConcentration);

  if (lactateConcentrationInBaseUnit > 11) {
    return 2;
  } else if (lactateConcentrationInBaseUnit > 5) {
    return 1;
  } else {
    return 0;
  }
}
