
import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function register(req, res) {
    const user = req.body;
    const checkEmail = await db.collection("users").findOne({ email: user.email })

    if (checkEmail) {
        return res.sendStatus(409);
    }

    try {
        await db.collection("users").insertOne({
            ...user,
            password: bcrypt.hashSync(user.password, 10)
        });
        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function login(req, res) {
    const user = req.body;
    const checkEmail = await db.collection("users").findOne({ email: user.email });
    const token = jwt.sign({ userId: checkEmail._id }, process.env.JWT_SECRET, { expiresIn: 86400 })

    try {

        if (!checkEmail) {
            return res.sendStatus(404);
        }

        if (checkEmail && bcrypt.compareSync(user.password, checkEmail.password)) {
            return res.status(200).send(token);
        }
        else {
            return res.sendStatus(401);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }

}
