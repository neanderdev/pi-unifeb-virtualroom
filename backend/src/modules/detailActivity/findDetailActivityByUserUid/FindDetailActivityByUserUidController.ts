import { Request, Response } from "express";

import { FindDetailActivityByUserUidUseCase } from "./FindDetailActivityByUserUidUseCase";

export class FindDetailActivityByUserUidController {
  async handle(request: Request, response: Response) {
    const { activity_uid, user_uid } = request.params;

    const findDetailActivityByUserUidUseCase =
      new FindDetailActivityByUserUidUseCase();
    const result = await findDetailActivityByUserUidUseCase.execute(
      activity_uid,
      user_uid
    );

    return response.json(result);
  }
}
