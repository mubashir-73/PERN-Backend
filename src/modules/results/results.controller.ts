import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { submitAnswersSchema } from "./results.schema.ts";
import {
  submitAnswersAndCalculateResult,
  getResultBySessionId,
  getAllResultsByUserId,
} from "./results.service.ts";

// Submit answers endpoint
export async function submitAnswersHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Assuming you have user authentication middleware that sets request.user
    const userId = (request as any).user?.id;

    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const answersData = request.body;
    const validatedAnswers = submitAnswersSchema.parse(answersData);

    const result = await submitAnswersAndCalculateResult(
      validatedAnswers,
      userId,
    );

    return reply.status(200).send({
      success: true,
      message: "Answers submitted successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: "Validation failed",
        details: error.errors,
      });
    }

    if (error instanceof Error) {
      return reply.status(400).send({
        error: error.message,
      });
    }

    console.error("Error submitting answers:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

// Get result for a session
export async function getResultHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = (request as any).user?.id;

    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const sessionId = parseInt(
      (request.params as { sessionId: string }).sessionId,
    );

    if (isNaN(sessionId)) {
      return reply.status(400).send({ error: "Invalid session ID" });
    }

    const result = await getResultBySessionId(sessionId, userId);

    if (!result) {
      return reply.status(404).send({ error: "Result not found" });
    }

    return reply.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching result:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

// Get all results for the authenticated user
export async function getAllResultsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = (request as any).user?.id;

    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const results = await getAllResultsByUserId(userId);

    return reply.status(200).send({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}
