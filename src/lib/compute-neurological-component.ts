import { z } from "zod";
import { CheckSchema } from "@/interfaces/check";

export default function computeNeurologicalComponent(
  glasgowComaScale: z.infer<typeof CheckSchema>["glasgowComaScale"],
  pupilState: z.infer<typeof CheckSchema>["pupilState"],
  omittedParameters: string[]
): number | null {
  if (
    omittedParameters.includes("glasgowComaScale") ||
    omittedParameters.includes("pupilState")
  )
    return null;

  if (pupilState === "fixedBilaterally") {
    return 2;
  } else {
    if (glasgowComaScale <= 10) {
      return 1;
    } else {
      return 0;
    }
  }
}
