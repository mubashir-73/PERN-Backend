import { z } from "zod";

export const answerSchema = z.object({
  questionId: z.number().int().positive(),
  optionId: z.number().int().positive(),
});

export const submitAnswersSchema = z.object({
  sessionId: z.number().int().positive(),
  answers: z.array(answerSchema).min(1, "At least one answer is required"),
});

// Schema for result response
export const resultSchema = z.object({
  id: z.number(),
  userId: z.number(),
  sessionId: z.number(),
  totalPoints: z.number().min(0).max(50),
  aptitude: z.number().min(0).max(10),
  core: z.number().min(0).max(20),
  verbal: z.number().min(0).max(5),
  programming: z.number().min(0).max(10),
  comprehension: z.number().min(0).max(5),
  createdAt: z.date(),
});

export type SubmitAnswersPayload = z.infer<typeof submitAnswersSchema>;
export type AnswerPayload = z.infer<typeof answerSchema>;
export type ResultPayload = z.infer<typeof resultSchema>;
