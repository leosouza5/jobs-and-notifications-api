import type { IQueueProvider } from "@/providers/IQueueProvider";
import type { EnqueueDailySummaryReportEmailDTO } from "./EnqueueDailySummaryReportEmailDTO";

export class EnqueueDailySummaryReportEmailUseCase {
  constructor(private queueProvider: IQueueProvider) {}

  async execute(data: EnqueueDailySummaryReportEmailDTO): Promise<void> {
    await this.queueProvider.enqueue("emails", "SEND_DAILY_SUMMARY_REPORT_EMAIL", data, {
      backoff: {
        type: "exponential",
        delay: 10_000,
      },
      attempts: 5,
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
