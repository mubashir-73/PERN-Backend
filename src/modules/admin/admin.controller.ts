import type { FastifyRequest, FastifyReply } from "fastify";
import {
  createOrUpdateExamSession,
  getActiveExamSession,
  calculateRemainingTime,
  setSessionCodeByAdmin,
} from "./admin.service.ts";
import { requireAdmin } from "../../utils/requireAdmin.ts";

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
  const session = await getActiveExamSession();

  if (!session) {
    return reply.code(404).send({ message: "No active exam session" });
  }

  const result = calculateRemainingTime(session);

  if (result.status !== "ONGOING") {
    return reply.code(200).send({ status: result.status });
  }

  return reply.code(203).send({
    status: "ONGOING",
    serverTime: new Date(),
    endsAt: session.endsAt,
    remainingMs: result.remainingMs,
  });
}
