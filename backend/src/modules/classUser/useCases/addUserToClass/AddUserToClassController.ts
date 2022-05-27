import { Request, Response } from "express";

import { DeleteAllUserToClassUseCase } from "../deleteAllUserToClass/DeleteAllUserToClassUseCase";
import { AddUserToClassUseCase } from "./AddUserToClassUseCase";

export class AddUserToClassController {
  async handle(request: Request, response: Response) {
    const { user_uid, class_uid } = request.body;

    const deleteAllUserToClassUseCase = new DeleteAllUserToClassUseCase();
    await deleteAllUserToClassUseCase.execute(class_uid);

    const addUserToClassUseCase = new AddUserToClassUseCase();
    await addUserToClassUseCase.execute(user_uid, class_uid);

    return response.status(201).send();
  }
}
