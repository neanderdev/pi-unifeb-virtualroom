import { Request, Response } from "express";

import { UpdateMeUseCase } from "./UpdateMeUseCase";

export class UpdateMeController {
  async handle(request: Request, response: Response) {
    const {
      uid_user,
      email_user,
      name_user,
      gender_user,
      tel_cel_user,
      tel_res_user,
      endereco_user,
      numero_user,
      bairro_user,
      complemento_user,
      cep_user,
      cidade_user,
      uf_user,
    } = request.body;

    const updateMeUseCase = new UpdateMeUseCase();
    await updateMeUseCase.execute({
      uid_user,
      email_user,
      name_user,
      gender_user,
      tel_cel_user,
      tel_res_user,
      endereco_user,
      numero_user,
      bairro_user,
      complemento_user,
      cep_user,
      cidade_user,
      uf_user,
    });

    return response.status(204).send();
  }
}
