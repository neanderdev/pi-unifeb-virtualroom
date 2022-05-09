import { Request, Response } from "express";

import { UpdateCategoryActivityUseCase } from "./UpdateCategoryActivityUseCase";

export class UpdateCategoryActivityController {
  async handle(request: Request, response: Response) {
    const { id_category_activity, name_category_activity } = request.body;

    const updateCategoryActivityUseCase = new UpdateCategoryActivityUseCase();
    await updateCategoryActivityUseCase.execute({
      id_category_activity,
      name_category_activity,
    });

    return response.status(204).send();
  }
}
