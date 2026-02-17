import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider.js";
import { redisConnection } from "@/config/redis.js";
import { EnqueueAccountLockedEmailUseCase } from "./EnqueueAccountLockedEmailUseCase.js";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository.js";

export function makeEnqueueAccountLockedEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection);
  const jobAuditRepository = new PrismaJobAuditRepository();
  return new EnqueueAccountLockedEmailUseCase(queueProvider, jobAuditRepository);
}
