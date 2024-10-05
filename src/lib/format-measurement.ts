export default function formatMeasurement(
  measurement: { value: number; unit: string },
  formatOptions?: {
    numberFormatOptions?: Intl.NumberFormatOptions;
    separator?: string;
    locales?: Intl.LocalesArgument;
  }
): string {
  const { numberFormatOptions, separator, locales } = formatOptions ?? {};

  // Set style and strip options relating to units.
  const numberFormat = new Intl.NumberFormat(locales, {
    ...(numberFormatOptions ?? {}),
    style: "decimal",
    unit: undefined,
    unitDisplay: undefined,
  });

  return [numberFormat.format(measurement.value), measurement.unit].join(
    separator ?? " "
  );
}
