import { Request, Response } from "express";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { uid_user } = request.params;

    const deleteUserUseCase = new DeleteUserUseCase();

    await deleteUserUseCase.execute(uid_user);

    return response.status(204).send();
  }
}
