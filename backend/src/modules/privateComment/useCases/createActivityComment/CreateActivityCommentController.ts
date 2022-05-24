import { Request, Response } from "express";

import { CreateActivityCommentUseCase } from "./CreateActivityCommentUseCase";

export class CreateActivityCommentController {
  async handle(request: Request, response: Response) {
    const { message, user_uid, activity_uid } = request.body;

    const createActivityCommentUseCase = new CreateActivityCommentUseCase();
    const result = await createActivityCommentUseCase.execute({
      message,
      user_uid,
      activity_uid,
    });

    return response.status(201).json(result);
  }
}
