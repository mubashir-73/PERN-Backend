import type { FastifyInstance } from "fastify";
import { submitFeedbackHandler } from "./feedback.controller.js";
import { authGuard, requireRole } from "../../auth/auth.js";

export async function feedbackRoutes(server: FastifyInstance) {
  server.post(
    "/submit",
    {
      onRequest: [authGuard, requireRole("STUDENT")],
    },
    submitFeedbackHandler,
  );
}

export default feedbackRoutes;
