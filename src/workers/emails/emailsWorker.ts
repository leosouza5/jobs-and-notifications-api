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


const emailWorker = new Worker(
  "emails",
  processor,
  {connection: redisConnection}
)


