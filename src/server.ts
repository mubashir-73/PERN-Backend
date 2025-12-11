// Import the framework and instantiate it
import Fastify from "fastify";
import userRoutes from "../src/modules/user/user.route.js";

const server = Fastify();

// Declare a route
server.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

async function main() {
  server.register(userRoutes, { prefix: "api/users" });
}

// Run the server!
try {
  await server.listen({ port: 3000, host: "0.0.0.0" });
  console.log(`Server ready at http://localhost:3000`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
