import { Request, Response } from "express";

import { UploadMaterialDetailActivityUseCase } from "./UploadMaterialDetailActivityUseCase";

interface IFiles {
  filename: string;
  originalname: string;
  size: number;
}

export class UploadMaterialDetailActivityController {
  async handle(request: Request, response: Response) {
    const { detail_activity_id } = request.params;

    const detail_activity = request.files as IFiles[];

    const uploadMaterialDetailActivityUseCase =
      new UploadMaterialDetailActivityUseCase();

    const materialDetailActivity = detail_activity.map((file) => {
      return {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
      };
    });

    await uploadMaterialDetailActivityUseCase.execute({
      materialDetailActivity,
      detail_activity_id: parseInt(detail_activity_id),
    });

    return response.status(201).send();
  }
}
