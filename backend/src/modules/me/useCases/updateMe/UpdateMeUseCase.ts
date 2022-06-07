import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface IUpdateUser {
  uid_user: string;
  email_user: string;
  name_user: string;
  gender_user: string;
  tel_cel_user: string;
  tel_res_user: string;
  endereco_user: string;
  numero_user: string;
  bairro_user: string;
  complemento_user: string;
  cep_user: string;
  cidade_user: string;
  uf_user: string;
}

export class UpdateMeUseCase {
  async execute({
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
  }: IUpdateUser) {
    const user = await prisma.user.findUnique({
      where: {
        uid_user,
      },
    });

    if (!user) {
      throw new AppError("User does not exists");
    }

    await prisma.user.update({
      data: {
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
      },
      where: {
        uid_user,
      },
    });
  }
}
