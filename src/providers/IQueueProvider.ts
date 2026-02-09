import type { JobsOptions } from "bullmq";

export interface IQueueProvider {
  enqueue(queueName: string, jobName: string, payload: Object,options: JobsOptions): Promise<void>
}