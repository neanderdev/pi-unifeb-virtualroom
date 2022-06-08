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
    if (senha !== user.senha || ra !== user.ra_user) {
      throw new AppError("RA ou senha incorreto", 401);
    }

    // // Se o usuário conseguiu fazer login, apagar todos os refresh token que tiver
    // const userTokens = await prisma.userToken.findMany({
    //   where: {
    //     user_uid: user.uid_user,
    //   },
    // });

    // if (userTokens.length > 0) {
    //   await prisma.userToken.deleteMany({
    //     where: {
    //       user_uid: user.uid_user,
    //     },
    //   });
    // }

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
        expiresIn: "2h",
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
        expiresIn: "1d",
      }
    );

    let dateAtual = new Date();
    dateAtual.setDate(dateAtual.getDate() + 1);

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
      name_user: user.name_user,
      avatar: user.avatar,
      tipo_user: user.tipo_user,
      roles: user.roles,
      token,
      refresh_token,
    });

    return returnUser;
  }
}
