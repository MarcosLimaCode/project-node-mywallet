import { Router } from "express";
import { postTransaction, getTransaction, putTransaction, deleteTransaction } from "../controllers/transactionsController.js";
import { validateToken } from "../middleware/authMiddleware.js";
import { transactionSchema } from "../schemas/transactionsSchema.js";
import { validateSchema } from "../middleware/schemaMiddleware.js";


const transactionsRouter = Router();

transactionsRouter.use(validateToken);

transactionsRouter.post("/transactions", validateSchema(transactionSchema), postTransaction);

transactionsRouter.get("/transactions", getTransaction);

transactionsRouter.put("/transactions/:id", validateSchema(transactionSchema), putTransaction);

transactionsRouter.delete("/transactions/:id", deleteTransaction);

export default transactionsRouter;