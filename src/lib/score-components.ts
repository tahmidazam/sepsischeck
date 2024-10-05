import { Diagnosis } from "@/interfaces/diagnosis";
import sumNonNullElements from "./sum-non-null-elements";

export default function scoreComponents(
  respiratoryComponent: number | null,
  cardiovascularComponent: number | null,
  coagulationComponent: number | null,
  neurologicalComponent: number | null
): {
  score: number | null;
  diagnosis: Diagnosis;
} {
  const score = sumNonNullElements([
    respiratoryComponent,
    cardiovascularComponent,
    coagulationComponent,
    neurologicalComponent,
  ]);

  if (score === null) {
    return {
      score: null,
      diagnosis: "noDiagnosis",
    };
  }

  if (score >= 2) {
    if (cardiovascularComponent === null) {
      return {
        score,
        diagnosis: "sepsis",
      };
    } else {
      if (cardiovascularComponent >= 1) {
        return {
          score,
          diagnosis: "septicShock",
        };
      } else {
        return {
          score,
          diagnosis: "sepsis",
        };
      }
    }
  } else {
    return {
      score,
      diagnosis: "noSepsis",
    };
  }
}
