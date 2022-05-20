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
      email_user: user?.email_user,
      cpf_cnpj_user: user?.cpf_cnpj_user,
      roles: user?.roles,
    };
  }
}
