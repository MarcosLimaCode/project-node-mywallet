import { Router } from "express";
import { var1, var2, var3, var4 } from "../controllers/transactionsController.js";


const transactionsRouter = Router();

transactionsRouter.post("/transactions", var1);

transactionsRouter.get("/transactions", var2);

transactionsRouter.put("/transactions", var3);

transactionsRouter.delete("/transactions", var4);

export default transactionsRouter;