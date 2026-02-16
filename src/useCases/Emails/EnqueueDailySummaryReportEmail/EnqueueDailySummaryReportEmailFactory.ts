import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider";
import { redisConnection } from "@/config/redis";
import { EnqueueDailySummaryReportEmailUseCase } from "./EnqueueDailySummaryReportEmailUseCase";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository";

export function makeEnqueueDailySummaryReportEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection);
  const jobAuditRepository = new PrismaJobAuditRepository();
  return new EnqueueDailySummaryReportEmailUseCase(queueProvider, jobAuditRepository);
}
