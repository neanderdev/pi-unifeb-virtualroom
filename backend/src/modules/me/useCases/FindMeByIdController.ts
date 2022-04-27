import { Request, Response } from "express";

import { FindMeByIdUseCase } from "./FindMeByIdUseCase";

export class FindMeByIdController {
  async handle(request: Request, response: Response) {
    const { uid_user } = request;

    const findMeByIdUseCase = new FindMeByIdUseCase();
    const result = await findMeByIdUseCase.execute(uid_user);

    return response.json(result);
  }
}
