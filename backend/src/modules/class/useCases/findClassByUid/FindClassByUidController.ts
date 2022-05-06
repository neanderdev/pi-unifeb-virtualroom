import { Request, Response } from "express";

import { FindClassByUidUseCase } from "./FindClassByUidUseCase";

export class FindClassByUidController {
  async handle(request: Request, response: Response) {
    const { uid_class } = request.params;

    const findClassByUidUseCase = new FindClassByUidUseCase();
    const result = await findClassByUidUseCase.execute(uid_class);

    return response.json(result);
  }
}
