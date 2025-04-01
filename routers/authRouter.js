import { Router } from "express";
import { varCadastro, varLogin } from "../controllers/authController.js";


const authRouter = Router();

authRouter.post("/sign-up", varCadastro)

authRouter.post("/sign-in", varLogin)

export default authRouter;
