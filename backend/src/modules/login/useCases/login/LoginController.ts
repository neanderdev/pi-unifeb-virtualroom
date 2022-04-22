import { Request, Response } from "express";

import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
  async handle(request: Request, response: Response) {
    const { ra, senha } = request.body;

    const loginUseCase = new LoginUseCase();
    const result = await loginUseCase.execute({ ra, senha });

    response.cookie("access_token", result, {
      sameSite: "strict",
      path: "/",
      httpOnly: true,
      secure: false, // vai ser true quando for https.
    });

    return response.json(result);
  }
}
