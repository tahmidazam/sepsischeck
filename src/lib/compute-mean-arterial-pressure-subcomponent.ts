import { CheckSchema } from "@/interfaces/check";
import { convertMeanArterialPressureToBaseUnit } from "@/units/mean-arterial-pressure-unit";
import { z } from "zod";

export default function computeMeanArterialPressureSubcomponent(
  meanArterialPressure: z.infer<typeof CheckSchema>["meanArterialPressure"],
  ageBand: z.infer<typeof CheckSchema>["ageBand"],
  omittedParameters: string[]
): number | null {
  if (
    omittedParameters.includes("meanArterialPressure") ||
    omittedParameters.includes("ageBand")
  )
    return null;

  const meanArterialPressureInBaseUnit =
    convertMeanArterialPressureToBaseUnit(meanArterialPressure);

  switch (ageBand) {
    case "lessThanOneMonth":
      if (meanArterialPressureInBaseUnit < 17) {
        return 2;
      } else if (meanArterialPressureInBaseUnit < 30) {
        return 1;
      } else {
        return 0;
      }
    case "oneToLessThanTwelveMonths":
      if (meanArterialPressureInBaseUnit < 25) {
        return 2;
      } else if (meanArterialPressureInBaseUnit < 39) {
        return 1;
      } else {
        return 0;
      }
    case "oneToLessThanTwoYears":
      if (meanArterialPressureInBaseUnit < 31) {
        return 2;
      } else if (meanArterialPressureInBaseUnit < 43) {
        return 1;
      } else {
        return 0;
      }
    case "twoToLessThanFiveYears":
      if (meanArterialPressureInBaseUnit < 32) {
        return 2;
      } else if (meanArterialPressureInBaseUnit < 44) {
        return 1;
      } else {
        return 0;
      }
    case "fiveToLessThanTwelveYears":
      if (meanArterialPressureInBaseUnit < 36) {
        return 2;
      } else if (meanArterialPressureInBaseUnit < 48) {
        return 1;
      } else {
        return 0;
      }
    case "twelveToLessThanEighteenYears":
      if (meanArterialPressureInBaseUnit < 38) {
        return 2;
      } else if (meanArterialPressureInBaseUnit < 51) {
        return 1;
      } else {
        return 0;
      }
  }
}
