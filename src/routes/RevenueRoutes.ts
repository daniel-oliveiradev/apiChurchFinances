import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { revenueController } from "../controllers/RevenueController";

export async function revenueRoutes(fastify: FastifyInstance){
  fastify.post("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new revenueController().create(request, reply)
  })
  fastify.put("/:id", (request: FastifyRequest, reply: FastifyReply) => {
    return new revenueController().update(request, reply)
  })
  fastify.get("/:id", (request: FastifyRequest, reply: FastifyReply) => {
    return new revenueController().index(request, reply)
  })
}
