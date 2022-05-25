import { Request, Response } from "express";

import { ListThatWeekActivityUseCase } from "./ListThatWeekActivityUseCase";

export class ListThatWeekActivityController {
  async handle(request: Request, response: Response) {
    const { class_uid } = request.params;

    const listThatWeekActivityUseCase = new ListThatWeekActivityUseCase();
    const result = await listThatWeekActivityUseCase.execute(class_uid);

    return response.json(result);
  }
}
