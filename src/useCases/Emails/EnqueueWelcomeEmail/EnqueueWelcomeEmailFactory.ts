import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider";
import { EnqueueWelcomeEmailUseCase } from "./EnqueueWelcomeEmailUseCase";
import { redisConnection } from "@/config/redis";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository";

export function makeEnqueueWelcomeEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection)
  const jobAuditRepository = new PrismaJobAuditRepository()
  return new EnqueueWelcomeEmailUseCase(queueProvider, jobAuditRepository);
}
