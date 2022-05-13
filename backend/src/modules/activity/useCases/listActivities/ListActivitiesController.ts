import { Request, Response } from "express";

import { ListActivitiesUseCase } from "./ListActivitiesUseCase";

export class ListActivitiesController {
  async handle(request: Request, response: Response) {
    const { class_uid } = request.params;

    const listActivitiesUseCase = new ListActivitiesUseCase();
    const result = await listActivitiesUseCase.execute(class_uid);

    return response.json(result);
  }
}
