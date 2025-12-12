import {z} from  'zod/v4';

const createUserSchema = z.object({
    email: z.string("email must be a string").min(1,"Email is required"),
    name: z.string("name must be a string").min(1,"Name is required"),
    password: z.string().min(1,"Password is required"),
})

export type CreateUserInput = z.infer<typeof createUserSchema>;