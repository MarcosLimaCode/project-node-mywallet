import { Router } from "express";
import { varPostEntradaSaida, varGetTransacoes, varPutTransacoes, varDeleta } from "../controllers/transactionsController.js";
import { varValidarToken } from "../middleware/authMiddleware.js";


const transactionsRouter = Router();

transactionsRouter.post("/transactions", varValidarToken, varPostEntradaSaida);

transactionsRouter.get("/transactions", varValidarToken, varGetTransacoes);

transactionsRouter.put("/transactions/:id", varValidarToken, varPutTransacoes);

transactionsRouter.delete("/transactions/:id", varValidarToken, varDeleta);

export default transactionsRouter;