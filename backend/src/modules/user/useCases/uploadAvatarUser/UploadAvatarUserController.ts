import { Request, Response } from "express";

import { UploadAvatarUserUseCase } from "./UploadAvatarUserUseCase";

export class UploadAvatarUserController {
  async handle(request: Request, response: Response) {
    const { user_uid } = request.params;
    const avatar_user_file = request.file?.filename;

    const uploadAvatarUserUseCase = new UploadAvatarUserUseCase();
    await uploadAvatarUserUseCase.execute(user_uid, avatar_user_file);

    return response.status(204).send();
  }
}
