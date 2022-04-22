import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../../../../database/prismaClient";

interface ILogin {
  ra: number;
  senha: string;
}

interface IReturn {
  id_user: number;
  ra: number;
  email: string;
  tipo_user: string;
  role: any;
  token: string;
}

export class LoginUseCase {
  async execute({ ra, senha }: ILogin) {
    // Validar se o RA do usuário existe
    const user = await prisma.user.findUnique({
      where: {
        ra,
      },
    });

    if (!user) {
      throw new Error("RA already not exists");
    }

    // Comparar senha do usário
    const comparePasswordUser = await compare(senha, user.senha);

    if (!comparePasswordUser) {
      throw new Error("RA ou senha incorreto");
    }

    const token = jwt.sign(
      {
        id_user: user.id_user,
        ra: user.ra,
        email: user.email,
        tipo_user: user.tipo_user,
        role: user.role,
      },
      "febroom2022"
      // {
      //     expiresIn: "1d"
      // }
    );

    const returnUser: IReturn = Object.assign({
      id_user: user.id_user,
      ra: user.ra,
      email: user.email,
      tipo_user: user.tipo_user,
      role: user.role,
      token,
    });

    return returnUser;
  }
}
