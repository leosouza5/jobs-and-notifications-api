import { Worker, type Job } from "bullmq";
import { makeEmailHandlers } from "./emailHandlersFactory.js";
import { redisConnection } from "@/config/redis.js";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository.js";
import { PrismaJobExecutionRepository } from "@/repositories/implementations/PrismaJobExecutionRepository.js";
import { EmailJobProcessor } from "./EmailJobProcessor.js";

const handlers = makeEmailHandlers();
const jobAuditRepo = new PrismaJobAuditRepository();
const jobExecutionRepo = new PrismaJobExecutionRepository();
const emailJobProcessor = new EmailJobProcessor(handlers, jobAuditRepo, jobExecutionRepo);

const processor = async (job: Job) => {
  await emailJobProcessor.process(job);
};

console.log("[emails-worker] booting...")
const emailWorker = new Worker(
  "emails",
  processor,
  {
    connection: redisConnection,
    limiter:{max:1, duration: 5000 }
  }
)



emailWorker.on("ready", () => {
  console.log("[emails-worker] ready and listening queue=emails")
})

emailWorker.on("completed", (job) => {
  console.log(`[emails-worker] completed jobId=${job.id} name=${job.name}`)
})

emailWorker.on("failed", (job, err) => {
  console.error(`[emails-worker] failed jobId=${job?.id} name=${job?.name}`, err)
})

emailWorker.on("error", (err) => {
  console.error("[emails-worker] error:", err)
})

