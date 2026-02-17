import { Request, Response, NextFunction } from "express";
import type { ListJobsUseCase } from "./ListJobsUseCase.js";
import { makeListJobsUseCase } from "./ListJobsFactory.js";

export class ListJobsController {
  private listJobsUseCase: ListJobsUseCase;

  constructor() {
    this.listJobsUseCase = makeListJobsUseCase();
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.listJobsUseCase.execute();

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
