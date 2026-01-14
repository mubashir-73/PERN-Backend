import type { FastifyInstance } from "fastify";

import {
  createExamSessionHandler,
  getSessionStatusHandler,
  setSessionCodeHandler,
} from "./admin.controller.js";

import {
  createExamSessionBodySchema,
  sessionStatusBaseSchema,
  sessionStatusOngoingSchema,
  setSessionCodeBodySchema,
  setSessionCodeResponseSchema,
} from "./admin.schema.js";
import { z } from "zod";

export const sessionStatusResponseSchema = z.union([
  sessionStatusOngoingSchema,
  sessionStatusBaseSchema,
]);

export async function adminRoutes(server: FastifyInstance) {
  server.post(
    "/exam-session",
    {
      schema: {
        body: createExamSessionBodySchema,
      },
    },
    createExamSessionHandler,
  );
  server.get(
    "/exam-session/status",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              status: {
                type: "string",
                enum: ["NOT_STARTED", "ONGOING", "ENDED", "NO_SESSION"],
              },
              serverTime: { type: "string" },
              endsAt: { type: ["string", "null"] }, // ❌ This doesn't allow null!
              remainingMs: { type: ["number", "null"] }, // ❌ This doesn't allow null!
            },
          },
          404: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    getSessionStatusHandler,
  );
  server.post(
    "/session-code",
    {
      schema: {
        body: setSessionCodeBodySchema,
        response: {
          201: setSessionCodeResponseSchema,
        },
      },
    },
    setSessionCodeHandler,
  );
}
