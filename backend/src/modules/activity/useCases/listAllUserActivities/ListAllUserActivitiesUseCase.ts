import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ListAllUserActivitiesUseCase {
  async execute(user_uid: string) {
    const isExistsUser = await prisma.user.findFirst({
      where: {
        uid_user: user_uid,
      },
    });

    if (!isExistsUser) {
      throw new AppError("User does not exists");
    }

    const result = await prisma.activity.findMany({
      where: {
        class: {
          ClassUser: {
            some: {
              user_uid,
            },
          },
        },
        AND: {
          category_activity: {
            tipo_category_activity: "A",
          },
          AND: {
            DetailActivity: {
              none: {},
            },
          },
        },
      },
      include: {
        category_activity: {
          select: {
            tipo_category_activity: true,
          },
        },
        class: {
          select: {
            uid_class: true,
          },
        },
      },
    });

    const activitiesIsDelivered = result?.filter((activity) => {
      if (activity.isEntregue_activity === true) {
        return {
          ...activity,
        };
      }
    });

    return {
      result,
      count: activitiesIsDelivered.length,
    };
  }
}
