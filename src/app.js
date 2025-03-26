import express, { json } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

import dotenv from "dotenv"

import transactionsRouter from "../routers/transactionsRouter.js";
import authRouter from "../routers/authRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const databaseURL = process.env.DATABASE_URL;
const port = process.env.PORT;
const mongoClient = new MongoClient(databaseURL);
let db;

mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message));

app.use(authRouter);
app.use(transactionsRouter);


app.listen(port, () => {
    console.log("Funcionou!")
});