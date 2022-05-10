import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ListAllActivitiesUseCase {
  async execute(class_uid: string) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists!");
    }

    const allActivities = await prisma.categoryActivity.findMany({
      where: {
        class_uid,
      },
      include: {
        Activity: {
          where: {
            class_uid,
          },
          select: {
            uid_activity: true,
            name_activity: true,
            dt_entrega_activity: true,
            createdAt_activity: true,
            updatedAt_activity: true,
          },
        },
      },
    });

    return allActivities;
  }
}
