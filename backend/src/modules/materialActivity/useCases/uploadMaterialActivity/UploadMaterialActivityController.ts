import { Request, Response } from "express";

import { UploadMaterialActivityUseCase } from "./UploadMaterialActivityUseCase";

interface IFiles {
  filename: string;
  originalname: string;
  size: number;
}

interface ILinks {
  name: string;
  link: string;
}

export class UploadMaterialActivityController {
  async handle(request: Request, response: Response) {
    const { activity_uid } = request.params;

    const materiais = request.files as IFiles[];
    let links = [] as ILinks[];

    if (!Array.isArray(request.body.links)) {
      links.push(request.body.links as ILinks);
    } else {
      links = request.body.links as ILinks[];
    }

    const uploadMaterialActivityUseCase = new UploadMaterialActivityUseCase();

    const materiais_name = materiais.map((file) => {
      return {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
      };
    });

    await uploadMaterialActivityUseCase.execute({
      activity_uid,
      materiais_name: materiais_name ? materiais_name : [],
      links: links ? links : [],
    });

    return response.status(201).send();
  }
}
