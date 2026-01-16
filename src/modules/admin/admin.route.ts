import type { FastifyInstance } from "fastify";

import {
  createExamSessionHandler,
  getSessionCodeHandler,
  getSessionStatusHandler,
  setSessionCodeHandler,
} from "./admin.controller.js";

import {
  createExamSessionBodySchema,
  sessionStatusBaseSchema,
  sessionStatusOngoingSchema,
  setSessionCodeBodySchema,
  setSessionCodeResponseSchema,
  sessionStatusResponseSchema,
  getSessionCodeResponseSchema,
} from "./admin.schema.js";
import { z } from "zod";
import { adminGuard } from "../../auth/auth.js";

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
          200: sessionStatusResponseSchema,
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
  server.get(
    "/session-code",
    {
      onRequest: [adminGuard],
      schema: {
        response: {
          200: getSessionCodeResponseSchema,
        },
      },
    },
    getSessionCodeHandler,
  );
}
