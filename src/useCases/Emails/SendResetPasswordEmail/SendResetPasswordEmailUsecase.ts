import { welcomeTemplate } from "@/templates/welcome.js";
import type { IEmailProvider } from "@/providers/IEmailProvider.js";
import type { IJobHandler } from "@/workers/IJobHandler.js";
import type { EnqueueWelcomeEmailDTO } from "../EnqueueWelcomeEmail/EnqueueWelcomeEmailDTO.js";
import type { EnqueueResetPasswordEmailDTO } from "../EnqueueResetPasswordEmail/EnqueueResetPasswordEmailDTO.js";
import { resetPasswordTemplate } from "@/templates/resetPassword.js";

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
