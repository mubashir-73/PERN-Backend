import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyOauth2 from "@fastify/oauth2";
import { handleOAuthCallback, generateStateToken } from "../utils/oauth.js";

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
    // Don't set startRedirectPath - we'll handle it manually
    callbackUri: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
    scope: ["email", "profile"],
  });

  // Custom Google OAuth route with state management
  server.get("/auth/google", async (request: FastifyRequest, reply: FastifyReply) => {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const redirectUri = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback";
    
    // Build Google OAuth URL manually - let OAuth plugin handle state
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", "email profile");
    authUrl.searchParams.append("hd", "svce.ac.in"); // Domain restriction
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");

    console.log("Redirecting to Google OAuth:", authUrl.toString());
    
    return reply.redirect(authUrl.toString());
  });

  server.get("/auth/google/callback", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Get state from OAuth plugin's cookie
      const storedState = request.cookies['oauth2-redirect-state'];
      const query = request.query as { state?: string };
      const { state } = query;

      console.log("OAuth callback:", {
        storedState,
        state: query.state,
        allCookies: request.cookies
      });

      if (!state || state !== storedState) {
        console.error("State mismatch:", { state, storedState });
        return reply.code(400).send({ message: "Invalid state parameter" });
      }

      // Clear OAuth plugin's state cookie
      reply.clearCookie("oauth2-redirect-state");

      const googleOAuth = (server as any).googleOAuth2;
      const token = await googleOAuth.getAccessTokenFromAuthorizationCodeFlow(request);
      const profile = token.get() as GoogleProfile;

      console.log("Google profile:", profile);

      return handleOAuthCallback(server, reply, profile);
    } catch (error) {
      console.error("OAuth callback error:", error);
      return reply.code(400).send({ 
        message: "OAuth authentication failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  server.post("/auth/logout", async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie("access_token");
    return reply.code(200).send({ message: "Logged out successfully" });
  });
}

export default oauthRoutes;