import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { sessionController } from "../controllers/SessionController";

export function sessionRoutes(session: FastifyInstance){
  session.post("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new sessionController().create(request, reply)
  })
}