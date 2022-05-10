import { Request, Response } from "express";

import { ListAllActivitiesUseCase } from "./ListAllActivitiesUseCase";

export class ListAllActivitiesController {
  async handle(request: Request, response: Response) {
    const { class_uid } = request.params;

    const listAllActivitiesUseCase = new ListAllActivitiesUseCase();
    const result = await listAllActivitiesUseCase.execute(class_uid);

    return response.json(result);
  }
}
