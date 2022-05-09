import { Request, Response } from "express";

import { ListAllCategoryActivityUseCase } from "./ListAllCategoryActivityUseCase";

export class ListAllCategoryActivityController {
  async handle(request: Request, response: Response) {
    const { class_uid } = request.params;

    const listAllCategoryActivityUseCase = new ListAllCategoryActivityUseCase();
    const result = await listAllCategoryActivityUseCase.execute(class_uid);

    return response.json(result);
  }
}
