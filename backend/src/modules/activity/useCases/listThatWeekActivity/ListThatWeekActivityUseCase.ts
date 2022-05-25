import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ListThatWeekActivityUseCase {
  async execute(class_uid: string) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists");
    }

    const date = new Date();
    date.setDate(date.getDate() - 7);

    const result = await prisma.activity.findMany({
      where: {
        class_uid,
        AND: {
          createdAt_activity: {
            gt: date,
          },
        },
      },
      select: {
        uid_activity: true,
        name_activity: true,
      },
    });

    return result;
  }
}
