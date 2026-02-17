import type { IJobAuditRepository } from "@/repositories/IJobAuditRepository.js";
import type { IJobExecutionRepository } from "@/repositories/IJobExecutionRepository.js";
import type { GetJobByIdDTO } from "./GetJobByIdDTO.js";
import { AppError } from "@/utils/AppError.js";

export class GetJobByIdUseCase {
  constructor(
    private jobAuditRepository: IJobAuditRepository,
    private jobExecutionRepository: IJobExecutionRepository,
  ) {}

  async execute({ jobId }: GetJobByIdDTO) {
    const job = await this.jobAuditRepository.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    const executionHistory = await this.jobExecutionRepository.listByJobAuditId(jobId);

    return {
      job,
      executionHistory,
    };
  }
}
