import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class DeleteCategoryActivityUseCase {
  async execute(id_category_activity: number) {
    const isExistsCategoryActivity = await prisma.categoryActivity.findFirst({
      where: {
        id_category_activity,
      },
    });

    if (!isExistsCategoryActivity) {
      throw new AppError("Category Activity does not exists!");
    }

    await prisma.categoryActivity.delete({
      where: {
        id_category_activity,
      },
    });
  }
}
