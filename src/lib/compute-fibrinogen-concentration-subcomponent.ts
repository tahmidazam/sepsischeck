import { CheckSchema } from "@/interfaces/check";
import { Parameter } from "@/interfaces/parameter";
import { convertFibrinogenConcentrationToBaseUnit } from "@/units/fibrinogen-concentration-unit";
import { z } from "zod";

export default function computeFibrinogenConcentrationSubcomponent(
  fibrinogenConcentration: z.infer<
    typeof CheckSchema
  >["fibrinogenConcentration"],
  omittedParameters: Parameter[]
): number | null {
  if (omittedParameters.includes("fibrinogenConcentration")) return 0;

  const fibrinogenConcentrationInBaseUnit =
    convertFibrinogenConcentrationToBaseUnit(fibrinogenConcentration);

  if (fibrinogenConcentrationInBaseUnit < 100) {
    return 1;
  } else {
    return 0;
  }
}
