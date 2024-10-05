import { z } from "zod";

export const FIBRINOGEN_CONCENTRATION_UNITS = ["g/L", "mg/dL"] as const;
export const FibrinogenConcentrationUnitEnum = z.enum(
  FIBRINOGEN_CONCENTRATION_UNITS
);
export type FibrinogenConcentrationUnit = z.infer<
  typeof FibrinogenConcentrationUnitEnum
>;

export function convertFibrinogenConcentrationToBaseUnit(fibrinogenConcentration: {
  value: number;
  unit: FibrinogenConcentrationUnit;
}): number {
  const { value, unit } = fibrinogenConcentration;
  switch (unit) {
    case "g/L":
      return value / 100;
    case "mg/dL":
      return value;
  }
}
