import type { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler } from "./user.controller.js";
import { createUserSchema, createUserResponseSchema, loginResponseSchema, loginSchema } from "./user.schema.js";
import { authGuard } from "../../auth/auth.js";
import { log } from "console";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/register",
    {
      schema: {
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    registerUserHandler,
  );

  server.post(
  "/login",
  {
    schema: {
      body: loginSchema,
      response:{
        200:loginResponseSchema
      },
  }
},
loginHandler,
);
}




export default userRoutes;
