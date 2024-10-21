import { Router } from "express";
import { createAccount, loginAccount } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/register", createAccount);
userRouter.post("/login", loginAccount);

export default userRouter;
