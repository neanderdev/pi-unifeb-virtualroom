import { prisma } from "../../../database/prismaClient";

import { AppError } from "../../../errors/AppError";

export class FindDetailActivityByUserUidUseCase {
  async execute(activity_uid: string, user_uid: string) {
    const user = await prisma.user.findUnique({
      where: {
        uid_user: user_uid,
      },
    });

    if (!user) {
      throw new AppError("User does not exists");
    }

    const activity = await prisma.activity.findUnique({
      where: {
        uid_activity: activity_uid,
      },
    });

    if (!activity) {
      throw new AppError("Activity does not exists");
    }

    const result = await prisma.detailActivity.findFirst({
      where: {
        activity_uid,
        AND: {
          user_uid,
        },
      },
      select: {
        id_detail_activity: true,
        dt_isEntrega_detail_acitivity: true,
        nota_user: true,
        MaterialDetailActivity: true,
      },
    });

    return result;
  }
}
