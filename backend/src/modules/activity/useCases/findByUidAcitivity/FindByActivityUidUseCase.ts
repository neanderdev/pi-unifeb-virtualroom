import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class FindByActivityUidUseCase {
  async execute(uid_activity: string) {
    const activity = await prisma.activity.findUnique({
      where: {
        uid_activity,
      },
      include: {
        MaterialActivity: {
          select: {
            id_material_activity: true,
            name_material_activity: true,
            size_material_activity: true,
            link_material_activity: true,
            tipo_material_activity: true,
          },
        },
        category_activity: {
          select: {
            tipo_category_activity: true,
          },
        },
      },
    });

    if (!activity) {
      throw new AppError("Activity does not exists");
    }

    return activity;
  }
}
