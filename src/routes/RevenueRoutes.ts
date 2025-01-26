import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { revenueController } from "../controllers/RevenueController";

export async function revenueRoutes(revenue: FastifyInstance){
  revenue.post("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new revenueController().create(request, reply)
  })
  revenue.put("/:id", (request: FastifyRequest, reply: FastifyReply) => {
    return new revenueController().update(request, reply)
  })
  revenue.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new revenueController().index(request, reply)
  })
}
