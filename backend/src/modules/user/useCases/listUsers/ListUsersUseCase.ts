import { prisma } from "../../../../database/prismaClient";

export class ListUsersUseCase {
  async execute() {
    const users = await prisma.user.findMany();

    return users;
  }
}
