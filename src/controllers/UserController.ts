import type { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs"

import { AppError } from "../utils/AppError"
import prismaClient from "../prisma";

interface userProps{
  name: string
  email: string
  password: string
  nickname: string
}

export class UserController{
  async create(request: FastifyRequest, reply: FastifyReply){
    const { name, email, password, nickname } = request.body as userProps
    
    if(!name || !email || !password || !nickname){
      throw new AppError("Preencha todos os campos.")
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await prismaClient.user.create({
      data:{
        name,
        email,
        password: hashedPassword,
        nickname
      }
    })

    reply.status(201).send(user)
  } 
}