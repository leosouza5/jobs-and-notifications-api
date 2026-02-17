import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider.js";
import { EnqueueResetPasswordEmailUseCase } from "./EnqueueResetPasswordEmailUseCase.js";
import { redisConnection } from "@/config/redis.js";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository.js";

export function makeEnqueueResetPasswordEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection)
  const jobAuditRepository = new PrismaJobAuditRepository()
  return new EnqueueResetPasswordEmailUseCase(queueProvider, jobAuditRepository);
}
