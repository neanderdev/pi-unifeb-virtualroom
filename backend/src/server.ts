import "reflect-metadata";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import "express-async-errors";

import { routes } from "./routes";

import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      if (err.code === "") {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      } else {
        return response.status(err.statusCode).json({
          message: err.message,
          code: err.code,
        });
      }
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(8000, () => console.log("Server is running 🚀"));
