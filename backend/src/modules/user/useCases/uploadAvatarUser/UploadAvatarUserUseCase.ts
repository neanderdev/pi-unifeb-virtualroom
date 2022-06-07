import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

import { deleteFile } from "../../../../utils/file";

export class UploadAvatarUserUseCase {
  async execute(uid_user: string, avatar_user_file: any) {
    const user = await prisma.user.findUnique({
      where: {
        uid_user,
      },
    });

    if (!user) {
      throw new AppError("Class does not exists!");
    }

    if (user.avatar !== "") {
      await deleteFile(`./tmp/${user.avatar}`);
    }

    if (avatar_user_file) {
      await prisma.user.update({
        data: {
          avatar: `/avatar/${avatar_user_file}`,
        },
        where: {
          uid_user,
        },
      });
    }
  }
}
