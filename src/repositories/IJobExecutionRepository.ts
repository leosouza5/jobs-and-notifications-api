import type { JobExecution } from "@/generated/client.js";

export interface IJobExecutionRepository {
  startExecution(data: { jobAuditId: string; attempt: number; startedAt?: Date }): Promise<JobExecution>;
  markSuccess(executionId: string, finishedAt?: Date): Promise<JobExecution | null>;
  markFailed(executionId: string, finishedAt?: Date): Promise<JobExecution | null>;
  findLastByJobAuditId(jobAuditId: string): Promise<JobExecution | null>;
  listByJobAuditId(jobAuditId: string): Promise<JobExecution[]>;
}
