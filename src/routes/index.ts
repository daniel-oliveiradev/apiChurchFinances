import type { FastifyInstance } from "fastify";
import { userRoutes } from "./UserRoutes";

export function routes(fastify: FastifyInstance){
  fastify.register(userRoutes, {prefix: "/user"})
}