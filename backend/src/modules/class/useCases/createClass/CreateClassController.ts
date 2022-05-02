import { Request, Response } from "express";

import { CreateClassUseCase } from "./CreateClassUseCase";

export class CreateClassController {
  async handle(request: Request, response: Response) {
    const { name_class, name_matter_class } = request.body;

    const createClassUseCase = new CreateClassUseCase();
    const result = await createClassUseCase.execute({
      name_class,
      name_matter_class,
    });

    return response.status(201).json(result);
  }
}
