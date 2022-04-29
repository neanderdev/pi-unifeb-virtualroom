import { Request, Response } from "express";

import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const { page, tipo_user } = request.query;
    const per_page = 10;

    const listUsersUseCase = new ListUsersUseCase();
    const result = await listUsersUseCase.execute(
      tipo_user as string,
      page as string,
      per_page
    );

    return response.json({
      users: result.users,
      totalCount: String(result.countUsers),
    });
  }
}
