import { Request, Response } from "express";

import { CreateStudentUseCase } from "./CreateStudentUseCase";

export class CreateStudentController {
  async handle(request: Request, response: Response) {
    const {
      ra_student,
      name_student,
      gender_student,
      cpf_student,
      tel_cel_student,
      tel_res_student,
      endereco_student,
      numero_student,
      bairro_student,
      complemento_student,
      cep_student,
      cidade_student,
      uf_student,
      email_student,
      dt_nascimento_student,
      dt_matricula_student,
      situacao_student,
      user_id,
    } = request.body;

    const createStudentUseCase = new CreateStudentUseCase();
    const result = await createStudentUseCase.execute({
      ra_student,
      name_student,
      gender_student,
      cpf_student,
      tel_cel_student,
      tel_res_student,
      endereco_student,
      numero_student,
      bairro_student,
      complemento_student,
      cep_student,
      cidade_student,
      uf_student,
      email_student,
      dt_nascimento_student,
      dt_matricula_student,
      situacao_student,
      user_id,
    });

    return response.status(201).json(result);
  }
}
