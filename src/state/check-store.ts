import { AgeBand } from "@/interfaces/age-band";
import { Check } from "@/interfaces/check";
import { DDimerConcentrationUnit } from "@/units/d-dimer-concentration-unit";
import { Parameter } from "@/interfaces/parameter";
import { PupilState } from "@/interfaces/pupil-state";
import { RespiratorySupport } from "@/interfaces/respiratory-support";
import { FibrinogenConcentrationUnit } from "@/units/fibrinogen-concentration-unit";
import { LactateConcentrationUnit } from "@/units/lactate-concentration-unit";
import { MeanArterialPressureUnit } from "@/units/mean-arterial-pressure-unit";
import { PlateletConcentrationUnit } from "@/units/platelet-concentration-unit";
import { v7 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CheckResult } from "@/interfaces/check-result";
import { CheckComponents } from "@/interfaces/check-components";
import computeComponents from "@/lib/compute-components";
import scoreComponents from "@/lib/score-components";
import { toast } from "sonner";

interface CheckState {
  newCheck: Check;
  selectedParameter: Parameter;
  validationError: boolean;
  checkResults: CheckResult[];
}

interface CheckAction {
  setAgeBand: (ageBand: AgeBand) => void;
  setSaturationOfPeripheralOxygen: (
    saturationOfPeripheralOxygen: number
  ) => void;
  setFractionOfInspiredOxygen: (fractionOfInspiredOxygen: number) => void;
  setRespiratorySupport: (respiratorySupport: RespiratorySupport) => void;
  setVasoactiveMedicationCount: (vasoactiveMedicationCount: number) => void;
  setLactateConcentrationValue: (value: number) => void;
  setLactateConcentrationUnit: (unit: LactateConcentrationUnit) => void;
  setMeanArterialPressureValue: (value: number) => void;
  setMeanArterialPressureUnit: (unit: MeanArterialPressureUnit) => void;
  setPlateletConcentrationValue: (value: number) => void;
  setPlateletConcentrationUnit: (unit: PlateletConcentrationUnit) => void;
  setInternationalNormalisedRatio: (
    internationalNormalizedRatio: number
  ) => void;
  setDDimerConcentrationValue: (value: number) => void;
  setDDimerConcentrationUnit: (unit: DDimerConcentrationUnit) => void;
  setFibrinogenConcentrationValue: (value: number) => void;
  setFibrinogenConcentrationUnit: (unit: FibrinogenConcentrationUnit) => void;
  setGlasgowComaScale: (glasgowComaScale: number) => void;
  setPupilState: (pupilState: PupilState) => void;
  setSelectedParameter: (parameter: Parameter) => void;
  toggleParameterOmission: (parameter: Parameter) => void;
  setGlobalValidationError: (value: boolean) => void;
  reset: () => void;
  saveCheck: () => string;
  deleteCheck: (id: string) => void;
}

export type CheckStore = CheckState & CheckAction;

export const defaultCheckState: CheckState = {
  newCheck: {
    ageBand: "lessThanOneMonth",
    saturationOfPeripheralOxygen: 97,
    fractionOfInspiredOxygen: 0.21,
    respiratorySupport: "none",
    vasoactiveMedicationCount: 0,
    lactateConcentration: {
      value: 1.5,
      unit: "mmol/L",
    },
    meanArterialPressure: {
      value: 70,
      unit: "mmHg",
    },
    plateletConcentration: {
      value: 150,
      unit: "× 10⁹/L",
    },
    internationalNormalizedRatio: 1,
    dDimerConcentration: {
      value: 0.3,
      unit: "mg/L FEU",
    },
    fibrinogenConcentration: {
      value: 3,
      unit: "g/L",
    },
    glasgowComaScale: 15,
    pupilState: "reactive",
    omittedParameters: [],
  },
  selectedParameter: "ageBand",
  validationError: false,
  checkResults: [],
};

