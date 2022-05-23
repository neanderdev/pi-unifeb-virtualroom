import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ListAllClassNoticeUseCase {
  async execute(class_uid: string) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists");
    }

    const result = await prisma.classNotice.findMany({
      where: {
        class_uid,
      },
      include: {
        ClassNoticeAnswer: {
          include: {
            user: {
              select: {
                name_user: true,
              },
            },
          },
        },
        user: {
          select: {
            name_user: true,
          },
        },
      },
    });

    return result;
  }
}
