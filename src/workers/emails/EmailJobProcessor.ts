import type { Job } from "bullmq";
import type { IJobHandler } from "@/workers/IJobHandler.js";
import type { IJobAuditRepository } from "@/repositories/IJobAuditRepository.js";
import type { IJobExecutionRepository } from "@/repositories/IJobExecutionRepository.js";
import { sanitizeError } from "@/utils/sanitizeError.js";

type JobDataWithAuditId = {
  jobAuditId?: string;
};

export class EmailJobProcessor {
  constructor(
    private readonly handlers: Record<string, IJobHandler>,
    private readonly jobAuditRepository: IJobAuditRepository,
    private readonly jobExecutionRepository: IJobExecutionRepository,
  ) {}

  async process(job: Job): Promise<void> {
    console.log(`Processing job ${job.id} with data:`, job.data);

    const startedAt = new Date();
    const attempt = (job.attemptsMade ?? 0) + 1;
    const jobAuditId = (job.data as JobDataWithAuditId | undefined)?.jobAuditId;

    if (!jobAuditId) {
      throw new Error("Missing jobAuditId in job.data");
    }

    await this.jobAuditRepository.markProcessing(jobAuditId);
    await this.jobAuditRepository.incrementAttempts(jobAuditId, attempt);

    const execution = await this.jobExecutionRepository.startExecution({
      jobAuditId,
      attempt,
      startedAt,
    });

    try {
      const handler = this.handlers[job.name];
      if (!handler) {
        throw new Error(`No handler found for job name: ${job.name}`);
      }

      await handler.execute(job.data);

      const finishedAt = new Date();
      await this.jobExecutionRepository.markSuccess(execution.id, finishedAt);
      await this.jobAuditRepository.markCompleted(jobAuditId);
    } catch (error) {
      const finishedAt = new Date();
      const errorSanitized = sanitizeError(error);

      await this.jobExecutionRepository.markFailed(execution.id, errorSanitized, finishedAt);

      const maxAttempts = job.opts?.attempts ?? 1;
      const isDead = attempt >= maxAttempts;

      if (isDead) {
        await this.jobAuditRepository.markDead(jobAuditId);
      } else {
        await this.jobAuditRepository.markFailed(jobAuditId);
      }

      throw error;
    }
  }
}
