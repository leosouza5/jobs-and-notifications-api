import { Request, Response, NextFunction } from "express";
import type { GetJobByIdUseCase } from "./GetJobByIdUseCase.js";
import { makeGetJobByIdUseCase } from "./GetJobByIdFactory.js";
import { getJobByIdParamsSchema } from "@/schemas/getJobByIdParamsSchema.js";

export class GetJobByIdController {
  private getJobByIdUseCase: GetJobByIdUseCase;

  constructor() {
    this.getJobByIdUseCase = makeGetJobByIdUseCase();
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const safeValues = getJobByIdParamsSchema.parse(req.params);
      const data = await this.getJobByIdUseCase.execute(safeValues);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
