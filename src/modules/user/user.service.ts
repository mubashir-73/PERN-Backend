import prisma from "../../utils/prisma.js";
import type { CreateUserInput } from "./user.schema.ts";

export async function createUser(input: CreateUserInput) {
  const user = await prisma.user.create({
    data: input,
  });
}
