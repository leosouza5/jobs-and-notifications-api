import type { IQueueProvider } from "@/providers/IQueueProvider";
import type { Prisma } from "@/generated/client.js";
import type { IJobAuditRepository } from "@/repositories/IJobAuditRepository";
import type { EnqueueResetPasswordEmailDTO } from "./EnqueueResetPasswordEmailDTO";

export class EnqueueResetPasswordEmailUseCase {
  constructor(
    private queueProvider: IQueueProvider,
    private jobAuditRepository: IJobAuditRepository,
  ) { }

  async execute(data: EnqueueResetPasswordEmailDTO): Promise<{ jobAuditId: string }> {
    const queueName = "emails";
    const jobName = "SEND_RESET_PASSWORD_EMAIL";

    const jobAudit = await this.jobAuditRepository.create({
      queueName,
      jobName,
      payload: data as unknown as Prisma.InputJsonValue,
    });

    await this.queueProvider.enqueue(queueName, jobName, {
      ...data,
      jobAuditId: jobAudit.id,
    },{
      backoff:{
        type: "exponential",
        delay: 10000
      },
      attempts:5,
      removeOnComplete:true,
      removeOnFail: false,
    })

    return { jobAuditId: jobAudit.id }
  }
}
