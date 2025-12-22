import { z } from "zod/v4";

export const getUserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().optional(),
  role: z.enum(["ADMIN", "STUDENT"]),
  createdAt: z.string()
});