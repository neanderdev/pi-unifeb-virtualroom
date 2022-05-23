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
import { FindClassByUidController } from "./modules/class/useCases/findClassByUid/FindClassByUidController";
import { UpdateClassController } from "./modules/class/useCases/updateClass/UpdateClassController";
import { ClassArchiveController } from "./modules/class/useCases/classArchive/ClassArchiveController";
import { ListAllCategoryActivityController } from "./modules/categoryActivity/useCases/listAllCategoryActivity/ListAllCategoryActivityController";
import { CreateCategoryActivityController } from "./modules/categoryActivity/useCases/createCategoryActivity/CreateCategoryActivityController";
import { UpdateCategoryActivityController } from "./modules/categoryActivity/useCases/updateCategoryActivity/UpdateCategoryActivityController";
import { DeleteCategoryActivityController } from "./modules/categoryActivity/useCases/deleteCategoryActivity/DeleteCategoryActivityController";
import { ListAllActivitiesController } from "./modules/listAllActivities/useCases/listAllActivities/ListAllActivitiesController";
import { ListActivitiesController } from "./modules/activity/useCases/listActivities/ListActivitiesController";
import { CreateActivityController } from "./modules/activity/useCases/createActivity/CreateActivityController";
import { UploadMaterialActivityController } from "./modules/materialActivity/useCases/uploadMaterialActivity/UploadMaterialActivityController";
import { FindByActivityUidController } from "./modules/activity/useCases/findByUidAcitivity/FindByActivityUidController";
import { CreateDetailActivityController } from "./modules/detailActivity/createDetailActivity/CreateDetailActivityController";
import { UploadMaterialDetailActivityController } from "./modules/detailActivity/uploadMaterialDetailActivity/UploadMaterialDetailActivityController";
import { FindDetailActivityByUserUidController } from "./modules/detailActivity/findDetailActivityByUserUid/FindDetailActivityByUserUidController";
import { DeleteDetailActivityController } from "./modules/detailActivity/deleteDetailActivity/DeleteDetailActivityController";
import { ListAllClassNoticeController } from "./modules/classNotice/useCases/listAllClassNotice/ListAllClassNoticeController";
import { CreateClassNoticeController } from "./modules/classNotice/useCases/createClassNotice/CreateClassNoticeController";
import { CreateClassNoticeAnswerController } from "./modules/classNoticeAnswer/useCases/createClassNoticeAnswer/CreateClassNoticeAnswerController";

const routes = Router();

const uploadClass = multer(upload.upload("./tmp/class"));
const uploadMaterialActivity = multer(upload.upload("./tmp/materialActivity"));
const uploadMaterialDetailActivity = multer(
  upload.upload("./tmp/materialDetailActivity")
);

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
const findClassByUidController = new FindClassByUidController();
const updateClassController = new UpdateClassController();
const classArchiveController = new ClassArchiveController();
const listAllCategoryActivity = new ListAllCategoryActivityController();
const createCategoryActivityController = new CreateCategoryActivityController();
const updateCategoryActivityController = new UpdateCategoryActivityController();
const deleteCategoryActivityController = new DeleteCategoryActivityController();
const listAllActivitiesController = new ListAllActivitiesController();
const listActivitiesController = new ListActivitiesController();
const createActivityController = new CreateActivityController();
const uploadMaterialActivityController = new UploadMaterialActivityController();
const findByActivityUidController = new FindByActivityUidController();
const createDetailActivityController = new CreateDetailActivityController();
const uploadMaterialDetailActivityController =
  new UploadMaterialDetailActivityController();
const findDetailActivityByUserUidController =
  new FindDetailActivityByUserUidController();
const deleteDetailActivityController = new DeleteDetailActivityController();
const listAllClassNoticeController = new ListAllClassNoticeController();
const createClassNoticeController = new CreateClassNoticeController();
const createClassNoticeAnswerController =
  new CreateClassNoticeAnswerController();

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
routes.get(
  "/class/:uid_class",
  ensureAuthenticated,
  findClassByUidController.handle
);
routes.put("/class/", ensureAuthenticated, updateClassController.handle);
routes.patch(
  "/class/:uid_class",
  ensureAuthenticated,
  classArchiveController.handle
);
routes.get(
  "/category-activity/:class_uid",
  ensureAuthenticated,
  listAllCategoryActivity.handle
);
routes.post(
  "/category-activity/",
  ensureAuthenticated,
  createCategoryActivityController.handle
);
routes.put(
  "/category-activity/",
  ensureAuthenticated,
  updateCategoryActivityController.handle
);
routes.delete(
  "/category-activity/:id_category_activity",
  ensureAuthenticated,
  deleteCategoryActivityController.handle
);
routes.get(
  "/list-all-activities/:class_uid",
  ensureAuthenticated,
  listAllActivitiesController.handle
);
routes.get(
  "/activity/:class_uid",
  ensureAuthenticated,
  listActivitiesController.handle
);
routes.post("/activity/", ensureAuthenticated, createActivityController.handle);
routes.post(
  "/upload-material-activity/:activity_uid",
  ensureAuthenticated,
  uploadMaterialActivity.array("materiais"),
  uploadMaterialActivityController.handle
);
routes.get(
  "/find-by-activity-uid/:uid_activity",
  ensureAuthenticated,
  findByActivityUidController.handle
);
routes.post(
  "/detail-activity/",
  ensureAuthenticated,
  createDetailActivityController.handle
);
routes.post(
  "/upload-material-detail-activity/:detail_activity_id",
  ensureAuthenticated,
  uploadMaterialDetailActivity.array("detail_activity"),
  uploadMaterialDetailActivityController.handle
);
routes.get(
  "/detail-activity/:activity_uid/:user_uid",
  ensureAuthenticated,
  findDetailActivityByUserUidController.handle
);
routes.delete(
  "/detail-activity/:activity_uid/:user_uid",
  ensureAuthenticated,
  deleteDetailActivityController.handle
);
routes.get(
  "/list-all-class-notice/:class_uid",
  ensureAuthenticated,
  listAllClassNoticeController.handle
);
routes.post(
  "/class-notice/",
  ensureAuthenticated,
  createClassNoticeController.handle
);
routes.post(
  "/class-notice-answer/",
  ensureAuthenticated,
  createClassNoticeAnswerController.handle
);

export { routes };
