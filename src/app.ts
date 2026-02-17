import express from "express";
import { NodeMailerEmailProvider } from "./providers/implementations/NodeMailerEmailProvider.js";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js";
import { router } from "./routes/index.js";

const app = express()
app.use(express.json())
app.use(router)
app.use(errorHandlingMiddleware)

app.get("/health", async (req, res) => {
  const mail = new NodeMailerEmailProvider()

  await mail.sendEmail({
    to: "lsoliveira.contato@gmail.com",
    subject: "teste",
    html: "<h1>Testando o envio de email</h1><p>Esse e um email de teste para verificar se a configuracao do NodeMailerEmailProvider esta correta.</p>",
    text: "Testando o envio de email",
  })

  res.status(200).json({ status: "ok" })
})

export { app }
