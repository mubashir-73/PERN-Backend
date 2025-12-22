// Import the framework and instantiate it
import "dotenv/config";
import Fastify from "fastify";
import userRoutes from "./modules/user/user.route.js";
import oauthRoutes from "./auth/oauth.route.js";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { authGuard, adminGuard } from "./auth/auth.js";

const server = Fastify().withTypeProvider<ZodTypeProvider>();
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
await server.register(fastifyCookie);
await server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  cookie: {
    cookieName: "access_token",
    signed: false,
  },
});

server.decorate("authGuard", authGuard);
server.decorate("adminGuard", adminGuard);
// Declare a route
server.get("/", async function handler() {
  return { hello: "world" };
});

await server.register(userRoutes, { prefix: "/api/users" });
await server.register(oauthRoutes);

// Run the server!
try {
  await server.listen({ port: 3000, host: "0.0.0.0" });
  console.log(`Server ready at http://localhost:3000`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
