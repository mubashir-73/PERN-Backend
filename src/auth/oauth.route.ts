import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyOauth2 from "@fastify/oauth2";
import { handleOAuthCallback } from "../utils/oauth.js";

interface GoogleProfile {
  id: string;
  sub: string;
  email: string;
  name?: string;
  given_name?: string;
}

async function oauthRoutes(server: FastifyInstance) {
  await server.register(fastifyOauth2, {
    name: "googleOAuth2",
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID!,
        secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      auth: {
        authorizeHost: "https://accounts.google.com",
        authorizePath: "/o/oauth2/v2/auth",
        tokenHost: "https://oauth2.googleapis.com",
        tokenPath: "/token",
      },
    },
    // Let the plugin create the redirect route which handles state for us
    startRedirectPath: "/auth/google",
    callbackUri:
      process.env.GOOGLE_CALLBACK_URL ||
      "http://localhost:3000/auth/google/callback",
    scope: ["email", "profile"],
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  });

  server.get(
    "/auth/google/callback",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const googleOAuth = (server as any).googleOAuth2;

        // Exchange code for tokens
        const result = await googleOAuth.getAccessTokenFromAuthorizationCodeFlow(
          request
        );

        const accessToken = result.token.access_token as string;

        if (!accessToken) {
          return reply.code(400).send({ message: 'No access token received' });
        }

        // Clear the state cookie set by the plugin
        reply.clearCookie('oauth2-redirect-state');

        // Fetch Google profile
        const fetchResult = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        );

        if (!fetchResult.ok) {
          return reply.code(400).send({ message: 'Failed to fetch user info' });
        }

        const profile = (await fetchResult.json()) as GoogleProfile;

        return handleOAuthCallback(server, reply, profile);
      } catch (error) {
        console.error('OAuth callback error:', error);
        return reply.code(400).send({
          message: 'OAuth authentication failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    },
  );

  server.post(
    "/auth/logout",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      reply.clearCookie("access_token");
      return reply.code(200).send({ message: "Logged out successfully" });
    },
  );
}

export default oauthRoutes;

