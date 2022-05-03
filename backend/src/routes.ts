import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

import upload from "./config/upload";

import { LoginController } from "./modules/login/useCases/login/LoginController";
import { RefreshTokenController } from "./modules/refreshToken/useCases/RefreshTokenController";
import { ListUsersController } from "./modules/user/useCases/listUsers/ListUsersController";
import { CreateUserController } from "./modules/user/useCases/createUser/CreateUserController";
import { FindUserByUidController } from "./modules/user/useCases/findUserByUid/FindUserByUidController";
import { UpdateUserController } from "./modules/user/useCases/updateUser/UpdateUserController";
import { DeleteUserController } from "./modules/user/useCases/deleteUser/DeleteUserController";
import { FindMeByIdController } from "./modules/me/useCases/FindMeByIdController";
import { ListAllClassController } from "./modules/class/useCases/listAllClass/ListAllClassController";
import { CreateClassController } from "./modules/class/useCases/createClass/CreateClassController";
import { UploadBackgroundClassController } from "./modules/class/useCases/uploadBackgroundClass/UploadBackgroundClassController";

const routes = Router();

const uploadClass = multer(upload.upload("./tmp/class"));

const loginController = new LoginController();
const refreshTokenController = new RefreshTokenController();
const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const findUserByUidController = new FindUserByUidController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const findMeByIdController = new FindMeByIdController();
const listAllClassController = new ListAllClassController();
const createClassController = new CreateClassController();
const uploadBackgroundController = new UploadBackgroundClassController();

routes.post("/login/", loginController.handle);
routes.post("/refresh-token/", refreshTokenController.handle);
routes.get("/user/", ensureAuthenticated, listUsersController.handle);
routes.post("/user/", ensureAuthenticated, createUserController.handle);
routes.get(
  "/user/:uid_user",
  ensureAuthenticated,
  findUserByUidController.handle
);
routes.put("/user/", ensureAuthenticated, updateUserController.handle);
routes.delete(
  "/user/:uid_user",
  ensureAuthenticated,
  deleteUserController.handle
);
routes.get("/me/", ensureAuthenticated, findMeByIdController.handle);
routes.get("/class/", ensureAuthenticated, listAllClassController.handle);
routes.post("/class/", ensureAuthenticated, createClassController.handle);
routes.patch(
  "/upload-background-class/:uid_class",
  ensureAuthenticated,
  uploadClass.single("class"),
  uploadBackgroundController.handle
);

export { routes };
