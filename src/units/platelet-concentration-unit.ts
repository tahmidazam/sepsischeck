import { z } from "zod";

export const PLATELET_CONCENTRATION_UNITS = ["× 10³/µL", "× 10⁹/L"] as const;
export const PlateletConcentrationUnitEnum = z.enum(
  PLATELET_CONCENTRATION_UNITS
);
export type PlateletConcentrationUnit = z.infer<
  typeof PlateletConcentrationUnitEnum
>;

export function convertPlateletConcentrationToBaseUnit(plateletConcentration: {
  value: number;
  unit: PlateletConcentrationUnit;
}): number {
  const { value, unit } = plateletConcentration;
  switch (unit) {
    case "× 10³/µL":
      return value;
    case "× 10⁹/L":
      return value;
  }
}
