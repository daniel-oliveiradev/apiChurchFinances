import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { titherController } from "../controllers/TithersController";

export async function titherRoutes(tither: FastifyInstance){
  tither.post("/", (request: FastifyRequest, reply:FastifyReply) => {
    return new titherController().create(request, reply)
  })

  tither.put("/:id", (request: FastifyRequest, reply:FastifyReply) => {
    return new titherController().update(request, reply)
  })

  tither.get("/", (request:FastifyRequest, reply: FastifyReply) => {
    return new titherController().index(request, reply)
  })
}