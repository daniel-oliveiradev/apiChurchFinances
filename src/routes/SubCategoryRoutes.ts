import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SubCategoryController } from "../controllers/SubCategoryController";

export async function subCategoryRoutes(subCategory: FastifyInstance){
  subCategory.post("/:cateoryId", (request:FastifyRequest, reply:FastifyReply) => {
    return new SubCategoryController().create(request, reply)
  })

  subCategory.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    return new SubCategoryController().index(request, reply)
  })

  subCategory.delete("/:id", (request: FastifyRequest, reply: FastifyReply) => {
    return new SubCategoryController().delete(request, reply)
  })
}