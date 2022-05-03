import { prisma } from "../../../../database/prismaClient";

export class ListAllClassUseCase {
  async execute(tipo_user: string, uid_user: string) {
    if (tipo_user === "A") {
      const allClassAdmin = await prisma.class.findMany({
        where: {
          isArchive: false,
        },
      });

      return allClassAdmin;
    }

    const allClassUser = await prisma.class.findMany({
      where: {
        isArchive: false,
        ClassUser: {
          some: {
            user_uid: uid_user,
          },
        },
      },
    });

    return allClassUser;
  }
}
