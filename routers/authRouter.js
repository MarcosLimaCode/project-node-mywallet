import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { validateSchema } from "../middleware/schemaMiddleware.js";
import { loginUser, registerUser } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(registerUser), register);
authRouter.post("/sign-in", validateSchema(loginUser), login);

export default authRouter;