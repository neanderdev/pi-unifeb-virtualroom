import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class FindClassUserByUidUseCase {
  async execute(class_uid: string) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class: class_uid,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists");
    }

    const result = await prisma.classUser.findMany({
      where: {
        class_uid,
      },
    });

    return result;
  }
}
