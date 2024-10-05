import { z } from "zod";

export const D_DIMER_CONCENTRATION_UNITS = [
  "mg/L FEU",
  "μg/L FEU",
  "ng/mL FEU",
] as const;
export const DDimerConcentrationUnitEnum = z.enum(D_DIMER_CONCENTRATION_UNITS);
export type DDimerConcentrationUnit = z.infer<
  typeof DDimerConcentrationUnitEnum
>;

export function convertDDimerConcentrationToBaseUnit(dDimerConcentration: {
  value: number;
  unit: DDimerConcentrationUnit;
}): number {
  const { value, unit } = dDimerConcentration;
  switch (unit) {
    case "mg/L FEU":
      return value;
    case "μg/L FEU":
      return value / 10e3;
    case "ng/mL FEU":
      return value / 10e6;
  }
}
