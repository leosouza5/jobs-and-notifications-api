import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider";
import { EnqueueWelcomeEmailUseCase } from "./EnqueueWelcomeEmailUseCase";
import { redisConnection } from "@/config/redis";

export function makeEnqueueWelcomeEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection)
  return new EnqueueWelcomeEmailUseCase(queueProvider);
}
