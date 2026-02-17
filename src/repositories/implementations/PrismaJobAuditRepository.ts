import { prisma } from "@/config/prismaClient.js";
import type {
  IJobAuditRepository,
} from "../../repositories/IJobAuditRepository.js";
import type { Prisma } from "@/generated/client.js";

export class PrismaJobAuditRepository implements IJobAuditRepository {
  async create(data: { queueName: string; jobName: string; payload: Prisma.InputJsonValue }) {
    return prisma.jobAudit.create({
      data: {
        queueName: data.queueName,
        jobName: data.jobName,
        payload: data.payload,
        status: "PENDING",
        attempts: 0,
      },
    });
  }

  async markProcessing(id: string) {
    return prisma.jobAudit.update({
      where: { id },
      data: { status: "PROCESSING" },
    });
  }

  async markCompleted(id: string) {
    return prisma.jobAudit.update({
      where: { id },
      data: {
        status: "COMPLETED",
      },
    });
  }

  async markFailed(id: string) {
    return prisma.jobAudit.update({
      where: { id },
      data: {
        status: "FAILED",
      },
    });
  }

  async markDead(id: string) {
    return prisma.jobAudit.update({
      where: { id },
      data: {
        status: "DEAD",
      },
    });
  }

  async incrementAttempts(id: string, attemptNumber?: number) {
    return prisma.jobAudit.update({
      where: { id },
      data: {
        attempts: typeof attemptNumber === "number" ? attemptNumber : { increment: 1 },
      },
    });
  }

  async listAll() {
    return prisma.jobAudit.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.jobAudit.findUnique({
      where: { id },
    });
  }

  async findByRequestId(requestId: string) {
    return prisma.jobAudit.findFirst({
      where: {
        payload: {
          path: ["requestId"],
          equals: requestId,
        },
      },
    });
  }

  async findByBullJobId(jobId: string) {
    return prisma.jobAudit.findFirst({
      where: {
        payload: {
          path: ["jobId"],
          equals: jobId,
        },
      },
    });
  }

  async listDead() {
    return prisma.jobAudit.findMany({
      where: { status: "DEAD" },
      orderBy: { createdAt: "desc" },
    });
  }

  async listFailed() {
    return prisma.jobAudit.findMany({
      where: { status: "FAILED" },
      orderBy: { createdAt: "desc" },
    });
  }
}
