import { prisma } from "@/config/prismaClient";
import type {
  IJobAuditRepository,
} from "../../repositories/IJobAuditRepository";
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
    const current = await prisma.jobAudit.findUnique({ where: { id } });
    if (!current) return null;

    return prisma.jobAudit.update({
      where: { id },
      data: { status: "PROCESSING" },
    });
  }

  async markCompleted(id: string) {
    const current = await prisma.jobAudit.findUnique({ where: { id } });
    if (!current) return null;

    return prisma.jobAudit.update({
      where: { id },
      data: {
        status: "COMPLETED",
      },
    });
  }

  async markFailed(id: string, errorSanitized: string) {
    const current = await prisma.jobAudit.findUnique({ where: { id } });
    if (!current) return null;

    const payload = { data: current.payload, errorSanitized }

    return prisma.jobAudit.update({
      where: { id },
      data: {
        status: "FAILED",
        payload,
      },
    });
  }

  async markDead(id: string, errorSanitized: string) {
    const current = await prisma.jobAudit.findUnique({ where: { id } });
    if (!current) return null;

    const payload = { data: current.payload, errorSanitized }

    return prisma.jobAudit.update({
      where: { id },
      data: {
        status: "DEAD",
        payload,
      },
    });
  }

  async incrementAttempts(id: string, attemptNumber?: number) {
    const current = await prisma.jobAudit.findUnique({ where: { id } });
    if (!current) return null;

    return prisma.jobAudit.update({
      where: { id },
      data: {
        attempts: typeof attemptNumber === "number" ? attemptNumber : { increment: 1 },
      },
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
