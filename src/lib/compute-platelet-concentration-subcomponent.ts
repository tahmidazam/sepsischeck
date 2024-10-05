import { CheckSchema } from "@/interfaces/check";
import { Parameter } from "@/interfaces/parameter";
import { convertPlateletConcentrationToBaseUnit } from "@/units/platelet-concentration-unit";
import { z } from "zod";

export default function computePlateletConcentrationSubcomponent(
  plateletConcentration: z.infer<typeof CheckSchema>["plateletConcentration"],
  omittedParameters: Parameter[]
): number | null {
  if (omittedParameters.includes("plateletConcentration")) return null;

  const plateletConcentrationInBaseUnit =
    convertPlateletConcentrationToBaseUnit(plateletConcentration);

  if (plateletConcentrationInBaseUnit < 100) {
    return 1;
  } else {
    return 0;
  }
}
