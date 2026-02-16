import { BullMQQueueProvider } from "@/providers/implementations/BullMQQueueProvider";
import { redisConnection } from "@/config/redis";
import { EnqueueAccountLockedEmailUseCase } from "./EnqueueAccountLockedEmailUseCase";

export function makeEnqueueAccountLockedEmailUseCase() {
  const queueProvider = new BullMQQueueProvider(redisConnection);
  return new EnqueueAccountLockedEmailUseCase(queueProvider);
}
