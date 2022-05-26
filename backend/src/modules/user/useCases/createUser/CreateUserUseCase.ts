import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface ICreateUser {
  ra_user: number;
  name_user: string;
  gender_user: string;
  cpf_cnpj_user: string;
  tel_cel_user: string;
  tel_res_user: string;
  endereco_user: string;
  numero_user: string;
  bairro_user: string;
  complemento_user: string;
  cep_user: string;
  cidade_user: string;
  uf_user: string;
  email_user: string;
  dt_nascimento_user: Date;
  dt_matricula_user: Date;
  situacao_user: boolean;
  senha: string;
  tipo_user: string;
  roles: any;
}

export class CreateUserUseCase {
  async execute({
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
  }: ICreateUser) {
    // Validar se o RA do usuário existe
    const userIsRAExist = await prisma.user.findUnique({
      where: {
        ra_user,
      },
    });

    if (userIsRAExist) {
      throw new AppError("RA already exists");
    }

    // Validar se o email do usuário existe
    const userIsEmailExist = await prisma.user.findUnique({
      where: {
        email_user,
      },
    });

    if (userIsEmailExist) {
      throw new AppError("Email already exists");
    }

    // Validar se o email do usuário existe
    const userIsCPFOrCNPJExist = await prisma.user.findUnique({
      where: {
        cpf_cnpj_user,
      },
    });

    if (userIsCPFOrCNPJExist) {
      throw new AppError("CPF/CNPJ already exists");
    }
    // Salvar o usuário
    const user = await prisma.user.create({
      data: {
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
      },
    });

    return user;
  }
}
