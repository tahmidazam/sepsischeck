import { AgeBand } from "@/interfaces/age-band";
import { DDimerConcentrationUnit } from "@/units/d-dimer-concentration-unit";
import { Dictionary } from "@/interfaces/dictionary";
import { FibrinogenConcentrationUnit } from "@/units/fibrinogen-concentration-unit";
import { LactateConcentrationUnit } from "@/units/lactate-concentration-unit";
import { MeanArterialPressureUnit } from "@/units/mean-arterial-pressure-unit";
import { Parameter } from "@/interfaces/parameter";
import { PlateletConcentrationUnit } from "@/units/platelet-concentration-unit";
import { PupilState } from "@/interfaces/pupil-state";
import { RespiratorySupport } from "@/interfaces/respiratory-support";
import DimensionlessParameterInput from "./parameter-controls/dimensionless-parameter-input";
import EnumeratedParameterSelect from "./parameter-controls/enumerated-parameter-select";
import ParameterInput from "./parameter-controls/parameter-input";
import { MutableRefObject } from "react";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";

export default function ParameterControl({
  dictionary,
  parameter,
  controlRefs,
}: {
  dictionary: Dictionary;
  parameter: Parameter;
  controlRefs: MutableRefObject<Map<string, ParameterControlElement>>;
}) {
  if (parameter === "ageBand")
    return (
      <EnumeratedParameterSelect<AgeBand>
        dictionary={dictionary}
        parameter="ageBand"
        setterSelector={(state) => state.setAgeBand}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "saturationOfPeripheralOxygen")
    return (
      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="saturationOfPeripheralOxygen"
        setterSelector={(state) => state.setSaturationOfPeripheralOxygen}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "fractionOfInspiredOxygen")
    return (
      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="fractionOfInspiredOxygen"
        setterSelector={(state) => state.setFractionOfInspiredOxygen}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "respiratorySupport")
    return (
      <EnumeratedParameterSelect<RespiratorySupport>
        dictionary={dictionary}
        parameter="respiratorySupport"
        setterSelector={(state) => state.setRespiratorySupport}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "vasoactiveMedicationCount")
    return (
      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="vasoactiveMedicationCount"
        setterSelector={(state) => state.setVasoactiveMedicationCount}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "lactateConcentration")
    return (
      <ParameterInput<LactateConcentrationUnit>
        dictionary={dictionary}
        parameter="lactateConcentration"
        valueSetterSelector={(state) => state.setLactateConcentrationValue}
        unitSetterSelector={(state) => state.setLactateConcentrationUnit}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "meanArterialPressure")
    return (
      <ParameterInput<MeanArterialPressureUnit>
        dictionary={dictionary}
        parameter="meanArterialPressure"
        valueSetterSelector={(state) => state.setMeanArterialPressureValue}
        unitSetterSelector={(state) => state.setMeanArterialPressureUnit}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "plateletConcentration")
    return (
      <ParameterInput<PlateletConcentrationUnit>
        dictionary={dictionary}
        parameter="plateletConcentration"
        valueSetterSelector={(state) => state.setMeanArterialPressureValue}
        unitSetterSelector={(state) => state.setPlateletConcentrationUnit}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "internationalNormalizedRatio")
    return (
      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="internationalNormalizedRatio"
        setterSelector={(state) => state.setInternationalNormalisedRatio}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "dDimerConcentration")
    return (
      <ParameterInput<DDimerConcentrationUnit>
        dictionary={dictionary}
        parameter="dDimerConcentration"
        valueSetterSelector={(state) => state.setDDimerConcentrationValue}
        unitSetterSelector={(state) => state.setDDimerConcentrationUnit}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "fibrinogenConcentration")
    return (
      <ParameterInput<FibrinogenConcentrationUnit>
        dictionary={dictionary}
        parameter="fibrinogenConcentration"
        valueSetterSelector={(state) => state.setFibrinogenConcentrationValue}
        unitSetterSelector={(state) => state.setFibrinogenConcentrationUnit}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "glasgowComaScale")
    return (
      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="glasgowComaScale"
        setterSelector={(state) => state.setGlasgowComaScale}
        controlRefs={controlRefs}
      />
    );

  if (parameter === "pupilState")
    return (
      <EnumeratedParameterSelect<PupilState>
        dictionary={dictionary}
        parameter="pupilState"
        setterSelector={(state) => state.setPupilState}
        controlRefs={controlRefs}
      />
    );

  return null;
}
