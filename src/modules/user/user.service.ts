import prisma from "../../utils/prisma.js";
import type { CreateUserPayload } from "./user.schema.js";
import type { FastifyInstance } from "fastify";
import type { LoginPayload, UserBulkPayload } from "./user.schema.js";
import bcrypt from "bcrypt";
import { extractDeptFromEmail } from "../../utils/extractDept.js";

export async function bulkCreateUsers(users: UserBulkPayload) {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as Array<{ email: string; error: string }>,
  };

  for (const user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          role: user.role,
          password: hashedPassword,
        },
      });

      results.success++;
    } catch (error: any) {
      results.failed++;
      results.errors.push({
        email: user.email,
        error: error.message || "Unknown error",
      });
    }
  }

  return results;
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      testSessions: {
        select: {
          id: true,
          sessionCode: true,
          completedAt: true,
        },
      },
    },
  });

  return users.map((u) => {
    const session = u.testSessions[0] ?? null;

    return {
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      createdAt: u.createdAt.toISOString(),
      testSession: session
        ? {
            id: session.id,
            sessionCode: session.sessionCode,
            completedAt: session.completedAt
              ? session.completedAt.toISOString()
              : null,
          }
        : null,
    };
  });
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      provider: true,
      googleId: true,
    },
  });
}

export async function deleteUserById(userId: number) {
  console.log(`Starting deletion for user ID: ${userId}`);

  return await prisma.$transaction(async (tx) => {
    // 1. Get user first to verify it exists
    const user = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    console.log("User found:", user.email);

    // Check how many test sessions this user has
    const sessionCount = await tx.testSession.count({
      where: { userId: userId },
    });
    console.log("Test sessions:", sessionCount);

    // 2. Get user's test sessions
    const sessions = await tx.testSession.findMany({
      where: { userId: userId },
      select: { id: true },
    });

    const sessionIds = sessions.map((s) => s.id);
    console.log("Session IDs to delete:", sessionIds);

    if (sessionIds.length > 0) {
      // 3. Delete answers
      const deletedAnswers = await tx.answer.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });
      console.log("Deleted answers:", deletedAnswers.count);

      // 4. Delete session-question mappings
      const deletedQuestions = await tx.testSessionQuestion.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });
      console.log("Deleted session-question mappings:", deletedQuestions.count);

      // 5. Delete results
      const deletedResults = await tx.result.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });
      console.log("Deleted results:", deletedResults.count);

      // 6. Delete test sessions
      const deletedSessions = await tx.testSession.deleteMany({
        where: { id: { in: sessionIds } },
      });
      console.log("Deleted test sessions:", deletedSessions.count);
    }

    // 7. Check for any other relations that might block deletion
    // Check if user has any feedback
    const feedbackCount = await tx.feedback.count({
      where: { userId: userId },
    });
    console.log("Feedback count:", feedbackCount);

    if (feedbackCount > 0) {
      const deletedFeedback = await tx.feedback.deleteMany({
        where: { userId: userId },
      });
      console.log("Deleted feedback:", deletedFeedback.count);
    }

    // 8. Finally delete the user
    console.log("Attempting to delete user...");
    await tx.user.delete({
      where: { id: userId },
    });

    console.log("User deleted successfully");
    return { success: true };
  });
}

export async function createUser(
  input: CreateUserPayload,
  fastify: FastifyInstance,
) {
  const { password, ...rest } = input;
  const passwordHash = await fastify.bcrypt.hash(password);
  const user = await prisma.user.create({
    data: { ...rest, password: passwordHash },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
}

export async function loginUser(input: LoginPayload, fastify: FastifyInstance) {
  const { email, password } = input;
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      role: true,
    },
  });
  if (!user || !user.password) return null;
  const isValid = await fastify.bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function loginStudentWithSessionCode(
  input: {
    email: string;
    sessionCode: string;
    name: string;
    registerNo: string;
  },
  fastify: FastifyInstance,
) {
  const { email, sessionCode, name, registerNo } = input;

  // 1. Validate session code
  const session = await prisma.loginSession.findFirst({
    where: {
      code: sessionCode,
      isActive: true,
    },
  });

  if (!session) return null;

  // 2. Extract department
  const dept = extractDeptFromEmail(email);
  if (!dept) throw new Error("Invalid college email format");

  // 3. Upsert student

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      dept,
      regNo: registerNo,
    },
    create: {
      email,
      name,
      dept,
      role: "STUDENT",
      regNo: registerNo,
    },
    select: {
      id: true,
      email: true,
      name: true,
      dept: true,
      role: true,
    },
  });
  console.log("UPSERTED STUDENT", user);
  return user;
}

//FOR MY REFERENCE
/*
  UPSERTED STUDENT {
  id: 29,
  email: '2023cs0051@svce.ac.in',
  name: 'Mubashir',
  regNo: null,
  dept: 'CS',
  role: 'STUDENT',
  provider: null,
  googleId: null,
  password: null,
  createdAt: 2026-01-08T08:18:53.708Z,
  updatedAt: 2026-01-08T08:18:53.708Z
}*/
