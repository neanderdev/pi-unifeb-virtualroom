import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prismaClient";

interface IResultPayload {
  id_user: number;
  ra: number;
  email: string;
  tipo_user: string;
  role: any;
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
    const data = jwt.verify(token.token, "febroom2022") as IResultPayload;

    const loginExist = await prisma.user.findUnique({
      where: {
        id_user: data.id_user,
      },
    });

    if (!loginExist) {
      throw new Error("User does not exists!");
    }

    request.id_user = data.id_user;
    request.ra = data.ra;
    request.email = data.email;
    request.tipo_user = data.tipo_user;
    request.role = data.role;

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
