import { Request, Response } from "express";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { token } = request.body;

    const refreshTokenUseCase = new RefreshTokenUseCase();
    const result = await refreshTokenUseCase.execute(token);

    response.cookie("access_token", result.token_atual, {
      sameSite: "strict",
      path: "/",
      httpOnly: true,
      secure: false, // vai ser true quando for https.
    });

    response.cookie("refresh_token", result.refresh_token, {
      sameSite: "strict",
      path: "/",
      httpOnly: true,
      secure: false, // vai ser true quando for https.
    });

    return response.json(result);
  }
}
