import { Router } from "express";
import { varPostEntradaSaida, var2, var3, var4 } from "../controllers/transactionsController.js";


const transactionsRouter = Router();

transactionsRouter.post("/transactions", varPostEntradaSaida);

transactionsRouter.get("/transactions", var2);

transactionsRouter.put("/transactions", var3);

transactionsRouter.delete("/transactions", var4);

export default transactionsRouter;