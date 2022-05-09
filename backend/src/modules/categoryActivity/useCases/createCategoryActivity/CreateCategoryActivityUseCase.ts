import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface CreateCategoryActivity {
  name_category_activity: string;
  tipo_category_activity: string;
  class_uid: string;
}

export class CreateCategoryActivityUseCase {
  async execute({
    class_uid,
    name_category_activity,
    tipo_category_activity,
  }: CreateCategoryActivity) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists!");
    }

    const result = await prisma.categoryActivity.create({
      data: {
        class_uid,
        name_category_activity,
        tipo_category_activity,
      },
    });

    return result;
  }
}
