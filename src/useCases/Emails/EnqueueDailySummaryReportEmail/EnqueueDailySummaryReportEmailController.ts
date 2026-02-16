import { Request, Response, NextFunction } from "express";
import { enqueueDailySummaryReportEmailSchema } from "@/schemas/enqueueDailySummaryReportEmailSchema";
import type { EnqueueDailySummaryReportEmailUseCase } from "./EnqueueDailySummaryReportEmailUseCase";
import { makeEnqueueDailySummaryReportEmailUseCase } from "./EnqueueDailySummaryReportEmailFactory";

export class EnqueueDailySummaryReportEmailController {
  private enqueueDailySummaryReportEmailUseCase: EnqueueDailySummaryReportEmailUseCase;

  constructor() {
    this.enqueueDailySummaryReportEmailUseCase = makeEnqueueDailySummaryReportEmailUseCase();
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const safeValues = enqueueDailySummaryReportEmailSchema.parse(req.body);
      const data = await this.enqueueDailySummaryReportEmailUseCase.execute(safeValues);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
