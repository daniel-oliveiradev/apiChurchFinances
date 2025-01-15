import type { FastifyInstance } from "fastify";
import { userRoutes } from "./UserRoutes";
import { expenseRoutes } from "./ExpenseRoutes";
import { revenueRoutes } from "./RevenueRoutes";

export function routes(fastify: FastifyInstance){
  fastify.register(userRoutes, {prefix: "/user"})
  fastify.register(revenueRoutes, {prefix: "/revenue"})
  fastify.register(expenseRoutes, {prefix: "/expense"})
}