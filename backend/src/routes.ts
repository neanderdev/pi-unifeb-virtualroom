import { Router } from "express";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

import { LoginController } from "./modules/login/useCases/login/LoginController";
import { LogoutController } from "./modules/logout/useCases/logout/LogoutController";
import { CreateUserController } from "./modules/user/useCases/createUser/CreateUserController";
import { CreateStudentController } from "./modules/student/useCases/createStudent/CreateStudentController";
import { ListStudentController } from "./modules/student/useCases/listStudent/ListStudentController";
import { CreateTeacherController } from "./modules/teacher/useCases/createTeacher/CreateTeacherController";

const routes = Router();

const loginController = new LoginController();
const logoutController = new LogoutController();
const createUserController = new CreateUserController();
const createStudentController = new CreateStudentController();
const listStudentController = new ListStudentController();
const createTeacherController = new CreateTeacherController();

routes.post("/login/", loginController.handle);
routes.post("/logout/", logoutController.handle);
routes.post("/user/", ensureAuthenticated, createUserController.handle);
routes.post("/student/", ensureAuthenticated, createStudentController.handle);
routes.get("/student/", ensureAuthenticated, listStudentController.handle);
routes.post("/teacher/", ensureAuthenticated, createTeacherController.handle);

export { routes };