export const useCheckStore = create<CheckStore>()(
  persist(
    immer((set, get) => ({
      ...defaultCheckState,
      setAgeBand: (ageBand: AgeBand) => {
        set((state) => {
          state.newCheck.ageBand = ageBand;
        });
      },
      setSaturationOfPeripheralOxygen: (
        saturationOfPeripheralOxygen: number
      ) => {
        set((state) => {
          state.newCheck.saturationOfPeripheralOxygen =
            saturationOfPeripheralOxygen;
        });
      },
      setSelectedParameter: (parameter: Parameter) => {
        set((state) => {
          state.selectedParameter = parameter;
        });
      },
      setFractionOfInspiredOxygen: (fractionOfInspiredOxygen: number) => {
        set((state) => {
          state.newCheck.fractionOfInspiredOxygen = fractionOfInspiredOxygen;
        });
      },
      setRespiratorySupport: (respiratorySupport: RespiratorySupport) => {
        set((state) => {
          state.newCheck.respiratorySupport = respiratorySupport;
        });
      },
      setVasoactiveMedicationCount: (vasoactiveMedicationCount: number) => {
        set((state) => {
          state.newCheck.vasoactiveMedicationCount = vasoactiveMedicationCount;
        });
      },
      setLactateConcentrationValue: (value: number) => {
        set((state) => {
          state.newCheck.lactateConcentration.value = value;
        });
      },
      setLactateConcentrationUnit: (unit: LactateConcentrationUnit) => {
        set((state) => {
          state.newCheck.lactateConcentration.unit = unit;
        });
      },
      setMeanArterialPressureValue: (value: number) => {
        set((state) => {
          state.newCheck.meanArterialPressure.value = value;
        });
      },
      setMeanArterialPressureUnit: (unit: MeanArterialPressureUnit) => {
        set((state) => {
          state.newCheck.meanArterialPressure.unit = unit;
        });
      },
      setPlateletConcentrationValue: (value: number) => {
        set((state) => {
          state.newCheck.plateletConcentration.value = value;
        });
      },
      setPlateletConcentrationUnit: (unit: PlateletConcentrationUnit) => {
        set((state) => {
          state.newCheck.plateletConcentration.unit = unit;
        });
      },
      setInternationalNormalisedRatio: (
        internationalNormalizedRatio: number
      ) => {
        set((state) => {
          state.newCheck.internationalNormalizedRatio =
            internationalNormalizedRatio;
        });
      },
      setDDimerConcentrationValue: (value: number) => {
        set((state) => {
          state.newCheck.dDimerConcentration.value = value;
        });
      },
      setDDimerConcentrationUnit: (unit: DDimerConcentrationUnit) => {
        set((state) => {
          state.newCheck.dDimerConcentration.unit = unit;
        });
      },
      setFibrinogenConcentrationValue: (value: number) => {
        set((state) => {
          state.newCheck.fibrinogenConcentration.value = value;
        });
      },
      setFibrinogenConcentrationUnit: (unit: FibrinogenConcentrationUnit) => {
        set((state) => {
          state.newCheck.fibrinogenConcentration.unit = unit;
        });
      },
      setGlasgowComaScale: (glasgowComaScale: number) => {
        set((state) => {
          state.newCheck.glasgowComaScale = glasgowComaScale;
        });
      },
      setPupilState: (pupilState: PupilState) => {
        set((state) => {
          state.newCheck.pupilState = pupilState;
        });
      },
      toggleParameterOmission: (parameter: Parameter) => {
        set((state) => {
          if (state.newCheck.omittedParameters.includes(parameter)) {
            state.newCheck.omittedParameters =
              state.newCheck.omittedParameters.filter(
                (omittedParameter) => omittedParameter !== parameter
              );
          } else {
            state.newCheck.omittedParameters.push(parameter);
          }
        });
      },
      setGlobalValidationError: (value: boolean) => {
        set((state) => {
          state.validationError = value;
        });
      },
      reset: () => {
        set((state) => {
          state.newCheck = defaultCheckState.newCheck;
          state.validationError = defaultCheckState.validationError;
          state.selectedParameter = defaultCheckState.selectedParameter;
        });
      },
      saveCheck: () => {
        const checkId = v7();
        const check = get().newCheck;
        const timestamp = new Date();
        const components: CheckComponents = computeComponents(check);
        const { score, diagnosis } = scoreComponents(
          components.respiratoryComponent,
          components.cardiovascularComponent,
          components.coagulationComponent,
          components.neurologicalComponent
        );

        const checkResult: CheckResult = {
          check: get().newCheck,
          components,
          score,
          diagnosis,
          id: checkId,
          timestamp,
        };

        set((state) => {
          state.newCheck = defaultCheckState.newCheck;
          state.validationError = defaultCheckState.validationError;
          state.selectedParameter = defaultCheckState.selectedParameter;
          state.checkResults.push(checkResult);
        });

        return checkId;
      },
      deleteCheck: (id: string) => {
        set((state) => {
          state.checkResults = state.checkResults.filter(
            (checkResult) => checkResult.id !== id
          );
        });

        toast.success("Check deleted", {
          duration: 2000,
        });
      },
    })),
    {
      name: "check",
    }
  )
);
