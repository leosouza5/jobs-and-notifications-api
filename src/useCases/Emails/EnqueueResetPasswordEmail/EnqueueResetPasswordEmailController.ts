import { Request, Response, NextFunction } from "express";
import type { EnqueueResetPasswordEmailUseCase,  } from "./EnqueueResetPasswordEmailUseCase";
import { makeEnqueueResetPasswordEmailUseCase,  } from "./EnqueueResetPasswordEmailFactory";
import { enqueueResetPasswordEmailSchema } from "@/schemas/enqueueResetPasswordEmailSchema";


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
