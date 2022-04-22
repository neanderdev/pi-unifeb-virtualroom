import { Request, Response } from "express";
import { ListTeacherUseCase } from "./ListTeacherUseCase";

export class ListTeacherController {
  async handle(request: Request, response: Response) {
    const listTeacherUseCase = new ListTeacherUseCase();
    const result = await listTeacherUseCase.execute();

    return response.json(result);
  }
}
