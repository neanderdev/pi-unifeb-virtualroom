import "reflect-metadata";
import cookieParser from "cookie-parser";
import express from "express";
import "express-async-errors";

import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.listen(8000, () => console.log("Server is running 🚀"));
