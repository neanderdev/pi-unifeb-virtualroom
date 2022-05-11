import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface ICreateActivity {
  name_activity: string;
  content_activity: string;
  dt_entrega_activity: Date;
  isAcceptWithDelay_Activity: boolean;
  nota_max_activity: number;
  class_uid: string;
  category_activity_id: number;
}

export class CreateActivityUseCase {
  async execute({
    name_activity,
    content_activity,
    dt_entrega_activity,
    isAcceptWithDelay_Activity,
    nota_max_activity,
    class_uid,
    category_activity_id,
  }: ICreateActivity) {
    const isExistsClass = await prisma.class.findFirst({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists");
    }

    const isExistsCategorie = await prisma.categoryActivity.findFirst({
      where: {
        id_category_activity: category_activity_id,
      },
    });

    if (!isExistsCategorie) {
      throw new AppError("Categorie does not exists");
    }

    const activityCreated = await prisma.activity.create({
      data: {
        name_activity,
        content_activity,
        dt_entrega_activity,
        isAcceptWithDelay_Activity,
        nota_max_activity,
        class_uid,
        category_activity_id,
      },
    });

    return activityCreated;
  }
}
