import { Request, Response } from "express";

import { ClassArchiveUseCase } from "./ClassArchiveUseCase";

export class ClassArchiveController {
  async handle(request: Request, response: Response) {
    const { uid_class } = request.params;

    const classArchiveUseCase = new ClassArchiveUseCase();
    await classArchiveUseCase.execute(uid_class);

    return response.status(204).send();
  }
}
