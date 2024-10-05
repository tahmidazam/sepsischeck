export default function sumNonNullElements(
  arr: (number | null)[]
): number | null {
  const nonNullElements = arr.filter((element) => element !== null);

  if (nonNullElements.length === 0) return null;

  return nonNullElements.reduce((acc, element) => acc + element, 0);
}
