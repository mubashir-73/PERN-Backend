import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserRole } from "@prisma/client";

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
}

export async function adminGuard(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    const payload = request.user as { id: number; email: string; role?: UserRole };
    
    if (!payload.role || payload.role !== 'ADMIN') {
      return reply.code(403).send({ message: "Admin access required" });
    }
  } catch (err) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
}

export function requireRole(requiredRole: UserRole) {
  return async function(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
      const payload = request.user as { id: number; email: string; role?: UserRole };
      
      if (!payload.role || payload.role !== requiredRole) {
        return reply.code(403).send({ message: `${requiredRole} access required` });
      }
    } catch (err) {
      return reply.code(401).send({ message: "Unauthorized" });
    }
  };
}
