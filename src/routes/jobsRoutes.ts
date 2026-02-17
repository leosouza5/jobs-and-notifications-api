import { Router } from "express";
import { ListJobsController } from "@/useCases/Jobs/ListJobs/ListJobsController.js";
import { GetJobByIdController } from "@/useCases/Jobs/GetJobById/GetJobByIdController.js";

const jobsRoutes = Router();

const listJobsController = new ListJobsController();
const getJobByIdController = new GetJobByIdController();

jobsRoutes.get("/", (req, res, next) => listJobsController.handle(req, res, next));
jobsRoutes.get("/:jobId", (req, res, next) => getJobByIdController.handle(req, res, next));

export { jobsRoutes };
