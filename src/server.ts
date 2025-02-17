import fastify from "fastify";
import { routes } from "./routes";
import fastifyCors from "@fastify/cors";

const app = fastify()
const PORT = 3000
const cors = fastifyCors

app.register(cors, {})
app.register(routes)

app.listen({
  port: PORT
}, () => console.log(`HTTP server running on port ${PORT}`))
