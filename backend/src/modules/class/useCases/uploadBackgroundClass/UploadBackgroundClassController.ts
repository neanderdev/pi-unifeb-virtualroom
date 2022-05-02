import { Request, Response } from "express";

import { UploadBackgroundClassUseCase } from "./UploadBackgroundClassUseCase";

export class UploadBackgroundClassController {
  async handle(request: Request, response: Response) {
    const { uid_class } = request.params;
    const background_class_file = request.file?.filename;

    const uploadBackgroundClassUseCase = new UploadBackgroundClassUseCase();
    await uploadBackgroundClassUseCase.execute(uid_class,background_class_file);

    return response.status(204).send();
  }
}
