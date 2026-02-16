import { prisma } from "@/config/prismaClient";
import type {
  IJobExecutionRepository,
} from "../../repositories/IJobExecutionRepository";

export class PrismaJobExecutionRepository implements IJobExecutionRepository {
  async startExecution(data: { jobAuditId: string; attempt: number; startedAt?: Date }) {
    return prisma.jobExecution.create({
      data: {
        jobAuditId: data.jobAuditId,
        attempt: data.attempt,
        status: "STARTED",
        startedAt: data.startedAt ?? new Date(),
      } as any,
    } as any);
  }

  async markSuccess(executionId: string, finishedAt?: Date) {
    return prisma.jobExecution.update({
      where: { id: executionId },
      data: {
        status: "SUCCESS",
        errorSanitized: null,
        finishedAt: finishedAt ?? new Date(),
      } as any,
    } as any);
  }

  async markFailed(executionId: string, errorSanitized: string, finishedAt?: Date) {
    return prisma.jobExecution.update({
      where: { id: executionId },
      data: {
        status: "FAILED",
        errorSanitized,
        finishedAt: finishedAt ?? new Date(),
      } as any,
    } as any);
  }

  async findLastByJobAuditId(jobAuditId: string) {
    return prisma.jobExecution.findFirst({
      where: {
        jobAuditId,
      },
      orderBy: [
        { attempt: "desc" },
        { startedAt: "desc" },
      ],
    });
  }

  async listByJobAuditId(jobAuditId: string) {
    return prisma.jobExecution.findMany({
      where: {
        jobAuditId,
      },
      orderBy: [{ attempt: "asc" }, { startedAt: "asc" }],
    });
  }
}
