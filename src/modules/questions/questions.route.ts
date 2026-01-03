import type { FastifyInstance } from "fastify";
import {
  createTestSessionHandler,
  getTestSessionHandler,
  UploadQuestionsHandler,
  BulkUploadQuestionsHandler,
} from "./questions.controller.js";
import {
  questionSchema,
  questionUploadSchema,
  bulkQuestionUploadSchema,
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

  server.post(
    "/questionsUpload", // This shit barely works now, Validations not done and especially havent wrapped my head around comprehension question upload logic
    {
      onRequest: [authGuard, requireRole("BUILDER")],
      schema: {
        body: questionUploadSchema,
      },
    },
    UploadQuestionsHandler,
  );

  server.post(
    "/questionsBulkUpload",
    {
      onRequest: [authGuard, requireRole("BUILDER")],
      schema: {
        body: bulkQuestionUploadSchema,
      },
    },
    BulkUploadQuestionsHandler,
  );
}

export default questionsRoutes;

//TODO: Find a way to grant builder access to the questions route and test it
