import { z } from "zod";

export const PUPIL_STATES = ["reactive", "fixedBilaterally"] as const;
export const PupilStateEnum = z.enum(PUPIL_STATES);
export type PupilState = z.infer<typeof PupilStateEnum>;
