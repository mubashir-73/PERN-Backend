import {
  questionUploadSchema,
  bulkQuestionUploadSchema,
  type BulkQuestionUploadPayload,
  type QuestionUploadPayload,
} from "./questions.schema.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createTestSession,
  getTestSessionById,
  checkForActiveSessionConflict,
  InsertQuestion,
  InsertBulkQuestions,
} from "./questions.service.js";
import type { UserTokenPayload } from "../user/user.schema.js";
import z from "zod";

export async function createTestSessionHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = await request.jwtVerify<UserTokenPayload>();
    const userId = user.id;
    const isActive = await checkForActiveSessionConflict(userId);
    if (isActive) {
      console.log("User already has an active session");
      return reply
        .code(409)
        .send({ message: "User already has an active session" });
    }
    console.log("Creating test session for user:", userId);

    const session = await createTestSession(userId);

    if (!session) {
      console.log("Failed to create test session");
      return reply.code(500).send({ message: "Failed to create test session" });
    }

    console.log("Test session created successfully:", session.id);
    return reply.code(201).send(session);
  } catch (error) {
    console.error("Error creating test session:", error);
    return reply.code(500).send({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "unknown error",
    });
  }
}

export async function getTestSessionHandler(
  request: FastifyRequest, // <-- Add type
  reply: FastifyReply,
) {
  try {
    const sessionId = parseInt((request.params as { id: string }).id);
    const user = await request.jwtVerify<UserTokenPayload>();
    const userId = user.id;

    if (isNaN(sessionId)) {
      return reply.code(400).send({ message: "Invalid session ID" });
    }

    console.log("Getting test session:", sessionId, "for user:", userId);

    const session = await getTestSessionById(sessionId, userId);

    if (!session) {
      return reply.code(404).send({ message: "Test session not found" });
    }

    return reply.code(200).send(session);
  } catch (error) {
    console.error("Error getting test session:", error);
    return reply.code(500).send({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "unknown error",
    });
  }
}

export async function UploadQuestionsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const questionData = request.body;
    const validatedQuestion = questionUploadSchema.parse(questionData);

    const result = await InsertQuestion(validatedQuestion);

    return reply.send({
      success: true,
      data: result,
      type: validatedQuestion.type,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: "Validation failed",
        details: error.errors,
      });
    }
    console.error("Error uploading question:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export async function BulkUploadQuestionsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const bulkData = request.body;
    const validatedBulk = bulkQuestionUploadSchema.parse(bulkData);

    const results = await InsertBulkQuestions(validatedBulk);

    return reply.send({
      success: true,
      data: results,
      summary: {
        total: results.length,
        regular: results.filter((r) => r.type === "regular").length,
        comprehension: results.filter((r) => r.type === "comprehension").length,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: "Validation failed",
        details: error.errors,
      });
    }
    console.error("Error bulk uploading questions:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}
