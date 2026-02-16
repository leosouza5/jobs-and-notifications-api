import type { IQueueProvider } from "@/providers/IQueueProvider";
import type { EnqueueWelcomeEmailDTO } from "./EnqueueWelcomeEmailDTO";

export class EnqueueWelcomeEmailUseCase {
  constructor(private queueProvider: IQueueProvider) { }
  async execute(data: EnqueueWelcomeEmailDTO): Promise<void> {
    await this.queueProvider.enqueue("emails", "SEND_WELCOME_EMAIL", data,{
      backoff:{
        type: "exponential",
        delay: 10_000
      },
      attempts:5,
      removeOnComplete:true,
      removeOnFail: false,
    })
  }
}