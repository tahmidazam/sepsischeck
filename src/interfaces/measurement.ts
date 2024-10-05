import { z } from "zod";

export const MeasurementSchema = <U extends [string, ...string[]]>(
  unitEnum: z.ZodEnum<U>
) =>
  z.object({
    value: z.coerce.number(),
    unit: unitEnum,
  });
