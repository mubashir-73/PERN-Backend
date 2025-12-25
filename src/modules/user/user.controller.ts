import type { FastifyReply, FastifyRequest } from "fastify";
import { getAllUsers } from "./user.service.js";

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
