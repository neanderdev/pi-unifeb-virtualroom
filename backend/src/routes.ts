import { Router } from "express";

import { CreateUserController } from "./modules/user/useCases/createUser/CreateUserController";
import { CreateStudentController } from "./modules/student/useCases/createStudent/CreateStudentController";
import { CreateTeacherController } from "./modules/teacher/useCases/createTeacher/CreateTeacherController";

const routes = Router();

const createUserController = new CreateUserController();
const createStudentController = new CreateStudentController();
const createTeacherController = new CreateTeacherController();

routes.post("/user/", createUserController.handle);
routes.post("/student/", createStudentController.handle);
routes.post("/teacher/", createTeacherController.handle);

export { routes };
