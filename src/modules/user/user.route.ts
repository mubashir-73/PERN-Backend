import type { FastifyInstance } from "fastify";
import { getUsersHandler } from "./user.controller.js";
import { adminGuard } from "../../auth/auth.js";

async function userRoutes(server: FastifyInstance) {
  server.get(
    "/list",
    {
      onRequest: [adminGuard],
      schema: {
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                email: { type: "string" },
                name: { type: "string" },
                role: { enum: ["ADMIN", "STUDENT"] },
                createdAt: { type: "string" }
              }
            }
          },
        },
      },
    },
    getUsersHandler,
  );
}

export default userRoutes;
