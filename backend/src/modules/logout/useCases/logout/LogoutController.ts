import { Request, Response } from "express";

export class LogoutController {
  async handle(request: Request, response: Response) {
    return response.clearCookie("access_token").status(204).send();
  }
}
