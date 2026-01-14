import type { FastifyInstance } from "fastify";
import {
  submitAnswersHandler,
  getResultHandler,
  getAllResultsHandler,
} from "./results.controller.js";
import { z } from "zod";
import { authGuard, requireRole } from "../../auth/auth.js";

export default async function resultsRoutes(server: FastifyInstance) {
  // Submit answers and calculate result
  server.post(
    "/submit",
    {
      onRequest: [authGuard, requireRole("STUDENT")],
    },
    submitAnswersHandler,
  );

  // Get result for a specific session
  server.get(
    "/session/:sessionId",
    {
      onRequest: [authGuard, requireRole("ADMIN")],
    },
    getResultHandler,
  );

  // Get all results for authenticated user
  server.get(
    "/Userresults",
    {
      onRequest: [authGuard, requireRole("ADMIN")],
    },
    getAllResultsHandler,
  );
}

//TODO: Extract department during login and use it when creating test-session for those specific dept questions
