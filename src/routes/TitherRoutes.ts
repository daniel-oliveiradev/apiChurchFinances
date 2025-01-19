import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { titherController } from "../controllers/TithersController";

export async function thiterRoutes(fastify: FastifyInstance){
  fastify.post("/", (request: FastifyRequest, reply:FastifyReply) => {
    return new titherController().create(request, reply)
  })
}