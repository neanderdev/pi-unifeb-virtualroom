import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ListAllCategoryActivityUseCase {
  async execute(class_uid: string) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists!");
    }

    const allCategoryActivity = await prisma.categoryActivity.findMany({
      where: {
        class_uid,
      },
    });

    return allCategoryActivity;
  }
}
