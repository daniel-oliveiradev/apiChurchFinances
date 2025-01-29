import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/AppError";
import prismaClient from "../prisma";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

export  class titherController{ 
  async create(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id
    const { name } = request.body as { name: string }

    if(!name){
      throw new AppError("Campo nome vazio, favor fornecer um nome.")
    }

    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })

    if(user?.isValidated === false){
      throw new AppError("Conta sem confirmação de email.", 401)
    }


    const tither = await prismaClient.tithers.create({
      data: {
        name,
        userId
      }
    })

    reply.status(201).send(tither)
  }

  async update(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)

    const userId = request.user.id
    const { id } = request.params as { id: string }
    const { name } = request.body as { name: string }

    if(!name){
      throw new AppError("Preencha todos os campos.")
    }

    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })

    if(user?.isValidated === false){
      throw new AppError("Conta sem confirmação de email.", 401)
    }

    const tither = await prismaClient.tithers.findFirst({
      where:{
        userId,
        id
      }
    })

    if(!tither){
      throw new AppError("Membro não cadastrado.")
    }

    tither.name = name ?? tither.name

    const titherUpdated = await prismaClient.tithers.update({
      where:{
        id
      },
      data:{
        name: tither.name,
        updatedAt: new Date()
      }
    })

    reply.send(titherUpdated)
  }

  async index(request: FastifyRequest, reply: FastifyReply){
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

    const tithers = await prismaClient.tithers.findMany({
      where:{
        userId
      }
    })

    reply.send([ ...tithers ])
  }
}