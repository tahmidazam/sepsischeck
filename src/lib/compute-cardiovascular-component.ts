import sumNonNullElements from "./sum-non-null-elements";

export default function computeCardiovascularComponent(
  vasoactiveMedicineCountSubcomponent: number | null,
  lactateConcentrationSubcomponent: number | null,
  meanArterialPressureSubcomponent: number | null
): number | null {
  return sumNonNullElements([
    vasoactiveMedicineCountSubcomponent,
    lactateConcentrationSubcomponent,
    meanArterialPressureSubcomponent,
  ]);
}
