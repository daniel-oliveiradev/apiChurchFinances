import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { expenseController } from "../controllers/ExpenseController";

export async function expenseRoutes(fastify: FastifyInstance){
  fastify.post("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new expenseController().create(request, reply)
  })
  fastify.put("/:id", (request: FastifyRequest, reply: FastifyReply) => {
    return new expenseController().update(request, reply)
  })
  fastify.get("/:id", (request: FastifyRequest, reply: FastifyReply) => {
    return new expenseController().index(request, reply)
  })
}
