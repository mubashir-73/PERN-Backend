import prisma from "../../utils/prisma.js";

export async function createUser(input) {
  const user = await prisma.user.create({
    data: input,
  });
}
