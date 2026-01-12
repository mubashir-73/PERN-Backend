import { z } from "zod";

// Base schemas (keep your existing ones)
export const optionSchema = z.object({
  id: z.number(),
  questionId: z.number(),
  text: z.string(),
});

export const deleteTestSessionRequestSchema = z.object({
  userId: z.number(),
});

export const questionSchema = z.object({
  id: z.number(),
  category: z.string(),
  subCategory: z.string().optional(),
  question: z.string(),
  image: z.string().optional(),
  comprehensionId: z.number().optional(),
  options: z.array(optionSchema),
  CorrectOptionId: z.number(),
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

// Request schemas
export const createTestSessionRequestSchema = z.object({
  UserId: z.number(),
  ExpiresAt: z.date(),
});

// Response schemas
export const testSessionResponseSchema = testSessionSchema.extend({
  questions: z.array(
    questionSchema.extend({
      options: z.array(optionSchema),
      passage: z.string().optional(),
      order: z.number(),
    }),
  ),
});

export const activeSessionConflictSchema = z.object({
  message: z.literal("Active session already exists"),
  sessionId: z.number(),
});

// NEW: Upload schemas (for creating new questions)
export const uploadOptionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
});

export const uploadQuestionBaseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().optional(),
  question: z.string().min(1, "Question text is required"),
  image: z.string().optional(),
  correctOptionId: z.number().int(),
});

export const uploadComprehensionSchema = z.object({
  passage: z.string().min(1, "Passage is required"),
  questions: z
    .array(
      uploadQuestionBaseSchema.extend({
        options: z
          .array(uploadOptionSchema)
          .length(4, "Exactly 4 options required for comprehension questions"),
      }),
    )
    .length(5, "Exactly 5 questions required for comprehension"),
});

// Discriminated union for upload
export const questionUploadSchema = z.discriminatedUnion("type", [
  // Regular question
  z.object({
    type: z.literal("regular"),
    category: z.string().min(1, "Category is required"),
    subCategory: z.string().optional(),
    question: z.string().min(1, "Question text is required"),
    image: z.string().optional(),
    options: z
      .array(uploadOptionSchema)
      .length(4, "Exactly 4 options required for regular questions"),
    correctOptionId: z.number().int(),
  }),
  // Comprehension question
  z.object({
    type: z.literal("comprehension"),
    comprehension: uploadComprehensionSchema,
  }),
]);

export const bulkQuestionUploadSchema = z.object({
  questions: z
    .array(questionUploadSchema)
    .min(1, "At least one question or comprehension is required"),
});

export type BulkQuestionUploadPayload = z.infer<
  typeof bulkQuestionUploadSchema
>;

// Existing type exports
export type QuestionPayload = z.infer<typeof questionSchema>;
export type OptionPayload = z.infer<typeof optionSchema>;

// NEW: Upload type exports
export type QuestionUploadPayload = z.infer<typeof questionUploadSchema>;
export type UploadOptionPayload = z.infer<typeof uploadOptionSchema>;
export type UploadComprehensionPayload = z.infer<
  typeof uploadComprehensionSchema
>;
