import type { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs"
import * as nodemailer from "nodemailer"

import { AppError } from "../utils/AppError"
import prismaClient from "../prisma";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

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

    const checkIfNickNameExists = await prismaClient.user.findFirst({
      where:{
        nickname
      }
    })

    if(checkIfNickNameExists){
      throw new AppError("Nome de usuário já existe!")
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

    const transponder = nodemailer.createTransport({
      service: "gmail",
      auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const emailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Confirmação de e-mail!",
      text: `http://localhost:3000/user/confirmation?token=${user.validationId}`
    }

    transponder.sendMail(emailOptions, (error) => {
      if(error){
        throw new AppError("E-mail não foi enviado", 500)
      }
    })
 
    reply.status(201).send(user)
  }
  
  async update(request: FastifyRequest, reply: FastifyReply){
    await ensureAuthenticated(request)
    
    const userId = request.user.id
    const { name, email, nickname } = request.body as userProps
    
    if(!name || !email || !nickname){
      throw new AppError("Preencha todos os campos.")
    }

    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })

    if(!user){
      throw new AppError("Usuário não cadastrado.")
    }

    if(user.isValidated === false){
      throw new AppError("E-mail de usuário não verificado, faça a verificação.")
    }

    const checkIfEmailExists = await prismaClient.user.findFirst({
      where:{
        email
      }
    })

    if(checkIfEmailExists && email === user.email){
      throw new AppError("E-mail já em uso.")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.nickname = nickname ?? user.nickname


    const userUpdated = await prismaClient.user.update({
      where:{
        id: userId
      },
      data:{
        name: user.name,
        email: user.email,
        nickname: user.nickname
      }
    })

    return reply.send(userUpdated)
  }

  async confirmEmail(request:FastifyRequest, reply: FastifyReply){
    const { token }  = request.query as { token: string } 

    const user = await prismaClient.user.findFirst({
      where:{
        validationId: token
      }
    })

    if(!user){
      throw new AppError("Usuário não cadastrado.")
    }

    const userUpdated = await prismaClient.user.update({
      where:{
        id: user.id
      },
      data:{
        validationId: null,
        isValidated: true
      }
    })

    return reply.send(userUpdated)
  }

  async sendEmailResetPassword(request: FastifyRequest, reply: FastifyReply){
    const { email } = request.body as { email: string }

    const user = await prismaClient.user.findFirst({
      where:{
        email
      }
    })

    if(!user){
      throw new AppError("E-mail informado não pertencem a nenhum usuário.", 401)
    }

    if(user.isValidated === false){
      throw new AppError("E-mail ainda não verificado.", 401)
    }

    const transponder = nodemailer.createTransport({
      service: "gmail",
      auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const emailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Recuperacão de senha!",
      text: `http://localhost:3000/user/resetPassword?userId=${user.id}`
    }

    transponder.sendMail(emailOptions, (error) => {
      if(error){
        throw new AppError("E-mail não enviado", 500)
      }
    })

    return reply.send({
      "message": "E-mail de restauração de senha enviado."
    })
  }

  async resetPassword(request: FastifyRequest, reply: FastifyReply){
    const { newPassword } = request.body as { newPassword: string }
    const { userId } = request.query as { userId: string }
    
    const user = await prismaClient.user.findFirst({
      where:{
        id: userId
      }
    })

    if(!user){
      throw new AppError("Usário não cadastrado.")
    }

    const newPasswordHashed = await bcrypt.hash(newPassword, 8)

    await prismaClient.user.update({
      where:{
        id: user.id
      },
      data:{
        password: newPasswordHashed
      }
    })

    return reply.send({
      "message": "Senha alterada com sucesso"
    })
  }
}