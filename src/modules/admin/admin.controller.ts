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
      return reply.code(200).send({
        status: "NO_SESSION",
        serverTime: now.toISOString(),
      });
    }

    const startsAt = session.startsAt;
    const endsAt = session.endsAt;

    // Debug log (optional, remove later)
    console.log({
      serverNowUTC: now.toISOString(),
      startsAtUTC: startsAt.toISOString(),
      endsAtUTC: endsAt.toISOString(),
    });

    // Not started yet
    if (now < startsAt) {
      return reply.code(200).send({
        status: "NOT_STARTED",
        serverTime: now.toISOString(),
        startsAt: startsAt.toISOString(),
      });
    }

    // Already ended
    if (now >= endsAt) {
      return reply.code(200).send({
        status: "ENDED",
        serverTime: now.toISOString(),
        endsAt: endsAt.toISOString(),
      });
    }

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
