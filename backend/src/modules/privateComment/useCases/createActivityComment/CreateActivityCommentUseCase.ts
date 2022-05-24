import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface ICreateActivityComment {
  message: string;
  user_uid: string;
  activity_uid: string;
}

export class CreateActivityCommentUseCase {
  async execute({ message, user_uid, activity_uid }: ICreateActivityComment) {
    const isExistsActivity = await prisma.activity.findUnique({
      where: {
        uid_activity: activity_uid,
      },
    });

    if (!isExistsActivity) {
      throw new AppError("Activity does not exists");
    }

    const isExistsUser = await prisma.user.findUnique({
      where: {
        uid_user: user_uid,
      },
    });

    if (!isExistsUser) {
      throw new AppError("User does not exists");
    }

    const result = await prisma.activityComment.create({
      data: {
        message,
        user_uid,
        activity_uid,
      },
    });

    return result;
  }
}
