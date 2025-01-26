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

    const tither = await prismaClient.tithers.create({
      data: {
        name,
        userId
      }
    })

    reply.status(201).send(tither)
  }
}