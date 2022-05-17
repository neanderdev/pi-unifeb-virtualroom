import { Request, Response } from "express";

import { CreateDetailActivityUseCase } from "./CreateDetailActivityUseCase";

export class CreateDetailActivityController {
  async handle(request: Request, response: Response) {
    const { dt_isEntrega_detail_acitivity, activity_uid, ra_user } =
      request.body;

    const createDetailActivityUseCase = new CreateDetailActivityUseCase();
    const result = await createDetailActivityUseCase.execute({
      dt_isEntrega_detail_acitivity,
      activity_uid,
      ra_user,
    });

    return response.status(201).json(result);
  }
}
