import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createTestSession,
  getTestSessionById,
  checkForActiveSessionConflict,
} from "./questions.service.js";
import type { UserTokenPayload } from "../user/user.schema.js";

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
