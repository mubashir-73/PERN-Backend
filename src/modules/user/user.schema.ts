import { array, z } from "zod";

export const getUserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().nullable(),
  role: z.enum(["ADMIN", "STUDENT", "BUILDER"]),
  createdAt: z.string(), // ISO string
  testSessionIds: z.array(z.number()),
});

export const sessionCodeSchema = z.object({
  email: z.string(),
  role: z.string(),
  name: z.string(),
  dept: z.string(),
});

export const userCsvSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string().min(8),
  role: z.enum(["BUILDER", "STUDENT", "ADMIN"]),
});

export const sessionResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.enum(["ADMIN", "STUDENT", "BUILDER"]),
  name: z.string(),
  dept: z.string(),
});

export const CreateUserSchema = z.object({
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
  dept: z.string(), //proper enum provide here
});

export const loginSchema = z.object({
  //I GOT LAZY CREATING THESE SCHEMAS, will have to make a login response schema in future
  email: z.string(),
  name: z.string(),
  password: z.string(),
});
export const userBulkSchema = z.array(userCsvSchema);
export const UserListResponse = z.array(getUserSchema);

export type LoginPayload = z.infer<typeof loginSchema>;
export type UserTokenPayload = z.infer<typeof userTokenSchema>;
export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
export type UserBulkPayload = z.infer<typeof userBulkSchema>;
export type SessionCodeResponse = z.infer<typeof sessionCodeSchema>;
export type UserListResp = z.infer<typeof UserListResponse>;

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
