import { fastify, type FastifyInstance } from "fastify";
import {
  getUsersHandler,
  createUserHandler,
  loginHandler,
  bulkUploadUsersHandler,
  studentSessionLoginHandler,
} from "./user.controller.js";
import { adminGuard } from "../../auth/auth.js";
import {
  CreateUserSchema,
  loginSchema,
  sessionResponseSchema,
} from "./user.schema.js";
import { authGuard } from "../../auth/auth.js";

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
              role: { enum: ["BUILDER", "STUDENT"] }, //This will be set by the api call based on interface in frontend
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

  server.post(
    "/loginsession",
    {
      schema: {
        response: {
          201: sessionResponseSchema,
        },
      },
    },
    studentSessionLoginHandler,
  );

  server.post(
    "/users/bulk-upload",
    {
      onRequest: [adminGuard],
    },
    bulkUploadUsersHandler,
  );
}

export default userRoutes;
//TODO: Check CSV route functionality
