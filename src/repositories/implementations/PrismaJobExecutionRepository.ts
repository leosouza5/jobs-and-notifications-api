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
        startedAt: data.startedAt ?? new Date(),
      },
    });
  }

  async markSuccess(executionId: string, finishedAt?: Date) {
    const existing = await prisma.jobExecution.findUnique({
      where: { id: executionId },
    });
    if (!existing) return null;

    return prisma.jobExecution.update({
      where: { id: executionId },
      data: {
        finishedAt: finishedAt ?? new Date(),
      },
    });
  }

  async markFailed(executionId: string, finishedAt?: Date) {
    const existing = await prisma.jobExecution.findUnique({
      where: { id: executionId },
    });
    if (!existing) return null;

    return prisma.jobExecution.update({
      where: { id: executionId },
      data: {
        finishedAt: finishedAt ?? new Date(),
      },
    });
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
