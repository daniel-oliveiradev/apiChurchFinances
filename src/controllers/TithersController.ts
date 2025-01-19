import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/AppError";
import prismaClient from "../prisma";

export  class titherController{ 
  async create(request: FastifyRequest, reply: FastifyReply){
    const { name, userId } = request.body as { name: string, userId: string }

    if(!name){
      throw new AppError("Campo nome vazio, favor fornecer um nome.")
    }

    const tither = await prismaClient.tithers.create({
      data: {
        name,
        userId
      }
    })

    reply.status(201).send(tither)
  }
}