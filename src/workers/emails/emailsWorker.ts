import { Worker, type Job } from "bullmq";
import { makeEmailHandlers } from "./emailHandlersFactory";
import { redisConnection } from "@/config/redis";

const handlers = makeEmailHandlers()

const processor = async (job: Job) => {
  console.log(`Processing job ${job.id} with data:`, job.data)

  const handler = handlers[job.name]
  if (!handler) {
    console.error(`No handler found for job name: ${job.name}`)
    return
  }
  await handler.execute(job.data)
}

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

