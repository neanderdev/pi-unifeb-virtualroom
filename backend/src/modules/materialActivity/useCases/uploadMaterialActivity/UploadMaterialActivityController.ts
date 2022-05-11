import { Request, Response } from "express";

import { UploadMaterialActivityUseCase } from "./UploadMaterialActivityUseCase";

interface IFiles {
  filename: string;
}

export class UploadMaterialActivityController {
  async handle(request: Request, response: Response) {
    const { activity_uid } = request.params;

    const materiais = request.files as IFiles[];
    let links = [];

    if (!Array.isArray(request.body.links)) {
      links.push(request.body.links);
    } else {
      links = request.body.links;
    }

    const uploadMaterialActivityUseCase = new UploadMaterialActivityUseCase();

    const materiais_name = materiais.map((file) => file.filename);

    await uploadMaterialActivityUseCase.execute({
      activity_uid,
      materiais_name: materiais_name ? materiais_name : [],
      links: links ? links : [],
    });

    return response.status(201).send();
  }
}
