import type { IEmailProvider } from "@/providers/IEmailProvider.js";
import { dailySummaryTemplate } from "@/templates/dailySummary.js";
import type { IJobHandler } from "@/workers/IJobHandler.js";
import type { EnqueueDailySummaryReportEmailDTO } from "../EnqueueDailySummaryReportEmail/EnqueueDailySummaryReportEmailDTO.js";

export class SendDailySummaryReportEmailUsecase implements IJobHandler {
  constructor(private emailProvider: IEmailProvider) {}

  async execute(data: EnqueueDailySummaryReportEmailDTO): Promise<void> {
    const { subject, html, text } = dailySummaryTemplate({
      name: data.name,
      date: data.date,
      tasksCompleted: data.tasksCompleted,
      tasksPending: data.tasksPending,
    });

    await this.emailProvider.sendEmail({
      to: data.email,
      subject,
      html,
      text,
    });
  }
}
