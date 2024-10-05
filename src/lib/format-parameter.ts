import { Parameter } from "@/interfaces/parameter";
import formatMeasurement from "./format-measurement";
import { Dictionary } from "@/interfaces/dictionary";
import { RespiratorySupport } from "@/interfaces/respiratory-support";
import { AgeBand } from "@/interfaces/age-band";
import { PupilState } from "@/interfaces/pupil-state";

export default function formatParameter(
  dictionary: Dictionary,
  parameter: Parameter,
  value:
    | number
    | string
    | {
        value: number;
        unit: string;
      },
  omittedParameters: Parameter[]
): string {
  if (omittedParameters.includes(parameter)) return dictionary.omitted;

  switch (parameter) {
    case "dDimerConcentration":
    case "lactateConcentration":
    case "plateletConcentration":
    case "fibrinogenConcentration":
    case "meanArterialPressure":
      return formatMeasurement(
        value as {
          value: number;
          unit: string;
        }
      );
    case "fractionOfInspiredOxygen":
    case "vasoactiveMedicationCount":
    case "glasgowComaScale":
    case "internationalNormalizedRatio":
      return String(value);
    case "ageBand":
      return dictionary.ageBandLabels[value as AgeBand];
    case "respiratorySupport":
      return dictionary.respiratorySupportLabels[value as RespiratorySupport];
    case "pupilState":
      return dictionary.pupilStateLabels[value as PupilState];
    case "saturationOfPeripheralOxygen":
      return `${value}%`;
  }
}
