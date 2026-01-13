import Papa from "papaparse";
import type { FastifyReply, FastifyRequest } from "fastify";
import {
  getAllUsers,
  createUser,
  loginUser,
  deleteUserById,
  bulkCreateUsers,
} from "./user.service.js";
import type { CreateUserPayload, LoginPayload } from "./user.schema.js";
import { sessionResponseSchema, userBulkSchema } from "./user.schema.ts";
import type { UserTokenPayload } from "./user.schema.js";
import { loginStudentWithSessionCode } from "./user.service.js";
import type { RouteGenericInterface } from "fastify";

interface CreateUserRoute extends RouteGenericInterface {
  Body: CreateUserPayload;
}

export async function getUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const users = await getAllUsers();
    if (!users) {
      return reply.code(404).send({ message: "No users found" });
    }
    console.log("USERS in Controller layer", users);
    return reply.code(200).send(users);
  } catch (error) {
    console.error("Error getting users:", error);
    return reply.code(500).send({ message: "Internal server error" });
  }
}

export async function bulkUploadUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ error: "No file uploaded" });
    }

    // Read the CSV file
    const buffer = await data.toBuffer();
    const csvText = buffer.toString("utf-8");

    // Parse CSV
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });

    if (parsed.errors.length > 0) {
      return reply.status(400).send({
        error: "CSV parsing failed",
        details: parsed.errors,
      });
    }

    // Validate data
    const validatedUsers = userBulkSchema.parse(parsed.data);

    // Import users
    const result = await bulkCreateUsers(validatedUsers);

    return reply.status(201).send({
      success: true,
      imported: result.success,
      failed: result.failed,
      errors: result.errors,
    });
  } catch (error) {
    console.error("Bulk upload error:", error);
    return reply.status(500).send({ error: "Import failed" });
  }
}

export async function createUserHandler(
  request: FastifyRequest<CreateUserRoute>,
  reply: FastifyReply,
) {
  try {
    const body = request.body; // fully typed 🎉

    const user = await createUser(body, request.server);

    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    reply.setCookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 60 * 60,
    });

    return reply.code(201).send(user);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({
      message: "Internal server error",
    });
  }
}
//FOR LOGIN
export async function loginHandler(
  request: FastifyRequest<{ Body: LoginPayload }>,
  reply: FastifyReply,
) {
  try {
    const body = request.body;
    console.log("Request body:", body);
    const user = await loginUser(body, request.server);
    if (!user)
      return reply.code(400).send({ message: "Invalid email or password" });
    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role, // ANYWAYS ROLE WILL BE TAKEN FROM DB NO NEED INPUTS IF NO ROLE THEN GOODLUCK T T WILL FIX THIS
    } as UserTokenPayload);
    console.log("JWT token created, setting cookie");
    reply.setCookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 60 * 60, // Dynamic timing setting and through admin
    });
    return reply.code(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error); //Yes I need to learn error handling, dont ask me again why i did this
    return reply.code(500).send({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function studentSessionLoginHandler(
  request: FastifyRequest<{
    Body: {
      email: string;
      sessionCode: string;
      name: string;
      registerNo: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {
    const user = await loginStudentWithSessionCode(
      request.body,
      request.server,
    );

    if (!user) {
      return reply.code(401).send({ message: "Invalid session code" });
    }

    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
      dept: user.dept,
    });

    reply.setCookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 60 * 60,
    });

    const safeUser = sessionResponseSchema.parse(user);
    console.log(safeUser);

    // Return user directly, not wrapped in an object
    return reply.code(201).send(user);
  } catch (err) {
    console.error("Session login error:", err);
    return reply.code(400).send({
      message: err instanceof Error ? err.message : "Login failed",
    });
  }
}

export async function deleteUserHandler(request: any, reply: any) {
  const userId = Number(request.params.userId);

  if (isNaN(userId)) {
    return reply.status(400).send({ message: "Invalid user ID" });
  }

  try {
    await deleteUserById(userId);
    return reply.send({ message: "User deleted successfully" });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Failed to delete user",
    });
  }
}
