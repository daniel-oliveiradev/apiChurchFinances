import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/AppError";
import prismaClient from "../prisma";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

interface expenseProps{
  description: string
  value: number
  dueDate: string
  userId: string
}

export class expenseController{
  async create(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)

    const { description, value, dueDate } = request.body as expenseProps
    const userId = request.user.id

    if(!description || !value || !dueDate){
      throw new AppError("Preencha todos os campos.")
    }

    const expense = await prismaClient.expense.create({
      data: {
        description,
        value,
        dueDate,
        userId
      }
    })

    reply.status(201).send(expense)
  }

  async update(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id
    const { id } = request.params as { id: string }
    const { description, value, dueDate } = request.body as expenseProps

    const expense = await prismaClient.expense.findFirst({
      where:{
        userId,
        id
      }
    })

    if(!expense){
      throw new AppError("Despesa não cadastrada.")
    }
  
    expense.description = description ?? expense.description
    expense.value = value ?? expense.value
    expense.dueDate = dueDate ?? expense.dueDate

    const expenseUpdated = await prismaClient.expense.update({
      where:{
        id
      },
      data: {
        description: expense.description,
        value: expense.value,
        dueDate: expense.dueDate,
        updatedAt: new Date()
      }
    })
    
    return reply.send(expenseUpdated)
  }

  async index(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)

    const  userId  = request.user.id 

    const expenses = await prismaClient.expense.findMany({
      where:{
        userId
      }
    })

    if(!expenses){
      throw new AppError("Não há despesas cadastradas.")
    }

    return reply.send({ ...expenses })
  }
}