import { prisma } from "../../../../database/prismaClient";

export class ListAllClassUseCase {
  async execute(tipo_user: string, uid_user: string, tipo: string) {
    if (tipo_user === "A") {
      const allClassAdmin = await prisma.class.findMany({
        where: {
          isArchive: tipo === "C" ? false : true,
        },
      });

      return allClassAdmin;
    }

    // A = Class Archive
    // C = Class
    const allClassUser = await prisma.class.findMany({
      where: {
        isArchive: tipo === "C" ? false : true,
        ClassUser: {
          some: {
            user_uid: uid_user,
          },
        },
      },
      include: {
        ClassUser: {
          select: {
            user: {
              select: {
                ra_user: true,
                name_user: true,
                email_user: true,
                tipo_user: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return allClassUser;
  }
}
