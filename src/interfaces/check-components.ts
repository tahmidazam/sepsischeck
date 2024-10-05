import { z } from "zod";

export const CheckComponentsSchema = z.object({
  saturationOfPeripheralOxygenToFractionOfInspiredOxygenRatio: z
    .number()
    .nullable(),
  respiratoryComponent: z.number().nullable(),
  vasoactiveMedicineCountSubcomponent: z.number().nullable(),
  lactateConcentrationSubcomponent: z.number().nullable(),
  meanArterialPressureSubcomponent: z.number().nullable(),
  cardiovascularComponent: z.number().nullable(),
  plateletConcentrationSubcomponent: z.number().nullable(),
  internationalNormalizedRatioSubcomponent: z.number().nullable(),
  dDimerConcentrationSubcomponent: z.number().nullable(),
  fibrinogenConcentrationSubcomponent: z.number().nullable(),
  coagulationComponent: z.number().nullable(),
  neurologicalComponent: z.number().nullable(),
});
export type CheckComponents = z.infer<typeof CheckComponentsSchema>;
