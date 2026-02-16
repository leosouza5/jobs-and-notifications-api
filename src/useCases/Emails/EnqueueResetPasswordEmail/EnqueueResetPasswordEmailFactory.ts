import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider";
import { EnqueueResetPasswordEmailUseCase } from "./EnqueueResetPasswordEmailUseCase";
import { redisConnection } from "@/config/redis";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository";

export function makeEnqueueResetPasswordEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection)
  const jobAuditRepository = new PrismaJobAuditRepository()
  return new EnqueueResetPasswordEmailUseCase(queueProvider, jobAuditRepository);
}
