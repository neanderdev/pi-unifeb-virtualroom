import { Request, Response } from "express";

import { CreateClassNoticeAnswerUseCase } from "./CreateClassNoticeAnswerUseCase";

export class CreateClassNoticeAnswerController {
  async handle(request: Request, response: Response) {
    const { message, user_uid, class_notice_id } = request.body;

    const createClassNoticeAnswerUseCase = new CreateClassNoticeAnswerUseCase();
    const result = await createClassNoticeAnswerUseCase.execute({
      message,
      user_uid,
      class_notice_id,
    });

    return response.status(201).json(result);
  }
}
