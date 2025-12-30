import bcrypt from "bcrypt";
import fp from "fastify-plugin";

const bcryptPlugin = fp(async (fastify) => {
  fastify.decorate("bcrypt", {
    hash: (password: string, saltRounds = 12) =>
      bcrypt.hash(password, saltRounds),
    compare: (password: string, hash: string) => bcrypt.compare(password, hash),
  });
});

export default bcryptPlugin;

//TODO: Figure out the issue with bcrypt and try to make a plugin to quickly create reg and login.
