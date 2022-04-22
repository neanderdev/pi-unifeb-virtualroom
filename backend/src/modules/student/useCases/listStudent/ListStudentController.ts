import { Request, Response } from "express";
import { ListStudentUseCase } from "./ListStudentUseCase";

export class ListStudentController {
  async handle(request: Request, response: Response) {
    const listStudentUseCase = new ListStudentUseCase();
    const result = await listStudentUseCase.execute();

    return response.json(result);
  }
}
