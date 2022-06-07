import { prisma } from "../../../database/prismaClient";

import { AppError } from "../../../errors/AppError";

export class FindMeByIdUseCase {
  async execute(uid_user: string) {
    const user = await prisma.user.findUnique({
      where: {
        uid_user,
      },
    });

    if (!user) {
      throw new AppError("User does not exists!");
    }

    return {
      uid_user: user?.uid_user,
      ra_user: user?.ra_user,
      name_user: user?.name_user,
      dt_nascimento_user: user?.dt_nascimento_user,
      email_user: user?.email_user,
      cpf_cnpj_user: user?.cpf_cnpj_user,
      gender_user: user?.gender_user,
      tel_cel_user: user?.tel_cel_user,
      tel_res_user: user?.tel_res_user,
      endereco_user: user?.endereco_user,
      numero_user: user?.numero_user,
      bairro_user: user?.bairro_user,
      complemento_user: user?.complemento_user,
      cep_user: user?.cep_user,
      cidade_user: user?.cidade_user,
      uf_user: user?.uf_user,
      avatar: user?.avatar,
      roles: user?.roles,
    };
  }
}
