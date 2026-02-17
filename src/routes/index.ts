import { Router } from "express";
import { emailsRoutes } from "./emailsRoutes.js";
import { jobsRoutes } from "./jobsRoutes.js";

const router = Router()

router.use("/emails",emailsRoutes)
router.use("/jobs",jobsRoutes)

export {router}
