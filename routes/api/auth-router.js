import express from "express";
import authController from "../../controllers/auth-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authenticate from "../../middlewares/authenticate.js";
import validateBody from "../../decorators/validateBody.js";
import { userLoginSchema, userRegisterSchema } from "../../models/User.js";

const userRegisterValidate = validateBody(userRegisterSchema);
const userLoginValidate = validateBody(userLoginSchema);

const authRouter = express.Router();

authRouter.post(
	"/register",
	isEmptyBody,
	userRegisterValidate,
	authController.register
);
authRouter.post("/login", isEmptyBody, userLoginValidate, authController.login);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
