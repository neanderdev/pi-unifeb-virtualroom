import { Request, Response } from "express";

import { CreateTeacherUseCase } from "./CreateTeacherUseCase";

export class CreateTeacherController {
  async handle(request: Request, response: Response) {
    const {
      ra_teacher,
      name_teacher,
      gender_teacher,
      cpf_cnpj_teacher,
      tel_cel_teacher,
      tel_res_teacher,
      endereco_teacher,
      numero_teacher,
      bairro_teacher,
      complemento_teacher,
      cep_teacher,
      cidade_teacher,
      uf_teacher,
      email_teacher,
      dt_nascimento_teacher,
      dt_matricula_teacher,
      situacao_teacher,
      user_id,
    } = request.body;

    const createTeacherUseCase = new CreateTeacherUseCase();
    const result = await createTeacherUseCase.execute({
      ra_teacher,
      name_teacher,
      gender_teacher,
      cpf_cnpj_teacher,
      tel_cel_teacher,
      tel_res_teacher,
      endereco_teacher,
      numero_teacher,
      bairro_teacher,
      complemento_teacher,
      cep_teacher,
      cidade_teacher,
      uf_teacher,
      email_teacher,
      dt_nascimento_teacher,
      dt_matricula_teacher,
      situacao_teacher,
      user_id,
    });

    return response.status(201).json(result);
  }
}
