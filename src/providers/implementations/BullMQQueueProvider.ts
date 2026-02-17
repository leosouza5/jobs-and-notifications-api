import { Queue, type ConnectionOptions, type JobsOptions } from "bullmq";
import type { IQueueProvider } from "../IQueueProvider.js";

export class BullMQQueueProvider implements IQueueProvider {
  private queues = new Map<string, Queue>()

  constructor(private connection: ConnectionOptions) { }

  private getQueue(queueName:string){
    const existingQueue = this.queues.get(queueName)
    if(existingQueue) return existingQueue
   
    const queue = new Queue(queueName, { connection: this.connection })
    this.queues.set(queueName, queue)
    return queue
  }

  async enqueue(queueName: string, jobName: string, payload: Object, options: JobsOptions = {}): Promise<void> {
    const queue = this.getQueue(queueName)

    await queue.add(jobName, payload, options)
  }
}