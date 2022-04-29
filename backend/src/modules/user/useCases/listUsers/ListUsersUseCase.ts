import { prisma } from "../../../../database/prismaClient";

export class ListUsersUseCase {
  async execute(tipo_user: string, page: string, per_page: number) {
    const pageStart = (Number(page) - 1) * Number(per_page);
    const pageEnd = pageStart + Number(per_page);

    const users = await prisma.user.findMany({
      where: {
        tipo_user,
      },
      skip: pageStart,
      take: Number(per_page),
    });

    const totalUsers = await prisma.user.findMany({
      where: {
        tipo_user,
      },
    });

    return {
      users,
      countUsers: totalUsers.length,
    };
  }
}
