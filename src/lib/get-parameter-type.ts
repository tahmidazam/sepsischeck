import { Parameter } from "@/interfaces/parameter";
import { ParameterType } from "@/interfaces/parameter-type";

const PARAMETER_TYPE_MAP: Record<Parameter, ParameterType> = {
  ageBand: "other",
  saturationOfPeripheralOxygen: "respiratory",
  fractionOfInspiredOxygen: "respiratory",
  respiratorySupport: "respiratory",
  vasoactiveMedicationCount: "cardiovascular",
  lactateConcentration: "cardiovascular",
  meanArterialPressure: "cardiovascular",
  plateletConcentration: "coagulation",
  internationalNormalizedRatio: "coagulation",
  dDimerConcentration: "coagulation",
  fibrinogenConcentration: "coagulation",
  glasgowComaScale: "neurological",
  pupilState: "neurological",
};

export default function getParameterType(parameter: Parameter): ParameterType {
  return PARAMETER_TYPE_MAP[parameter];
}
