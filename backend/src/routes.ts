import { Router } from "express";

import { CreateUserController } from "./modules/user/useCases/createUser/CreateUserController";
import { CreateStudentController } from "./modules/student/useCases/createStudent/CreateStudentController";

const routes = Router();

const createUserController = new CreateUserController();
const createStudentController = new CreateStudentController();

routes.post("/user/", createUserController.handle);
routes.post("/student/", createStudentController.handle);

export { routes };
