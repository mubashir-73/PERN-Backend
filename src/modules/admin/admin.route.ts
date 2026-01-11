import type { FastifyInstance } from "fastify";

import {
  createExamSessionHandler,
  getSessionStatusHandler,
  setSessionCodeHandler,
} from "./admin.controller.ts";

import {
  createExamSessionBodySchema,
  sessionStatusBaseSchema,
  sessionStatusOngoingSchema,
  setSessionCodeBodySchema,
  setSessionCodeResponseSchema,
} from "./admin.schema.ts";

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
          200: sessionStatusBaseSchema,
          203: sessionStatusOngoingSchema,
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
