import type { FastifyInstance, FastifyReply } from "fastify";
import type { UserRole } from "@prisma/client";
import prisma from "./prisma.js";
import type { UserTokenPayload } from "../modules/user/user.schema.js";

export function assignRole(email: string): UserRole {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

  console.log("Assigning role for email:", {
    email,
    adminEmails,
    isAdmin: adminEmails.includes(email),
    isSvceDomain: email.endsWith("@svce.ac.in"),
  });

  if (adminEmails.includes(email)) {
    console.log("Assigning ADMIN role");
    return "ADMIN";
  }

  if (email.endsWith("@svce.ac.in")) {
    console.log("Assigning STUDENT role");
    return "STUDENT";
  }

  console.log("Email domain not allowed for:", email);
  throw new Error("Email domain not allowed");
}

export function validateEmailDomain(email: string): boolean {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

  console.log("Validating email domain:", {
    email,
    adminEmails,
    isAdmin: adminEmails.includes(email),
    endsWithDomain: email.endsWith("@svce.ac.in"),
  });

  if (adminEmails.includes(email)) {
    console.log("Email is in admin list");
    return true;
  }

  const isValid = email.endsWith("@svce.ac.in");
  console.log("Email domain validation result:", isValid);
  return isValid;
}

export function generateStateToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export async function handleOAuthCallback(
  server: FastifyInstance,
  reply: FastifyReply,
  profile: any,
) {
  try {
    console.log("Handling OAuth callback with profile:", profile);

    const email = profile.email;

    if (!email) {
      throw new Error("Email is required from OAuth provider");
    }

    console.log("Validating email domain:", email);
    if (!validateEmailDomain(email)) {
      throw new Error("Email domain not allowed");
    }

    console.log("Assigning role for email:", email);
    const role = assignRole(email);
    const googleId = profile.sub || profile.id;

    console.log("Creating/updating user:", { email, role, googleId });
    const user = await prisma.user.upsert({
      where: {
        email,
        googleId,
      },
      update: {
        name: profile.name || profile.given_name,
        role,
        provider: "GOOGLE",
        googleId,
        updatedAt: new Date(),
      },
      create: {
        email,
        name: profile.name || profile.given_name,
        role,
        provider: "GOOGLE",
        googleId,
      },
    });

    console.log("User created/updated:", user);

    const token = server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    } as UserTokenPayload);

    console.log("JWT token created, setting cookie");
    reply
      .setCookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3 * 60 * 60, // 3 hours
      })
      .code(200)
      .send({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return reply.code(400).send({
      message:
        error instanceof Error ? error.message : "OAuth authentication failed",
    });
  }
}

