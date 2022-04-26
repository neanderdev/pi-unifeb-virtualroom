import { prisma } from "../../../../database/prismaClient";

export class FindUserByUidUseCase {
  async execute(uid_user: string) {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        uid_user,
      },
    });

    if (!user) {
      throw new Error("User does not exists!");
    }

    // Retornar o usuário, caso exista
    return user;
  }
}
