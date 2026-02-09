import { SendWelcomeEmailUseCase } from "@/useCases/Emails/SendWelcomeEmail/SendWelcomeEmailUsecase";
import type { IJobHandler } from "../IJobHandler";

export function makeEmailHandlers():Record<string, IJobHandler>{
  return {
    "SEND_WELCOME_EMAIL": new SendWelcomeEmailUseCase(),
  }
}