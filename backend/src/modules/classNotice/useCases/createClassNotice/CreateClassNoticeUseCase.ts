import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface ICreateClassNotice {
  message: string;
  user_uid: string;
  class_uid: string;
}

export class CreateClassNoticeUseCase {
  async execute({ message, user_uid, class_uid }: ICreateClassNotice) {
    const isExistsUser = await prisma.user.findFirst({
      where: {
        uid_user: user_uid,
      },
    });

    if (!isExistsUser) {
      throw new AppError("User does not exits");
    }

    const isExistsClass = await prisma.class.findFirst({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exits");
    }

    const result = await prisma.classNotice.create({
      data: {
        message,
        user_uid,
        class_uid,
      },
    });

    return result;
  }
}
