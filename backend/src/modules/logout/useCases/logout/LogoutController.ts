import { Request, Response } from "express";

export class LogoutController {
  async handle(request: Request, response: Response) {
    return response.removeHeader('Cookie-Setup').status(204).send();
  }
}
