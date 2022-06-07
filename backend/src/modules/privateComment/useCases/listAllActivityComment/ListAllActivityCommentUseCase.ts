import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ListAllActivityCommentUseCase {
  async execute(activity_uid: string) {
    const isExistsActivity = await prisma.activity.findUnique({
      where: {
        uid_activity: activity_uid,
      },
    });

    if (!isExistsActivity) {
      throw new AppError("Activity does not exists");
    }

    const result = await prisma.activityComment.findMany({
      where: {
        activity_uid,
      },
      include: {
        user: {
          select: {
            name_user: true,
            avatar: true,
          },
        },
      },
    });

    return result;
  }
}
