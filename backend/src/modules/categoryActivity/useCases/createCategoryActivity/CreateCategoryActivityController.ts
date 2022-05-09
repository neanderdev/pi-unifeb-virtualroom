import { Request, Response } from "express";

import { CreateCategoryActivityUseCase } from "./CreateCategoryActivityUseCase";

export class CreateCategoryActivityController {
  async handle(request: Request, response: Response) {
    const { class_uid, name_category_activity, tipo_category_activity } =
      request.body;

    const createCategoryActivityUseCase = new CreateCategoryActivityUseCase();
    const result = await createCategoryActivityUseCase.execute({
      class_uid,
      name_category_activity,
      tipo_category_activity,
    });

    return response.status(201).json(result);
  }
}
