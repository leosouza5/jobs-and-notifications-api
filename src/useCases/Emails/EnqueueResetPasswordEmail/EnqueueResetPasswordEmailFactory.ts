import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider";
import { EnqueueResetPasswordEmailUseCase } from "./EnqueueResetPasswordEmailUseCase";
import { redisConnection } from "@/config/redis";

export function makeEnqueueResetPasswordEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection)
  return new EnqueueResetPasswordEmailUseCase(queueProvider);
}
