import { z } from "zod";

export const LACTATE_CONCENTRATION_UNITS = ["mmol/L", "mg/dL", "g/L"] as const;
export const LactateConcentrationUnitEnum = z.enum(LACTATE_CONCENTRATION_UNITS);
export type LactateConcentrationUnit = z.infer<
  typeof LactateConcentrationUnitEnum
>;
export const LACTATE_MOLAR_MASS_IN_GRAMS_PER_MOLE = 90.08;

export function convertLactateConcentrationToBaseUnit(lactateConcentration: {
  value: number;
  unit: LactateConcentrationUnit;
}): number {
  const { value, unit } = lactateConcentration;
  switch (unit) {
    case "mmol/L":
      return value;
    case "mg/dL":
      return value / LACTATE_MOLAR_MASS_IN_GRAMS_PER_MOLE;
    case "g/L":
      return (value * 1000) / LACTATE_MOLAR_MASS_IN_GRAMS_PER_MOLE;
  }
}
