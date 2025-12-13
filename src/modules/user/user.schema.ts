import { z } from "zod/v4";

const userCore = {
  email: z.string("email must be a string").min(1, "Email is required"),
  name: z.string("name must be a string").min(1, "Name is required"),
};

export const createUserSchema = z.object({
  ...userCore,
  password: z
    .string("password must be a string")
    .min(1, "Password is required"),
});

export const createUserResponseSchema = z.object({
  ...userCore,
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(1),
});

export const loginResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
