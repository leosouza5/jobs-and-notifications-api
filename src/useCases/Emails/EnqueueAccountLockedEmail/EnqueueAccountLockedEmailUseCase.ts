import type { IQueueProvider } from "@/providers/IQueueProvider";
import type { Prisma } from "@/generated/client.js";
import type { IJobAuditRepository } from "@/repositories/IJobAuditRepository";
import type { EnqueueAccountLockedEmailDTO } from "./EnqueueAccountLockedEmailDTO";

export class EnqueueAccountLockedEmailUseCase {
  constructor(
    private queueProvider: IQueueProvider,
    private jobAuditRepository: IJobAuditRepository,
  ) {}

  async execute(data: EnqueueAccountLockedEmailDTO): Promise<{ jobAuditId: string }> {
    const queueName = "emails";
    const jobName = "SEND_ACCOUNT_LOCKED_EMAIL";

    const jobAudit = await this.jobAuditRepository.create({
      queueName,
      jobName,
      payload: data as unknown as Prisma.InputJsonValue,
    });

    await this.queueProvider.enqueue(queueName, jobName, {
      ...data,
      jobAuditId: jobAudit.id,
    }, {
      backoff: {
        type: "exponential",
        delay: 10_000,
      },
      attempts: 5,
      removeOnComplete: true,
      removeOnFail: false,
    });

    return { jobAuditId: jobAudit.id };
  }
}
