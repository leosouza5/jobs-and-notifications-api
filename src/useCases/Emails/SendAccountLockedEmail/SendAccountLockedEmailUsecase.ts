import type { IEmailProvider } from "@/providers/IEmailProvider";
import { accountLockedTemplate } from "@/templates/accountLocked";
import type { IJobHandler } from "@/workers/IJobHandler";
import type { EnqueueAccountLockedEmailDTO } from "../EnqueueAccountLockedEmail/EnqueueAccountLockedEmailDTO";

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
