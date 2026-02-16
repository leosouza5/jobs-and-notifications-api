import { Router } from "express";
import { emailsRoutes } from "./emailsRoutes";

const router = Router()

router.use("/emails",emailsRoutes)

export {router}