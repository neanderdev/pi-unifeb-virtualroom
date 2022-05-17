import { Request, Response } from "express";

import { FindByActivityUidUseCase } from "./FindByActivityUidUseCase";

export class FindByActivityUidController {
  async handle(request: Request, response: Response) {
    const { uid_activity } = request.params;

    const findByActivityUidUseCase = new FindByActivityUidUseCase();
    const result = await findByActivityUidUseCase.execute(uid_activity);

    return response.json(result);
  }
}
