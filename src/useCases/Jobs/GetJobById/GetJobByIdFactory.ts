import { PrismaJobAuditRepository } from "@/repositories/implementations/PrismaJobAuditRepository.js";
import { PrismaJobExecutionRepository } from "@/repositories/implementations/PrismaJobExecutionRepository.js";
import { GetJobByIdUseCase } from "./GetJobByIdUseCase.js";

export function makeGetJobByIdUseCase() {
  const jobAuditRepository = new PrismaJobAuditRepository();
  const jobExecutionRepository = new PrismaJobExecutionRepository();

  return new GetJobByIdUseCase(jobAuditRepository, jobExecutionRepository);
}
