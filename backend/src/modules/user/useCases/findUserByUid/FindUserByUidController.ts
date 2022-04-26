import { Request, Response } from "express";

import { FindUserByUidUseCase } from "./FindUserByUidUseCase";

export class FindUserByUidController {
  async handle(request: Request, response: Response) {
    const { uid_user } = request.params;

    const findUserByUidUseCase = new FindUserByUidUseCase();
    const result = await findUserByUidUseCase.execute(uid_user);

    return response.json(result);
  }
}
