import { Check } from "@/interfaces/check";
import { Parameter } from "@/interfaces/parameter";
import computeCardiovascularComponent from "./compute-cardiovascular-component";
import computeCoagulationComponent from "./compute-coagulation-component";
import computeDDimerConcentrationSubcomponent from "./compute-d-dimer-concentration-subcomponent";
import computeFibrinogenConcentrationSubcomponent from "./compute-fibrinogen-concentration-subcomponent";
import computeInternationalNormalizedRatioSubcomponent from "./compute-international-normalised-ratio-subcomponent";
import computeLactateConcentrationSubcomponent from "./compute-lactate-concentration-subcomponent";
import computeMeanArterialPressureSubcomponent from "./compute-mean-arterial-pressure-subcomponent";
import computeNeurologicalComponent from "./compute-neurological-component";
import computePlateletConcentrationSubcomponent from "./compute-platelet-concentration-subcomponent";
import computeRespiratoryComponent from "./compute-respiratory-component";
import computeSaturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio from "./compute-saturation-of-peripheral-oxygen-to-fraction-of-inspired-oxygen-ratio";
import computeVasoactiveMedicineCountSubcomponent from "./compute-vasoactive-medicine-count-subcomponent";

export default function computeComponents(check: Check) {
  const omittedParameters = check.omittedParameters as Parameter[];

  const saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio =
    computeSaturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio(
      check.saturationOfPeripheralOxygen,
      check.fractionOfInspiredOxygen,
      omittedParameters
    );

  const respiratoryComponent = computeRespiratoryComponent(
    check.respiratorySupport,
    saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio,
    omittedParameters
  );

  const vasoactiveMedicineCountSubcomponent =
    computeVasoactiveMedicineCountSubcomponent(
      check.vasoactiveMedicationCount,
      omittedParameters
    );

  const lactateConcentrationSubcomponent =
    computeLactateConcentrationSubcomponent(
      check.lactateConcentration,
      omittedParameters
    );

  const meanArterialPressureSubcomponent =
    computeMeanArterialPressureSubcomponent(
      check.meanArterialPressure,
      check.ageBand,
      omittedParameters
    );

  const cardiovascularComponent = computeCardiovascularComponent(
    vasoactiveMedicineCountSubcomponent,
    lactateConcentrationSubcomponent,
    meanArterialPressureSubcomponent
  );

  const plateletConcentrationSubcomponent =
    computePlateletConcentrationSubcomponent(
      check.plateletConcentration,
      omittedParameters
    );

  const internationalNormalizedRatioSubcomponent =
    computeInternationalNormalizedRatioSubcomponent(
      check.internationalNormalizedRatio,
      omittedParameters
    );

  const dDimerConcentrationSubcomponent =
    computeDDimerConcentrationSubcomponent(
      check.dDimerConcentration,
      omittedParameters
    );

  const fibrinogenConcentrationSubcomponent =
    computeFibrinogenConcentrationSubcomponent(
      check.fibrinogenConcentration,
      omittedParameters
    );

  const coagulationComponent = computeCoagulationComponent(
    plateletConcentrationSubcomponent,
    internationalNormalizedRatioSubcomponent,
    dDimerConcentrationSubcomponent,
    fibrinogenConcentrationSubcomponent
  );

  const neurologicalComponent = computeNeurologicalComponent(
    check.glasgowComaScale,
    check.pupilState,
    omittedParameters
  );

  return {
    saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio,
    respiratoryComponent,
    vasoactiveMedicineCountSubcomponent,
    lactateConcentrationSubcomponent,
    meanArterialPressureSubcomponent,
    cardiovascularComponent,
    plateletConcentrationSubcomponent,
    internationalNormalizedRatioSubcomponent,
    dDimerConcentrationSubcomponent,
    fibrinogenConcentrationSubcomponent,
    coagulationComponent,
    neurologicalComponent,
  };
}
