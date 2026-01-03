import { z } from "zod";

export const getUserSchema = z.object({
  //admin needs to be able to see all users
  id: z.number(),
  email: z.string(),
  name: z.string().optional(),
  role: z.enum(["ADMIN", "STUDENT"]),
  createdAt: z.string(),
});

export const CreateUserSchema = z.object({
  // for registering those bitches
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: z.enum(["BUILDER", "STUDENT", "ADMIN"]),
});

export const CreateUserResponseSchema = z.object({
  // for responding
  id: z.number(),
  email: z.string(),
  name: z.string(),
});

export const userTokenSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.enum(["ADMIN", "STUDENT", "BUILDER"]),
});

export const loginSchema = z.object({
  //I GOT LAZY CREATING THESE SCHEMAS, will have to make a login response schema in future
  email: z.string(),
  password: z.string(),
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type UserTokenPayload = z.infer<typeof userTokenSchema>;
export type CreateUserPayload = z.infer<typeof CreateUserSchema>;

//TODO: Add login response schema

/* Aptitude
points: { type: Number, required: true, min: 0, max: 50 },
    aptitude: { type: Number, required: true, min: 0, max: 10 },
    core: { type: Number, required: true, min: 0, max: 10 },
    verbal: { type: Number, required: true, min: 0, max: 10 },
    programming: { type: Number, required: true, min: 0, max: 10 },
    comprehension: { type: Number, required: true, min: 0, max: 10 
    GD
    {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    regNo: { type: String, requi,ed: true, unique: true },
    dept: { type: String, required: true },
    total: { type: Number, required: true, min: 0 },
    subject_knowledge: { type: Number, required: true, min: 0, max: 10 },
    communication_skills: { type: Number, required: true, min: 0, max: 10 },
    body_language: { type: Number, required: true, min: 0, max: 10 },
    listening_skills: { type: Number, required: true, min: 0, max: 10 },
    active_participation: { type: Number, required: true, min: 0, max: 10 },
  }
*/
