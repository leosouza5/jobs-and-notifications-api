import type { JobAudit, Prisma } from "@/generated/client.js";

export interface IJobAuditRepository {
  create(data: { queueName: string; jobName: string; payload: Prisma.InputJsonValue }): Promise<JobAudit>;
  markProcessing(id: string): Promise<JobAudit>;
  markCompleted(id: string): Promise<JobAudit>;
  markFailed(id: string): Promise<JobAudit>;
  markDead(id: string): Promise<JobAudit>;
  incrementAttempts(id: string, attemptNumber?: number): Promise<JobAudit>;
  listAll(): Promise<JobAudit[]>;
  findById(id: string): Promise<JobAudit | null>;
  findByRequestId(requestId: string): Promise<JobAudit | null>;
  findByBullJobId(jobId: string): Promise<JobAudit | null>;
  listDead(): Promise<JobAudit[]>;
  listFailed(): Promise<JobAudit[]>;
}
