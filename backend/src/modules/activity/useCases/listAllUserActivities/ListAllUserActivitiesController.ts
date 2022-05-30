import { Request, Response } from "express";

import { ListAllUserActivitiesUseCase } from "./ListAllUserActivitiesUseCase";

export class ListAllUserActivitiesController {
  async handle(request: Request, response: Response) {
    const { user_uid } = request.params;

    const listAllUserActivitiesUseCase = new ListAllUserActivitiesUseCase();
    const result = await listAllUserActivitiesUseCase.execute(user_uid);

    return response.json(result);
  }
}
