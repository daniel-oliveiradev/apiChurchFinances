import type { FastifyInstance } from "fastify";
import { userRoutes } from "./UserRoutes";
import { ExpenseRoutes } from "./ExpenseRoutes";

export function routes(fastify: FastifyInstance){
  fastify.register(userRoutes, {prefix: "/user"})
  fastify.register(ExpenseRoutes, {prefix: "/expense"})
}