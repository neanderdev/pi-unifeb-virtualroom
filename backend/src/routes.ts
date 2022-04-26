import { Router } from "express";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

import { LoginController } from "./modules/login/useCases/login/LoginController";
import { LogoutController } from "./modules/logout/useCases/logout/LogoutController";
import { RefreshTokenController } from "./modules/refreshToken/useCases/RefreshTokenController";
import { ListUsersController } from "./modules/user/useCases/listUsers/ListUsersController";
import { CreateUserController } from "./modules/user/useCases/createUser/CreateUserController";
import { FindUserByUidController } from "./modules/user/useCases/findUserByUid/FindUserByUidController";
import { UpdateUserController } from "./modules/user/useCases/updateUser/UpdateUserController";
import { DeleteUserController } from "./modules/user/useCases/deleteUser/DeleteUserController";

const routes = Router();

const loginController = new LoginController();
const logoutController = new LogoutController();
const refreshTokenController = new RefreshTokenController();
const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const findUserByUidController = new FindUserByUidController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

routes.post("/login/", loginController.handle);
routes.post("/logout/", logoutController.handle);
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

export { routes };
