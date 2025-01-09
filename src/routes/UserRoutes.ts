import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/UserController";

export async function userRoutes(user: FastifyInstance){
  user.post("/", (request: FastifyRequest, reply: FastifyReply) => { 
    return new UserController().create(request, reply)
  })
}