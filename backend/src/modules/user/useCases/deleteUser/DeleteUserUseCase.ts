import { prisma } from "../../../../database/prismaClient";

export class DeleteUserUseCase {
  async execute(uid_user: string) {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        uid_user,
      },
    });

    if (!user) {
      throw new Error("User does not exists!");
    }

    // Apagar usuário
    await prisma.user.delete({
      where: {
        uid_user,
      },
    });
  }
}
