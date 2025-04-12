import express, { json } from "express";
import cors from "cors";

import dotenv from "dotenv";

import transactionsRouter from "../routers/transactionsRouter.js";
import authRouter from "../routers/authRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());


const port = process.env.PORT;

app.use(authRouter);
app.use(transactionsRouter);

app.listen(port, () => {
    console.log("Funcionou!")
});