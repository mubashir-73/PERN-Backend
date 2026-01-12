import { z } from "zod";

/* ---------------------------
   Create Exam Session
--------------------------- */
export const createExamSessionBodySchema = z.object({
  startsAt: z.string(),
  endsAt: z.string(),
});

export const createExamSessionResponseSchema = z.object({
  startsAt: z.string(),
  endsAt: z.string(),
  isActive: z.boolean(),
});

/* ---------------------------
   Session Status
--------------------------- */
export const sessionStatusBaseSchema = z.object({
  status: z.enum(["NOT_STARTED", "ONGOING", "ENDED"]),
  severTime: z.string(),
  endsAt: z.string(),
});

export const sessionStatusOngoingSchema = z.object({
  status: z.literal("ONGOING"),
  serverTime: z.string(),
  endsAt: z.string(),
  remainingMs: z.number(),
});

/* ---------------------------
   Set Session Code
--------------------------- */
export const setSessionCodeBodySchema = z.object({
  code: z.string().min(4),
});

export const setSessionCodeResponseSchema = z.object({
  message: z.string(),
  sessionCode: z.string(),
});
