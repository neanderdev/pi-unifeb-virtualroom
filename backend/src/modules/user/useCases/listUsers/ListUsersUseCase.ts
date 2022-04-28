import { prisma } from "../../../../database/prismaClient";

export class ListUsersUseCase {
  async execute(tipo_user: string) {
    const users = await prisma.user.findMany({
      where: {
        tipo_user,
      },
    });

    return users;
  }
}
