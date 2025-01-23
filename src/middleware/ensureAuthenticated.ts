import type { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError";
import { authConfig } from "../config/auth";

export function ensureAuthenticated(request: FastifyRequest){
  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new AppError("JWT Token não informado", 401)
  }

  const [ , token] = authHeader.split(" ")

  try { 
    const { sub: userId } = jwt.verify(token, authConfig.jwt.secret)

    request.user = {
      id: String(userId)
    }

  } catch{
    throw new AppError("JWT Token inválido", 401)
  }
}