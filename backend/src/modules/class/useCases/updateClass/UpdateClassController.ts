import { Request, Response } from "express";

import { UpdateClassUseCase } from "./UpdateClassUseCase";

export class UpdateClassController {
  async handle(request: Request, response: Response) {
    const { uid_class, name_class, name_matter_class } = request.body;

    const updateClassUseCase = new UpdateClassUseCase();
    await updateClassUseCase.execute({
      uid_class,
      name_class,
      name_matter_class,
    });

    return response.status(204).send();
  }
}
