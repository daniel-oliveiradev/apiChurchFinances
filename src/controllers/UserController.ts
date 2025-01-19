import type { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs"

import { AppError } from "../utils/AppError"
import prismaClient from "../prisma";

interface userProps{
  name: string
  email: string
  password: string
  nickname: string
  oldPassword: string
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
  
  async update(request: FastifyRequest, reply: FastifyReply){
    const { id } = request.params as { id: string }
    const { name, email, nickname, password, oldPassword } = request.body as userProps
    
    if(!name || !email || !nickname || !password || !oldPassword){
      throw new AppError("Preencha todos os campos.")
    }

    const user = await prismaClient.user.findFirst({
      where:{
        id
      }
    })

    if(!user){
      throw new AppError("Usuário não cadastrado.")
    }

    const checkIfEmailExists = await prismaClient.user.findFirst({
      where:{
        email
      }
    })

    if(checkIfEmailExists && email === user.email){
      throw new AppError("E-mail já em uso.")
    }

    const checkPassword = await bcrypt.compare(oldPassword, user.password)

    if(!checkPassword){
      throw new AppError("Senha antiga incorreta.")
    }
    
    const hashedPassword = await bcrypt.hash(password, 8)

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.password = hashedPassword ?? user.password
    user.nickname = nickname ?? user.nickname


    const userUpdated = await prismaClient.user.update({
      where:{
        id
      },
      data:{
        name: user.name,
        email: user.email,
        password: user.password,
        nickname: user.nickname
      }
    })

    return reply.send(userUpdated)
  }
}