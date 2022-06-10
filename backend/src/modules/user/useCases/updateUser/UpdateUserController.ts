import { Request, Response } from "express";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const {
      uid_user,
      ra_user,
      name_user,
      gender_user,
      cpf_cnpj_user,
      tel_cel_user,
      tel_res_user,
      endereco_user,
      numero_user,
      bairro_user,
      complemento_user,
      cep_user,
      cidade_user,
      uf_user,
      email_user,
      dt_nascimento_user,
      dt_matricula_user,
      situacao_user,
      senha,
    } = request.body;

    const updateUserUseCase = new UpdateUserUseCase();

    await updateUserUseCase.execute({
      uid_user,
      ra_user,
      name_user,
      gender_user,
      cpf_cnpj_user,
      tel_cel_user,
      tel_res_user,
      endereco_user,
      numero_user,
      bairro_user,
      complemento_user,
      cep_user,
      cidade_user,
      uf_user,
      email_user,
      dt_nascimento_user,
      dt_matricula_user,
      situacao_user,
      senha,
    });

    return response.status(204).send();
  }
}
