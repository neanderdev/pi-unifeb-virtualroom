import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface ICreateClassNoticeAnswer {
  message: string;
  user_uid: string;
  class_notice_id: number;
}

export class CreateClassNoticeAnswerUseCase {
  async execute({
    message,
    user_uid,
    class_notice_id,
  }: ICreateClassNoticeAnswer) {
    const isExistsUser = await prisma.user.findFirst({
      where: {
        uid_user: user_uid,
      },
    });

    if (!isExistsUser) {
      throw new AppError("User does not exits");
    }

    const isExistsClassNotice = await prisma.classNotice.findFirst({
      where: {
        id_class_notice: class_notice_id,
      },
    });

    if (!isExistsClassNotice) {
      throw new AppError("Class Notice does not exits");
    }

    const result = await prisma.classNoticeAnswer.create({
      data: {
        message,
        user_uid,
        class_notice_id,
      },
    });

    return result;
  }
}
