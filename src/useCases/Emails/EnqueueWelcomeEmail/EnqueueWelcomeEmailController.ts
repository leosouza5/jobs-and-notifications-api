import { Request, Response, NextFunction } from "express";
import type { EnqueueWelcomeEmailUseCase } from "./EnqueueWelcomeEmailUseCase";
import { enqueueWelcomeEmailSchema } from "@/schemas/enqueueWelcomeEmailSchema";
import { makeEnqueueWelcomeEmailUseCase } from "./EnqueueWelcomeEmailFactory";


export class EnqueueWelcomeEmailController {
  private enqueueWelcomeEmailUseCase: EnqueueWelcomeEmailUseCase;

  constructor() {
    this.enqueueWelcomeEmailUseCase = makeEnqueueWelcomeEmailUseCase();
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const safeValues = enqueueWelcomeEmailSchema.parse(req.body);
      const data = await this.enqueueWelcomeEmailUseCase.execute(safeValues);

      return res.status(200).json(data);

    } catch (error) {
      next(error);
    }
  }
}
