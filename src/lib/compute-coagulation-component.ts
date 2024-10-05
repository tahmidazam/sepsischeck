import sumNonNullElements from "./sum-non-null-elements";

export default function computeCoagulationComponent(
  plateletConcentrationSubcomponent: number | null,
  internationalNormalisedRatioSubcomponent: number | null,
  dDimerConcentrationSubcomponent: number | null,
  fibrinogenConcentrationSubcomponent: number | null
): number | null {
  const sum = sumNonNullElements([
    plateletConcentrationSubcomponent,
    internationalNormalisedRatioSubcomponent,
    dDimerConcentrationSubcomponent,
    fibrinogenConcentrationSubcomponent,
  ]);

  if (sum === null) return null;

  return Math.min(sum, 2);
}
