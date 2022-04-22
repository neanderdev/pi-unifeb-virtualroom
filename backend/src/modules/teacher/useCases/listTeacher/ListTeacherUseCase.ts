import { prisma } from "../../../../database/prismaClient";

export class ListTeacherUseCase {
  async execute() {
    const teachers = await prisma.teacher.findMany();

    return teachers;
  }
}
