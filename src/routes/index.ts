import type { FastifyInstance } from "fastify";
import { userRoutes } from "./UserRoutes";
import { expenseRoutes } from "./ExpenseRoutes";
import { revenueRoutes } from "./RevenueRoutes";
import { titherRoutes } from "./TitherRoutes";
import { sessionRoutes } from "./SessionRoutes";

export function routes(fastify: FastifyInstance){
  fastify.register(userRoutes, {prefix: "/user"})
  fastify.register(revenueRoutes, {prefix: "/revenue"})
  fastify.register(expenseRoutes, {prefix: "/expense"})
  fastify.register(titherRoutes, {prefix: "/tithers"})
  fastify.register(sessionRoutes, {prefix: "/session"})
}