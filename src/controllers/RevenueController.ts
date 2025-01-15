import type { FastifyReply, FastifyRequest } from "fastify";

import prismaClient from "../prisma";
import { AppError } from "../utils/AppError";

interface revenueProps{
  description: string
  value: number
  dueDate: string
  userId: string
}

 export class revenueController{
  async create(request: FastifyRequest, reply: FastifyReply){
    const { description, value, dueDate, userId } = request.body as revenueProps

    if(!description || !value || !dueDate || !userId){
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
    const { id } = request.params as { id: string }
    const { description, value, dueDate } = request.body as revenueProps

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

    const revenueUpdated = await prismaClient.revenue.update({
      where:{
        id
      },
      data:{
        description:revenue.description,
        value:revenue.value,
        dueDate:revenue.dueDate
      }
    })

    return reply.send(revenueUpdated)
  }
 }