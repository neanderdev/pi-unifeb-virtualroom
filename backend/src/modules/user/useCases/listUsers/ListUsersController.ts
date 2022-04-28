import { Request, Response } from "express";

import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const { tipo_user } = request.query;

    const listUsersUseCase = new ListUsersUseCase();
    const result = await listUsersUseCase.execute(tipo_user as string);

    return response.json(result);
  }
}
