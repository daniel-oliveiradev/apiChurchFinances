import type { FastifyReply, FastifyRequest } from "fastify";

import prismaClient from "../prisma";
import { AppError } from "../utils/AppError";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

interface revenueProps{
  description: string
  value: number
  dueDate: string
  category: string
  subCategory: string
}

 export class revenueController{
  async create(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id
    const { description, value, dueDate, category, subCategory } = request.body as revenueProps

    
    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })
    
    if(user?.isValidated === false){
      throw new AppError("Conta sem confirmação de email.", 401)
    }
    
    if(!description || !value || !dueDate || !category){
      throw new AppError("Preencha todos os campos.")
    }

    const checkIfCategoryExists = await prismaClient.category.findFirst({
      where: {
        name: category
      }
    })

    if(!checkIfCategoryExists){
      throw new AppError("Categoria informada não cadastrada.")
    }

    if(subCategory){
      const revenue = await prismaClient.revenue.create({
        data:{
          description,
          value,
          dueDate,
          category,
          subCategory,
          userId
        }
      })

      return reply.status(201).send(revenue)
    }

    const revenue = await prismaClient.revenue.create({
      data:{
        description,
        value,
        dueDate,
        category,
        subCategory: "",
        userId
      }
    })

    return reply.status(201).send(revenue)
  }

  async update(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id
    const { id } = request.params as { id: string }
    const { description, value, dueDate, category, subCategory } = request.body as revenueProps

    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })

    if(user?.isValidated === false){
      throw new AppError("Conta sem confirmação de email.", 401)
    }

    if(!description || !value || !dueDate || !category || !subCategory ){
      throw new AppError("Preencha todos os campos.")
    }
    
    const checkIfCategoryExists = await prismaClient.category.findFirst({
      where: {
        name: category
      }
    })

    if(!checkIfCategoryExists){
      throw new AppError("Categoria informada não cadastrada.")
    }

    const checkIfSubCategoryExists = await prismaClient.subCategory.findFirst({
      where: {
        name: subCategory
      }
    })

    if(!checkIfSubCategoryExists){
      throw new AppError("Sub categoria informada não cadastrada.")
    }

    const revenue = await prismaClient.revenue.findFirst({
      where:{
        id
      }
    })

    if(!revenue){
      throw new AppError("Receita não cadastrada.")
    }

    revenue.description = description ?? revenue.description
    revenue.value = value ?? revenue.value
    revenue.dueDate = dueDate ?? revenue.dueDate
    revenue.category = category ?? revenue.category
    revenue.subCategory = subCategory ?? revenue.subCategory

    const revenueUpdated = await prismaClient.revenue.update({
      where:{
        id
      },
      data:{
        description:revenue.description,
        value:revenue.value,
        dueDate:revenue.dueDate,
        category: revenue.category,
        subCategory: revenue.subCategory,
        updatedAt: new Date()
      }
    })

    return reply.send(revenueUpdated)
  }

  async index(request:FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id

    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })

    if(user?.isValidated === false){
      throw new AppError("Conta sem confirmação de email.", 401)
    }

    const revenues = await prismaClient.revenue.findMany()

    if(!revenues){
      throw new AppError("Não há receitas cadastradas")
    }

    return reply.send([ ...revenues ])
  }

  async delete(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)

    const userId = request.user.id
    const { id } = request.params as { id: string }
    
    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })

    if(user?.isValidated === false){
      throw new AppError("Conta não verificada.")
    }

    const revenue = await prismaClient.revenue.findFirst({
      where:{
        id
      }
    })

    if(!revenue){
      throw new AppError("Receita não cadastrada")
    }

    await prismaClient.revenue.delete({
      where:{
        id
      }
    })
    
    return reply.send({"message": "Receita excluída com sucesso!"})
  }
 }