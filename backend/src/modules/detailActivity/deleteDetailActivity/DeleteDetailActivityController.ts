import { Request, Response } from "express";

import { DeleteDetailActivityUseCase } from "./DeleteDetailActivityUseCase";

export class DeleteDetailActivityController {
  async handle(request: Request, response: Response) {
    const { activity_uid, user_uid } = request.params;

    const deleteDetailActivityUseCase = new DeleteDetailActivityUseCase();
    await deleteDetailActivityUseCase.execute(activity_uid, user_uid);

    return response.status(204).send();
  }
}
