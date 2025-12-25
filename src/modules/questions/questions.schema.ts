import { z } from "zod/v4";

export const optionSchema = z.object({
  id: z.number(),
  questionId: z.number(),
  text: z.string(),
});

export const questionSchema = z.object({
  id: z.number(),
  category: z.string(),
  subCategory: z.string().optional(),
  question: z.string(),
  image: z.string().optional(),
  comprehensionId: z.number().optional(),
  options: z.array(optionSchema),
});

export const testSessionQuestionSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  questionId: z.number(),
  order: z.number(),
});

export const testSessionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  questions: z.array(testSessionQuestionSchema),
});

export const comprehensionSchema = z.object({
  id: z.number(),
  passage: z.string(),
  questions: z.array(questionSchema),
});
