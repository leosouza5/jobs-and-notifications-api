import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider";
import { redisConnection } from "@/config/redis";
import { EnqueueDailySummaryReportEmailUseCase } from "./EnqueueDailySummaryReportEmailUseCase";

export function makeEnqueueDailySummaryReportEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection);
  return new EnqueueDailySummaryReportEmailUseCase(queueProvider);
}
