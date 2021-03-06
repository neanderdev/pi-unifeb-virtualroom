import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
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
      tipo_user,
      roles,
    } = request.body;

    const createUserUseCase = new CreateUserUseCase();
    const result = await createUserUseCase.execute({
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
      tipo_user,
      roles,
    });

    return response.status(201).json(result);
  }
}
