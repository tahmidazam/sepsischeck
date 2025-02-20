import { AgeBand } from "@/interfaces/age-band";
import { Dictionary } from "@/interfaces/dictionary";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";
import { PupilState } from "@/interfaces/pupil-state";
import { RespiratorySupport } from "@/interfaces/respiratory-support";
import { DDimerConcentrationUnit } from "@/units/d-dimer-concentration-unit";
import { FibrinogenConcentrationUnit } from "@/units/fibrinogen-concentration-unit";
import { LactateConcentrationUnit } from "@/units/lactate-concentration-unit";
import { MeanArterialPressureUnit } from "@/units/mean-arterial-pressure-unit";
import { PlateletConcentrationUnit } from "@/units/platelet-concentration-unit";
import { RefObject } from "react";
import DimensionlessParameterInput from "./parameter-controls/dimensionless-parameter-input";
import EnumeratedParameterSelect from "./parameter-controls/enumerated-parameter-select";
import ParameterInput from "./parameter-controls/parameter-input";

export default function ParameterCarousel({
  dictionary,
  controlRefs,
}: {
  dictionary: Dictionary;
  controlRefs: RefObject<Map<string, ParameterControlElement>>;
}) {
  return (
    <>
      <EnumeratedParameterSelect<AgeBand>
        dictionary={dictionary}
        parameter="ageBand"
        setterSelector={(state) => state.setAgeBand}
        controlRefs={controlRefs}
      />

      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="saturationOfPeripheralOxygen"
        setterSelector={(state) => state.setSaturationOfPeripheralOxygen}
        controlRefs={controlRefs}
      />

      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="fractionOfInspiredOxygen"
        setterSelector={(state) => state.setFractionOfInspiredOxygen}
        controlRefs={controlRefs}
      />

      <EnumeratedParameterSelect<RespiratorySupport>
        dictionary={dictionary}
        parameter="respiratorySupport"
        setterSelector={(state) => state.setRespiratorySupport}
        controlRefs={controlRefs}
      />

      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="vasoactiveMedicationCount"
        setterSelector={(state) => state.setVasoactiveMedicationCount}
        controlRefs={controlRefs}
      />

      <ParameterInput<LactateConcentrationUnit>
        dictionary={dictionary}
        parameter="lactateConcentration"
        valueSetterSelector={(state) => state.setLactateConcentrationValue}
        unitSetterSelector={(state) => state.setLactateConcentrationUnit}
        controlRefs={controlRefs}
      />

      <ParameterInput<MeanArterialPressureUnit>
        dictionary={dictionary}
        parameter="meanArterialPressure"
        valueSetterSelector={(state) => state.setMeanArterialPressureValue}
        unitSetterSelector={(state) => state.setMeanArterialPressureUnit}
        controlRefs={controlRefs}
      />

      <ParameterInput<PlateletConcentrationUnit>
        dictionary={dictionary}
        parameter="plateletConcentration"
        valueSetterSelector={(state) => state.setMeanArterialPressureValue}
        unitSetterSelector={(state) => state.setPlateletConcentrationUnit}
        controlRefs={controlRefs}
      />

      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="internationalNormalizedRatio"
        setterSelector={(state) => state.setInternationalNormalisedRatio}
        controlRefs={controlRefs}
      />

      <ParameterInput<DDimerConcentrationUnit>
        dictionary={dictionary}
        parameter="dDimerConcentration"
        valueSetterSelector={(state) => state.setDDimerConcentrationValue}
        unitSetterSelector={(state) => state.setDDimerConcentrationUnit}
        controlRefs={controlRefs}
      />

      <ParameterInput<FibrinogenConcentrationUnit>
        dictionary={dictionary}
        parameter="fibrinogenConcentration"
        valueSetterSelector={(state) => state.setFibrinogenConcentrationValue}
        unitSetterSelector={(state) => state.setFibrinogenConcentrationUnit}
        controlRefs={controlRefs}
      />

      <DimensionlessParameterInput
        dictionary={dictionary}
        parameter="glasgowComaScale"
        setterSelector={(state) => state.setGlasgowComaScale}
        controlRefs={controlRefs}
      />

      <EnumeratedParameterSelect<PupilState>
        dictionary={dictionary}
        parameter="pupilState"
        setterSelector={(state) => state.setPupilState}
        controlRefs={controlRefs}
      />
    </>
  );
}
