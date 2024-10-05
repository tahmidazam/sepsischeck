import { Check, CheckSchema } from "./check";

export const PARAMETERS = Object.keys(CheckSchema.shape).filter(
  (param) =>
    param !== "id" && param !== "timestamp" && param !== "omittedParameters"
) as Parameter[];
export type Parameter = Exclude<
  keyof Check,
  "id" | "timestamp" | "omittedParameters"
>;

export type DimensionlessParameter = Extract<
  Parameter,
  | "saturationOfPeripheralOxygen"
  | "fractionOfInspiredOxygen"
  | "vasoactiveMedicationCount"
  | "glasgowComaScale"
  | "internationalNormalizedRatio"
>;

export type EnumeratedParameter = Extract<
  Parameter,
  "ageBand" | "respiratorySupport" | "pupilState"
>;

export type UnitfulParameter = Extract<
  Parameter,
  | "lactateConcentration"
  | "meanArterialPressure"
  | "plateletConcentration"
  | "dDimerConcentration"
  | "fibrinogenConcentration"
>;
