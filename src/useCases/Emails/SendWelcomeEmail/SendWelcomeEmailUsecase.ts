import { welcomeTemplate } from "@/templates/welcome.js";
import type { IEmailProvider } from "@/providers/IEmailProvider.js";
import type { IJobHandler } from "@/workers/IJobHandler.js";
import type { EnqueueWelcomeEmailDTO } from "../EnqueueWelcomeEmail/EnqueueWelcomeEmailDTO.js";

export class SendWelcomeEmailUseCase implements IJobHandler {
  constructor(private emailProvider: IEmailProvider) {}

  async execute(data: EnqueueWelcomeEmailDTO): Promise<void> {
    const { subject, html, text } = welcomeTemplate({
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
