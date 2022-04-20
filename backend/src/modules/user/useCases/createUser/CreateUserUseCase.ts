import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateUser {
  ra: number;
  email: string;
  senha: string;
  tipo_user: string;
  role: any;
}

export class CreateUserUseCase {
  async execute({ ra, email, senha, tipo_user, role }: ICreateUser) {
    // Validar se o RA do usuário existe
    const userIsRAExist = await prisma.user.findUnique({
      where: {
        ra,
      },
    });

    if (userIsRAExist) {
      throw new Error("RA already exists");
    }

    // Validar se o email do usuário existe
    const userIsEmailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userIsEmailExist) {
      throw new Error("Email already exists");
    }

    // Criptografar a senha
    const hashPassword = await hash(senha, 10);

    // Salvar o usuário
    const user = await prisma.user.create({
      data: {
        ra,
        email,
        senha: hashPassword,
        tipo_user,
        role,
      },
    });

    return user;
  }
}
