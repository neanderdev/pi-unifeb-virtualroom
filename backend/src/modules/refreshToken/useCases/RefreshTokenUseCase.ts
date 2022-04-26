import jwt from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";

import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
  uid_user: string;
  ra_user: number;
  email_user: string;
  tipo_user: string;
  roles: any;
}

interface IReturn {
  token_atual: string;
  refresh_token: string;
}

export class RefreshTokenUseCase {
  async execute(token: string) {
    const { sub, uid_user, ra_user, email_user, tipo_user, roles } = jwt.verify(
      token,
      "febroom2022"
    ) as IPayload;

    const user_uid = sub;

    const userToken = await prisma.userToken.findFirst({
      where: {
        user_uid,
        refresh_token: token,
      },
    });

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await prisma.userToken.delete({
      where: {
        uid_user_token: userToken.uid_user_token,
      },
    });

    const token_atual = jwt.sign(
      {
        uid_user: uid_user,
        ra_user: ra_user,
        email_user: email_user,
        tipo_user: tipo_user,
        roles: roles,
      },
      "febroom2022",
      {
        subject: user_uid,
        expiresIn: "15h",
      }
    );

    const refresh_token = jwt.sign(
      {
        ra_user: ra_user,
        email_user: email_user,
      },
      "febroom2022",
      {
        subject: user_uid,
        expiresIn: "30d",
      }
    );

    let dateAtual = new Date();
    dateAtual.setDate(dateAtual.getDate() + 30);

    await prisma.userToken.create({
      data: {
        refresh_token,
        expires_date: dateAtual,
        user_uid: user_uid,
      },
    });

    return { token_atual, refresh_token };
  }
}
