import { Request, Response } from "express";

import { ListActivityAndUsersUseCase } from "./ListActivityAndUsersUseCase";

export class ListActivityAndUsersController {
  async handle(request: Request, response: Response) {
    const { class_uid } = request.params;

    const listActivityAndUsersUseCase = new ListActivityAndUsersUseCase();
    const result = await listActivityAndUsersUseCase.execute(class_uid);

    return response.json(result);
  }
}
