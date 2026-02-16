import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider";
import { redisConnection } from "@/config/redis";
import { EnqueueAccountLockedEmailUseCase } from "./EnqueueAccountLockedEmailUseCase";
import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository";

export function makeEnqueueAccountLockedEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection);
  const jobAuditRepository = new PrismaJobAuditRepository();
  return new EnqueueAccountLockedEmailUseCase(queueProvider, jobAuditRepository);
}
