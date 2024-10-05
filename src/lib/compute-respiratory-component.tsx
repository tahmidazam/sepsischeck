import { CheckSchema } from "@/interfaces/check";
import { Parameter } from "@/interfaces/parameter";
import { z } from "zod";

export default function computeRespiratoryComponent(
  respiratorySupport: z.infer<typeof CheckSchema>["respiratorySupport"],
  saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio: number | null,
  omittedParameters: Parameter[]
): number | null {
  if (
    omittedParameters.includes("respiratorySupport") ||
    saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio === null
  )
    return null;

  switch (respiratorySupport) {
    case "none":
      return 0;
    case "nonInvasive":
      if (saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio < 292) {
        return 1;
      } else {
        return 0;
      }
    case "invasive":
      if (saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio < 148) {
        return 3;
      } else if (
        saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio < 220
      ) {
        return 2;
      } else {
        return 0;
      }
  }
}
