import { welcomeTemplate } from "@/templates/welcome";
import type { IEmailProvider } from "@/providers/IEmailProvider";
import type { IJobHandler } from "@/workers/IJobHandler";
import type { EnqueueWelcomeEmailDTO } from "../EnqueueWelcomeEmail/EnqueueWelcomeEmailDTO";
import type { EnqueueResetPasswordEmailDTO } from "../EnqueueResetPasswordEmail/EnqueueResetPasswordEmailDTO";
import { resetPasswordTemplate } from "@/templates/resetPassword";

export class SendResetPasswordEmailUsecase implements IJobHandler {
  constructor(private emailProvider: IEmailProvider) {}

  async execute(data: EnqueueResetPasswordEmailDTO): Promise<void> {
    const { subject, html, text } = resetPasswordTemplate({
      code: data.code,
      name: data.name,
    })

    await this.emailProvider.sendEmail({
      to: data.email,
      subject,
      html,
      text,
    })
  }
}
