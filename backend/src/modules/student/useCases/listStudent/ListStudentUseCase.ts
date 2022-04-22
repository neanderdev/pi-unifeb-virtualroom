import { prisma } from "../../../../database/prismaClient";

export class ListStudentUseCase {
  async execute() {
    const students = await prisma.student.findMany();

    return students;
  }
}
