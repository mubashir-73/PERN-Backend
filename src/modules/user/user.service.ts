import prisma from "../../utils/prisma.js";
import type { CreateUserPayload } from "./user.schema.ts";
import type { FastifyInstance } from "fastify";
import type { LoginPayload } from "./user.schema.ts";

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  if (!users) return null;

  return users;
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
