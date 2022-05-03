import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

export class ClassArchiveUseCase {
  async execute(uid_class: string) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists!");
    }

    await prisma.class.update({
      data: {
        isArchive: !isExistsClass.isArchive,
      },
      where: {
        uid_class,
      },
    });
  }
}
