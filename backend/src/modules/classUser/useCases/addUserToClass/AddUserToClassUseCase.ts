import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class AddUserToClassUseCase {
  async execute(user_uid: string, class_uid: string) {
    const isExistsUser = await prisma.user.findFirst({
      where: {
        uid_user: user_uid,
      },
    });

    if (!isExistsUser) {
      throw new AppError("User does not exists");
    }

    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists");
    }

    await prisma.classUser.create({
      data: {
        user_uid,
        class_uid,
      },
    });
  }
}
