import { Request, Response } from "express";

import { DeleteCategoryActivityUseCase } from "./DeleteCategoryActivityUseCase";

export class DeleteCategoryActivityController {
  async handle(request: Request, response: Response) {
    const { id_category_activity } = request.params;

    const deleteCategoryActivityUseCase = new DeleteCategoryActivityUseCase();
    await deleteCategoryActivityUseCase.execute(parseInt(id_category_activity));

    return response.status(204).send();
  }
}
