import AuthController from "../controllers/auth/AuthController";
import express from "express";
import isAuth from "../middelwares/auth/isAuth";

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/isauth", isAuth, AuthController.isAuth);
export default authRouter;
