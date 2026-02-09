import type { IJobHandler } from "@/workers/IJobHandler";

export class SendWelcomeEmailUseCase implements IJobHandler{
  async execute(data: unknown): Promise<void> {
    
  }
}