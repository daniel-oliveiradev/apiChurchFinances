import type { FastifyReply, FastifyRequest } from "fastify";

import prismaClient from "../prisma";
import { AppError } from "../utils/AppError";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

interface revenueProps{
  description: string
  value: number
  dueDate: string
  userId: string
}

 export class revenueController{
  async create(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id
    const { description, value, dueDate } = request.body as revenueProps

    if(!description || !value || !dueDate ){
      throw new AppError("Preencha todos os campos.")
    }

    const revenue = await prismaClient.revenue.create({
      data:{
        description,
        value,
        dueDate,
        userId
      }
    })

    return reply.status(201).send(revenue)
  }

  async update(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id
    const { id } = request.params as { id: string }
    const { description, value, dueDate } = request.body as revenueProps

    const revenue = await prismaClient.revenue.findFirst({
      where:{
        userId,
        id
      }
    })

    if(!revenue){
      throw new AppError("Receita não cadastrada.")
    }

    revenue.description = description ?? revenue.description
    revenue.value = value ?? revenue.value
    revenue.dueDate = dueDate ?? revenue.dueDate

    const revenueUpdated = await prismaClient.revenue.update({
      where:{
        id
      },
      data:{
        description:revenue.description,
        value:revenue.value,
        dueDate:revenue.dueDate,
        updatedAt: new Date()
      }
    })

    return reply.send(revenueUpdated)
  }

  async index(request:FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id

    const revenues = await prismaClient.revenue.findMany({
      where:{
        userId
      }
    })

    if(!revenues){
      throw new AppError("Não há receitas cadastradas")
    }

    return reply.send({ ...revenues })
  }
 }