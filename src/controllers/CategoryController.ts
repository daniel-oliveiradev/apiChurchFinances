import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/AppError";
import prismaClient from "../prisma";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

export class CategoryController{
  async create(request: FastifyRequest, reply:FastifyReply){
    ensureAuthenticated(request)

    const userId = request.user.id
    const { name, type } = request.body as { name: string, type:string }
    
    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })

    if(!user){
      throw new AppError("Usuário não cadastrado.")
    }

    if(!name && !type){
      throw new AppError("Preencha todos os campos.")
    }

    const category = await prismaClient.category.create({
      data:{
        name,
        type,
        userId
      }
    })

    return reply.status(201).send(category)
  }

  async index(request: FastifyRequest, reply:FastifyReply){
    ensureAuthenticated(request)

    const categories = await prismaClient.category.findMany()

    reply.status(201).send([ ...categories ])
  }

  async delete(request: FastifyRequest, reply: FastifyReply){
    ensureAuthenticated(request)

    const { categoryId } = request.params as { categoryId: string }

    const category = await prismaClient.category.findFirst({
      where:{
        id: categoryId
      }
    })

    if(!category){
      throw new AppError("Categoria não encontrada.")
    }

    await prismaClient.category.delete({
      where: {
        id: category.id
      }
    })

    return reply.send()
  }
}