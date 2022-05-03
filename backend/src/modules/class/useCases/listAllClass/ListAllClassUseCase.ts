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
      include: {
        ClassUser: {
          select: {
            user: {
              select: {
                ra_user: true,
                name_user: true,
                email_user: true,
                tipo_user: true,
              },
            },
          },
        },
      },
    });

    return allClassUser;
  }
}
