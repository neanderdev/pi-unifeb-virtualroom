import { Request, Response } from "express";

import { CreateActivityUseCase } from "./CreateActivityUseCase";

export class CreateActivityController {
  async handle(request: Request, response: Response) {
    const {
      name_activity,
      content_activity,
      dt_entrega_activity,
      isAcceptWithDelay_Activity,
      nota_max_activity,
      class_uid,
      category_activity_id,
    } = request.body;

    const createActivityUseCase = new CreateActivityUseCase();
    const result = await createActivityUseCase.execute({
      name_activity,
      content_activity,
      dt_entrega_activity,
      isAcceptWithDelay_Activity,
      nota_max_activity,
      class_uid,
      category_activity_id,
    });

    return response.status(201).json(result);
  }
}
