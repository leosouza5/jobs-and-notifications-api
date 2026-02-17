import { Request, Response, NextFunction } from "express";
import { enqueueAccountLockedEmailSchema } from "@/schemas/enqueueAccountLockedEmailSchema.js";
import type { EnqueueAccountLockedEmailUseCase } from "./EnqueueAccountLockedEmailUseCase.js";
import { makeEnqueueAccountLockedEmailUseCase } from "./EnqueueAccountLockedEmailFactory.js";

export class EnqueueAccountLockedEmailController {
  private enqueueAccountLockedEmailUseCase: EnqueueAccountLockedEmailUseCase;

  constructor() {
    this.enqueueAccountLockedEmailUseCase = makeEnqueueAccountLockedEmailUseCase();
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const safeValues = enqueueAccountLockedEmailSchema.parse(req.body);
      const data = await this.enqueueAccountLockedEmailUseCase.execute(safeValues);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
