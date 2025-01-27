import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/UserController";

export async function userRoutes(user: FastifyInstance){
  user.post("/", (request: FastifyRequest, reply: FastifyReply) => { 
    return new UserController().create(request, reply)
  })

  user.put("/:id", (request: FastifyRequest, reply: FastifyReply) => { 
    return new UserController().update(request, reply)
  })
  
  user.post("/confirmation", (request:FastifyRequest, reply: FastifyReply) => {
    return new UserController().confirmEmail(request, reply)
  })

  user.post("/sendResetEmail", (request: FastifyRequest, reply:FastifyReply) => {
    return new UserController().sendEmailResetPassword(request, reply)
  })

  user.put("/resetPassword", (request: FastifyRequest, reply:FastifyReply) => {
    return new UserController().resetPassword(request, reply)
  })
}