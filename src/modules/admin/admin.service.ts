import prisma from "../../utils/prisma.js";

export async function createOrUpdateExamSession(startsAt: Date, endsAt: Date) {
  if (endsAt <= startsAt) {
    throw new Error("End time must be after start time");
  }

  // Disable previous sessions
  await prisma.examSession.updateMany({
    where: { isActive: true },
    data: { isActive: false },
  });

  return prisma.examSession.create({
    data: {
      startsAt,
      endsAt,
      isActive: true,
    },
  });
}

export async function getActiveExamSession() {
  return prisma.examSession.findFirst({
    where: { isActive: true },
  });
}

export function calculateRemainingTime(session: {
  startsAt: Date;
  endsAt: Date;
}) {
  const now = new Date();

  if (now < session.startsAt) {
    return { status: "NOT_STARTED" as const };
  }

  if (now >= session.endsAt) {
    return { status: "ENDED" as const };
  }

  return {
    status: "ONGOING" as const,
    remainingMs: session.endsAt.getTime() - now.getTime(),
  };
}

export async function setSessionCodeByAdmin(code: string) {
  if (!code || code.trim().length < 4) {
    throw new Error("Session code must be at least 4 characters");
  }

  return prisma.$transaction(async (tx) => {
    // Deactivate all existing session codes
    await tx.loginSession.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Create new active session code
    const session = await tx.loginSession.create({
      data: {
        code: code.trim(),
        isActive: true,
      },
    });

    return session;
  });
}

export async function getSessionCodeByAdmin() {
  return prisma.loginSession.findFirst({
    where: { isActive: true },
    select: { code: true },
  });
}
