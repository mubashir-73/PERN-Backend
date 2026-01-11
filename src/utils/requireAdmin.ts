import type { FastifyRequest, FastifyReply } from "fastify";

export async function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();

    const user = request.user as { role?: string };

    if (user.role !== "ADMIN") {
      reply.code(403).send({ message: "Admins only" });
      return false;
    }

    return true;
  } catch {
    reply.code(401).send({ message: "Unauthorized" });
    return false;
  }
}
