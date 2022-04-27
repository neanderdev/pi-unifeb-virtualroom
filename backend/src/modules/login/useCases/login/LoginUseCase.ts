import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

interface ILogin {
  ra: number;
  senha: string;
}

interface IReturn {
  uid_user: string;
  ra_user: number;
  email_user: string;
  tipo_user: string;
  roles: any;
  token: string;
  refresh_token: string;
}

export class LoginUseCase {
  async execute({ ra, senha }: ILogin) {
    // Validar se o RA do usuário existe
    const user = await prisma.user.findFirst({
      where: {
        ra_user: ra,
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
      "febroom2022",
      {
        subject: user.uid_user,
        expiresIn: "15h",
      }
    );

    const refresh_token = jwt.sign(
      {
        uid_user: user.uid_user,
        ra_user: user.ra_user,
        email_user: user.email_user,
        tipo_user: user.tipo_user,
        roles: user.roles,
      },
      "febroom2022",
      {
        subject: user.uid_user,
        expiresIn: "30d",
      }
    );

    let dateAtual = new Date();
    dateAtual.setDate(dateAtual.getDate() + 30);

    await prisma.userToken.create({
      data: {
        refresh_token,
        expires_date: dateAtual,
        user_uid: user.uid_user,
      },
    });

    const returnUser: IReturn = Object.assign({
      uid_user: user.uid_user,
      ra_user: user.ra_user,
      email_user: user.email_user,
      cpf_cnpj_user: user.cpf_cnpj_user,
      tipo_user: user.tipo_user,
      roles: user.roles,
      token,
      refresh_token,
    });

    return returnUser;
  }
}
