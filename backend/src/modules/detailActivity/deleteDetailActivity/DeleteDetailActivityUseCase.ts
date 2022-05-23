import { prisma } from "../../../database/prismaClient";

import { deleteFile } from "../../../utils/file";

import { AppError } from "../../../errors/AppError";

export class DeleteDetailActivityUseCase {
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

    const detailActivity = await prisma.detailActivity.findFirst({
      where: {
        activity_uid,
        AND: {
          user_uid,
        },
      },
    });

    if (detailActivity) {
      const isExistsmaterialDetailActivity =
        await prisma.materialDetailActivity.findMany({
          where: {
            detail_activity_id: detailActivity.id_detail_activity,
          },
        });

      if (isExistsmaterialDetailActivity.length > 0) {
        isExistsmaterialDetailActivity.map(
          async (detailActivity) =>
            await deleteFile(
              `./tmp/${detailActivity.link_material_detail_activity}`
            )
        );

        await prisma.materialDetailActivity.deleteMany({
          where: {
            detail_activity_id: detailActivity.id_detail_activity,
          },
        });
      }

      await prisma.detailActivity.delete({
        where: {
          id_detail_activity: detailActivity.id_detail_activity,
        },
      });
    }
  }
}
