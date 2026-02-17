import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider.js";
import { redisConnection } from "@/config/redis.js";
import { EnqueueDailySummaryReportEmailUseCase } from "./EnqueueDailySummaryReportEmailUseCase.js";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository.js";

export function makeEnqueueDailySummaryReportEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection);
  const jobAuditRepository = new PrismaJobAuditRepository();
  return new EnqueueDailySummaryReportEmailUseCase(queueProvider, jobAuditRepository);
}
