import type { JobAudit, Prisma } from "@/generated/client.js";

export interface IJobAuditRepository {
  create(data: { queueName: string; jobName: string; payload: Prisma.InputJsonValue }): Promise<JobAudit>;
  markProcessing(id: string, ): Promise<JobAudit | null>;
  markCompleted(id: string): Promise<JobAudit | null>;
  markFailed(id: string, errorSanitized: string): Promise<JobAudit | null>;
  markDead(id: string, errorSanitized: string): Promise<JobAudit | null>;
  incrementAttempts(id: string, attemptNumber?: number): Promise<JobAudit | null>;
  findById(id: string): Promise<JobAudit | null>;
  findByRequestId(requestId: string): Promise<JobAudit | null>;
  findByBullJobId(jobId: string): Promise<JobAudit | null>;
  listDead(): Promise<JobAudit[]>;
  listFailed(): Promise<JobAudit[]>;
}
