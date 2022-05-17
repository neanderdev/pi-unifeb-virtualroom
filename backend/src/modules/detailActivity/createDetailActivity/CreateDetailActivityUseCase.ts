import { prisma } from "../../../database/prismaClient";

import { AppError } from "../../../errors/AppError";

interface ICreateDetailActivityUseCase {
  dt_isEntrega_detail_acitivity: Date;
  activity_uid: string;
  ra_user: number;
}

export class CreateDetailActivityUseCase {
  async execute({
    dt_isEntrega_detail_acitivity,
    activity_uid,
    ra_user,
  }: ICreateDetailActivityUseCase) {
    const user = await prisma.user.findFirst({
      where: {
        ra_user,
      },
    });

    if (!user) {
      throw new AppError("User does not exists");
    }

    const activity = await prisma.activity.findUnique({
      where: { uid_activity: activity_uid },
    });

    if (!activity) {
      throw new AppError("Activity does not exists");
    }

    const result = await prisma.detailActivity.create({
      data: {
        dt_isEntrega_detail_acitivity,
        activity_uid,
        user_uid: user.uid_user,
      },
    });

    return result;
  }
}
