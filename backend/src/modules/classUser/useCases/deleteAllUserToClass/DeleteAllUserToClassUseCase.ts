import { prisma } from "../../../../database/prismaClient";

export class DeleteAllUserToClassUseCase {
  async execute(class_uid: string) {
    await prisma.classUser.deleteMany({
      where: {
        class_uid,
      },
    });
  }
}
