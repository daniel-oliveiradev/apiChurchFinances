import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CategoryController } from "../controllers/CategoryController";

export async function categoryRoutes(category: FastifyInstance){
  category.post("/", (request:FastifyRequest, reply:FastifyReply) => {
    return new CategoryController().create(request, reply)
  })
  
  category.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new CategoryController().index(request, reply)
  })
}