import { EnqueueWelcomeEmailController } from "@/useCases/Emails/EnqueueWelcomeEmail/EnqueueWelcomeEmailController";
import { EnqueueDailySummaryReportEmailController } from "@/useCases/Emails/EnqueueDailySummaryReportEmail/EnqueueDailySummaryReportEmailController";
import { EnqueueAccountLockedEmailController } from "@/useCases/Emails/EnqueueAccountLockedEmail/EnqueueAccountLockedEmailController";
import { EnqueueResetPasswordEmailController } from "@/useCases/Emails/EnqueueResetPasswordEmail/EnqueueResetPasswordEmailController";
import { Router } from "express";

const emailsRoutes = Router();

const enqueueWelcomeEmailController = new EnqueueWelcomeEmailController()
const enqueueDailySummaryReportEmailController = new EnqueueDailySummaryReportEmailController()
const enqueueAccountLockedEmailController = new EnqueueAccountLockedEmailController()
const enqueueResetPasswordEmailController = new EnqueueResetPasswordEmailController()

emailsRoutes.post("/welcomeEmail", (req, res, next) =>
  enqueueWelcomeEmailController.handle(req, res, next)
);
emailsRoutes.post("/dailySummaryReportEmail", (req, res, next) =>
  enqueueDailySummaryReportEmailController.handle(req, res, next)
);
emailsRoutes.post("/accountLockedEmail", (req, res, next) =>
  enqueueAccountLockedEmailController.handle(req, res, next)
);
emailsRoutes.post("/resetPasswordEmail", (req, res, next) =>
  enqueueResetPasswordEmailController.handle(req, res, next)
);


export { emailsRoutes };
