import prisma from "../../utils/prisma.js";
import type { CreateUserPayload } from "./user.schema.ts";
import type { FastifyInstance } from "fastify";
import type { LoginPayload, UserBulkPayload } from "./user.schema.ts";
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
        select: { id: true },
      },
    },
  });

  return users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
    testSessionIds: u.testSessions.map((s) => s.id),
  }));
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
  return await prisma.$transaction(async (tx) => {
    // 1. Get user's test sessions
    const sessions = await tx.testSession.findMany({
      where: { UserId: userId },
      select: { id: true },
    });

    const sessionIds = sessions.map((s) => s.id);

    if (sessionIds.length > 0) {
      // 2. Delete answers
      await tx.answer.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });

      // 3. Delete session-question mappings
      await tx.testSessionQuestion.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });

      // 4. Delete results
      await tx.result.deleteMany({
        where: { sessionId: { in: sessionIds } },
      });

      // 5. Delete test sessions
      await tx.testSession.deleteMany({
        where: { id: { in: sessionIds } },
      });
    }

    // 6. Finally delete the user
    await tx.user.delete({
      where: { id: userId },
    });

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
  input: { email: string; sessionCode: string; name: string },
  fastify: FastifyInstance,
) {
  const { email, sessionCode, name } = input;

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
    },
    create: {
      email,
      name,
      dept,
      role: "STUDENT",
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
