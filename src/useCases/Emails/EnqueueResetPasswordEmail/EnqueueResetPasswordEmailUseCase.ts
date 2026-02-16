import type { IQueueProvider } from "@/providers/IQueueProvider";
import type { EnqueueResetPasswordEmailDTO } from "./EnqueueResetPasswordEmailDTO";

export class EnqueueResetPasswordEmailUseCase {
  constructor(private queueProvider: IQueueProvider) { }
  async execute(data: EnqueueResetPasswordEmailDTO): Promise<void> {
    await this.queueProvider.enqueue("emails", "SEND_RESET_PASSWORD_EMAIL", data,{
      backoff:{
        type: "exponential",
        delay: 10000
      },
      attempts:5,
      removeOnComplete:true,
      removeOnFail: false,
    })
  }
}