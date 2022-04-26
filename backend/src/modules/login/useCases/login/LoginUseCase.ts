import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface ILogin {
  ra_user: number;
  senha: string;
}

interface IReturn {
  uid_user: string;
  ra_user: number;
  email_user: string;
  tipo_user: string;
  roles: any;
  token: string;
}

export class LoginUseCase {
  async execute({ ra_user, senha }: ILogin) {
    // Validar se o RA do usuário existe
    const user = await prisma.user.findFirst({
      where: {
        ra_user,
      },
    });

    if (!user) {
      throw new AppError("RA already not exists", 401);
    }

    // Comparar senha do usário
    const comparePasswordUser = await compare(senha, user.senha);

    if (!comparePasswordUser) {
      throw new AppError("RA ou senha incorreto", 401);
    }

    const token = jwt.sign(
      {
        uid_user: user.uid_user,
        ra_user: user.ra_user,
        email_user: user.email_user,
        tipo_user: user.tipo_user,
        roles: user.roles,
      },
      "febroom2022"
      // {
      //     expiresIn: "1d"
      // }
    );

    const returnUser: IReturn = Object.assign({
      uid_user: user.uid_user,
      ra_user: user.ra_user,
      email: user.email_user,
      email_user: user.tipo_user,
      roles: user.roles,
      token,
    });

    return returnUser;
  }
}
