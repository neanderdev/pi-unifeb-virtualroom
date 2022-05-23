import { Request, Response } from "express";

import { CreateClassNoticeUseCase } from "./CreateClassNoticeUseCase";

export class CreateClassNoticeController {
  async handle(request: Request, response: Response) {
    const { message, user_uid, class_uid } = request.body;

    const createClassNoticeUseCase = new CreateClassNoticeUseCase();
    const result = await createClassNoticeUseCase.execute({
      message,
      user_uid,
      class_uid,
    });

    return response.status(201).json(result);
  }
}
