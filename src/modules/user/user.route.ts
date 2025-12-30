import { fastify, type FastifyInstance } from "fastify";
import {
  getUsersHandler,
  createUserHandler,
  loginHandler,
} from "./user.controller.js";
import { adminGuard } from "../../auth/auth.js";
import { CreateUserSchema, loginSchema } from "./user.schema.js";

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
                createdAt: { type: "string" },
              },
            },
          },
        },
      },
    },
    getUsersHandler,
  );

  server.post(
    "/create-user",
    {
      schema: {
        body: CreateUserSchema,
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              email: { type: "string" },
              name: { type: "string" },
            },
          },
        },
      },
    },
    createUserHandler,
  );

  server.post(
    "/login",
    {
      schema: {
        body: loginSchema,
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              email: { type: "string" },
              name: { type: "string" },
            },
          },
        },
      },
    },
    loginHandler,
  );
}

export default userRoutes;
