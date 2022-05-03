import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface IUpdateClass {
  uid_class: string;
  name_class: string;
  name_matter_class: string;
}

export class UpdateClassUseCase {
  async execute({ uid_class, name_class, name_matter_class }: IUpdateClass) {
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
        name_class,
        name_matter_class,
      },
      where: {
        uid_class,
      },
    });
  }
}
