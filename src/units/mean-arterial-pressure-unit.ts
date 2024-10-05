import { z } from "zod";

export const MEAN_ARTERIAL_PRESSURE_UNITS = ["kPa", "mmHg"] as const;
export const MeanArterialPressureUnitEnum = z.enum(
  MEAN_ARTERIAL_PRESSURE_UNITS
);
export type MeanArterialPressureUnit = z.infer<
  typeof MeanArterialPressureUnitEnum
>;

export function convertMeanArterialPressureToBaseUnit(meanArterialPressure: {
  value: number;
  unit: MeanArterialPressureUnit;
}): number {
  const { value, unit } = meanArterialPressure;
  switch (unit) {
    case "kPa":
      return value * 7.50062;
    case "mmHg":
      return value;
  }
}
