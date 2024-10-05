import { z } from "zod";
import { AgeBandEnum } from "./age-band";
import { RespiratorySupportEnum } from "./respiratory-support";
import { MeasurementSchema } from "./measurement";
import { LactateConcentrationUnitEnum } from "../units/lactate-concentration-unit";
import { MeanArterialPressureUnitEnum } from "../units/mean-arterial-pressure-unit";
import { PlateletConcentrationUnitEnum } from "../units/platelet-concentration-unit";
import { DDimerConcentrationUnitEnum } from "../units/d-dimer-concentration-unit";
import { FibrinogenConcentrationUnitEnum } from "../units/fibrinogen-concentration-unit";
import { PupilStateEnum } from "./pupil-state";

export const CheckSchema = z.object({
  ageBand: AgeBandEnum,
  saturationOfPeripheralOxygen: z.coerce.number().min(0).max(100),
  fractionOfInspiredOxygen: z.coerce.number().min(0).max(1),
  respiratorySupport: RespiratorySupportEnum,
  vasoactiveMedicationCount: z.coerce.number().int(),
  lactateConcentration: MeasurementSchema(LactateConcentrationUnitEnum),
  meanArterialPressure: MeasurementSchema(MeanArterialPressureUnitEnum),
  plateletConcentration: MeasurementSchema(PlateletConcentrationUnitEnum),
  internationalNormalizedRatio: z.coerce.number().min(0),
  dDimerConcentration: MeasurementSchema(DDimerConcentrationUnitEnum),
  fibrinogenConcentration: MeasurementSchema(FibrinogenConcentrationUnitEnum),
  glasgowComaScale: z.coerce.number().int().min(3).max(15),
  pupilState: PupilStateEnum,
  omittedParameters: z.array(z.string()),
});
export type Check = z.infer<typeof CheckSchema>;
