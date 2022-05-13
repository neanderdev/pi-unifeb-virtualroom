import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ListActivitiesUseCase {
  async execute(class_uid: string) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists");
    }

    const activities = await prisma.activity.findMany({
      where: {
        class_uid,
      },
      select: {
        uid_activity: true,
        name_activity: true,
        content_activity: false,
        dt_entrega_activity: false,
        isAcceptWithDelay_Activity: false,
        nota_max_activity: false,
        isEntregue_activity: false,
        createdAt_activity: true,
        updatedAt_activity: false,
        class_uid: false,
        category_activity_id: false,
        category_activity: {
          select: {
            tipo_category_activity: true,
          },
        },
        class: {
          select: {
            uid_class: false,
            name_class: false,
            name_matter_class: false,
            background_class: false,
            isArchive: false,
            createdAt_class: false,
            updatedAt_class: false,
            ClassUser: {
              where: {
                user: {
                  tipo_user: "T",
                },
              },
              select: {
                user: {
                  select: {
                    name_user: true,
                    tipo_user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return activities;
  }
}
