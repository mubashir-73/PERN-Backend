import type { FastifyInstance } from "fastify";
import {
  createTestSessionHandler,
  getTestSessionHandler,
} from "./questions.controller.js";
import {
  createTestSessionRequestSchema,
  testSessionResponseSchema,
  activeSessionConflictSchema,
} from "./questions.schema.js";
import { authGuard, requireRole } from "../../auth/auth.js";

async function questionsRoutes(server: FastifyInstance) {
  server.get(
    "/session/:id",
    {
      onRequest: [authGuard, requireRole("STUDENT")],
    },
    getTestSessionHandler,
  );

  server.post(
    "/test-session",
    {
      onRequest: [authGuard, requireRole("STUDENT")],
    },
    createTestSessionHandler,
  );
}

export default questionsRoutes;

//TODO: Create a timer to delete test sessions after a certain time
//TODO: A user can only have one test session at a time
