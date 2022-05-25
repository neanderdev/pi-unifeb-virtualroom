import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ListActivityAndUsersUseCase {
  async execute(class_uid: string) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists");
    }

    const result = await prisma.activity.findMany({
      where: {
        class_uid,
        AND: {
          category_activity: {
            tipo_category_activity: "A",
          },
        },
      },
      select: {
        uid_activity: true,
        name_activity: true,
        createdAt_activity: true,
        dt_entrega_activity: true,
        nota_max_activity: true,
        class: {
          select: {
            ClassUser: {
              where: {
                user: {
                  tipo_user: "S",
                },
              },
              select: {
                user: {
                  select: {
                    uid_user: true,
                    name_user: true,
                  },
                },
              },
            },
          },
        },
        DetailActivity: {
          select: {
            id_detail_activity: true,
            dt_isEntrega_detail_acitivity: true,
            activity_uid: true,
            nota_user: true,
            user_uid: true,
          },
        },
      },
    });

    return result;
  }
}
