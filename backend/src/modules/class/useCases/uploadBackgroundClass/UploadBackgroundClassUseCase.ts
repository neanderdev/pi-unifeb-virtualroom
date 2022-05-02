import { prisma } from "../../../../database/prismaClient";

import { deleteFile } from "../../../../utils/file";

import { AppError } from "../../../../errors/AppError";

export class UploadBackgroundClassUseCase {
  async execute(uid_class: string, background_class_file: any) {
    const isExistsClass = await prisma.class.findUnique({
      where: {
        uid_class,
      },
    });

    if (!isExistsClass) {
      throw new AppError("Class does not exists!");
    }

    if (
      isExistsClass.background_class !== "/class/background-class-padrao.png"
    ) {
      await deleteFile(`./tmp/${isExistsClass.background_class}`);
    }

    if (background_class_file) {
      await prisma.class.update({
        data: {
          background_class: `/class/${background_class_file}`,
        },
        where: {
          uid_class,
        },
      });
    }
  }
}
