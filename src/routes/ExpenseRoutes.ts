import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { expenseController } from "../controllers/ExpenseController";

export async function expenseRoutes(expense: FastifyInstance){
  expense.post("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new expenseController().create(request, reply)
  })
  expense.put("/:id", (request: FastifyRequest, reply: FastifyReply) => {
    return new expenseController().update(request, reply)
  })
  expense.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new expenseController().index(request, reply)
  })
  expense.delete("/:id", (request: FastifyRequest, reply:FastifyReply) => {
      return new expenseController().delete(request, reply)
    })
}
