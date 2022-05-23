import { Request, Response } from "express";

import { ListAllClassNoticeUseCase } from "./ListAllClassNoticeUseCase";

export class ListAllClassNoticeController {
  async handle(request: Request, response: Response) {
    const { class_uid } = request.params;

    const listAllClassNoticeUseCase = new ListAllClassNoticeUseCase();
    const result = await listAllClassNoticeUseCase.execute(class_uid);

    return response.json(result);
  }
}
