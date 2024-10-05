import { CheckSchema } from "@/interfaces/check";
import { Parameter } from "@/interfaces/parameter";
import { z } from "zod";

export default function computeInternationalNormalizedRatioSubcomponent(
  internationalNormalizedRatio: z.infer<
    typeof CheckSchema
  >["internationalNormalizedRatio"],
  omittedParameters: Parameter[]
): number | null {
  if (omittedParameters.includes("internationalNormalizedRatio")) return 0;

  if (internationalNormalizedRatio > 1.3) {
    return 1;
  } else {
    return 0;
  }
}
