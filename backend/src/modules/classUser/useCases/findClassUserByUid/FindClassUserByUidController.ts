import { Request, Response } from "express";

import { FindClassUserByUidUseCase } from "./FindClassUserByUidUseCase";

export class FindClassUserByUidController {
  async handle(request: Request, response: Response) {
    const { class_uid } = request.params;

    const findClassUserByUidUseCase = new FindClassUserByUidUseCase();
    const result = await findClassUserByUidUseCase.execute(class_uid);

    return response.json(result);
  }
}
