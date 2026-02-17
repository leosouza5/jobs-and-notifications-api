import type { IEmailProvider } from "@/providers/IEmailProvider.js";
import { accountLockedTemplate } from "@/templates/accountLocked.js";
import type { IJobHandler } from "@/workers/IJobHandler.js";
import type { EnqueueAccountLockedEmailDTO } from "../EnqueueAccountLockedEmail/EnqueueAccountLockedEmailDTO.js";

export class SendAccountLockedEmailUsecase implements IJobHandler {
  constructor(private emailProvider: IEmailProvider) {}

  async execute(data: EnqueueAccountLockedEmailDTO): Promise<void> {
    const { subject, html, text } = accountLockedTemplate({
      name: data.name,
    });

    await this.emailProvider.sendEmail({
      to: data.email,
      subject,
      html,
      text,
    });
  }
}
