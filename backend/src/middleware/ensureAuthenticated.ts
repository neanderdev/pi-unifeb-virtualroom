import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prismaClient";

interface IResultPayload {
  uid_user: string;
  ra_user: number;
  email_user: string;
  tipo_user: string;
  roles: any;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies.access_token;

  if (!token) {
    throw new Error("Token missing");
  }

  try {
    const data = jwt.verify(token, "febroom2022") as IResultPayload;

    const loginExist = await prisma.user.findUnique({
      where: {
        uid_user: data.uid_user,
      },
    });

    if (!loginExist) {
      throw new Error("User does not exists!");
    }

    request.uid_user = data.uid_user;
    request.ra_user = data.ra_user;
    request.email_user = data.email_user;
    request.tipo_user = data.tipo_user;
    request.roles = data.roles;

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
