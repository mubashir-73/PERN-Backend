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
  alreadyCompletedSession,
  deleteTestSession,
} from "./questions.service.js";
import type { UserTokenPayload } from "../user/user.schema.js";
import { ZodError } from "zod";
import { uploadImageToR2 } from "../r2Upload.service.js";

export async function uploadImageHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ message: "No file uploaded" });
    }

    // Validate file type
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedMimeTypes.includes(data.mimetype)) {
      return reply.status(400).send({
        message: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed",
      });
    }

    // Validate file size (max 5MB)
    const fileBuffer = await data.toBuffer();
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (fileBuffer.length > maxSize) {
      return reply.status(400).send({
        message: "File too large. Maximum size is 5MB",
      });
    }

    // Upload to R2
    const result = await uploadImageToR2(
      fileBuffer,
      data.filename,
      data.mimetype,
    );

    if (!result.success) {
      return reply.status(500).send({
        message: "Failed to upload image",
        error: result.error,
      });
    }

    return reply.status(200).send({
      success: true,
      url: result.url,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Error in uploadImageHandler:", error);
    return reply.status(500).send({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function createTestSessionHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = await request.jwtVerify<UserTokenPayload>();
    const userId = user.id;
    const sessionCode = user.sessionCode;
    console.log("User:", user);
    console.log("User dept:", user.dept);
    const dept = user.dept;
    const isActive = await checkForActiveSessionConflict(userId);
    if (isActive) {
      console.log("User already has an active session");
      return reply
        .code(409)
        .send({ message: "User already has an active session" });
    }
    const isCompleted = await alreadyCompletedSession(userId);
    if (isCompleted) {
      console.log("User already completed a session");
      return reply
        .code(409)
        .send({ message: "User already completed a session" });
    }
    console.log("Creating test session for user:", userId);

    const session = await createTestSession(userId, dept, sessionCode);

    if (!session) {
      console.log("Failed to create test session");
      return reply.code(500).send({ message: "Failed to create test session" });
    }

    console.log("Test session created successfully:", session.sessionId);
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
  request: FastifyRequest,
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
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Validation failed",
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
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Validation failed",
      });
    }
    console.error("Error bulk uploading questions:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export async function DeleteTestSessionHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = await request.jwtVerify<UserTokenPayload>();
    const userId = user.id;
    const session = await deleteTestSession(userId);
    return reply.code(200).send(session);
  } catch (error) {
    console.error("Error deleting test session:", error);
    return reply.code(500).send({ message: "Internal server error" });
  }
}
