import { Router } from "express";
import { var1, var2 } from "../controllers/authController.js";


const authRouter = Router();

authRouter.post("/sign-up", var1)

authRouter.post("/sign-in", var2)

export default authRouter;
