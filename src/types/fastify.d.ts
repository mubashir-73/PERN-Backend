import "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authGuard: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
