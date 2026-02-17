import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider.js";
import { EnqueueWelcomeEmailUseCase } from "./EnqueueWelcomeEmailUseCase.js";
import { redisConnection } from "@/config/redis.js";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository.js";

export function makeEnqueueWelcomeEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection)
  const jobAuditRepository = new PrismaJobAuditRepository()
  return new EnqueueWelcomeEmailUseCase(queueProvider, jobAuditRepository);
}
