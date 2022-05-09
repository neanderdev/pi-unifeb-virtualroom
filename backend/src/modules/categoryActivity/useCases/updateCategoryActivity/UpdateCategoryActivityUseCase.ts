import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface UpdateCategoryActivity {
  id_category_activity: number;
  name_category_activity: string;
}

export class UpdateCategoryActivityUseCase {
  async execute({
    id_category_activity,
    name_category_activity,
  }: UpdateCategoryActivity) {
    const isExistsCategoryActivity = await prisma.categoryActivity.findFirst({
      where: {
        id_category_activity,
      },
    });

    if (!isExistsCategoryActivity) {
      throw new AppError("Category Activity does not exists!");
    }

    await prisma.categoryActivity.update({
      data: {
        name_category_activity,
      },
      where: {
        id_category_activity,
      },
    });
  }
}
