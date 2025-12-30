import type { FastifyReply, FastifyRequest } from "fastify";
import { getAllUsers, createUser, loginUser } from "./user.service.js";
import type { CreateUserPayload, LoginPayload } from "./user.schema.js";
import type { UserTokenPayload } from "./user.schema.js";

export async function getUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const users = await getAllUsers();
    if (!users) {
      return reply.code(404).send({ message: "No users found" });
    }
    return reply.code(200).send(users);
  } catch (error) {
    console.error("Error getting users:", error);
    return reply.code(500).send({ message: "Internal server error" });
  }
}

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserPayload }>,
  reply: FastifyReply,
) {
  try {
    const body = request.body;
    console.log("Request body:", body);
    console.log("Bcrypt available:", !!request.server.bcrypt); // I did some Bcrypt nonsense dont worry

    const user = await createUser(body, request.server); //Token sigining is here  and then I will set that stupid cookie maybe will remove for registering and only do for login
    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    } as UserTokenPayload);
    console.log("JWT token created, setting cookie");
    reply.setCookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 60 * 60, // 3 hours
    });
    return reply.code(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error); //Yes I need to learn error handling, dont ask me again why i did this
    return reply.code(500).send({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
//FOR LOGIN
export async function loginHandler(
  request: FastifyRequest<{ Body: LoginPayload }>,
  reply: FastifyReply,
) {
  try {
    const body = request.body;
    console.log("Request body:", body);
    const user = await loginUser(body, request.server);
    if (!user)
      return reply.code(400).send({ message: "Invalid email or password" });
    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role, // ANYWAYS ROLE WILL BE TAKEN FROM DB NO NEED INPUTS IF NO ROLE THEN GOODLUCK T T WILL FIX THIS
    } as UserTokenPayload);
    console.log("JWT token created, setting cookie");
    reply.setCookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 60 * 60, // 3 hours
    });
    return reply.code(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error); //Yes I need to learn error handling, dont ask me again why i did this
    return reply.code(500).send({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
