import type { IQueueProvider } from "@/providers/IQueueProvider";
import type { EnqueueAccountLockedEmailDTO } from "./EnqueueAccountLockedEmailDTO";

export class EnqueueAccountLockedEmailUseCase {
  constructor(private queueProvider: IQueueProvider) {}

  async execute(data: EnqueueAccountLockedEmailDTO): Promise<void> {
    await this.queueProvider.enqueue("emails", "SEND_ACCOUNT_LOCKED_EMAIL", data, {
      backoff: {
        type: "exponential",
        delay: 10_000,
      },
      attempts: 5,
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
