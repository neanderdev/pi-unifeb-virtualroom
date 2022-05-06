import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class FindClassByUidUseCase {
  async execute(uid_class: string) {
    const findClasByUid = await prisma.class.findFirst({
      where: {
        uid_class,
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

    if (!findClasByUid) {
      throw new AppError("Class does not exists!");
    }

    return findClasByUid;
  }
}
