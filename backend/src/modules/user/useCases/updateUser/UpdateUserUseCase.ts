import { compare, hash } from "bcrypt";

import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface IUpdateUser {
  uid_user: string;
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
}

export class UpdateUserUseCase {
  async execute({
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
  }: IUpdateUser) {
    const user = await prisma.user.findUnique({
      where: {
        uid_user,
      },
    });

    // Verificar se RA do usuário já existe
    const userIsRAExists = await prisma.user.findUnique({
      where: {
        ra_user,
      },
    });

    if (userIsRAExists && ra_user !== user?.ra_user) {
      throw new AppError("RA already exists!");
    }

    // Verificar se e-mail do usuário já existe
    const userIsEmailExists = await prisma.user.findUnique({
      where: {
        email_user,
      },
    });

    if (userIsEmailExists && email_user !== user?.email_user) {
      throw new AppError("E-mail already exists!");
    }

    // Verificar se CPF/CNPJ do usuário já existe
    const userIsCPFOrCNPJExists = await prisma.user.findUnique({
      where: {
        cpf_cnpj_user,
      },
    });

    if (userIsCPFOrCNPJExists && cpf_cnpj_user !== user?.cpf_cnpj_user) {
      throw new AppError("CPF/CPNJ already exists!");
    }

    // Comparar senha do usário
    const comparePasswordUser = await compare(senha, user?.senha ?? "");

    let hashPassword = user?.senha;

    if (!comparePasswordUser) {
      // Criptografar a senha
      hashPassword = await hash(senha, 10);
    }

    // Atualizar usuário
    await prisma.user.update({
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
        senha: hashPassword,
      },
      where: {
        uid_user,
      },
    });
  }
}
