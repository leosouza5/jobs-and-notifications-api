import express from "express";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js";
import { router } from "./routes/index.js";

const app = express()
app.use(express.json())

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" })
})

app.use(router)
app.use(errorHandlingMiddleware)

export { app }
