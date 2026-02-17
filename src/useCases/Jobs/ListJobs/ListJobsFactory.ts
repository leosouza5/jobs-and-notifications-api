import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository.js";
import { ListJobsUseCase } from "./ListJobsUseCase.js";

export function makeListJobsUseCase() {
  const jobAuditRepository = new PrismaJobAuditRepository();

  return new ListJobsUseCase(jobAuditRepository);
}
