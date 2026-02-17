import type { IJobAuditRepository } from "@/repositories/IJobAuditRepository.js";

export class ListJobsUseCase {
  constructor(private jobAuditRepository: IJobAuditRepository) {}

  async execute() {
    const jobs = await this.jobAuditRepository.listAll();

    return { jobs };
  }
}
