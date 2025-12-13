import { hashPassword, verifyPassword } from "../../utils/hash.js";
import prisma from "../../utils/prisma.js";
import type { CreateUserInput, LoginInput } from "./user.schema.ts";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, password: passwordHash },
  });
  return user;
}

export async function loginUser(input: LoginInput) {
  const { email, password } = input;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const valid = await verifyPassword(password, user.password);

  if (!valid) return null;

  return user;
}
