import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class FindUserByUidUseCase {
  async execute(uid_user: string) {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        uid_user,
      },
    });

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    // Retornar o usuário, caso exista
    return user;
  }
}
