import { prisma } from "../../../../database/prismaClient";

interface ICreateClass {
  name_class: string;
  name_matter_class: string;
}

export class CreateClassUseCase {
  async execute({ name_class, name_matter_class }: ICreateClass) {
    const resultCreateClass = await prisma.class.create({
      data: {
        name_class,
        name_matter_class,
        background_class: "/class/background-class-padrao.png",
      },
    });

    return resultCreateClass;
  }
}
