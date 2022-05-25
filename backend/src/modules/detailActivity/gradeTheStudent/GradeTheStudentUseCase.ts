import { prisma } from "../../../database/prismaClient";

import { AppError } from "../../../errors/AppError";

interface IGradeTheStudentUseCase {
  id_detail_activity: number | null;
  nota_user: number;
  activity_uid: string;
  user_uid: string;
}

export class GradeTheStudentUseCase {
  async execute({
    id_detail_activity,
    nota_user,
    activity_uid,
    user_uid,
  }: IGradeTheStudentUseCase) {
    const isExistUser = await prisma.user.findFirst({
      where: {
        uid_user: user_uid,
      },
    });

    if (!isExistUser) {
      throw new AppError("User does not exists");
    }

    const isExistActivity = await prisma.activity.findUnique({
      where: {
        uid_activity: activity_uid,
      },
    });

    if (!isExistActivity) {
      throw new AppError("Activity does not exists");
    }

    if (id_detail_activity === null) {
      await prisma.detailActivity.create({
        data: {
          nota_user,
          dt_isEntrega_detail_acitivity: new Date(),
          activity_uid,
          user_uid,
        },
      });
    } else {
      await prisma.detailActivity.update({
        data: {
          nota_user,
        },
        where: {
          id_detail_activity,
        },
      });
    }
  }
}
