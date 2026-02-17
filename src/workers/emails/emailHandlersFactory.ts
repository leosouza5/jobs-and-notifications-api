import { SendWelcomeEmailUseCase } from "@/useCases/Emails/SendWelcomeEmail/SendWelcomeEmailUsecase.js";
import { SendResetPasswordEmailUsecase } from "@/useCases/Emails/SendResetPasswordEmail/SendResetPasswordEmailUsecase.js";
import { SendDailySummaryReportEmailUsecase } from "@/useCases/Emails/SendDailySummaryReportEmail/SendDailySummaryReportEmailUsecase.js";
import { SendAccountLockedEmailUsecase } from "@/useCases/Emails/SendAccountLockedEmail/SendAccountLockedEmailUsecase.js";
import type { IJobHandler } from "../IJobHandler.js";
import { NodeMailerEmailProvider } from "@/providers/implementations/NodeMailerEmailProvider.js";

export function makeEmailHandlers():Record<string, IJobHandler>{
  const emailProvider = new NodeMailerEmailProvider()

  return {
    "SEND_WELCOME_EMAIL": new SendWelcomeEmailUseCase(emailProvider),
    "SEND_RESET_PASSWORD_EMAIL": new SendResetPasswordEmailUsecase(emailProvider),
    "SEND_DAILY_SUMMARY_REPORT_EMAIL": new SendDailySummaryReportEmailUsecase(emailProvider),
    "SEND_ACCOUNT_LOCKED_EMAIL": new SendAccountLockedEmailUsecase(emailProvider),
  }
}
