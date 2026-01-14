import type { FastifyRequest, FastifyReply } from "fastify";
import {
  createOrUpdateExamSession,
  getActiveExamSession,
  calculateRemainingTime,
  setSessionCodeByAdmin,
} from "./admin.service.js";
import { requireAdmin } from "../../utils/requireAdmin.js";

export async function createExamSessionHandler(
  request: FastifyRequest<{
    Body: { startsAt: string; endsAt: string };
  }>,
  reply: FastifyReply,
) {
  if (!(await requireAdmin(request, reply))) return;

  try {
    const { startsAt, endsAt } = request.body;

    const session = await createOrUpdateExamSession(
      new Date(startsAt),
      new Date(endsAt),
    );

    return reply.code(201).send(session);
  } catch (err) {
    return reply.code(400).send({
      message: err instanceof Error ? err.message : "Invalid data",
    });
  }
}

export async function setSessionCodeHandler(
  request: FastifyRequest<{ Body: { code: string } }>,
  reply: FastifyReply,
) {
  if (!(await requireAdmin(request, reply))) return;

  try {
    const { code } = request.body;

    const session = await setSessionCodeByAdmin(code);

    return reply.code(201).send({
      message: "Session code updated successfully",
      sessionCode: session.code,
    });
  } catch (err) {
    return reply.code(400).send({
      message:
        err instanceof Error ? err.message : "Failed to set session code",
    });
  }
}

export async function getSessionStatusHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const session = await getActiveExamSession();
    const now = new Date();

    // No active session at all
    if (!session) {
      console.log({
        status: "NO_SESSION",
        serverTime: now.toISOString(),
        endsAt: null,
        remainingMs: null, // Time until it starts
      });
      return reply.code(200).send({
        status: "NO_SESSION",
        serverTime: now.toISOString(),
        endsAt: null,
        remainingMs: null,
      });
    }

    const startsAt = session.startsAt;
    const endsAt = session.endsAt;

    // Not started yet
    if (now < startsAt) {
      console.log({
        status: "NOT_STARTED",
        serverTime: now.toISOString(),
        endsAt: endsAt.toISOString(),
        remainingMs: startsAt.getTime() - now.getTime(), // Time until it starts
      });
      return reply.code(200).send({
        status: "NOT_STARTED",
        serverTime: now.toISOString(),
        endsAt: endsAt.toISOString(),
        remainingMs: startsAt.getTime() - now.getTime(), // Time until it starts
      });
    }

    // Already ended
    if (now >= endsAt) {
      console.log({
        status: "ENDED",
        serverTime: now.toISOString(),
        endsAt: endsAt.toISOString(),
        remainingMs: 0,
      });
      return reply.code(200).send({
        status: "ENDED",
        serverTime: now.toISOString(),
        endsAt: endsAt.toISOString(),
        remainingMs: 0,
      });
    }

    console.log({
      status: "ONGOING",
      serverTime: now.toISOString(),
      endsAt: endsAt.toISOString(),
      remainingMs: endsAt.getTime() - now.getTime(),
    });

    // Ongoing
    return reply.code(200).send({
      status: "ONGOING",
      serverTime: now.toISOString(),
      endsAt: endsAt.toISOString(),
      remainingMs: endsAt.getTime() - now.getTime(),
    });
  } catch (err) {
    console.error("Error getting session status:", err);
    return reply.code(500).send({
      message: "Failed to get session status",
    });
  }
}
