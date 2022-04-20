import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { ra, email, senha, tipo_user, role } = request.body;

    const createUserUseCase = new CreateUserUseCase();
    const result = await createUserUseCase.execute({
      ra,
      email,
      senha,
      tipo_user,
      role,
    });

    return response.json(result);
  }
}
