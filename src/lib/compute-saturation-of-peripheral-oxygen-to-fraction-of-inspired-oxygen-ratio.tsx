import { CheckSchema } from "@/interfaces/check";
import { Parameter } from "@/interfaces/parameter";
import { z } from "zod";

export default function computeSaturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio(
  saturationOfPeripheralOxygen: z.infer<
    typeof CheckSchema
  >["saturationOfPeripheralOxygen"],
  fractionOfInspiredOxygen: z.infer<
    typeof CheckSchema
  >["fractionOfInspiredOxygen"],
  omittedParameters: Parameter[]
): number | null {
  if (
    omittedParameters.includes("saturationOfPeripheralOxygen") ||
    omittedParameters.includes("fractionOfInspiredOxygen") ||
    saturationOfPeripheralOxygen > 0.97
  ) {
    return null;
  }

  const numerator = Math.round(saturationOfPeripheralOxygen);
  const denominator = Math.round(fractionOfInspiredOxygen * 100) / 100;

  return numerator / denominator;
}
