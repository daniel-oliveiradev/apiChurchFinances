import type { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import prismaClient from "../prisma";
import { AppError } from "../utils/AppError";
import { authConfig } from "../config/auth";

export class sessionController{
  async create(request: FastifyRequest, reply:FastifyReply){
    const { nickname, password } = request.body as { nickname: string, password: string}

    const user = await prismaClient.user.findFirst({
      where:{
        nickname
      }
    })

    if(!user){
      throw new AppError("Usuário e/ou senha inválidos.", 401)
    }

    const passwordMatched = await bcrypt.compare(password, user.password)

    if(!passwordMatched){
      throw new AppError("Usuário e/ou senha inválidos.", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = jwt.sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return reply.send({ user, token })
  }
}