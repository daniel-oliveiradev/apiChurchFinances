import type { FastifyReply, FastifyRequest } from "fastify";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { AppError } from "../utils/AppError";
import prismaClient from "../prisma";

export class SubCategoryController{
  async create(request: FastifyRequest, reply: FastifyReply){
    ensureAuthenticated(request)
              
    const userId = request.user.id
    const { name, type } = request.body as { name: string, type: string }
    const { categoryId } = request.params as { categoryId: string }
    
    if(!name || !type){
      throw new AppError("Preencha todos os campos.")
    }

    const subCategory = await prismaClient.subCategory.create({
      data:{
        name,
        type,
        userId,
        categoryId
      }
    })

    return reply.status(201).send(subCategory)
  }

  async index(request: FastifyRequest, reply: FastifyReply){
    ensureAuthenticated(request)

    const subCategories = await prismaClient.subCategory.findMany()

    return reply.status(201).send([ ...subCategories ])
  }
} 