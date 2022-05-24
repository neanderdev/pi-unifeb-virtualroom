import { Request, Response } from "express";

import { ListAllActivityCommentUseCase } from "./ListAllActivityCommentUseCase";

export class ListAllActivityCommentController {
  async handle(request: Request, response: Response) {
    const { activity_uid } = request.params;

    const listAllActivityCommentUseCase = new ListAllActivityCommentUseCase();
    const result = await listAllActivityCommentUseCase.execute(activity_uid);

    return response.json(result);
  }
}
