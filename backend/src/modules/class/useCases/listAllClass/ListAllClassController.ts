import { Request, Response } from "express";

import { ListAllClassUseCase } from "./ListAllClassUseCase";

export class ListAllClassController {
  async handle(request: Request, response: Response) {
    const { tipo_user, uid_user } = request;
    const { tipo } = request.query;

    const listAllClassUseCase = new ListAllClassUseCase();
    const result = await listAllClassUseCase.execute(
      tipo_user,
      uid_user,
      tipo as string
    );

    return response.json(result);
  }
}
