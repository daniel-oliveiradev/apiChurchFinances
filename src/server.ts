import fastify from "fastify";
import { routes } from "./routes";

const app = fastify()
const PORT = 3000

app.listen({
  port: PORT
}, () => console.log(`HTTP server running on port ${PORT}`))

app.register(routes)