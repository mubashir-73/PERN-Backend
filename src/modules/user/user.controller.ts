import type { FastifyReply, FastifyRequest } from "fastify";
import { createUser, loginUser } from "./user.service.js";
import type { CreateUserInput, LoginInput } from "./user.schema.js";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.body;
  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;}>,
  reply: FastifyReply,
)
{
  const {email,password} = request.body;

  const user = await loginUser({email,password});

  if(!user)
  {
    return reply.code(401).send({message:"Invalid credentials"});
  }

   const token = request.server.jwt.sign({
    id: user.id,
    email: user.email,
  });

  reply
    .setCookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    })
    .code(200)
    .send({
      id: user.id,
      email: user.email,
      name: user.name,
    });

}
