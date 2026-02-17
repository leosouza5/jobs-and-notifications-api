import { Request, Response, NextFunction } from "express";
import type { EnqueueResetPasswordEmailUseCase,  } from "./EnqueueResetPasswordEmailUseCase.js";
import { makeEnqueueResetPasswordEmailUseCase,  } from "./EnqueueResetPasswordEmailFactory.js";
import { enqueueResetPasswordEmailSchema } from "@/schemas/enqueueResetPasswordEmailSchema.js";


export class EnqueueResetPasswordEmailController {
  private enqueueResetPasswordEmailUseCase: EnqueueResetPasswordEmailUseCase;

  constructor() {
    this.enqueueResetPasswordEmailUseCase = makeEnqueueResetPasswordEmailUseCase
    ();
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const safeValues = enqueueResetPasswordEmailSchema.parse(req.body);
      const data = await this.enqueueResetPasswordEmailUseCase.execute(safeValues);

      return res.status(200).json(data);

    } catch (error) {
      next(error);
    }
  }
}
