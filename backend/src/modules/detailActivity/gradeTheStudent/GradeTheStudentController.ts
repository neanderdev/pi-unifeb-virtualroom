import { Request, Response } from "express";

import { GradeTheStudentUseCase } from "./GradeTheStudentUseCase";

export class GradeTheStudentController {
  async handle(request: Request, response: Response) {
    const { id_detail_activity, nota_user, activity_uid, user_uid } =
      request.body;

    const gradeTheStudentUseCase = new GradeTheStudentUseCase();
    await gradeTheStudentUseCase.execute({
      id_detail_activity,
      nota_user,
      activity_uid,
      user_uid,
    });

    return response.status(204).send();
  }
}
