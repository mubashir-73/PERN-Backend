import { fastify, type FastifyInstance } from "fastify";
import {
  getUsersHandler,
  createUserHandler,
  loginHandler,
  bulkUploadUsersHandler,
  studentSessionLoginHandler,
  deleteUserHandler,
} from "./user.controller.js";
import { adminGuard } from "../../auth/auth.js";
import {
  CreateUserSchema,
  loginSchema,
  sessionResponseSchema,
  UserListResponse,
  type CreateUserPayload,
} from "./user.schema.js";
import type { RouteGenericInterface } from "fastify";
import z from "zod";

const CreateUserResponse = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
});

interface CreateUserRoute extends RouteGenericInterface {
  Body: CreateUserPayload;
}

async function userRoutes(server: FastifyInstance) {
  server.get(
    "/list",
    {
      onRequest: [adminGuard],
      schema: {
        response: {
          200: UserListResponse,
        },
      },
    },
    getUsersHandler,
  );

  server.delete(
    "/:userId",
    {
      onRequest: [adminGuard],
    },
    deleteUserHandler,
  );

  server.post<CreateUserRoute>(
    "/create-user",
    {
      onRequest: [adminGuard],
      schema: {
        body: CreateUserSchema,
        response: {
          201: CreateUserResponse,
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
